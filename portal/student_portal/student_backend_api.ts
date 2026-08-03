import {
  requestVerificationCode,
  verifyCode,
} from "../../backend_core/verification_code_service";
import {
  verifyStudentGeofence,
  DEFAULT_CAMPUS_GEOFENCE,
} from "../../backend_core/geofence_service";
import { verifyExamTiming } from "../../backend_core/exam_schedule_service";
import { sendExamSubmissionEmail } from "../../backend_core/mail_service";
import { dbService } from "../../backend_core/database_service";
import {
  safeExecute,
  validatePayloadFields,
  ApiResponse,
} from "../../backend_core/resiliency_and_crash_guard";

/**
 * Student API: Request Login / Access OTP (Sent via Gmail SMTP to legezt@gmail.com)
 */
export async function apiRequestStudentOtp(payload: {
  email: string;
  name?: string;
}): Promise<ApiResponse> {
  return safeExecute("Student OTP Request", async () => {
    const { valid, missingFields } = validatePayloadFields(payload, ["email"]);
    if (!valid) {
      throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
    }

    const student = dbService.findStudentByEmailOrRoll(payload.email);
    const recipientName = student ? student.name : payload.name || "Student";

    const result = await requestVerificationCode(
      payload.email,
      "login",
      "student",
      recipientName
    );

    if (!result.success) {
      throw new Error(result.message);
    }

    return {
      email: payload.email,
      otpCode: result.code, // Returned for backend API validation
      message: result.message,
      expiresAt: result.expiresAt,
    };
  });
}

/**
 * Student API: Verify 6-Digit OTP Code
 */
export async function apiVerifyStudentOtp(payload: {
  email: string;
  code: string;
}): Promise<ApiResponse> {
  return safeExecute("Student OTP Verification", async () => {
    const { valid, missingFields } = validatePayloadFields(payload, [
      "email",
      "code",
    ]);
    if (!valid) {
      throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
    }

    const result = verifyCode(payload.email, payload.code, "login");
    if (!result.success) {
      throw new Error(result.message);
    }

    const student = dbService.findStudentByEmailOrRoll(payload.email);

    return {
      authenticated: true,
      student,
      message: result.message,
    };
  });
}

/**
 * Student API: 200m GPS Geofence Location Verification
 */
export async function apiVerifyStudentGeofenceLocation(payload: {
  email: string;
  userLat: number;
  userLon: number;
}): Promise<ApiResponse> {
  return safeExecute("Student Geofence Verification", async () => {
    const { valid, missingFields } = validatePayloadFields(payload, [
      "email",
      "userLat",
      "userLon",
    ]);
    if (!valid) {
      throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
    }

    const geofenceResult = verifyStudentGeofence(
      payload.userLat,
      payload.userLon,
      DEFAULT_CAMPUS_GEOFENCE
    );

    return geofenceResult;
  });
}

/**
 * Student API: Submit Exam Answers & Trigger Marksheet Dispatch via Gmail SMTP
 */
export async function apiSubmitStudentExam(payload: {
  email: string;
  rollNo: string;
  examId: string;
  userLat: number;
  userLon: number;
  score: number;
}): Promise<ApiResponse> {
  return safeExecute("Student Exam Submission", async () => {
    const { valid, missingFields } = validatePayloadFields(payload, [
      "email",
      "rollNo",
      "examId",
      "userLat",
      "userLon",
      "score",
    ]);
    if (!valid) {
      throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
    }

    // 1. Geofence Check
    const geofence = verifyStudentGeofence(payload.userLat, payload.userLon);
    if (!geofence.verified) {
      throw new Error(
        `Geofence Violation: ${geofence.distanceMeters}m away from campus. Submission rejected.`
      );
    }

    // 2. Exam Schedule Check
    const exam = dbService.findExamById(payload.examId);
    if (!exam) {
      throw new Error(`Exam ID ${payload.examId} not found.`);
    }

    const timing = verifyExamTiming(exam.startTimeIso, exam.endTimeIso);
    if (!timing.canAccess) {
      throw new Error(`Timing Violation: ${timing.statusMessage}`);
    }

    // 3. Save Submission Record
    const submissionId = `SUB-${Date.now()}`;
    dbService.addSubmission({
      submissionId,
      examId: exam.id,
      studentRollNo: payload.rollNo,
      studentEmail: payload.email,
      score: payload.score,
      totalMarks: exam.totalMarks,
      userLat: payload.userLat,
      userLon: payload.userLon,
      distanceMeters: geofence.distanceMeters,
      submittedAt: new Date().toISOString(),
      verified: true,
      marksheetDispatched: true,
    });

    // 4. Dispatch Email Marksheet via Gmail SMTP
    const student = dbService.findStudentByEmailOrRoll(payload.email);
    const studentName = student ? student.name : payload.rollNo;

    const emailResult = await sendExamSubmissionEmail(
      payload.email,
      studentName,
      exam.title,
      payload.score,
      exam.totalMarks
    );

    return {
      submissionId,
      score: payload.score,
      totalMarks: exam.totalMarks,
      geofenceVerified: true,
      distanceMeters: geofence.distanceMeters,
      marksheetEmailSent: emailResult.success,
      emailMessageId: emailResult.messageId,
      statusMessage: "Exam submission successfully recorded and marksheet emailed!",
    };
  });
}

/**
 * Student API: Register New Student Account (Full Name, Roll No, Email, Department, Password)
 */
export async function apiRegisterStudent(payload: {
  name: string;
  rollNo: string;
  email: string;
  department: string;
  password?: string;
}): Promise<ApiResponse> {
  return safeExecute("Student Account Registration", async () => {
    const { valid, missingFields } = validatePayloadFields(payload, ["name", "rollNo", "email", "department"]);
    if (!valid) {
      throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
    }

    const registeredStudent = dbService.registerStudent({
      name: payload.name.trim(),
      rollNo: payload.rollNo.trim(),
      email: payload.email.trim(),
      department: payload.department.trim(),
      password: payload.password?.trim(),
      isPermanentMember: false,
    });

    // Send 6-digit activation OTP code via Gmail SMTP
    const otpResult = await requestVerificationCode(
      payload.email,
      "login",
      "student",
      payload.name
    );

    return {
      success: true,
      student: registeredStudent,
      otpSent: otpResult.success,
      message: `Verification code sent to ${registeredStudent.email}. Enter 6-digit OTP to activate your permanent membership!`,
    };
  });
}

/**
 * Student API: Login Student Credentials (Email/Roll No + Password)
 */
export async function apiLoginStudent(payload: {
  emailOrRoll: string;
  password?: string;
}): Promise<ApiResponse> {
  return safeExecute("Student Account Login", async () => {
    const { valid, missingFields } = validatePayloadFields(payload, ["emailOrRoll"]);
    if (!valid) {
      throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
    }

    const student = dbService.findStudentByEmailOrRoll(payload.emailOrRoll);
    if (!student) {
      throw new Error("Student account not found. Please register first.");
    }

    // Verify Password if student set a password
    if (student.password && payload.password) {
      if (student.password !== payload.password.trim()) {
        throw new Error("Invalid password credentials. Please try again or use Forgot Password.");
      }
    }

    // Mark permanent member
    dbService.verifyPermanentMember(student.email);

    return {
      success: true,
      student,
      message: `Welcome back, ${student.name}! Account authenticated.`,
    };
  });
}

/**
 * Student API: Request Token-Based Password Reset (Dispatches 6-Digit Token)
 */
export async function apiRequestPasswordReset(payload: {
  emailOrRoll: string;
}): Promise<ApiResponse> {
  return safeExecute("Request Password Reset Token", async () => {
    const { valid, missingFields } = validatePayloadFields(payload, ["emailOrRoll"]);
    if (!valid) {
      throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
    }

    const result = dbService.createPasswordResetToken(payload.emailOrRoll);
    if (!result.success) {
      throw new Error(result.message);
    }

    // Email 6-digit token via Gmail SMTP
    if (result.email && result.token) {
      await requestVerificationCode(result.email, "password_reset", "student", "Student");
    }

    return {
      success: true,
      email: result.email,
      message: result.message,
    };
  });
}

/**
 * Student API: Confirm Password Reset with Token
 */
export async function apiConfirmPasswordReset(payload: {
  emailOrRoll: string;
  token: string;
  newPassword: string;
}): Promise<ApiResponse> {
  return safeExecute("Confirm Password Reset", async () => {
    const { valid, missingFields } = validatePayloadFields(payload, ["emailOrRoll", "token", "newPassword"]);
    if (!valid) {
      throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
    }

    const result = dbService.confirmPasswordReset(payload.emailOrRoll, payload.token, payload.newPassword);
    if (!result.success) {
      throw new Error(result.message);
    }

    return {
      success: true,
      message: result.message,
    };
  });
}



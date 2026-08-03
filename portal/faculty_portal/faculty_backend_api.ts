import {
  requestVerificationCode,
  verifyCode,
} from "../../backend_core/verification_code_service";
import { dbService } from "../../backend_core/database_service";
import {
  safeExecute,
  validatePayloadFields,
  ApiResponse,
} from "../../backend_core/resiliency_and_crash_guard";

/**
 * Faculty API: Request Login OTP Code
 */
export async function apiRequestFacultyOtp(payload: {
  email: string;
}): Promise<ApiResponse> {
  return safeExecute("Faculty OTP Request", async () => {
    const { valid, missingFields } = validatePayloadFields(payload, ["email"]);
    if (!valid) {
      throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
    }

    const faculty = dbService.findFacultyByEmailOrId(payload.email);
    const facultyName = faculty ? faculty.name : "Faculty Member";

    const result = await requestVerificationCode(
      payload.email,
      "login",
      "faculty",
      facultyName
    );

    if (!result.success) {
      throw new Error(result.message);
    }

    return {
      email: payload.email,
      otpCode: result.code,
      message: result.message,
      expiresAt: result.expiresAt,
    };
  });
}

/**
 * Faculty API: Verify OTP Code
 */
export async function apiVerifyFacultyOtp(payload: {
  email: string;
  code: string;
}): Promise<ApiResponse> {
  return safeExecute("Faculty OTP Verification", async () => {
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

    const faculty = dbService.findFacultyByEmailOrId(payload.email);

    return {
      authenticated: true,
      faculty,
      message: result.message,
    };
  });
}

/**
 * Faculty API: Get Real-time Submissions & Proctoring Audit Logs
 */
export async function apiGetFacultyExamSubmissions(payload: {
  facultyId: string;
  examId: string;
}): Promise<ApiResponse> {
  return safeExecute("Faculty Submissions Retrieval", async () => {
    const db = dbService.getDatabase();
    const submissions = db.submissions.filter((s) => s.examId === payload.examId);
    return {
      examId: payload.examId,
      totalSubmissions: submissions.length,
      submissions,
    };
  });
}

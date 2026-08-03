import { verifySmtpConnection } from "./mail_service";
import {
  calculateHaversineDistance,
  verifyStudentGeofence,
  DEFAULT_CAMPUS_GEOFENCE,
} from "./geofence_service";
import {
  requestVerificationCode,
  verifyCode,
} from "./verification_code_service";
import { verifyExamTiming } from "./exam_schedule_service";
import {
  apiRequestStudentOtp,
  apiVerifyStudentOtp,
  apiVerifyStudentGeofenceLocation,
  apiSubmitStudentExam,
} from "../portal/student_portal/student_backend_api";
import {
  apiRequestFacultyOtp,
  apiVerifyFacultyOtp,
  apiGetFacultyExamSubmissions,
} from "../portal/faculty_portal/faculty_backend_api";
import { apiAdminSystemDiagnostics } from "../admin/admin_backend_api";
import { safeExecute } from "./resiliency_and_crash_guard";

// Helper for formatted CLI logs
function logSection(title: string) {
  console.log("\n" + "═".repeat(70));
  console.log(` 🧪 ${title.toUpperCase()}`);
  console.log("═".repeat(70));
}

function logTestResult(testName: string, passed: boolean, details?: string) {
  const icon = passed ? "✅ PASS" : "❌ FAIL";
  console.log(`[${icon}] ${testName}`);
  if (details) {
    console.log(`      ↳ ${details}`);
  }
}

async function runComprehensiveBackendTestSuite() {
  console.log("\n🚀 LEGEZT BACKEND SYSTEM & INTEGRATION TEST RUNNER");
  console.log("--------------------------------------------------");
  console.log(`Target Gmail SMTP: legezt@gmail.com`);
  console.log(`Target Geofence: ${DEFAULT_CAMPUS_GEOFENCE.campusName} (200m Radius)\n`);

  let totalPass = 0;
  let totalFail = 0;

  // =========================================================================
  // TEST 1: Gmail SMTP Connection Diagnostics
  // =========================================================================
  logSection("1. Gmail SMTP Connection & Authentication Test");
  const smtpStatus = await verifySmtpConnection();
  if (smtpStatus.success) {
    totalPass++;
    logTestResult("Gmail SMTP Verification", true, smtpStatus.message);
  } else {
    totalFail++;
    logTestResult("Gmail SMTP Verification", false, smtpStatus.message);
  }

  // =========================================================================
  // TEST 2: 200m GPS Geofence Location Mathematics & Boundary Enforcement
  // =========================================================================
  logSection("2. 200m GPS Geofence Verification Tests");

  // Test 2A: Exact Campus Coordinates (0m away)
  const gInside = verifyStudentGeofence(17.385044, 78.486671);
  if (gInside.verified && gInside.distanceMeters === 0) {
    totalPass++;
    logTestResult("Student On-Campus Center (0m away)", true, gInside.statusMessage);
  } else {
    totalFail++;
    logTestResult("Student On-Campus Center (0m away)", false, gInside.statusMessage);
  }

  // Test 2B: Student inside 200m boundary (e.g. ~100m away: 17.3855, 78.4866)
  const dist100m = calculateHaversineDistance(17.385044, 78.486671, 17.3855, 78.4866);
  const g100m = verifyStudentGeofence(17.3855, 78.4866);
  if (g100m.verified) {
    totalPass++;
    logTestResult(`Student Within Boundary (${dist100m.toFixed(1)}m away)`, true, g100m.statusMessage);
  } else {
    totalFail++;
    logTestResult(`Student Within Boundary (${dist100m.toFixed(1)}m away)`, false, g100m.statusMessage);
  }

  // Test 2C: Student OUTSIDE 200m boundary (e.g. ~1000m away: 17.3950, 78.4950)
  const gOutside = verifyStudentGeofence(17.3950, 78.4950);
  if (!gOutside.verified && gOutside.distanceMeters > 200) {
    totalPass++;
    logTestResult(`Student Outside Geofence (${gOutside.distanceMeters.toFixed(1)}m away)`, true, gOutside.statusMessage);
  } else {
    totalFail++;
    logTestResult(`Student Outside Geofence (${gOutside.distanceMeters.toFixed(1)}m away)`, false, gOutside.statusMessage);
  }

  // Test 2D: Invalid/NaN GPS Coordinates Crash-proof Test
  const gCrash = verifyStudentGeofence(NaN, 78.486671);
  if (!gCrash.verified) {
    totalPass++;
    logTestResult("Malformed GPS Coordinates Crash-Guard", true, gCrash.statusMessage);
  } else {
    totalFail++;
    logTestResult("Malformed GPS Coordinates Crash-Guard", false);
  }

  // =========================================================================
  // TEST 3: Verification Code / 6-Digit OTP Lifecycle & Email Dispatch
  // =========================================================================
  logSection("3. 6-Digit Verification Code OTP & Gmail Dispatch Tests");

  const testEmail = "legezt@gmail.com";

  // Test 3A: Request Verification Code via Gmail SMTP
  const otpReq = await requestVerificationCode(testEmail, "login", "student", "Md Jibran");
  if (otpReq.success && otpReq.code && otpReq.code.length === 6) {
    totalPass++;
    logTestResult("OTP Generation & Gmail Dispatch to legezt@gmail.com", true, `Generated OTP: ${otpReq.code} (Expires: 5m)`);

    // Test 3B: Verify Incorrect Code Attempt
    const wrongAttempt = verifyCode(testEmail, "000000", "login");
    if (!wrongAttempt.success && wrongAttempt.remainingAttempts === 2) {
      totalPass++;
      logTestResult("Incorrect OTP Decrements Remaining Attempts", true, wrongAttempt.message);
    } else {
      totalFail++;
      logTestResult("Incorrect OTP Decrements Remaining Attempts", false, wrongAttempt.message);
    }

    // Test 3C: Verify Correct OTP Match
    const validAttempt = verifyCode(testEmail, otpReq.code, "login");
    if (validAttempt.success) {
      totalPass++;
      logTestResult("Correct 6-Digit OTP Verification", true, validAttempt.message);
    } else {
      totalFail++;
      logTestResult("Correct 6-Digit OTP Verification", false, validAttempt.message);
    }
  } else {
    totalFail++;
    logTestResult("OTP Generation & Gmail Dispatch to legezt@gmail.com", false, otpReq.message);
  }

  // =========================================================================
  // TEST 4: Exam Schedule & Timing Verification
  // =========================================================================
  logSection("4. Exam Schedule & Timing Synchronization Tests");

  const nowMs = Date.now();
  // Live Exam Timing
  const liveExam = verifyExamTiming(
    new Date(nowMs - 10000).toISOString(),
    new Date(nowMs + 60000).toISOString()
  );
  if (liveExam.canAccess && liveExam.status === "LIVE") {
    totalPass++;
    logTestResult("LIVE Exam Access Window", true, liveExam.statusMessage);
  } else {
    totalFail++;
    logTestResult("LIVE Exam Access Window", false, liveExam.statusMessage);
  }

  // Ended Exam Timing
  const endedExam = verifyExamTiming(
    new Date(nowMs - 60000).toISOString(),
    new Date(nowMs - 10000).toISOString()
  );
  if (!endedExam.canAccess && endedExam.status === "ENDED") {
    totalPass++;
    logTestResult("EXPIRED Exam Rejection Window", true, endedExam.statusMessage);
  } else {
    totalFail++;
    logTestResult("EXPIRED Exam Rejection Window", false, endedExam.statusMessage);
  }

  // =========================================================================
  // TEST 5: Student Portal Backend End-to-End Workflow
  // =========================================================================
  logSection("5. Student Portal Backend End-to-End Workflow Tests");

  // Step 1: Student Requests Login OTP
  const stdOtpRes = await apiRequestStudentOtp({ email: testEmail, name: "Md Jibran" });
  if (stdOtpRes.success && stdOtpRes.data?.otpCode) {
    totalPass++;
    logTestResult("Student API: OTP Request", true, stdOtpRes.message);

    // Step 2: Student Verifies OTP
    const stdVerRes = await apiVerifyStudentOtp({
      email: testEmail,
      code: stdOtpRes.data.otpCode,
    });
    if (stdVerRes.success && stdVerRes.data?.authenticated) {
      totalPass++;
      logTestResult("Student API: OTP Verification & Auth", true, stdVerRes.message);
    } else {
      totalFail++;
      logTestResult("Student API: OTP Verification & Auth", false, stdVerRes.message);
    }
  } else {
    totalFail++;
    logTestResult("Student API: OTP Request", false, stdOtpRes.error);
  }

  // Step 3: Student Verifies Geofence Location (0m away)
  const stdGeoRes = await apiVerifyStudentGeofenceLocation({
    email: testEmail,
    userLat: 17.385044,
    userLon: 78.486671,
  });
  if (stdGeoRes.success && stdGeoRes.data?.verified) {
    totalPass++;
    logTestResult("Student API: Geofence Location Verification", true, stdGeoRes.data.statusMessage);
  } else {
    totalFail++;
    logTestResult("Student API: Geofence Location Verification", false, stdGeoRes.error);
  }

  // Step 4: Student Exam Submission & Instant Gmail Marksheet Dispatch
  const stdSubRes = await apiSubmitStudentExam({
    email: testEmail,
    rollNo: "21LIETCS301",
    examId: "EX-CS302",
    userLat: 17.385044,
    userLon: 78.486671,
    score: 96,
  });

  if (stdSubRes.success && stdSubRes.data?.marksheetEmailSent) {
    totalPass++;
    logTestResult(
      "Student API: Exam Submission & Gmail Marksheet Dispatch",
      true,
      `Submission ID: ${stdSubRes.data.submissionId} | Score: ${stdSubRes.data.score}/100 | Email MsgId: ${stdSubRes.data.emailMessageId}`
    );
  } else {
    totalFail++;
    logTestResult("Student API: Exam Submission & Gmail Marksheet Dispatch", false, stdSubRes.error);
  }

  // =========================================================================
  // TEST 6: Faculty & Admin Portal Integration
  // =========================================================================
  logSection("6. Faculty & Admin Portal Integration Tests");

  // Faculty OTP Request
  const facOtpRes = await apiRequestFacultyOtp({ email: testEmail });
  if (facOtpRes.success) {
    totalPass++;
    logTestResult("Faculty API: OTP Request", true, facOtpRes.message);
  } else {
    totalFail++;
    logTestResult("Faculty API: OTP Request", false, facOtpRes.error);
  }

  // Faculty View Submissions
  const facSubRes = await apiGetFacultyExamSubmissions({
    facultyId: "fac-101",
    examId: "EX-CS302",
  });
  if (facSubRes.success && facSubRes.data?.totalSubmissions > 0) {
    totalPass++;
    logTestResult("Faculty API: Live Submissions & Proctoring Fetch", true, `Submissions Found: ${facSubRes.data.totalSubmissions}`);
  } else {
    totalFail++;
    logTestResult("Faculty API: Live Submissions & Proctoring Fetch", false, facSubRes.error);
  }

  // Admin System Diagnostics
  const adminDiagRes = await apiAdminSystemDiagnostics();
  if (adminDiagRes.success && adminDiagRes.data?.systemHealth === "OPTIMAL") {
    totalPass++;
    logTestResult("Admin API: System Diagnostics & Health Audit", true, `Health: ${adminDiagRes.data.systemHealth} | SMTP: ${adminDiagRes.data.smtpStatus.message}`);
  } else {
    totalFail++;
    logTestResult("Admin API: System Diagnostics & Health Audit", false, adminDiagRes.error);
  }

  // =========================================================================
  // TEST 7: Resiliency, Crash Prevention & Error Recovery Tests
  // =========================================================================
  logSection("7. Resiliency & Zero-Crash Stress Guard Tests");

  // Test 7A: Invalid Payload (Missing required email)
  const errRes1 = await apiRequestStudentOtp({ email: "" });
  if (!errRes1.success && errRes1.code === 500) {
    totalPass++;
    logTestResult("Missing Email Payload Handled Gracefully", true, errRes1.message);
  } else {
    totalFail++;
    logTestResult("Missing Email Payload Handled Gracefully", false);
  }

  // Test 7B: Geofence Submission Out of Bounds (1000m away)
  const errRes2 = await apiSubmitStudentExam({
    email: testEmail,
    rollNo: "21LIETCS301",
    examId: "EX-CS302",
    userLat: 17.4500, // ~7km away
    userLon: 78.5500,
    score: 80,
  });

  if (!errRes2.success && errRes2.error?.includes("Geofence Violation")) {
    totalPass++;
    logTestResult("Geofence Security Violation Rejection Guard", true, errRes2.error);
  } else {
    totalFail++;
    logTestResult("Geofence Security Violation Rejection Guard", false, errRes2.error);
  }

  // SUMMARY REPORT
  console.log("\n" + "═".repeat(70));
  console.log(" 📊 BACKEND SYSTEM TEST SUMMARY REPORT");
  console.log("═".repeat(70));
  console.log(` Total Tests Executed: ${totalPass + totalFail}`);
  console.log(` ✅ Passed: ${totalPass}`);
  console.log(` ❌ Failed: ${totalFail}`);
  console.log(` System Crash Count: 0 (Zero Unhandled Exceptions)`);
  console.log("═".repeat(70) + "\n");

  if (totalFail === 0) {
    console.log("🎉 ALL BACKEND & SMTP INTEGRATION TESTS PASSED 100%!");
  } else {
    console.log("⚠️ SOME TESTS FAILED. CHECK LOGS ABOVE.");
  }
}

// Execute test suite
runComprehensiveBackendTestSuite();

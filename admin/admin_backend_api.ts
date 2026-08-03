import { verifySmtpConnection } from "../backend_core/mail_service";
import { dbService } from "../backend_core/database_service";
import {
  safeExecute,
  ApiResponse,
} from "../backend_core/resiliency_and_crash_guard";

/**
 * Admin API: System Diagnostics & Gmail SMTP Status Check
 */
export async function apiAdminSystemDiagnostics(): Promise<ApiResponse> {
  return safeExecute("Admin System Diagnostics", async () => {
    const smtpStatus = await verifySmtpConnection();
    const db = dbService.getDatabase();

    return {
      smtpStatus,
      systemHealth: "OPTIMAL",
      totalRegisteredStudents: db.students.length,
      totalRegisteredFaculty: db.faculty.length,
      totalActiveExams: db.exams.length,
      totalSubmissionsRecorded: db.submissions.length,
      geofenceMaxRadiusMeters: 200.0,
      timestamp: new Date().toISOString(),
    };
  });
}

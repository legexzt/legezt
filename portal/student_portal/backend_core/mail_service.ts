import nodemailer from "nodemailer";

/**
 * Gmail SMTP Configuration with User Credentials:
 * Email: legezt@gmail.com
 * App Password: lehc ekif cjwt cmeh -> lehcekifcjwtcmeh
 */
const GMAIL_USER = process.env.GMAIL_USER || "legezt@gmail.com";
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD || "lehcekifcjwtcmeh";

// Create reusable Nodemailer SMTP Transporter
export const mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_APP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false
  }
});

/**
 * Verify Gmail SMTP Connection Status
 */
export async function verifySmtpConnection(): Promise<{ success: boolean; message: string }> {
  try {
    await mailTransporter.verify();
    return {
      success: true,
      message: `Successfully connected to Gmail SMTP server for ${GMAIL_USER}`,
    };
  } catch (error: any) {
    return {
      success: false,
      message: `Gmail SMTP Connection Failed: ${error?.message || error}`,
    };
  }
}

/**
 * Send 6-Digit Verification Code / OTP Email
 */
export async function sendVerificationCodeEmail(
  toEmail: string,
  code: string,
  userRole: "student" | "faculty" | "admin" = "student",
  recipientName = "User"
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const roleTitle = userRole.toUpperCase();
    const htmlTemplate = `
      <div style="font-family: Arial, sans-serif; background-color: #0f172a; color: #f8fafc; padding: 30px; border-radius: 16px; max-width: 550px; margin: 0 auto; border: 1px solid #334155;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="color: #38bdf8; margin: 0; font-size: 28px; letter-spacing: 2px;">⚡ LEGEZT ACADEMIC PORTAL</h1>
          <p style="color: #94a3b8; font-size: 13px; font-weight: bold; margin-top: 4px;">SECURE ${roleTitle} VERIFICATION SYSTEM</p>
        </div>

        <div style="background-color: #1e293b; padding: 20px; border-radius: 12px; border: 1px solid #475569;">
          <p style="font-size: 15px; margin-top: 0;">Hello <strong>${recipientName}</strong>,</p>
          <p style="font-size: 14px; color: #cbd5e1;">Your 6-digit verification security code for accessing the <strong>LeGeZt ${roleTitle} Portal</strong> is:</p>

          <div style="text-align: center; margin: 25px 0;">
            <span style="font-size: 36px; font-weight: 900; letter-spacing: 8px; color: #10b981; background-color: #064e3b; padding: 12px 28px; border-radius: 10px; border: 2px dashed #10b981; display: inline-block;">
              ${code}
            </span>
          </div>

          <p style="font-size: 12px; color: #f59e0b; font-weight: bold; margin-bottom: 0;">
            ⚠️ Note: This security code will expire in <strong>5 minutes</strong>. Do not share this code with anyone.
          </p>
        </div>

        <div style="text-align: center; margin-top: 24px; color: #64748b; font-size: 11px;">
          <p>Autonomous 200m GPS Geofenced Intranet Academic Platform • LIET Campus</p>
          <p style="margin-top: 4px;">Dispatched from ${GMAIL_USER}</p>
        </div>
      </div>
    `;

    const info = await mailTransporter.sendMail({
      from: `"LeGeZt Verification Guard" <${GMAIL_USER}>`,
      to: toEmail,
      subject: `[LeGeZt] Your 6-Digit ${roleTitle} Verification Code: ${code}`,
      html: htmlTemplate,
    });

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error: any) {
    console.error("Failed to send verification email:", error);
    return {
      success: false,
      error: error?.message || String(error),
    };
  }
}

/**
 * Send Student ID Card Email with PDF/Image Attachment
 */
export async function sendStudentIdCardEmail(
  toEmail: string,
  studentName: string,
  rollNo: string,
  pdfBase64?: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const htmlTemplate = `
      <div style="font-family: Arial, sans-serif; background-color: #0284c7; color: #ffffff; padding: 30px; border-radius: 16px; max-width: 550px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h2 style="margin: 0; font-size: 24px;">🎓 LORDS INSTITUTE OF ENGINEERING & TECHNOLOGY</h2>
          <p style="font-size: 14px; opacity: 0.9;">OFFICIAL STUDENT DIGITAL ID CARD</p>
        </div>
        <div style="background-color: #ffffff; color: #0f172a; padding: 24px; border-radius: 12px;">
          <h3 style="margin-top: 0; color: #0284c7;">Welcome to LIET Campus Intranet!</h3>
          <p>Dear <strong>${studentName}</strong>,</p>
          <p>Congratulations! Your official Student Digital ID Card has been generated successfully.</p>
          <div style="background-color: #f1f5f9; padding: 14px; border-radius: 8px; margin: 16px 0; font-size: 14px;">
            <p style="margin: 4px 0;"><strong>Student Name:</strong> ${studentName}</p>
            <p style="margin: 4px 0;"><strong>Roll Number:</strong> ${rollNo}</p>
            <p style="margin: 4px 0;"><strong>Access Rights:</strong> 200m Geofenced Campus Intranet</p>
          </div>
          <p style="font-size: 13px; color: #64748b;">Your official PDF ID Card is attached to this email. You can also preview and download it anytime from the Student Portal.</p>
        </div>
      </div>
    `;

    const attachments = pdfBase64 ? [{
      filename: `Official_ID_Card_${rollNo || "Student"}.pdf`,
      content: pdfBase64.replace(/^data:application\/pdf;base64,/, ""),
      encoding: 'base64'
    }] : [];

    const info = await mailTransporter.sendMail({
      from: `"LIET Student Registrar" <${GMAIL_USER}>`,
      to: toEmail,
      subject: `🎓 [LIET Portal] Official Digital ID Card - ${studentName} (${rollNo})`,
      html: htmlTemplate,
      attachments,
    });

    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error("Failed to send ID Card email:", error);
    return { success: false, error: error?.message || String(error) };
  }
}

/**
 * Send Geofence Violation Alert Email
 */
export async function sendGeofenceAlertEmail(
  toEmail: string,
  studentName: string,
  distanceMeters: number,
  campusName = "LIET College Campus"
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const htmlTemplate = `
      <div style="font-family: Arial, sans-serif; background-color: #450a0a; color: #f8fafc; padding: 24px; border-radius: 16px; max-width: 550px; margin: 0 auto; border: 1px solid #991b1b;">
        <h2 style="color: #f87171; margin-top: 0;">🚨 GEOFENCE SECURITY VIOLATION</h2>
        <p>A location anomaly was detected for <strong>${studentName}</strong> during exam session verification.</p>

        <div style="background-color: #7f1d1d; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <p style="margin: 4px 0;"><strong>Target Campus:</strong> ${campusName} (Max 200m)</p>
          <p style="margin: 4px 0;"><strong>Recorded Distance:</strong> <span style="color: #fef08a; font-weight: bold;">${distanceMeters.toFixed(1)} meters away</span></p>
          <p style="margin: 4px 0;"><strong>Action Taken:</strong> Exam Session Locked (Geofence Guard Strike)</p>
        </div>
      </div>
    `;

    const info = await mailTransporter.sendMail({
      from: `"LeGeZt Security System" <${GMAIL_USER}>`,
      to: toEmail,
      subject: `🚨 [LeGeZt Alert] Geofence Security Violation (${distanceMeters.toFixed(0)}m Away)`,
      html: htmlTemplate,
    });

    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    return { success: false, error: error?.message || String(error) };
  }
}

/**
 * Send Exam Submission & Instant Marksheet Email
 */
export async function sendExamSubmissionEmail(
  toEmail: string,
  studentName: string,
  examTitle: string,
  score: number,
  totalMarks: number
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const percentage = ((score / totalMarks) * 100).toFixed(1);
    const htmlTemplate = `
      <div style="font-family: Arial, sans-serif; background-color: #064e3b; color: #ecfdf5; padding: 24px; border-radius: 16px; max-width: 550px; margin: 0 auto; border: 1px solid #059669;">
        <h2 style="color: #34d399; margin-top: 0;">🎉 EXAM SUBMISSION CONFIRMED</h2>
        <p>Dear <strong>${studentName}</strong>, your exam response has been securely logged and dispatched.</p>

        <div style="background-color: #047857; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <p style="margin: 4px 0;"><strong>Exam Title:</strong> ${examTitle}</p>
          <p style="margin: 4px 0;"><strong>Score Achieved:</strong> <span style="font-size: 20px; font-weight: bold; color: #a7f3d0;">${score} / ${totalMarks} (${percentage}%)</span></p>
        </div>
      </div>
    `;

    const info = await mailTransporter.sendMail({
      from: `"LeGeZt Marksheet Engine" <${GMAIL_USER}>`,
      to: toEmail,
      subject: `🎓 [LeGeZt Marksheet] ${examTitle} Score: ${score}/${totalMarks}`,
      html: htmlTemplate,
    });

    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    return { success: false, error: error?.message || String(error) };
  }
}

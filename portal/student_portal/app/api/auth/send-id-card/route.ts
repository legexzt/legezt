import { NextResponse } from "next/server";
import { sendStudentIdCardEmail } from "@/backend_core/mail_service";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { email, name, rollNo, pdfBase64 } = data;

    if (!email) {
      return NextResponse.json({ success: false, message: "Missing recipient email" }, { status: 400 });
    }

    const studentName = name || "Student";
    const studentRoll = rollNo || "2026-LIET-CS-042";

    const result = await sendStudentIdCardEmail(email, studentName, studentRoll, pdfBase64);

    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        message: `Official Student Digital ID Card dispatched to ${email}! Check your inbox.`,
        messageId: result.messageId 
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        message: `Failed to dispatch email: ${result.error}` 
      }, { status: 500 });
    }
  } catch (error: any) {
    console.error("Email Dispatch Exception:", error);
    return NextResponse.json({ 
      success: false, 
      message: error?.message || "Internal Email Server Error" 
    }, { status: 500 });
  }
}

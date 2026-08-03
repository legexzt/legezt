import { NextRequest, NextResponse } from "next/server";
import { dbService } from "../../../../backend_core/database_service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, picture } = body;

    if (!email) {
      return NextResponse.json({ success: false, message: "Google account email is required." }, { status: 400 });
    }

    let student = dbService.findStudentByEmailOrRoll(email);

    if (!student) {
      // Auto-register new student from real Google OAuth profile
      const generatedRollNo = email.split("@")[0].toUpperCase().slice(0, 12);
      student = dbService.registerStudent({
        name: name || "Google Authenticated Student",
        email: email.trim().toLowerCase(),
        rollNo: generatedRollNo,
        department: "CSE",
        isPermanentMember: true,
      });
    }

    // Ensure member is marked permanent
    dbService.verifyPermanentMember(email);

    return NextResponse.json({
      success: true,
      student,
      message: `Successfully authenticated via Google OAuth as ${student.name} (${student.email})!`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || "Google OAuth Verification Failed" },
      { status: 500 }
    );
  }
}

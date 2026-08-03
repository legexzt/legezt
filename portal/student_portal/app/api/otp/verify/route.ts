import { NextRequest, NextResponse } from "next/server";
import { apiVerifyStudentOtp } from "../../../../student_backend_api";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await apiVerifyStudentOtp(body);

    if (result.success && result.data) {
      return NextResponse.json({
        success: true,
        authenticated: true,
        student: result.data.student,
        message: result.data.message || "OTP verified successfully!",
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          authenticated: false,
          message: result.error || result.message || "OTP verification failed. Please enter correct 6-digit code.",
        },
        { status: 400 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, authenticated: false, message: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

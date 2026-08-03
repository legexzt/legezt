import { NextRequest, NextResponse } from "next/server";
import { apiVerifyStudentOtp } from "../../../../student_backend_api";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await apiVerifyStudentOtp(body);

    const isSuccess = result.success || (result.data && result.data.authenticated) || (result.message && result.message.toLowerCase().includes("validated"));

    if (isSuccess) {
      return NextResponse.json({
        success: true,
        authenticated: true,
        student: result.data?.student || null,
        message: result.data?.message || result.message || "Verification code successfully validated!",
      }, { status: 200 });
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

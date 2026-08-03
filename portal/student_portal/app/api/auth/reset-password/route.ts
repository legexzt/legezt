import { NextRequest, NextResponse } from "next/server";
import { apiRequestPasswordReset, apiConfirmPasswordReset } from "../../../../student_backend_api";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (body.action === "request") {
      const result = await apiRequestPasswordReset(body);
      return NextResponse.json(result, { status: result.code || 200 });
    } else if (body.action === "confirm") {
      const result = await apiConfirmPasswordReset(body);
      return NextResponse.json(result, { status: result.code || 200 });
    } else {
      return NextResponse.json({ success: false, message: "Invalid action specified." }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

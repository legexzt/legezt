import { NextRequest, NextResponse } from "next/server";
import { apiSubmitStudentExam } from "../../../../student_backend_api";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await apiSubmitStudentExam(body);
    return NextResponse.json(result, { status: result.code || 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

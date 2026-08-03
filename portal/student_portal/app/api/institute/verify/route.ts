import { NextRequest, NextResponse } from "next/server";
import { connectToMongoDB, verifyInstituteQuery } from "../../../../backend_core/mongodb_service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query } = body;

    // Ensure database connection
    await connectToMongoDB();

    const result = await verifyInstituteQuery(query);

    if (result.found) {
      return NextResponse.json({
        success: true,
        institute: result.institute,
        source: result.source,
        message: result.message,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: result.message,
        },
        { status: 404 }
      );
    }
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        message: err.message || "Failed to verify institute.",
      },
      { status: 500 }
    );
  }
}

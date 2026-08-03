import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const configPath = path.join(process.cwd(), "data", "layout_config.json");

export async function GET() {
  try {
    if (fs.existsSync(configPath)) {
      const data = fs.readFileSync(configPath, "utf-8");
      return NextResponse.json(JSON.parse(data));
    }
  } catch (error) {
    console.error("Failed to read layout config:", error);
  }
  return NextResponse.json({});
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const dir = path.dirname(configPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(configPath, JSON.stringify(body, null, 2), "utf-8");
    return NextResponse.json({ success: true, message: "Layout configuration saved permanently!" });
  } catch (error) {
    console.error("Failed to save layout config:", error);
    return NextResponse.json({ success: false, error: "Failed to save layout" }, { status: 500 });
  }
}

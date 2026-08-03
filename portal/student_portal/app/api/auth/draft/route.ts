import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
let client: MongoClient | null = null;

async function getClient() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  return client;
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const dbClient = await getClient();
    const db = dbClient.db("legezt_student_portal");
    const collection = db.collection("registration_drafts");

    // Upsert draft based on temporary tracking ID (we will use a device fingerprint or simple random ID from the frontend)
    const { draftId, ...draftData } = data;

    if (!draftId) {
      return NextResponse.json({ success: false, message: "No draft ID provided" }, { status: 400 });
    }

    await collection.updateOne(
      { draftId },
      { 
        $set: { 
          ...draftData, 
          lastUpdated: new Date() 
        } 
      },
      { upsert: true }
    );

    return NextResponse.json({ success: true, message: "Draft auto-saved successfully." });
  } catch (error) {
    console.error("Draft Auto-save Error:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}

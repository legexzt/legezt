import { MongoClient, Db } from "mongodb";
import { dbService, InstituteRecord } from "./database_service";
import fs from "fs";
import path from "path";

function getMongoUri(): string {
  if (process.env.MONGODB_URI) return process.env.MONGODB_URI;
  if (process.env.MONGO_URL) return process.env.MONGO_URL;

  // Search possible .env / .env.local file paths
  const envPaths = [
    path.join(process.cwd(), ".env"),
    path.join(process.cwd(), ".env.local"),
    path.join(process.cwd(), "portal", "student_portal", ".env"),
    path.join(process.cwd(), "portal", "student_portal", ".env.local"),
    path.join(process.cwd(), "tools_and_credentials", ".env"),
    path.join(process.cwd(), "tools_and_credentials", "mongodb.env"),
  ];

  for (const envPath of envPaths) {
    if (fs.existsSync(envPath)) {
      try {
        const content = fs.readFileSync(envPath, "utf-8");
        for (const line of content.split("\n")) {
          const trimmed = line.trim();
          if (trimmed.startsWith("MONGODB_URI=") || trimmed.startsWith("MONGO_URL=")) {
            const val = trimmed.split("=").slice(1).join("=").replace(/^["']|["']$/g, "").trim();
            if (val) return val;
          }
        }
      } catch (err) {
        // Skip unreadable file
      }
    }
  }

  return "mongodb://127.0.0.1:27017/legezt_portal";
}

let client: MongoClient | null = null;
let dbInstance: Db | null = null;
let isConnected = false;

export async function connectToMongoDB(): Promise<{ success: boolean; isMongo: boolean; message: string }> {
  if (isConnected && dbInstance) {
    return { success: true, isMongo: true, message: "Connected to MongoDB Cluster" };
  }

  const mongoUri = getMongoUri();

  try {
    client = new MongoClient(mongoUri, {
      serverSelectionTimeoutMS: 2000,
    });
    await client.connect();
    dbInstance = client.db();
    isConnected = true;
    console.log("✅ Successfully connected to MongoDB:", mongoUri);

    // Seed Lords Institute of Engineering and Technology into MongoDB
    const institutesCol = dbInstance.collection("institutes");
    const existingInst = await institutesCol.findOne({ code: "LIET" });
    if (!existingInst) {
      await institutesCol.insertOne({
        id: "inst-001",
        code: "LIET",
        name: "Lords Institute of Engineering and Technology",
        aliases: [
          "lords",
          "lords institute",
          "liet",
          "lords institute of engineering",
          "lords institute of engineering & technology",
          "lords institute of engineering and technology",
        ],
        city: "Hyderabad",
        state: "Telangana",
        verified: true,
        geofenceCenterLat: 17.385044,
        geofenceCenterLon: 78.486671,
        geofenceRadiusMeters: 200,
        createdAt: new Date(),
      });
      console.log("🌱 Seeded 'Lords Institute of Engineering and Technology' into MongoDB collection.");
    }

    return { success: true, isMongo: true, message: "Connected to MongoDB Cluster" };
  } catch (err: any) {
    console.warn("⚠️ MongoDB connection not available, falling back to local database store:", err.message);
    isConnected = false;
    dbInstance = null;
    return {
      success: true,
      isMongo: false,
      message: "Using JSON Database Store (Lords Institute of Engineering Seeded)",
    };
  }
}

export async function verifyInstituteQuery(query: string): Promise<{
  found: boolean;
  institute?: InstituteRecord;
  source: "mongodb" | "database_store";
  message: string;
}> {
  if (!query) {
    return { found: false, source: "database_store", message: "Please provide an Institute Name." };
  }

  const q = query.trim().toLowerCase();

  // Try MongoDB first if connected
  if (isConnected && dbInstance) {
    try {
      const col = dbInstance.collection<InstituteRecord>("institutes");
      const match = await col.findOne({
        $or: [
          { name: { $regex: q, $options: "i" } },
          { code: { $regex: `^${q}$`, $options: "i" } },
          { aliases: { $elemMatch: { $regex: q, $options: "i" } } },
        ],
      });

      if (match) {
        return {
          found: true,
          institute: {
            id: match.id,
            code: match.code,
            name: match.name,
            aliases: match.aliases,
            city: match.city,
            state: match.state,
            verified: match.verified,
            geofenceCenterLat: match.geofenceCenterLat,
            geofenceCenterLon: match.geofenceCenterLon,
            geofenceRadiusMeters: match.geofenceRadiusMeters,
            logoUrl: match.logoUrl || "/lords_crest_logo.png",
          },
          source: "mongodb",
          message: `Connected to ${match.name} via MongoDB!`,
        };
      }
    } catch (mongoErr) {
      console.warn("MongoDB query error, falling back to local store:", mongoErr);
    }
  }

  // Fallback to local JSON database store
  const localMatch = dbService.findInstituteByQuery(query);
  if (localMatch) {
    return {
      found: true,
      institute: localMatch,
      source: "database_store",
      message: `Verified ${localMatch.name} in Database Store!`,
    };
  }

  return {
    found: false,
    source: "database_store",
    message: "Institute not found in database. Try searching 'Lords Institute of Engineering' or 'LIET'.",
  };
}

import { db } from "@/db";
import { videoProfiles } from "@/db/schema";
import { NextResponse } from "next/server";
import { asc } from "drizzle-orm";

export async function GET() {
  try {
    const data = await db.query.videoProfiles.findMany({
      orderBy: [asc(videoProfiles.order)],
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching video profiles:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newItem = await db.insert(videoProfiles).values(body).returning();
    return NextResponse.json(newItem[0]);
  } catch (error) {
    console.error("Error creating video profile:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

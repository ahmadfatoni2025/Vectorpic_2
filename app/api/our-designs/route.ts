import { db } from "@/db";
import { ourDesigns } from "@/db/schema";
import { NextResponse } from "next/server";
import { asc } from "drizzle-orm";

export async function GET() {
  try {
    const data = await db.query.ourDesigns.findMany({
      orderBy: [asc(ourDesigns.order)],
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching our designs:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newItem = await db.insert(ourDesigns).values(body).returning();
    return NextResponse.json(newItem[0]);
  } catch (error) {
    console.error("Error creating our design:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

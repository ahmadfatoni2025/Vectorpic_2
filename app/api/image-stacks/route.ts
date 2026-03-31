import { db } from "@/db";
import { imageStacks } from "@/db/schema";
import { NextResponse } from "next/server";
import { asc } from "drizzle-orm";

export async function GET() {
  try {
    const data = await db.query.imageStacks.findMany({
      orderBy: [asc(imageStacks.order)],
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching image stacks:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = await db.insert(imageStacks).values(body).returning();
    return NextResponse.json(data[0]);
  } catch (error) {
    console.error("Error creating image stack:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

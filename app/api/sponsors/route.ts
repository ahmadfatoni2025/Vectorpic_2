import { db } from "@/db";
import { sponsors } from "@/db/schema";
import { NextResponse } from "next/server";
import { asc } from "drizzle-orm";

export async function GET() {
  try {
    const data = await db.query.sponsors.findMany({
      orderBy: [asc(sponsors.order)],
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching sponsors:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = await db.insert(sponsors).values(body).returning();
    return NextResponse.json(data[0]);
  } catch (error) {
    console.error("Error creating sponsor:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

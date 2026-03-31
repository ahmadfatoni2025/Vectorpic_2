import { db } from "@/db";
import { statistics } from "@/db/schema";
import { NextResponse } from "next/server";
import { asc } from "drizzle-orm";

export async function GET() {
  try {
    const data = await db.query.statistics.findMany({
      orderBy: [asc(statistics.order)],
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching statistics:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const [newStat] = await db.insert(statistics).values({
      label: body.label,
      value: body.value,
      suffix: body.suffix,
      order: body.order || 0,
    }).returning();
    return NextResponse.json(newStat);
  } catch (error) {
    console.error("Error creating statistic:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

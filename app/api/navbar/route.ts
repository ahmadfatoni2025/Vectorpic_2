import { db } from "@/db";
import { navbarItems } from "@/db/schema";
import { NextResponse } from "next/server";
import { asc } from "drizzle-orm";

export async function GET() {
  try {
    const data = await db.query.navbarItems.findMany({
      orderBy: [asc(navbarItems.order)],
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching navbar items:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

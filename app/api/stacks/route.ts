import { db } from "@/db";
import { imageStacks as stacks } from "@/db/schema";
import { NextResponse } from "next/server";
import { asc } from "drizzle-orm";

export async function GET() {
  try {
    const data = await db.select().from(stacks).orderBy(asc(stacks.order));
    return NextResponse.json(data);
  } catch (error) {

    console.error("Error fetching stacks:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    if (!body.label || !body.imageUrl) {
      return NextResponse.json({ error: "Label and Image URL are required" }, { status: 400 });
    }

    const data = await db.insert(stacks).values({
        label: body.label,
        imageUrl: body.imageUrl,
        order: body.order || 0
    }).returning();
    return NextResponse.json(data[0]);
  } catch (error: any) {
    console.error("Error creating stack:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}


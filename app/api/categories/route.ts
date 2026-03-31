import { db } from "@/db";
import { categories } from "@/db/schema";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await db.select().from(categories);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error fetching categories:", error.message);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const [newCategory] = await db.insert(categories).values({
      name: body.name,
      slug: body.slug || body.name.toLowerCase().replace(/ /g, '-'),
    }).returning();
    return NextResponse.json(newCategory);
  } catch (error: any) {
    console.error("Error creating category:", error.message);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}

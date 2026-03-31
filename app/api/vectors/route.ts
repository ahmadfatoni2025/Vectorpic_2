import { db } from "@/db";
import { vectors, categories } from "@/db/schema";
import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";

export async function GET() {
  try {
    console.log("API: Fetching vectors...");
    
    // Simplest query without 'db.query' to test 500 error
    const data = await db
      .select({
        id: vectors.id,
        title: vectors.title,
        description: vectors.description,
        imageUrl: vectors.imageUrl,
        isPremium: vectors.isPremium,
        createdAt: vectors.createdAt,
        categoryName: categories.name,
      })
      .from(vectors)
      .leftJoin(categories, eq(vectors.categoryId, categories.id))
      .orderBy(desc(vectors.createdAt));

    // Map to expected format
    const results = data.map(item => ({
      ...item,
      category: item.categoryName ? { name: item.categoryName } : null
    }));

    return NextResponse.json(results);
  } catch (error: any) {
    console.error("CRITICAL API ERROR /api/vectors:", error.message || error);
    return NextResponse.json({ 
      error: "Internal Server Error", 
      details: error.message || "Unknown error" 
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("API: Creating new vector...", body.title);
    
    const [newVector] = await db.insert(vectors).values({
      title: body.title,
      description: body.description,
      imageUrl: body.imageUrl,
      thumbnailUrl: body.thumbnailUrl || body.imageUrl,
      categoryId: body.categoryId,
      authorId: body.authorId,
      isPremium: body.isPremium || false,
      price: body.price || 0,
    }).returning();
    
    return NextResponse.json(newVector);
  } catch (error: any) {
    console.error("CRITICAL API ERROR POST /api/vectors:", error.message || error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}

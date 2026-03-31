import { db } from "@/db";
import { vectors } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const [updatedVector] = await db
      .update(vectors)
      .set({
        title: body.title,
        description: body.description,
        imageUrl: body.imageUrl,
        thumbnailUrl: body.thumbnailUrl || body.imageUrl,
        categoryId: body.categoryId,
        authorId: body.authorId,
        isPremium: body.isPremium,
        price: body.price,
        tags: body.tags,
        updatedAt: new Date(),
      })
      .where(eq(vectors.id, id))
      .returning();
    return NextResponse.json(updatedVector);
  } catch (error) {
    console.error("Error updating vector:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.delete(vectors).where(eq(vectors.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting vector:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

import { db } from "@/db";
import { discussions, discussionImages } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await db.query.discussions.findFirst({
      where: eq(discussions.id, id),
      with: {
        author: true,
        images: true,
      },
    });
    return NextResponse.json(data || { error: "Discussion not found" }, { status: data ? 200 : 404 });
  } catch (error) {
    console.error("Error fetching discussion:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { title, description, category, visibility } = await req.json();

    const data = await db.update(discussions)
      .set({ title, description, category, visibility, updatedAt: new Date() })
      .where(eq(discussions.id, id))
      .returning();

    return NextResponse.json(data[0] || { error: "Update failed" });
  } catch (error) {
    console.error("Error updating discussion:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    
    // First, delete related images (cascade should also work if set in DB, but manually to be safe)
    await db.delete(discussionImages).where(eq(discussionImages.discussionId, id));

    const result = await db.delete(discussions).where(eq(discussions.id, id)).returning();
    
    return NextResponse.json({ success: true, deleted: result[0] });
  } catch (error) {
    console.error("Error deleting discussion:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

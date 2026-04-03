import { db } from "@/db";
import { videoProfiles } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: rawId } = await params;
    const id = parseInt(rawId);
    if (isNaN(id)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

    const body = await req.json();
    const updateData: any = {};
    const allowedFields = ['tab', 'highlight', 'subtext', 'quote', 'author', 'role', 'image', 'videoId', 'bgColor', 'order'];
    
    allowedFields.forEach(field => {
      if (body[field] !== undefined) {
        if (field === 'order') updateData[field] = parseInt(body[field].toString());
        else updateData[field] = body[field];
      }
    });

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: "No changes provided" }, { status: 400 });
    }

    const updated = await db
      .update(videoProfiles)
      .set(updateData)
      .where(eq(videoProfiles.id, id))
      .returning();
    
    if (!updated.length) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }
    
    return NextResponse.json(updated[0]);
  } catch (error) {
    console.error("Error updating video profile:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: rawId } = await params;
    const id = parseInt(rawId);
    await db.delete(videoProfiles).where(eq(videoProfiles.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting video profile:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

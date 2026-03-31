import { db } from "@/db";
import { videoProfiles } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await req.json();
    const updated = await db
      .update(videoProfiles)
      .set(body)
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
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    await db.delete(videoProfiles).where(eq(videoProfiles.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting video profile:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

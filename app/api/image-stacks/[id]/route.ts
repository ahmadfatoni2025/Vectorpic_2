import { db } from "@/db";
import { imageStacks } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: rawId } = await params;
    const id = parseInt(rawId);
    const body = await req.json();
    const data = await db.update(imageStacks).set(body).where(eq(imageStacks.id, id)).returning();
    return NextResponse.json(data[0] || {});
  } catch (error) {
    console.error("Error updating image stack:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: rawId } = await params;
    const id = parseInt(rawId);
    await db.delete(imageStacks).where(eq(imageStacks.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting image stack:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

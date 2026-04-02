import { db } from "@/db";
import { imageStacks as stacks } from "@/db/schema";

import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: rawId } = await params;
    const id = parseInt(rawId);
    const body = await req.json();
    
    const updated = await db.update(stacks).set(body).where(eq(stacks.id, id)).returning();
    if (updated.length === 0) {
        return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }
    return NextResponse.json(updated[0]);
  } catch (error: any) {
    console.error("Error updating stack:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: rawId } = await params;
    const id = parseInt(rawId);
    await db.delete(stacks).where(eq(stacks.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting stack:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

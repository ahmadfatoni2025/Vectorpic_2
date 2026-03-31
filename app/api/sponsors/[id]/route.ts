import { db } from "@/db";
import { sponsors } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    const body = await req.json();
    const data = await db.update(sponsors).set(body).where(eq(sponsors.id, id)).returning();
    return NextResponse.json(data[0] || {});
  } catch (error) {
    console.error("Error updating sponsor:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    await db.delete(sponsors).where(eq(sponsors.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting sponsor:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

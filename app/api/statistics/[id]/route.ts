import { db } from "@/db";
import { statistics } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const [updatedStat] = await db
      .update(statistics)
      .set({
        label: body.label,
        value: body.value,
        suffix: body.suffix,
        order: body.order,
      })
      .where(eq(statistics.id, Number(id)))
      .returning();
    return NextResponse.json(updatedStat);
  } catch (error) {
    console.error("Error updating statistic:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.delete(statistics).where(eq(statistics.id, Number(id)));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting statistic:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

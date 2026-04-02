import { db } from "@/db";
import { discussionReactions, discussions } from "@/db/schema";
import { eq, and, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

// POST /api/discussions/[id]/reactions - Toggle a reaction
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { reactionType, sessionId } = body;

    if (!reactionType || !sessionId) {
      return NextResponse.json({ error: "reactionType and sessionId are required" }, { status: 400 });
    }

    // Check if this session already reacted with this type
    const existing = await db.query.discussionReactions.findFirst({
      where: and(
        eq(discussionReactions.discussionId, id),
        eq(discussionReactions.userId, sessionId),
        eq(discussionReactions.reactionType, reactionType)
      ),
    });

    if (existing) {
      // Remove the reaction (toggle off)
      await db.delete(discussionReactions).where(eq(discussionReactions.id, existing.id));
      
      if (reactionType === 'like') {
        await db.update(discussions)
          .set({ likesCount: sql`GREATEST(${discussions.likesCount} - 1, 0)` })
          .where(eq(discussions.id, id));
      }

      return NextResponse.json({ action: 'removed', reactionType });
    } else {
      // Add the reaction
      await db.insert(discussionReactions).values({
        discussionId: id,
        userId: sessionId,
        reactionType,
      });

      if (reactionType === 'like') {
        await db.update(discussions)
          .set({ likesCount: sql`${discussions.likesCount} + 1` })
          .where(eq(discussions.id, id));
      }

      return NextResponse.json({ action: 'added', reactionType });
    }
  } catch (error) {
    console.error("Error toggling reaction:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

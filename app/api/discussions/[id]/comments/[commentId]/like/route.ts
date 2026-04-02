import { db } from "@/db";
import { commentLikes, discussionComments } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";

// POST /api/discussions/[id]/comments/[commentId]/like - Toggle like on a comment
export async function POST(req: Request, { params }: { params: Promise<{ id: string; commentId: string }> }) {
  try {
    const { commentId } = await params;
    const body = await req.json();
    const { sessionId } = body;

    if (!sessionId) {
      return NextResponse.json({ error: "sessionId is required" }, { status: 400 });
    }

    const commentIdNum = parseInt(commentId);

    // Check if already liked
    const existing = await db.query.commentLikes.findFirst({
      where: and(
        eq(commentLikes.commentId, commentIdNum),
        eq(commentLikes.guestSessionId, sessionId)
      ),
    });

    if (existing) {
      // Unlike
      await db.delete(commentLikes).where(eq(commentLikes.id, existing.id));
      return NextResponse.json({ action: 'unliked' });
    } else {
      // Like
      await db.insert(commentLikes).values({
        commentId: commentIdNum,
        guestSessionId: sessionId,
      });
      return NextResponse.json({ action: 'liked' });
    }
  } catch (error) {
    console.error("Error toggling comment like:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

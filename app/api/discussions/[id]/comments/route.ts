import { db } from "@/db";
import { discussionComments, discussions } from "@/db/schema";
import { eq, desc, asc, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

// GET /api/discussions/[id]/comments - Get all comments for a discussion
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await db.query.discussionComments.findMany({
      where: eq(discussionComments.discussionId, id),
      orderBy: [asc(discussionComments.createdAt)],
      with: {
        author: true,
        likes: true,
      },
    });

    // Map to include likesCount
    const mapped = data.map((c: any) => ({
      ...c,
      likesCount: c.likes?.length || 0,
    }));

    return NextResponse.json(mapped);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST /api/discussions/[id]/comments - Add a comment to a discussion
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { content, authorName, sessionId } = body;

    if (!content) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    let authorId = body.authorId || null;

    const [comment] = await db.insert(discussionComments).values({
      discussionId: id,
      content,
      authorId: authorId,
      guestSessionId: sessionId || null,
      guestName: authorName || 'Guest',
    }).returning();

    // Update the comments count on the discussion
    await db.update(discussions)
      .set({ commentsCount: sql`${discussions.commentsCount} + 1` })
      .where(eq(discussions.id, id));

    return NextResponse.json(comment);
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

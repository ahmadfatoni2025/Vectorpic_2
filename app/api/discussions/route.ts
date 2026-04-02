import { db } from "@/db";
import { discussions, discussionImages } from "@/db/schema";
import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const data = await db.query.discussions.findMany({
      orderBy: [desc(discussions.createdAt)],
      with: {
        author: true,
        images: true,
      },
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching discussions:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, category, visibility, authorId, images } = body;

    if (!title || !description || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Start a transaction to ensure both discussion and images are saved
    const result = await db.transaction(async (tx) => {
      const [newDiscussion] = await tx.insert(discussions).values({
        title,
        description,
        category,
        visibility: visibility || "Public",
        authorId: authorId, // Can be null if not logged in
      }).returning();

      if (images && Array.isArray(images) && images.length > 0) {
        await tx.insert(discussionImages).values(
          images.map((url: string) => ({
            discussionId: newDiscussion.id,
            imageUrl: url,
          }))
        );
      }
      return newDiscussion;
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error creating discussion:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

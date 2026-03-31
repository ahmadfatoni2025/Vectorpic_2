import { db } from "@/db";
import { contactSubmissions } from "@/db/schema";
import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const data = await db.query.contactSubmissions.findMany({
      orderBy: [desc(contactSubmissions.createdAt)],
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching contact submissions:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, subject, message } = body;

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const [submission] = await db.insert(contactSubmissions).values({
      firstName,
      lastName,
      email,
      phone,
      subject,
      message,
    }).returning();

    return NextResponse.json(submission);
  } catch (error) {
    console.error("Error creating contact submission:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

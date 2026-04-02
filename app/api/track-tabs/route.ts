import { NextResponse } from 'next/server';
import { db } from '../../../db';
import { trackTabs } from '../../../db/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const data = await db.query.trackTabs.findMany();
    // Parse json
    const parsedData = data.map(item => ({
       ...item,
       data: JSON.parse(item.data)
    }));
    return NextResponse.json(parsedData);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tabId, data } = body;
    
    if (!tabId || !data) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

    const existing = await db.query.trackTabs.findFirst({
      where: eq(trackTabs.tabId, tabId)
    });

    if (existing) {
      await db.update(trackTabs)
        .set({ data: JSON.stringify(data), updatedAt: new Date() })
        .where(eq(trackTabs.tabId, tabId));
    } else {
      await db.insert(trackTabs).values({ tabId, data: JSON.stringify(data) });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}

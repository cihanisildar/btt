import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Topic from '@/models/Topic';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    // cursor-based pagination: pass ?limit=20&cursor=<ISO-date>
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 50);
    const cursor = searchParams.get('cursor');

    const query: any = {};
    if (cursor) {
      const cursorDate = new Date(cursor);
      if (!isNaN(cursorDate.getTime())) {
        // older than cursor (createdAt less than cursor gives older results)
        query.createdAt = { $lt: cursorDate };
      }
    }

    const docs = await Topic.find(query)
      .sort({ createdAt: -1 })
      .limit(limit + 1)
      .lean();

    let nextCursor = null;
    let topics = docs;
    if (docs.length > limit) {
      const next = docs[limit];
      nextCursor = next.createdAt.toISOString();
      topics = docs.slice(0, limit);
    }

    return NextResponse.json({ topics, nextCursor });
  } catch (error) {
    console.error('Error fetching topics:', error);
    return NextResponse.json({ error: 'Konular getirilemedi' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { title, description } = body;

    if (!title || title.trim().length === 0) {
      return NextResponse.json({ error: 'Başlık gerekli' }, { status: 400 });
    }

    const topic = new Topic({ title: title.trim(), description: description?.trim() });
    await topic.save();

    return NextResponse.json(topic, { status: 201 });
  } catch (error) {
    console.error('Error creating topic:', error);
    return NextResponse.json({ error: 'Konu oluşturulamadı' }, { status: 500 });
  }
}

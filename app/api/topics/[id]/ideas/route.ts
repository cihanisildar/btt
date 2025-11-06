import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Idea from '@/models/Idea';
import Topic from '@/models/Topic';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const url = new URL(request.url);
    const parts = url.pathname.split('/').filter(Boolean);
    const topicId = parts[parts.indexOf('topics') + 1];

    if (!topicId) return NextResponse.json({ error: 'Topic id missing' }, { status: 400 });

    const ideas = await Idea.find({ topic: topicId }).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ ideas });
  } catch (error) {
    console.error('Error fetching ideas:', error);
    return NextResponse.json({ error: 'Fikirler getirilemedi' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const url = new URL(request.url);
    const parts = url.pathname.split('/').filter(Boolean);
    const topicId = parts[parts.indexOf('topics') + 1];

    if (!topicId) return NextResponse.json({ error: 'Topic id missing' }, { status: 400 });

    const body = await request.json();
    const { content, author } = body;

    if (!content || content.trim().length === 0) {
      return NextResponse.json({ error: 'İçerik gerekli' }, { status: 400 });
    }

    const topic = await Topic.findById(topicId);
    if (!topic) return NextResponse.json({ error: 'Konu bulunamadı' }, { status: 404 });

    const idea = new Idea({ topic: topicId, content: content.trim(), author: author?.trim() });
    await idea.save();

    return NextResponse.json(idea, { status: 201 });
  } catch (error) {
    console.error('Error creating idea:', error);
    return NextResponse.json({ error: 'Fikir oluşturulamadı' }, { status: 500 });
  }
}

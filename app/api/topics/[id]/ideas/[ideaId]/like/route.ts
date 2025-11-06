import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Idea from '@/models/Idea';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const url = new URL(request.url);
    const parts = url.pathname.split('/').filter(Boolean);
    // path parts: ['api','topics','<id>','ideas','<ideaId>','like']
    const topicIdx = parts.indexOf('topics');
    const ideaIdx = parts.indexOf('ideas');
    const topicId = parts[topicIdx + 1];
    const ideaId = parts[ideaIdx + 1];

    if (!topicId || !ideaId) return NextResponse.json({ error: 'Missing ids' }, { status: 400 });

    const idea = await Idea.findById(ideaId);
    if (!idea) return NextResponse.json({ error: 'Idea not found' }, { status: 404 });

    idea.likes = (idea.likes || 0) + 1;
    await idea.save();

    return NextResponse.json({ likes: idea.likes });
  } catch (error) {
    console.error('Error liking idea:', error);
    return NextResponse.json({ error: 'Could not like idea' }, { status: 500 });
  }
}

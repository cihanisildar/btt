import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Topic from '@/models/Topic';

interface Params {
  params: {
    id: string;
  };
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    await connectDB();

    const topic = await Topic.findById(params.id).populate('ideas');

    if (!topic) {
      return NextResponse.json(
        { error: 'Konu bulunamadı' },
        { status: 404 }
      );
    }

    return NextResponse.json(topic);
  } catch (error) {
    console.error(`GET /api/topics/${params.id} error:`, error);
    return NextResponse.json(
      { error: 'Konu yüklenirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const body = await req.json();
    const { title, description, author } = body;

    await connectDB();

    const topic = await Topic.findByIdAndUpdate(
      params.id,
      { title, description, author },
      { new: true }
    );

    if (!topic) {
      return NextResponse.json(
        { error: 'Konu bulunamadı' },
        { status: 404 }
      );
    }

    return NextResponse.json(topic);
  } catch (error) {
    console.error(`PUT /api/topics/${params.id} error:`, error);
    return NextResponse.json(
      { error: 'Konu güncellenirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    await connectDB();

    const topic = await Topic.findByIdAndDelete(params.id);

    if (!topic) {
      return NextResponse.json(
        { error: 'Konu bulunamadı' },
        { status: 404 }
      );
    }

    // Konuya ait tüm fikirleri de silmek için Idea modelini temizleyin

    return NextResponse.json({ message: 'Konu başarıyla silindi' });
  } catch (error) {
    console.error(`DELETE /api/topics/${params.id} error:`, error);
    return NextResponse.json(
      { error: 'Konu silinirken bir hata oluştu' },
      { status: 500 }
    );
  }
}
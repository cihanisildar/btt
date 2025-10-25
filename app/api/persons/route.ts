import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Person from '@/models/Person';

// GET - Tüm kişileri listele
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    let query = {};
    if (search) {
      query = {
        $or: [
          { ad: { $regex: search, $options: 'i' } },
          { soyad: { $regex: search, $options: 'i' } },
          { tcKimlikNo: { $regex: search, $options: 'i' } }
        ]
      };
    }

    const persons = await Person.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Person.countDocuments(query);

    return NextResponse.json({
      persons,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching persons:', error);
    return NextResponse.json(
      { error: 'Kişiler getirilemedi' },
      { status: 500 }
    );
  }
}

// POST - Yeni kişi ekle
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { tcKimlikNo, ad, soyad, kanGrubu } = body;

    // TC Kimlik No kontrolü
    const existingPerson = await Person.findOne({ tcKimlikNo });
    if (existingPerson) {
      return NextResponse.json(
        { error: 'Bu TC Kimlik No ile kayıtlı kişi zaten mevcut' },
        { status: 400 }
      );
    }

    const person = new Person({
      tcKimlikNo,
      ad,
      soyad,
      kanGrubu
    });

    await person.save();

    return NextResponse.json(person, { status: 201 });
  } catch (error: any) {
    console.error('Error creating person:', error);
    
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: 'Geçersiz veri: ' + Object.values(error.errors).map((e: any) => e.message).join(', ') },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Kişi oluşturulamadı' },
      { status: 500 }
    );
  }
}

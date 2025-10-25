import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Person from '@/models/Person';

// GET - Tek kişi getir
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const person = await Person.findById(params.id);
    
    if (!person) {
      return NextResponse.json(
        { error: 'Kişi bulunamadı' },
        { status: 404 }
      );
    }

    return NextResponse.json(person);
  } catch (error) {
    console.error('Error fetching person:', error);
    return NextResponse.json(
      { error: 'Kişi getirilemedi' },
      { status: 500 }
    );
  }
}

// PUT - Kişi güncelle
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { tcKimlikNo, ad, soyad, kanGrubu } = body;

    // TC Kimlik No kontrolü (kendisi hariç)
    const existingPerson = await Person.findOne({ 
      tcKimlikNo, 
      _id: { $ne: params.id } 
    });
    
    if (existingPerson) {
      return NextResponse.json(
        { error: 'Bu TC Kimlik No ile kayıtlı başka bir kişi zaten mevcut' },
        { status: 400 }
      );
    }

    const person = await Person.findByIdAndUpdate(
      params.id,
      { tcKimlikNo, ad, soyad, kanGrubu },
      { new: true, runValidators: true }
    );

    if (!person) {
      return NextResponse.json(
        { error: 'Kişi bulunamadı' },
        { status: 404 }
      );
    }

    return NextResponse.json(person);
  } catch (error: any) {
    console.error('Error updating person:', error);
    
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: 'Geçersiz veri: ' + Object.values(error.errors).map((e: any) => e.message).join(', ') },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Kişi güncellenemedi' },
      { status: 500 }
    );
  }
}

// DELETE - Kişi sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const person = await Person.findByIdAndDelete(params.id);
    
    if (!person) {
      return NextResponse.json(
        { error: 'Kişi bulunamadı' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Kişi başarıyla silindi' });
  } catch (error) {
    console.error('Error deleting person:', error);
    return NextResponse.json(
      { error: 'Kişi silinemedi' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Person from '@/models/Person';
import QRCode from 'qrcode';

// GET - Kişi için QR kod oluştur
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

    // QR kod için veri oluştur
    const qrData = {
      tcKimlikNo: person.tcKimlikNo,
      ad: person.ad,
      soyad: person.soyad,
      kanGrubu: person.kanGrubu,
      timestamp: new Date().toISOString()
    };

    // QR kod oluştur
    const qrCodeDataURL = await QRCode.toDataURL(JSON.stringify(qrData), {
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });

    return NextResponse.json({
      qrCode: qrCodeDataURL,
      person: person,
      data: qrData
    });
  } catch (error) {
    console.error('Error generating QR code:', error);
    return NextResponse.json(
      { error: 'QR kod oluşturulamadı' },
      { status: 500 }
    );
  }
}

# Kan Grubu Yönetim Sistemi

Kişilerin kan grubu verilerini tutan, sorgulayabilen ve QR kod ile gösterebilen modern bir web uygulaması.

## Özellikler

- ✅ Kişi kayıt sistemi (TC Kimlik No, Ad, Soyad, Kan Grubu)
- ✅ CRUD işlemleri (Ekleme, Listeleme, Güncelleme, Silme)
- ✅ Gelişmiş arama ve filtreleme
- ✅ QR kod oluşturma ve indirme
- ✅ Modern ve responsive tasarım
- ✅ MongoDB Atlas entegrasyonu
- ✅ TypeScript desteği

## Teknolojiler

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB Atlas
- **QR Code**: qrcode library
- **Icons**: Lucide React

## Kurulum

### 1. Projeyi klonlayın

```bash
git clone <repository-url>
cd btt_qr
```

### 2. Bağımlılıkları yükleyin

```bash
npm install
```

### 3. MongoDB Atlas Kurulumu

1. [MongoDB Atlas](https://cloud.mongodb.com/) hesabı oluşturun
2. Yeni bir cluster oluşturun (ücretsiz tier kullanabilirsiniz)
3. Database Access bölümünden yeni bir kullanıcı oluşturun
4. Network Access bölümünden IP adresinizi ekleyin (0.0.0.0/0 tüm IP'ler için)
5. Cluster'ınıza bağlanmak için connection string'i alın

### 4. Ortam değişkenlerini ayarlayın

`.env.local` dosyası oluşturun:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority
NEXTAUTH_URL=http://localhost:3000
```

**Önemli**: `<username>`, `<password>`, `<cluster-url>` ve `<database-name>` değerlerini kendi MongoDB Atlas bilgilerinizle değiştirin.

### 5. Uygulamayı çalıştırın

```bash
npm run dev
```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde çalışacaktır.

## Kullanım

### Kişi Ekleme
1. Ana sayfada "Yeni Kişi" butonuna tıklayın
2. TC Kimlik No, Ad, Soyad ve Kan Grubu bilgilerini girin
3. "Kaydet" butonuna tıklayın

### Kişi Arama
- Arama çubuğunu kullanarak ad, soyad veya TC kimlik no ile arama yapabilirsiniz

### QR Kod Oluşturma
1. Herhangi bir kişinin kartında "QR Kod" butonuna tıklayın
2. QR kod otomatik olarak oluşturulacak ve gösterilecektir
3. "QR Kodu İndir" butonu ile QR kodu bilgisayarınıza indirebilirsiniz

### Kişi Düzenleme
1. Kişi kartında "Düzenle" butonuna tıklayın
2. Bilgileri güncelleyin
3. "Kaydet" butonuna tıklayın

### Kişi Silme
1. Kişi kartında "Sil" butonuna tıklayın
2. Onay verin

## Proje Yapısı

```
btt_qr/
├── app/
│   ├── api/
│   │   └── persons/
│   │       ├── route.ts          # GET, POST endpoints
│   │       └── [id]/
│   │           ├── route.ts      # GET, PUT, DELETE endpoints
│   │           └── qr/
│   │               └── route.ts  # QR kod oluşturma
│   ├── globals.css               # Global stiller
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Ana sayfa
├── components/
│   ├── PersonCard.tsx            # Kişi kartı bileşeni
│   ├── PersonForm.tsx            # Kişi formu bileşeni
│   ├── QRModal.tsx               # QR kod modal'ı
│   └── SearchBar.tsx             # Arama çubuğu
├── lib/
│   └── mongodb.ts                # MongoDB bağlantısı
├── models/
│   └── Person.ts                 # Person modeli
└── package.json
```

## API Endpoints

### Kişiler
- `GET /api/persons` - Tüm kişileri listele (sayfalama ve arama desteği)
- `POST /api/persons` - Yeni kişi ekle
- `GET /api/persons/[id]` - Tek kişi getir
- `PUT /api/persons/[id]` - Kişi güncelle
- `DELETE /api/persons/[id]` - Kişi sil

### QR Kod
- `GET /api/persons/[id]/qr` - Kişi için QR kod oluştur

## Veri Modeli

```typescript
interface Person {
  _id: string;
  tcKimlikNo: string;    // 11 haneli, benzersiz
  ad: string;           // 2-50 karakter
  soyad: string;        // 2-50 karakter
  kanGrubu: string;     // A+, A-, B+, B-, AB+, AB-, 0+, 0-
  createdAt: Date;
  updatedAt: Date;
}
```

## Güvenlik

- TC Kimlik No benzersizlik kontrolü
- Form validasyonu
- MongoDB injection koruması
- CORS ayarları

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

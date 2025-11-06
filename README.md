Be1yin F1rt1nas1

Basit, Next.js + MongoDB tabanl1 bir "Beyin F1rt1nas1" uygulamas1. Kullan1c1lar konu (topic) olu1turup, her konu alt1nda fikir (idea) payla1abilir.

Bu repo 159zerinde geli1tirme `beyin-firtinasi` branch'inde yap1lmaktad1r.

## Canl1 0nizleme

Projeyi Vercel'e deploy etti1inizde buraya canl1 URL ekleyebilirsiniz. (Ben deploy i11lemini sizin Vercel hesab1n1za eri11meden yapamam — isterseniz ad1m ad1m y1nlendirme yapabilirim.)

## Hzzl1 ba1sltma (lokal)

1. Repo'yu klonlay1n ve `beyin-firtinasi` branch'ine ge11in:

```powershell
git clone https://github.com/cihanisildar/btt.git
cd btt
git checkout beyin-firtinasi
```

2. Ba1ml1l1klar1 y1kle1n:

```powershell
npm install
```

3. `.env.local` olu1turun ve MongoDB ba1lant1 dizesini ekleyin:

```
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/beyinfirtinasi?retryWrites=true&w=majority
```

Yerel Mongo ile 11111almak isterseniz Docker 111111r11le h1z1ca ba1latabilirsiniz:

```powershell
docker run -d -p 27017:27017 --name mongodb mongo:6.0
# sonra .env.local:
MONGODB_URI=mongodb://localhost:27017/beyinfirtinasi
```

4. Geli1tirme sunucusunu ba1lat1n:

```powershell
npm run dev
```

Taray1c1da: http://localhost:3000 (ana sayfa) ve http://localhost:3000/topics (konular)

## 0zellikler (eklenenler)

- Konular olu1turma / listeleme
- Her konu i1n fikir ekleme ve listeleme
- Basit, mobile-first UI (Tailwind CSS)

## Vercel'e deploy

1. Vercel hesab1n1za giri1 yap1n.
2. Import Project 1 GitHub 1 `cihanisildar/btt` repo'sunu se1in.
3. Production branch olarak `beyin-firtinasi` se1in (veya main isterseniz merge edin).
4. Project settings 1 Environment Variables k1sm1na `MONGODB_URI` ekleyin.
5. Deploy edin; deploy tamamland1111nda Vercel size bir canl1 URL verecek.

## Geli1tirme notlar1

- `lib/mongodb.ts` dosyas1 ba1lant1 dizesini `.env.local` i1inden okuyor. Placeholder de1erler b1rak1lm11sa uygulama ba1lang11111nda hata verecektir — l1tfen ger1ek URI girin.
- UI iyile1tirmeleri: global header, ana sayfa hero, konular sayfas1 ve konu detay sayfas1 eklendi.

## Sonraki ad1mlar (0neriler)

- Kullan1c1 kimlik do1rulama (NextAuth) eklemek
- Konulara be1eni, s1ralama, etiketleme eklemek
- Ger1ek zamanl1 g1ncelllemeler i1n WebSocket / Pusher / Realtime DB

## Branchler

- `main` — ana branch
- `beyin-firtinasi` — geli1tirme branch'i (11u anki de1i1iklikler burada)

---

Haz1r olduğunuzda Vercel deploy ad1mlar1nda yard1mc1 olay1m veya isterseniz ben repo üzerinde ekstra iyile1tirmeler yap1p tekrar push edeyim.

# TeamBoard — Next.js + Netlify Starter

Bu repo Next.js + Prisma ile yazılmış, Netlify üzerinde çalışacak minimal ama premium görünümlü bir team board starter'ıdır.

Özellikler:
- NextAuth: GitHub, Google, Email (magic link)
- Prisma + PostgreSQL (migrations hazır)
- Drag & drop board (react-beautiful-dnd)
- TailwindCSS UI

Kurulum (local):
1. Kopyala / unzip:
   - Dosyaları bir klasöre kaydet.
2. .env ayarları:
   - .env.example'i kopyala -> .env ve değiştir.
3. Paketleri yükle:
   - npm ci
4. Prisma:
   - npx prisma generate
   - npx prisma migrate dev --name init
5. Dev:
   - npm run dev
6. Netlify deploy:
   - Netlify'de site oluştur, repository bağla veya manuel deploy; netlify.toml eklidir.

NOT: NextAuth için GITHUB/GOOGLE client id/secret ve SMTP bilgilerini .env'e eklemeyi unutmayın.

İlerleme:
- İstersen DB seed, daha iyi order yönetimi, gerçek-time (websocket veya realtime DB) ve daha fazla premium UI (animations, subtle shadows, micro-interactions) eklerim.

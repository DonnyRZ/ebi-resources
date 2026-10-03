# Audit mobile EBI Resources

Tanggal: 3 Oktober 2026

## Referensi Hadith Hotel 2

Audit sumber: `hadith-hotel-2/web/src/components/HeroMedia.tsx`,
`HeroCarousel.tsx`, `PageHeroCarousel.tsx`, `SiteHeader.tsx`, serta aturan mobile
di `src/app/globals.css`.

Metode hero mobile Hadith yang diterapkan ke EBI:

- Gambar memenuhi lebar layar dengan **aspect-ratio 4 / 3**.
- Tinggi mengikuti lebar gambar: `height: auto`, `min-height: 0`, tanpa tinggi minimum berbasis viewport.
- Hero menjadi `position: relative` pada mobile, sehingga tidak sticky.
- Focal point mobile dapat diatur tersendiri melalui variabel posisi gambar.
- Navigasi media tetap berada pada foto; gambar dan konten tidak bersaing untuk ruang yang sempit.

Pemeriksaan browser referensi mencakup Home, Suites & Rooms, Cafe & Dining,
Meetings & Weddings, Experience, News, dan Gallery dalam bahasa Inggris pada
lebar 320, 390, dan 430 px: **21 kombinasi**, tanpa overflow horizontal.
Semua hero yang diperiksa memiliki rasio tepat 4:3: tinggi 240, 292.5, dan
322.5 px. Hadith digunakan sebagai referensi; sumber proyek Hadith tidak diedit.

Pada server lokal Hadith, endpoint unduhan company profile dan visitor tracking
mengembalikan 503. Temuan tersebut terpisah dari layout mobile dan tidak diubah
dalam pekerjaan responsive EBI ini.

## Masalah yang ditemukan di EBI

1. Hero masih mengikuti hampir seluruh tinggi viewport pada ponsel. Foto landscape
   terpotong terlalu jauh, dan teks harus berbagi ruang dengan kontrol carousel.
2. Header mobile menampilkan tiga bahasa sejajar dan logo tidak mendapat posisi
   tengah yang tetap. Tombol menu belum memiliki area sentuh yang memadai.
3. Card portfolio About masih menutupi foto pada layar kecil. Font card kecil dan
   indikator beberapa carousel hanya setinggi 3 px sebagai area klik.
4. Subnav membungkus ke beberapa baris; tinggi dan posisi hero berubah menurut
   bahasa. Kategori aktif pada tautan langsung dapat berada di luar area yang terlihat.
5. Kontrol carousel Hotels melebar pada layar 320/360 px. Token spacing proyek
   memiliki nilai khusus: `w-8` adalah 96 px, bukan 32 px.
6. Grid Travel dan Technology memakai `md:gap-8`, yaitu jarak 96 px antar kolom.
   Sebelas jarak dalam grid 12 kolom sudah melampaui lebar tablet.
7. Ukuran teks input 15 px belum ditimpa oleh selector CSS mobile yang lebih lemah.
8. Skeleton loading masih memakai geometri hero lama, dan Careers masih menampilkan
   skeleton hero foto yang sudah dihapus dari halaman sebenarnya.

## Implementasi

- Hero mobile menggunakan stage gambar 4:3 seperti Hadith. Teks mengalir di bawah
  foto dengan warna navy/cream, ukuran yang menyesuaikan layar, dan judul yang
  dapat membungkus dalam EN/RU/UZ. Tablet 768–1023 px memakai stage 16:9.
- Slide berbagi satu baris grid agar tinggi mengikuti slide terpanjang, sehingga
  autoplay tidak menggeser konten di bawahnya. Hanya gambar pertama yang mendapat
  prioritas LCP; gambar carousel tetap dibatasi pada slide aktif dan tetangganya.
- Header mobile memiliki logo di tengah dan ikon menu di kanan. Pilihan bahasa
  berada dalam dropdown native di dalam menu. Desktop tetap memiliki navigasi utama.
- Menu dapat di-scroll di landscape, memakai tinggi `100dvh`, menyediakan focus
  trap/Escape, mengembalikan fokus saat ditutup, dan membuka kembali body scroll
  ketika rotasi layar masuk ke layout desktop.
- Subnav mobile satu baris dan bisa digeser. Kategori aktif dibawa ke area yang
  terlihat tanpa menggeser halaman secara vertikal.
- Portfolio dan F&B memakai foto besar, card ringkas di bawahnya, teks yang terbaca,
  kontrol sentuh, dan swipe horizontal. Portfolio About berbagi komponen homepage.
- Swipe membedakan gerakan horizontal dari scroll vertikal halaman. Filmstrip
  Hotels tetap menggunakan scroll dan snap native.
- Card Careers dan tombolnya dirapikan; pagination memakai tombol panah pada
  layar kecil. Teks field form mobile berukuran 16 px.
- News memakai foto hero 4:3 sebelum teks pada mobile. Skeleton Home/About/
  Businesses memakai geometri media yang sama; skeleton Careers mengikuti list.
- Jarak kolom Travel/Technology diperbaiki. Header sesuai tinggi yang dicadangkan,
  dan progress carousel desktop tidak menabrak teks hero.

## Verifikasi

Menggunakan build produksi lokal dan Chromium dengan emulasi viewport/touch.

- Lebar: **320, 360, 390, 430, 768, 1024, 1440 px**.
- EN/RU/UZ diperiksa pada 320, 390, 768, dan 1024 px; bahasa Inggris juga diperiksa
  pada ukuran lainnya.
- 12 halaman utama, seluruh 9 detail Careers dan 16 artikel News dalam tiga bahasa:
  **255 kombinasi halaman/bahasa/viewport**.
- Landscape 844 × 390 px pada 10 halaman utama.
- Tidak ditemukan overflow horizontal, gambar rusak yang telah selesai dimuat,
  atau error JavaScript pada matriks tersebut.
- Pemeriksaan interaksi: menu, body scroll lock, focus trap, Escape, dropdown
  bahasa, swipe hero/portfolio/F&B, filter/pagination Careers, autoplay, tinggi
  carousel stabil, reduced motion, rotasi tablet, kategori aktif, dan tautan venue.
- Saji Nusantara dan 7oz tetap menuju website resmi; Lounge Bar tanpa tautan palsu.
- `npm run build` berhasil menghasilkan 147 halaman statis.
- ESLint untuk seluruh sumber yang diubah pada pekerjaan responsive ini lolos.

Output browser dan screenshot lokal disimpan di `.audit-tmp/` (diabaikan Git).
Pemeriksaan ini menggunakan emulasi Chromium, bukan pengujian pada perangkat
iPhone/Android fisik atau Safari.

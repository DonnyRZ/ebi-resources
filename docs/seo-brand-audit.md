# Favicon dan SEO EBI Resources

Domain utama: **https://ebiresources.com/**, dikonfirmasi pengguna.

## Perubahan

- Mengganti favicon Vercel dengan huruf EBI dan aksen emas dari logo yang disediakan. ICO berisi ukuran 16, 32, 48, 64, 128, dan 256 px. Ikon PNG 96 px serta Apple 180 px menggunakan latar putih agar terlihat jelas.
- Membuat gambar social preview 1200 × 630 px dari logo lengkap. Artwork merek tidak digambar ulang.
- Mengatur judul dan deskripsi lokal, canonical per halaman, serta hreflang EN/UZ/RU dan `x-default` ke EN. Setiap halaman memakai URL canonical sendiri.
- Menambahkan Open Graph dan Twitter metadata. Berita menggunakan foto artikelnya sendiri.
- Menambahkan Organization dan WebSite JSON-LD pada homepage, serta NewsArticle pada artikel. Organization mencantumkan URL logo asli dan kontak grup yang sudah disetujui. Tidak menambahkan tanggal perubahan atau penulis yang tidak diketahui.
- Menambahkan sitemap dengan 111 halaman konten: 12 halaman utama, 16 berita, dan 9 lowongan dalam tiga bahasa. URL lama yang hanya mengarahkan ke halaman atau website lain tidak dimasukkan.
- Menambahkan robots.txt yang mengizinkan halaman dan gambar publik, beserta URL sitemap.
- Menyamakan nama publik pada ringkasan Careers menjadi EBI Resources. Copy Travel menggunakan nama jalur bisnis, tanpa membuat nama perusahaan legal baru.
- Menyediakan konfigurasi Google Search Console verification opsional. Domain dan token verification diteruskan saat build Docker karena metadata dihasilkan secara statis.

## Verifikasi

- `npm run build`: berhasil; 149 halaman/rute statis dihasilkan, termasuk robots dan sitemap.
- ESLint pada helper SEO, schema, generator ikon, metadata layout, dan seluruh file page: berhasil.
- Audit pada build produksi lokal, `http://localhost:3214`: seluruh 111 URL sitemap memberikan HTTP 200, satu canonical yang benar, empat alternate bahasa, judul/deskripsi, ikon, Open Graph, dan Twitter metadata yang valid.
- Organization/WebSite tersedia pada tiga homepage. NewsArticle tersedia pada 48 halaman berita lokal.
- Semua aset logo/ikon dapat diakses dengan HTTP 200. Enam entri ICO valid dan favicon berhasil didekode Chrome.
- Homepage EN/UZ/RU pada lebar 390 px: tidak ada overflow horizontal maupun error JavaScript.

## Setelah deploy

1. Pastikan `NEXT_PUBLIC_SITE_URL=https://ebiresources.com` saat build. Production Compose sudah menggunakan domain tersebut.
2. Untuk verifikasi Search Console melalui HTML, isi `GOOGLE_SITE_VERIFICATION` dengan token dari akun pemilik, kemudian build dan deploy ulang. Verifikasi DNS juga dapat digunakan tanpa token HTML.
3. Di Search Console milik domain, submit `https://ebiresources.com/sitemap.xml` dan minta indexing ulang homepage melalui URL Inspection.
4. Google menentukan favicon, judul, cuplikan, serta logo yang akhirnya ditampilkan. Perubahan memerlukan crawl ulang dan tidak langsung muncul di hasil pencarian.

Audit ini memverifikasi build lokal. Status deployment, indexing, dan kepemilikan Search Console belum diverifikasi. Akses situs live melalui alat web tidak berhasil dalam sesi ini.

## Menghasilkan ulang aset

Jalankan `node scripts/generate-brand-icons.mjs` dari root proyek, lalu build ulang. Sumbernya adalah `public/images/brand/ebi-resources-logo.png`.

Panduan resmi: [favicon Google Search](https://developers.google.com/search/docs/appearance/favicon-in-search), [Organization](https://developers.google.com/search/docs/appearance/structured-data/organization), dan [Article](https://developers.google.com/search/docs/appearance/structured-data/article).

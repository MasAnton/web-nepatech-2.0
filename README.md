# PT. Nepatech Global Solusindo

Website company profile berbasis React, Vite, dan Tailwind CSS.

## Menjalankan project

```bash
npm ci
npm run dev
```

Salin `.env.example` menjadi `.env`, lalu isi konfigurasi EmailJS untuk
mengaktifkan formulir kontak.

## Menambahkan foto galeri

1. Taruh sumber JPG atau PNG di folder kategori yang sesuai dalam
   `public/img/galery`. Nama file boleh berupa angka atau nama deskriptif.
2. Jalankan perintah berikut:

```bash
npm run optimize:images
```

Script akan:

- Membuat WebP ukuran 480px untuk thumbnail dan 1280px untuk lightbox.
- Menghapus sumber JPG/PNG setelah konversi berhasil.
- Membuat `src/data/gallery-manifest.json` dari isi folder secara otomatis.
- Menambahkan hash konten ke URL agar foto pengganti tidak tertahan cache lama.
- Mengoptimalkan PNG, JPG, GIF, atau SVG logo pelanggan menjadi WebP.

Jumlah dan nama foto tidak perlu diubah lagi di `GalleryPage.jsx`.

### Mengganti foto

Taruh JPG/PNG baru dengan nama dasar yang sama. Contoh untuk mengganti foto
`Furnace/6`, taruh `6.jpg`, lalu jalankan `npm run optimize:images`. Kedua
varian WebP dan versi cache akan diperbarui otomatis.

### Menghapus foto

Hapus kedua variannya, misalnya `6-480.webp` dan `6-1280.webp`, kemudian
jalankan `npm run optimize:images`. Manifest akan menghapus foto tersebut tanpa
perlu mengganti nama foto lain. Script akan berhenti dengan error jika hanya
satu varian yang terhapus agar galeri tidak menghasilkan gambar rusak.

Jangan mengubah folder `dist` secara manual; selalu jalankan `npm run build`
setelah manifest diperbarui.

## Build production

```bash
npm run build
```

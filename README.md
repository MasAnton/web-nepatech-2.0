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
   `public/img/galery`.
2. Jalankan perintah berikut:

```bash
npm run optimize:images
```

Script akan membuat WebP ukuran 480px untuk thumbnail dan 1280px untuk
lightbox, mengoptimalkan PNG logo pelanggan menjadi WebP transparan, kemudian
menghapus sumber JPG/PNG yang sudah berhasil dikonversi.

## Build production

```bash
npm run build
```

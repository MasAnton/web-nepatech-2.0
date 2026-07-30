export const site = {
  name: "PT. Nepatech Global Solusindo",
  brandName: "Nepatech",
  shortName: "Nepatech",
  acronym: "NTGS",
  searchTitle: "NTGS | PT. Nepatech Global Solusindo",
  alternateNames: [
    "NTGS",
    "PT Nepatech",
    "PT NTGS",
    "PT Nepatech Global Solusindo",
    "ntgs.co.id",
  ],
  url: "https://ntgs.co.id",
  description:
    "PT. Nepatech Global Solusindo (NTGS), dikenal sebagai Nepatech, menyediakan kalibrasi KAN LK-377-IDN, perawatan, pengadaan, konsultansi, dan pelatihan.",
  email: "operation@ntgs.co.id",
  secondaryEmail: "nepatech1gs@gmail.com",
  phone: "+62 812-6708-4525",
  phoneHref: "+6281267084525",
  whatsappUrl: "https://api.whatsapp.com/send?phone=6281267084525",
  mapsUrl: "https://maps.app.goo.gl/YWmghbVbgQzRdMFm7",
  scopeDocumentUrl:
    "https://drive.google.com/drive/folders/1tsmilFpcN36EiXv0l7QQBm9LcxvT9Nsg",
  address:
    "Grand Wisata, Cluster Garden Hous BG01 No. 75, Lambangjaya, Tambun Selatan, Kabupaten Bekasi, Jawa Barat.",
  kanId: "LK-377-IDN",
  standard: "SNI ISO/IEC 17025:2017",
};

export const faqItems = [
  {
    question: "Apakah NTGS sama dengan PT. Nepatech Global Solusindo?",
    answer:
      "Ya. NTGS adalah singkatan dari PT. Nepatech Global Solusindo dan perusahaan kami dikenal sebagai Nepatech atau PT Nepatech. Sebagian orang juga mencarinya dengan sebutan PT NTGS, Nepa, atau PT Nepa; nama badan hukum yang benar tetap PT. Nepatech Global Solusindo.",
  },
  {
    question: "Apa saja layanan yang tersedia?",
    answer:
      "Kami menyediakan kalibrasi, perawatan, pengadaan peralatan dan suku cadang, konsultansi akreditasi, pelatihan, serta penyusunan dokumen mutu laboratorium.",
  },
  {
    question: "Berapa estimasi waktu pengerjaan?",
    answer:
      "Durasi bergantung pada jenis alat dan ruang lingkup pekerjaan. Estimasi waktu disampaikan setelah kebutuhan dan kondisi alat ditinjau.",
  },
  {
    question: "Apakah ada garansi untuk layanan?",
    answer:
      "Ketentuan garansi dan dukungan purna jual menyesuaikan jenis pekerjaan, peralatan, serta ruang lingkup yang disepakati dalam penawaran.",
  },
  {
    question: "Apakah seluruh layanan berada dalam ruang lingkup akreditasi?",
    answer:
      "Akreditasi KAN LK-377-IDN berlaku untuk layanan dan rentang ukur yang tercantum dalam ruang lingkup resmi. Tim kami akan mengonfirmasi kesesuaiannya sebelum pekerjaan dimulai.",
  },
  {
    question: "Bagaimana cara menghubungi tim Nepatech?",
    answer:
      "Gunakan formulir kontak di bawah, atau langsung hubungi WhatsApp kami lewat tombol di pojok kanan bawah.",
  },
];

export const brandAssets = {
  logoLight: "/img/brand/ntgs-light.webp",
  logoDark: "/img/brand/ntgs-dark.webp",
  organizationLogo: "/img/brand/ntgs-light.png",
  socialImage: "/img/brand/ntgs-social.png",
  faviconLight: "/img/brand/ntgs-icon-light-64.png",
  faviconDark: "/img/brand/ntgs-icon-dark-64.png",
};

export function updateThemeFavicon(darkMode) {
  if (typeof document === "undefined") return;

  document
    .querySelector("link[data-theme-favicon]")
    ?.setAttribute(
      "href",
      darkMode ? brandAssets.faviconDark : brandAssets.faviconLight,
    );
}

export const primaryPages = [
  { label: "Layanan Kalibrasi", to: "/layanan-kalibrasi" },
  { label: "Ruang Lingkup", to: "/ruang-lingkup" },
  { label: "Konsultansi & Pelatihan", to: "/konsultasi-pelatihan" },
  { label: "Galeri", to: "/galeri" },
  { label: "Kontak", to: "/kontak" },
];

export function toSiteUrl(path = "/") {
  return new URL(path, `${site.url}/`).href;
}

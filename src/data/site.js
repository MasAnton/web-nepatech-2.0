export const site = {
  name: "PT. Nepatech Global Solusindo",
  shortName: "Nepatech",
  url: "https://ntgs.co.id",
  description:
    "Laboratorium kalibrasi terakreditasi KAN LK-377-IDN untuk ruang lingkup tertentu, serta layanan konsultansi, pelatihan, maintenance, dan supply.",
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

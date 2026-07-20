import { Link, Navigate } from "react-router-dom";
import ContactForm from "../components/ContactForm";
import InnerPageLayout from "../components/InnerPageLayout";
import Seo from "../components/Seo";
import { site } from "../data/site";

const pageContent = {
  calibration: {
    path: "/layanan-kalibrasi",
    eyebrow: "Layanan Kalibrasi",
    seoTitle: "Layanan Kalibrasi Laboratorium",
    description:
      "Layanan kalibrasi laboratorium PT. Nepatech Global Solusindo untuk suhu, kelembapan, massa, waktu, dan instrumen analitik sesuai ruang lingkup yang berlaku.",
    title: "Layanan kalibrasi untuk hasil yang tertelusur dan terdokumentasi.",
    lead: "Setiap permintaan ditinjau berdasarkan jenis alat, metode, rentang ukur, serta kebutuhan operasional sebelum pekerjaan dijadwalkan.",
    sectionEyebrow: "Kapabilitas Teknis",
    sectionTitle: "Dukungan untuk peralatan laboratorium utama.",
    items: [
      {
        title: "Suhu & Kelembapan",
        text: "Kalibrasi oven, furnace, dan thermohygrometer sesuai kemampuan laboratorium.",
      },
      {
        title: "Massa",
        text: "Timbangan analitik, timbangan elektronik presisi, dan top loading balance.",
      },
      {
        title: "Waktu",
        text: "Timer dan stopwatch yang digunakan dalam aktivitas laboratorium.",
      },
      {
        title: "Instrumen Analitik",
        text: "Kalorimeter, laboratory mill, spektrofotometer, pH, konduktivitas, dan viskositas.",
      },
      {
        title: "Maintenance Preventif",
        text: "Pemeriksaan dan perawatan untuk membantu menjaga performa serta kesiapan alat.",
      },
      {
        title: "Dukungan Teknis",
        text: "Diskusi awal untuk memastikan kebutuhan, jadwal, dan dokumen pekerjaan tersusun jelas.",
      },
    ],
    processTitle: "Alur kerja yang jelas sejak awal.",
    process: [
      "Konfirmasi jenis alat, metode, dan rentang ukur",
      "Peninjauan kebutuhan serta penjadwalan pekerjaan",
      "Pelaksanaan oleh tim teknis sesuai ruang lingkup yang disepakati",
      "Penyampaian hasil dan dokumentasi pekerjaan",
    ],
    note: "Status akreditasi setiap pekerjaan mengikuti alat, metode, dan rentang ukur yang tercantum pada ruang lingkup resmi.",
    relatedLabel: "Periksa ruang lingkup resmi",
    relatedTo: "/ruang-lingkup",
  },
  scope: {
    path: "/ruang-lingkup",
    eyebrow: "KAN LK-377-IDN",
    seoTitle: "Ruang Lingkup Kalibrasi KAN LK-377-IDN",
    description:
      "Lihat ringkasan ruang lingkup kalibrasi KAN LK-377-IDN untuk suhu, kelembapan, massa, waktu, dan instrumen analitik serta akses dokumen resminya.",
    title: "Ruang lingkup kalibrasi KAN LK-377-IDN.",
    lead: `Laboratorium kalibrasi terakreditasi sesuai ${site.standard}. Ringkasan ini membantu Anda menemukan kelompok alat sebelum tim kami melakukan konfirmasi teknis.`,
    sectionEyebrow: "Ringkasan Ruang Lingkup",
    sectionTitle: "Empat kelompok kebutuhan kalibrasi.",
    items: [
      {
        title: "Suhu & Kelembapan",
        text: "Oven, furnace, dan thermohygrometer.",
      },
      {
        title: "Massa",
        text: "Timbangan analitik, timbangan elektronik presisi, dan top loading balance.",
      },
      {
        title: "Waktu",
        text: "Timer dan stopwatch untuk kebutuhan laboratorium.",
      },
      {
        title: "Instrumen Analitik",
        text: "Kalorimeter, laboratory mill, spektrofotometer, pH, konduktivitas, dan viskositas.",
      },
    ],
    note: "Kesesuaian jenis alat, metode, dan rentang ukur akan dikonfirmasi oleh tim sebelum pekerjaan dimulai.",
    externalLabel: "Buka dokumen ruang lingkup resmi",
    externalUrl: site.scopeDocumentUrl,
    relatedLabel: "Diskusikan alat Anda",
    relatedTo: "/kontak",
  },
  consulting: {
    path: "/konsultasi-pelatihan",
    eyebrow: "Konsultansi & Pelatihan",
    seoTitle: "Konsultansi Akreditasi & Pelatihan",
    description:
      "Pendampingan akreditasi ISO/IEC 17025, audit internal, pelatihan teknis, dan penyusunan dokumen mutu untuk kebutuhan laboratorium industri.",
    title: "Pendampingan akreditasi dan pelatihan laboratorium.",
    lead: "Program disusun mengikuti kesiapan organisasi, kebutuhan kompetensi personel, dan target pengembangan sistem manajemen laboratorium.",
    sectionEyebrow: "Pendampingan",
    sectionTitle: "Dari persiapan sampai proses akhir.",
    items: [
      {
        title: "Persiapan & Gap Analysis",
        text: "Memetakan kondisi awal dan kebutuhan pengembangan sistem.",
      },
      {
        title: "Audit Kelayakan Dokumen",
        text: "Meninjau kesiapan dokumen sebelum tahapan berikutnya.",
      },
      {
        title: "Pendampingan Asesmen",
        text: "Mendampingi persiapan tim menghadapi asesmen lapangan.",
      },
      {
        title: "Perbaikan & Verifikasi",
        text: "Membantu menata tindak lanjut terhadap temuan yang relevan.",
      },
      {
        title: "Proses Akhir Akreditasi",
        text: "Pendampingan sampai rangkaian proses yang disepakati selesai.",
      },
      {
        title: "Dokumen Mutu",
        text: "Panduan mutu, SOP, instruksi kerja, dan formulir sistem manajemen maupun pengujian.",
      },
    ],
    processTitle: "Topik pelatihan yang tersedia.",
    topics: [
      "Pengenalan ISO/IEC 17025",
      "Audit Internal",
      "Pemastian Keabsahan Hasil",
      "Verifikasi & Validasi Metode",
      "Evaluasi Ketidakpastian",
      "General Coal Sampling",
      "Coal Preparation",
      "General Coal Analysis",
    ],
    note: "Materi, durasi, dan metode pelaksanaan dapat disesuaikan dengan kebutuhan organisasi Anda.",
    relatedLabel: "Konsultasikan program",
    relatedTo: "/kontak",
  },
  contact: {
    path: "/kontak",
    eyebrow: "Kontak & Penawaran",
    seoTitle: "Kontak & Permintaan Penawaran",
    description:
      "Hubungi PT. Nepatech Global Solusindo untuk konsultasi kalibrasi, maintenance, supply, pelatihan, dan kebutuhan laboratorium industri Anda.",
    title: "Diskusikan kebutuhan laboratorium Anda.",
    lead: "Sampaikan jenis alat, layanan yang dibutuhkan, serta target waktu Anda. Tim kami akan membantu meninjau langkah berikutnya.",
  },
};

function FeatureGrid({ page }) {
  return (
    <section className="py-10 sm:py-16 lg:py-20">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-700 dark:text-orange-300 sm:text-sm">
            {page.sectionEyebrow}
          </p>
          <h2 className="mt-3 text-[24px] font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            {page.sectionTitle}
          </h2>
        </div>
        <div className="mt-7 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-5 lg:grid-cols-3">
          {page.items.map((item, index) => (
            <article
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900 sm:rounded-3xl sm:p-6">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-700 dark:bg-orange-500/15 dark:text-orange-300 sm:h-10 sm:w-10 sm:text-sm">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-sm font-bold leading-snug sm:mt-5 sm:text-xl">
                {item.title}
              </h3>
              <p className="mt-2 text-xs leading-5 text-slate-600 dark:text-slate-300 sm:text-sm sm:leading-6">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function DetailPanel({ page }) {
  if (!page.process && !page.topics && !page.note && !page.externalUrl) {
    return null;
  }

  return (
    <section className="bg-white py-10 dark:bg-slate-900 sm:py-16 lg:py-20">
      <div className="container">
        <div className="mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-950 sm:rounded-[32px] sm:p-8 lg:p-10">
          {page.processTitle && (
            <h2 className="text-xl font-bold tracking-tight sm:text-3xl">
              {page.processTitle}
            </h2>
          )}

          {page.process && (
            <ol className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-4">
              {page.process.map((step, index) => (
                <li
                  key={step}
                  className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white dark:bg-primary">
                    {index + 1}
                  </span>
                  <span className="pt-1 text-sm font-medium leading-6 text-slate-700 dark:text-slate-200">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          )}

          {page.topics && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {page.topics.map((topic) => (
                <li
                  key={topic}
                  className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 sm:text-sm">
                  {topic}
                </li>
              ))}
            </ul>
          )}

          {page.note && (
            <p className="mt-6 rounded-2xl border-l-4 border-primary bg-slate-900 p-4 text-sm leading-6 text-slate-200 dark:bg-slate-800 sm:p-5">
              {page.note}
            </p>
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            {page.externalUrl && (
              <a
                href={page.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-500">
                {page.externalLabel}
                <span aria-hidden="true" className="ml-2">
                  ↗
                </span>
              </a>
            )}
            {page.relatedTo && (
              <Link
                to={page.relatedTo}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-primary hover:text-orange-700 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:border-primary dark:hover:text-orange-300">
                {page.relatedLabel}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactDetails() {
  const contactItems = [
    {
      label: "Email",
      value: site.email,
      href: `mailto:${site.email}`,
    },
    {
      label: "Telepon & WhatsApp",
      value: site.phone,
      href: site.whatsappUrl,
    },
    {
      label: "Lokasi",
      value: site.address,
      href: site.mapsUrl,
    },
  ];

  return (
    <section className="py-10 sm:py-16 lg:py-20">
      <div className="container">
        <div className="grid gap-3 sm:grid-cols-3 sm:gap-5">
          {contactItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noreferrer" : undefined}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900 sm:rounded-3xl sm:p-6">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-orange-700 dark:text-orange-300">
                {item.label}
              </span>
              <span className="mt-3 block text-sm font-semibold leading-6 text-slate-800 dark:text-slate-100 sm:text-base">
                {item.value}
              </span>
            </a>
          ))}
        </div>
        <div className="mt-8 sm:mt-12">
          <ContactForm embedded />
        </div>
      </div>
    </section>
  );
}

function ServicePage({ pageKey }) {
  const page = pageContent[pageKey];
  if (!page) return <Navigate to="/" replace />;

  const isContactPage = pageKey === "contact";
  const structuredData = isContactPage
    ? undefined
    : {
        "@type": "Service",
        name: page.seoTitle,
        description: page.description,
        areaServed: "Indonesia",
        serviceType: page.eyebrow,
      };

  return (
    <InnerPageLayout>
      <Seo
        title={page.seoTitle}
        description={page.description}
        canonicalPath={page.path}
        pageType={isContactPage ? "ContactPage" : "WebPage"}
        breadcrumbs={[{ name: page.eyebrow, path: page.path }]}
        structuredData={structuredData}
      />

      <main>
        <section className="hero-surface overflow-hidden py-10 sm:py-16 lg:py-20">
          <div className="hero-enter container">
            <Link
              to="/"
              className="mb-5 inline-flex min-h-10 items-center rounded-full border border-slate-300 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-orange-700 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:border-primary dark:hover:text-orange-300 sm:mb-7">
              <span aria-hidden="true" className="mr-2">←</span>
              Kembali ke Beranda
            </Link>
            <nav aria-label="Breadcrumb" className="text-xs font-semibold sm:text-sm">
              <ol className="flex flex-wrap items-center gap-2 text-slate-500 dark:text-slate-400">
                <li>
                  <Link to="/" className="transition hover:text-orange-700 dark:hover:text-orange-300">
                    Beranda
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-orange-700 dark:text-orange-300">
                  {page.eyebrow}
                </li>
              </ol>
            </nav>
            <div className="mt-7 max-w-5xl sm:mt-10">
              <span className="inline-flex rounded-full bg-orange-100 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-orange-700 dark:bg-orange-500/10 dark:text-orange-300 sm:px-4 sm:py-2 sm:text-sm">
                {page.eyebrow}
              </span>
              <h1 className="mt-4 max-w-5xl text-[32px] font-black leading-[1.08] tracking-tight sm:mt-6 sm:text-5xl lg:text-6xl">
                {page.title}
              </h1>
              <p className="mt-4 max-w-3xl text-[14px] leading-6 text-slate-600 dark:text-slate-300 sm:mt-6 sm:text-lg sm:leading-8">
                {page.lead}
              </p>
              {!isContactPage && (
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Link
                    to="/kontak"
                    className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-500 sm:px-7 sm:text-base">
                    Diskusikan kebutuhan
                  </Link>
                  <Link
                    to="/galeri"
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-300 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-primary hover:text-orange-700 dark:border-slate-700 dark:bg-slate-900/80 dark:text-white dark:hover:border-primary dark:hover:text-orange-300 sm:px-7 sm:text-base">
                    Lihat galeri pekerjaan
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>

        {isContactPage ? (
          <ContactDetails />
        ) : (
          <>
            <FeatureGrid page={page} />
            <DetailPanel page={page} />
            <section className="py-10 sm:py-16">
              <div className="container">
                <div className="rounded-2xl bg-slate-950 p-5 text-white sm:rounded-[32px] sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-8">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-300">
                      Langkah Berikutnya
                    </p>
                    <h2 className="mt-3 text-2xl font-bold sm:text-4xl">
                      Konfirmasikan kebutuhan Anda bersama tim kami.
                    </h2>
                  </div>
                  <Link
                    to="/kontak"
                    className="mt-6 inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-500 lg:mt-0 sm:text-base">
                    Hubungi Nepatech
                  </Link>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
    </InnerPageLayout>
  );
}

export default ServicePage;

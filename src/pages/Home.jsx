import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ContactForm from "../components/ContactForm";
import Seo from "../components/Seo";
import galleryManifest from "../data/gallery-manifest.json";

const galleryLinks = Object.values(galleryManifest.categories).map(
  (category) => ({
    slug: category.slug,
    name: category.heading,
    title: category.title,
    image: category.images[0].src,
    srcSet: category.images[0].srcSet,
  }),
);

const clientLogos = [
  { src: "/img/PNG/atq.webp", alt: "ATQ" },
  { src: "/img/PNG/Aetra.webp", alt: "Aetra" },
  { src: "/img/PNG/Antam.webp", alt: "Antam" },
  { src: "/img/PNG/BP.webp", alt: "BP" },
  { src: "/img/PNG/BSA.webp", alt: "BSA" },
  { src: "/img/PNG/CGR.webp", alt: "CGR" },
  { src: "/img/PNG/Geomin.webp", alt: "Geomin" },
  { src: "/img/PNG/Geoservices.webp", alt: "Geoservices" },
  { src: "/img/PNG/IBIS.webp", alt: "IBIS" },
  { src: "/img/PNG/IP.webp", alt: "IP" },
  { src: "/img/PNG/Krakatau.webp", alt: "Krakatau" },
  { src: "/img/PNG/LBE.webp", alt: "LBE" },
  { src: "/img/PNG/MA.webp", alt: "MA" },
  { src: "/img/PNG/MSK.webp", alt: "MSK" },
  { src: "/img/PNG/Nusantara Power.webp", alt: "Nusantara Power" },
  { src: "/img/PNG/PJB.webp", alt: "PJB" },
  { src: "/img/PNG/PLN.webp", alt: "PLN" },
  { src: "/img/PNG/SCCI.webp", alt: "SCCI" },
  { src: "/img/PNG/Sucofindo.webp", alt: "Sucofindo" },
  { src: "/img/PNG/Surveyor Indonesia.webp", alt: "Surveyor Indonesia" },
  { src: "/img/PNG/Tek-MIRA.webp", alt: "Tek-MIRA" },
  { src: "/img/PNG/TOP.webp", alt: "TOP" },
  {
    src: "/img/PNG/datang-dssp-power.webp",
    alt: "PT Datang DSSP Power Indonesia",
  },
  { src: "/img/PNG/sgpjb.webp", alt: "PT SGPJB" },
  { src: "/img/PNG/bhumi-jati-power.webp", alt: "PT Bhumi Jati Power" },
  {
    src: "/img/PNG/china-shenhua.webp",
    alt: "China Shenhua Energy Company Limited",
  },
  { src: "/img/PNG/cirebon-power.webp", alt: "Cirebon Power" },
  {
    src: "/img/PNG/anindya.webp",
    alt: "PT Anindya Wiraputra Konsult",
  },
  {
    src: "/img/PNG/bureau-veritas-corporate.webp",
    alt: "PT Bureau Veritas Indonesia",
    portrait: true,
  },
  {
    src: "/img/PNG/cotecna-negative.webp",
    alt: "PT Cotecna Inspection Indonesia",
  },
  {
    src: "/img/PNG/tribhakti-optimized.webp",
    alt: "PT Tribhakti Inspektama",
  },
  {
    src: "/img/PNG/zai.webp",
    alt: "PT Zafina Analitika Inspektama",
  },
  { src: "/img/PNG/sgs.webp", alt: "PT SGS Indonesia" },
  { src: "/img/PNG/indexim.webp", alt: "PT Indexim Coalindo" },
  { src: "/img/PNG/bukit-asam.webp", alt: "PT Bukit Asam Tbk" },
  {
    src: "/img/PNG/mgm-coal.webp",
    alt: "PT Marunda Grahamineral",
  },
  {
    src: "/img/PNG/gema-kreasi-perdana.webp",
    alt: "PT Gema Kreasi Perdana",
    caption: "Gema Kreasi Perdana",
  },
  {
    src: "/img/certifications/indocement.webp",
    alt: "PT Indocement Tunggal Prakarsa Tbk",
  },
  { src: "/img/PNG/semen-grobogan.webp", alt: "PT Semen Grobogan" },
  {
    src: "/img/PNG/emas-murni-abadi.webp",
    alt: "PT Emas Murni Abadi",
  },
  { src: "/img/PNG/kahatex.webp", alt: "PT Kahatex" },
  { src: "/img/PNG/pipit-group.webp", alt: "Pipit Group" },
  {
    src: "/img/PNG/hk-pati.webp",
    alt: "PT H-One Kogi Prima Auto Technologies Indonesia",
  },
];

const heroSlides = [
  {
    id: "nepatech-logo",
    src: "/img/carousel/hero/2.png",
    alt: "Logo PT. Nepatech Global Solusindo",
    label: "PT. Nepatech Global Solusindo",
  },
  {
    id: "kan",
    src: "/img/carousel/hero/1.png",
    alt: "Akreditasi KAN LK-377 IDN",
    label: "ISO/IEC 17025:2017 · LK-377-IDN",
  },
  {
    id: "csms",
    type: "credential",
    eyebrow: "Contractor Safety Management System",
    title: "Kualifikasi CSMS",
    description: "PLN Nusantara Power, PLN Indonesia Power, dan Indocement",
    logos: [
      {
        src: "/img/PNG/Nusantara Power.webp",
        alt: "Logo PT PLN Nusantara Power",
        name: "PLN Nusantara Power",
      },
      {
        src: "/img/PNG/IP.webp",
        alt: "Logo PT PLN Indonesia Power",
        name: "PLN Indonesia Power",
      },
      {
        src: "/img/certifications/indocement.webp",
        alt: "Logo PT Indocement Tunggal Prakarsa Tbk",
        name: "Indocement",
      },
    ],
    label: "CSMS · PLN NP · PLN IP · Indocement",
  },
  {
    id: "qro-certifications",
    type: "credential",
    eyebrow: "Sertifikasi Sistem Manajemen",
    title: "Quality Research Organization",
    logos: [
      {
        src: "/img/certifications/qro.webp",
        alt: "Logo Quality Research Organization (QRO)",
      },
    ],
    details: [
      { title: "ISO 9001:2015", value: "3050260220140Q" },
      { title: "ISO 14001:2015", value: "3050260220141E" },
      { title: "ISO 45001:2018", value: "3050260220142HS" },
    ],
    label: "ISO 9001 · 14001 · 45001",
  },
  {
    id: "audit-independent",
    type: "credential",
    eyebrow: "Laporan Audit Independen",
    title: "KAP Abdul Hamid",
    description: "No. 00086/2.1094/AU.2/05/1271-1/1/1/VII/2025",
    logos: [
      {
        src: "/img/certifications/kap-abdul-hamid.webp",
        alt: "Logo KAP Abdul Hamid dan Rekan",
      },
    ],
    label: "Audit independen",
  },
  {
    id: "nepatech-akurasindo-utama",
    src: "/img/certifications/ntau.webp",
    alt: "Logo PT. Nepatech Akurasindo Utama",
    label: "PT. Nepatech Akurasindo Utama",
  },
  {
    id: "cv-nepa",
    src: "/img/carousel/hero/3.png",
    alt: "Logo CV. Nepa",
    label: "CV. Nepa",
  },
];

const serviceItems = [
  {
    number: "01",
    title: "Kalibrasi",
    description:
      "Layanan kalibrasi sesuai ruang lingkup untuk hasil yang tertelusur dan terdokumentasi.",
  },
  {
    number: "02",
    title: "Maintenance",
    description:
      "Perawatan preventif dan perbaikan untuk menjaga performa alat.",
  },
  {
    number: "03",
    title: "Supply & Suku Cadang",
    description:
      "Pengadaan peralatan dan komponen sesuai kebutuhan operasional laboratorium.",
  },
  {
    number: "04",
    title: "Konsultansi & Pelatihan",
    description:
      "Pendampingan akreditasi, pelatihan teknis, dan penyusunan dokumen mutu.",
  },
];

const calibrationScopes = [
  {
    number: "01",
    title: "Suhu & Kelembapan",
    description: "Oven, furnace, dan thermohygrometer.",
  },
  {
    number: "02",
    title: "Massa",
    description:
      "Timbangan analitik, timbangan elektronik presisi, dan top loading balance.",
  },
  {
    number: "03",
    title: "Waktu",
    description: "Timer dan stopwatch untuk kebutuhan laboratorium.",
  },
  {
    number: "04",
    title: "Instrumen Analitik",
    description:
      "Kalorimeter, laboratory mill, spektrofotometer, pH, konduktivitas, dan viskositas.",
  },
];

const accreditationSteps = [
  "Persiapan dan gap analysis",
  "Audit kelayakan dokumen",
  "Pendampingan asesmen lapangan",
  "Tindakan perbaikan dan verifikasi",
  "Pendampingan proses akhir akreditasi",
];

const trainingTopics = [
  "Pengenalan ISO/IEC 17025",
  "Audit Internal",
  "Pemastian Keabsahan Hasil",
  "Verifikasi & Validasi Metode",
  "Evaluasi Ketidakpastian",
  "General Coal Sampling",
  "Coal Preparation",
  "General Coal Analysis",
];

const navLinks = [
  ["Beranda", "#home"],
  ["Tentang Kami", "#about"],
  ["Galeri Kerja", "#portfolio"],
  ["Pelanggan", "#clients"],
  ["FAQ", "#faq"],
  ["Lokasi", "#location"],
  ["Kontak", "#contact"],
];

const faqItems = [
  {
    question: "Apa saja layanan yang tersedia?",
    answer:
      "Kami menyediakan kalibrasi, maintenance, supply peralatan dan suku cadang, konsultansi akreditasi, pelatihan, serta penyusunan dokumen mutu laboratorium.",
  },
  {
    question: "Berapa lama waktu pengerjaannya?",
    answer:
      "Durasi bergantung pada jenis alat dan ruang lingkup pekerjaan. Umumnya estimasi dikomunikasikan setelah survei awal.",
  },
  {
    question: "Apakah ada garansi untuk layanan?",
    answer:
      "Ketentuan garansi dan dukungan purna jual menyesuaikan jenis pekerjaan, peralatan, serta ruang lingkup yang disepakati dalam penawaran.",
  },
  {
    question: "Apakah semua layanan termasuk ruang lingkup terakreditasi?",
    answer:
      "Akreditasi KAN LK-377-IDN berlaku untuk layanan dan rentang ukur yang tercantum dalam ruang lingkup resmi. Tim kami akan mengonfirmasi kesesuaiannya sebelum pekerjaan dimulai.",
  },
  {
    question: "Bagaimana cara menghubungi tim sales?",
    answer:
      "Gunakan formulir kontak di bawah, atau langsung hubungi WhatsApp kami lewat tombol di pojok kanan bawah.",
  },
];

function CredentialHeroSlide({ slide }) {
  const hasMultipleLogos = slide.logos.length > 1;

  return (
    <div
      className="hero-slide flex h-[340px] w-full flex-col items-center justify-center bg-gradient-to-br from-white via-slate-50 to-orange-50 px-5 pb-28 pt-5 text-center sm:h-[460px] sm:px-10 sm:pb-32 sm:pt-8 lg:h-[520px]"
      role="group"
      aria-roledescription="slide"
      aria-label={slide.label}>
      <span className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-orange-700 sm:text-xs">
        {slide.eyebrow}
      </span>
      <h2 className="mt-2 text-xl font-black tracking-tight text-slate-900 sm:mt-3 sm:text-3xl">
        {slide.title}
      </h2>
      {slide.description && (
        <p className="mt-1 max-w-lg text-[11px] font-medium leading-4 text-slate-600 sm:mt-2 sm:text-sm sm:leading-5">
          {slide.description}
        </p>
      )}

      <div
        className={
          hasMultipleLogos
            ? "mt-3 grid w-full max-w-lg grid-cols-3 gap-2 sm:mt-5 sm:gap-3"
            : "mt-3 flex justify-center sm:mt-5"
        }>
        {slide.logos.map((logo) => (
          <div
            key={logo.src}
            className={`flex items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm ${
              hasMultipleLogos
                ? "min-h-16 flex-col gap-1 p-2 sm:min-h-24 sm:gap-2 sm:p-3"
                : "h-16 w-36 p-2 sm:h-24 sm:w-52 sm:p-3"
            }`}>
            <img
              src={logo.src}
              alt={logo.alt}
              loading="lazy"
              className={
                hasMultipleLogos
                  ? "h-8 max-w-full object-contain sm:h-12"
                  : "h-full w-full object-contain"
              }
            />
            {logo.name && (
              <span className="text-[8px] font-bold leading-tight text-slate-700 sm:text-[10px]">
                {logo.name}
              </span>
            )}
          </div>
        ))}
      </div>

      {slide.details && (
        <div className="mt-2 grid w-full max-w-lg grid-cols-1 gap-1 sm:mt-4 sm:grid-cols-3 sm:gap-2">
          {slide.details.map((detail) => (
            <div
              key={detail.title}
              className="flex items-center justify-between gap-2 rounded-xl bg-slate-900 px-3 py-1.5 text-left text-white sm:block sm:px-3 sm:py-2 sm:text-center">
              <p className="text-[9px] font-bold sm:text-xs">{detail.title}</p>
              <p className="break-all text-[8px] text-slate-300 sm:mt-1 sm:text-[9px]">
                No. {detail.value}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") return false;
    const stored = window.localStorage.getItem("nepatech-dark-mode");
    if (stored !== null) {
      return stored === "true";
    }

    return (
      window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? false
    );
  });
  const [activeSlide, setActiveSlide] = useState(0);
  const [carouselPaused, setCarouselPaused] = useState(false);
  const [activeSection, setActiveSection] = useState(() => {
    if (typeof window === "undefined") return "home";
    const hash = decodeURIComponent(window.location.hash.slice(1));
    if (hash === "calibration-scope") return "about";
    return navLinks.some(([, href]) => href === `#${hash}`) ? hash : "home";
  });
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const currentHeroSlide = heroSlides[activeSlide];

  useEffect(() => {
    if (
      carouselPaused ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return undefined;
    }

    const interval = setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselPaused]);

  useEffect(() => {
    const targetId = decodeURIComponent(window.location.hash.slice(1));
    if (!targetId) return undefined;

    const scrollFrame = window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({
        behavior: "auto",
        block: "start",
      });
    });

    return () => window.cancelAnimationFrame(scrollFrame);
  }, []);

  useEffect(() => {
    const revealTargets = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      revealTargets.forEach((el) => el.classList.add("reveal-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    revealTargets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sectionMap = [
      ["home", "home"],
      ["about", "about"],
      ["calibration-scope", "about"],
      ["portfolio", "portfolio"],
      ["clients", "clients"],
      ["faq", "faq"],
      ["location", "location"],
      ["contact", "contact"],
    ];
    let animationFrame;

    const updateActiveSection = () => {
      animationFrame = undefined;
      const headerHeight =
        document.querySelector("[data-site-header]")?.offsetHeight ?? 0;
      const readingLine = headerHeight + Math.min(window.innerHeight * 0.24, 180);
      let nextSection = "home";

      sectionMap.forEach(([sectionId, navId]) => {
        const section = document.getElementById(sectionId);
        if (section && section.getBoundingClientRect().top <= readingLine) {
          nextSection = navId;
        }
      });

      if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2
      ) {
        nextSection = "contact";
      }

      setActiveSection((current) =>
        current === nextSection ? current : nextSection,
      );
    };

    const requestSectionUpdate = () => {
      if (animationFrame === undefined) {
        animationFrame = window.requestAnimationFrame(updateActiveSection);
      }
    };

    updateActiveSection();
    window.addEventListener("scroll", requestSectionUpdate, { passive: true });
    window.addEventListener("resize", requestSectionUpdate);

    return () => {
      window.removeEventListener("scroll", requestSectionUpdate);
      window.removeEventListener("resize", requestSectionUpdate);
      if (animationFrame !== undefined) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      window.localStorage.setItem("nepatech-dark-mode", String(next));
      return next;
    });
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const closeMenu = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const closeMenuOnDesktop = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };

    window.addEventListener("keydown", closeMenu);
    window.addEventListener("resize", closeMenuOnDesktop);
    return () => {
      window.removeEventListener("keydown", closeMenu);
      window.removeEventListener("resize", closeMenuOnDesktop);
    };
  }, []);

  return (
    <div
      className={`${darkMode ? "dark bg-slate-950 text-slate-100" : "bg-white text-slate-900"} min-h-screen transition-colors duration-500`}>
      <Seo />
      <div className="fixed bottom-4 right-4 z-40 sm:bottom-5 sm:right-5">
        <a
          href="https://api.whatsapp.com/send?phone=6281267084525"
          target="_blank"
          rel="noreferrer">
          <img
            src="/img/logoWA.png"
            className="w-[50px] transition duration-500 hover:w-[55px] md:w-[70px] hover:md:w-[75px] lg:w-[80px] hover:lg:w-[85px]"
            alt="WhatsApp"
          />
        </a>
      </div>

      <header
        data-site-header
        className="fixed inset-x-0 top-0 z-50 w-full border-b border-slate-200 bg-white/90 shadow-lg backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90">
        <div className="container relative">
          <div className="flex items-center justify-between gap-3 px-4 py-3 lg:py-0">
            <div>
              <a
                href="#home"
                className="inline-flex rounded-xl p-1.5 transition-opacity duration-300 hover:opacity-90">
                <img
                  src={
                    darkMode
                      ? "/img/logoNGS_dark.png?v=2"
                      : "/img/logoNGS.png"
                  }
                  className="w-[100px] sm:w-[120px]"
                  alt="PT. Nepatech Global Solusindo"
                />
              </a>
            </div>

            <div className="flex items-center gap-3 lg:order-3">
              <button
                type="button"
                onClick={toggleDarkMode}
                className="inline-flex items-center whitespace-nowrap rounded-full border border-slate-300 bg-white/90 px-3 py-2 text-xs font-semibold text-slate-900 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-100 dark:hover:bg-slate-800 sm:px-4 sm:text-sm"
                aria-label={
                  darkMode ? "Aktifkan mode terang" : "Aktifkan mode gelap"
                }>
                {darkMode ? "Light Mode" : "Dark Mode"}
              </button>
              <button
                type="button"
                className="inline-flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-lg border border-slate-300 bg-white/90 text-slate-900 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-100 dark:hover:bg-slate-800 lg:hidden"
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-label={
                  menuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"
                }
                aria-expanded={menuOpen}
                aria-controls="mobile-navigation">
                <span
                  className={`hamburger-line ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}
                />
                <span
                  className={`hamburger-line ${menuOpen ? "opacity-0" : ""}`}
                />
                <span
                  className={`hamburger-line ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
                />
              </button>
            </div>

            <nav
              aria-label="Navigasi utama"
              className="hidden lg:block lg:order-2">
              <ul className="flex">
                {navLinks.map(([label, href]) => {
                  const id = href.replace("#", "");
                  const isActive = activeSection === id;
                  const isContact = id === "contact";
                  return (
                    <li key={label} className="group">
                       <a
                         href={href}
                         aria-current={isActive ? "location" : undefined}
                         className={
                          isContact
                            ? `site-nav-contact ml-3 inline-flex rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-500 xl:ml-5 xl:text-base ${isActive ? "is-active" : ""}`
                            : `site-nav-link mx-3 flex py-2 text-sm xl:mx-5 xl:text-base ${isActive ? "is-active font-semibold text-orange-700 dark:text-orange-300" : "text-slate-900 dark:text-slate-100"}`
                        }>
                        {label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {menuOpen && (
            <nav
              id="mobile-navigation"
              aria-label="Navigasi seluler"
              className="mobile-menu-enter absolute inset-x-4 top-full max-h-[calc(100vh-5rem)] overflow-y-auto rounded-b-2xl border border-t-0 border-slate-200 bg-white/95 p-3 shadow-xl backdrop-blur-xl dark:border-slate-700 dark:bg-slate-950/95 lg:hidden">
              <ul className="space-y-1">
                {navLinks.map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      aria-current={
                        activeSection === href.slice(1)
                          ? "location"
                          : undefined
                      }
                      className={`block rounded-xl px-4 py-3 text-base font-medium transition ${href === "#contact" ? "bg-primary text-center font-semibold text-white hover:bg-orange-500" : activeSection === href.slice(1) ? "border-l-4 border-primary bg-slate-100 text-orange-700 dark:bg-slate-800 dark:text-orange-300" : "border-l-4 border-transparent text-slate-900 hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800"}`}
                      onClick={() => setMenuOpen(false)}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </header>

      <main>
        <section
          id="home"
          className="hero-surface relative scroll-mt-24 overflow-hidden pb-16 pt-28 sm:pt-32 lg:pb-24 lg:pt-40">
          <div className="hero-glow" />
          <div className="container">
            <div className="hero-enter grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
              <div className="w-full px-4">
                <div className="section-card overflow-hidden">
                  <div className="mb-6 inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-orange-700 shadow-sm shadow-primary/10 dark:bg-orange-500/10 dark:text-orange-200">
                    <span className="mr-2 inline-flex h-2 w-2 rounded-full bg-primary" />
                    PT. Nepatech Global Solusindo
                  </div>
                  <h1 className="text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-slate-100">
                    Solusi laboratorium andal untuk operasional modern
                  </h1>
                  <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:mt-6 sm:text-xl sm:leading-8 dark:text-slate-300">
                    Kalibrasi dalam ruang lingkup KAN LK-377-IDN, didukung
                    maintenance, supply, konsultansi akreditasi, dan pelatihan
                    untuk kebutuhan laboratorium industri.
                  </p>
                  <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    <a
                      href="#contact"
                      className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-base font-semibold text-white transition duration-300 ease-in-out hover:bg-orange-500">
                      Diskusikan Kebutuhan
                    </a>
                    <a
                      href="#calibration-scope"
                      className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-4 text-base font-semibold text-slate-900 transition duration-300 ease-in-out hover:border-primary hover:text-orange-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:text-orange-300">
                      Lihat Ruang Lingkup
                    </a>
                  </div>
                </div>
              </div>
              <div className="w-full px-4">
                <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-xl shadow-slate-900/5 dark:border-slate-700">
                  {currentHeroSlide.type === "credential" ? (
                    <CredentialHeroSlide
                      key={currentHeroSlide.id}
                      slide={currentHeroSlide}
                    />
                  ) : (
                    <img
                      key={currentHeroSlide.id}
                      loading="eager"
                      fetchPriority="high"
                      src={currentHeroSlide.src}
                      alt={currentHeroSlide.alt}
                      className="hero-slide h-[340px] w-full object-contain p-8 pb-28 sm:h-[460px] sm:p-12 sm:pb-32 lg:h-[520px]"
                    />
                  )}
                  <div className="absolute inset-x-0 bottom-6 px-4">
                    <div className="mx-auto flex max-w-xl flex-nowrap items-center justify-between gap-3 rounded-full bg-slate-950/70 px-4 py-3 text-white backdrop-blur sm:px-6">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold sm:text-base">
                          {currentHeroSlide.label}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setCarouselPaused(true);
                            setActiveSlide(
                              (current) =>
                                (current - 1 + heroSlides.length) %
                                heroSlides.length,
                            );
                          }}
                          className="rounded-full bg-white/10 px-3 py-2 text-lg transition hover:bg-white/20"
                          aria-label="Slide sebelumnya">
                          <span aria-hidden="true">‹</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setCarouselPaused(true);
                            setActiveSlide(
                              (current) => (current + 1) % heroSlides.length,
                            );
                          }}
                          className="rounded-full bg-white/10 px-3 py-2 text-lg transition hover:bg-white/20"
                          aria-label="Slide berikutnya">
                          <span aria-hidden="true">›</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setCarouselPaused((current) => !current)}
                          className="rounded-full bg-white/10 px-3 py-2 text-sm transition hover:bg-white/20"
                          aria-label={
                            carouselPaused
                              ? "Putar carousel otomatis"
                              : "Jeda carousel otomatis"
                          }
                          aria-pressed={carouselPaused}>
                          <span aria-hidden="true">
                            {carouselPaused ? "▶" : "Ⅱ"}
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-center gap-1.5 sm:gap-2">
                      {heroSlides.map((slide, index) => (
                        <button
                          key={slide.id}
                          type="button"
                          onClick={() => {
                            setActiveSlide(index);
                            setCarouselPaused(true);
                          }}
                          className={`h-2.5 w-7 rounded-full transition sm:w-10 ${activeSlide === index ? "bg-primary" : "bg-slate-300 hover:bg-slate-400"}`}
                          aria-label={`Tampilkan ${slide.label}`}
                          aria-pressed={activeSlide === index}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="about"
          data-reveal
          className="reveal-section scroll-mt-24 bg-white/70 py-16 dark:bg-slate-950 lg:py-24">
          <div className="container">
            <div className="section-card grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
              <div>
                <span className="mb-3 inline-flex rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700 dark:bg-orange-500/10 dark:text-orange-200">
                  Solusi Laboratorium Terintegrasi
                </span>
                <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-slate-100 sm:text-4xl lg:text-5xl">
                  Dukungan teknis dan sistem mutu dalam satu mitra.
                </h2>
                <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
                  Kami membantu kebutuhan laboratorium mulai dari kalibrasi dan
                  perawatan alat hingga pendampingan akreditasi, pelatihan, dan
                  penyusunan dokumen mutu.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {serviceItems.map((item) => (
                    <div
                      key={item.title}
                      className="group rounded-3xl border border-slate-200 bg-slate-50 px-5 py-6 transition duration-300 hover:-translate-y-1 hover:border-orange-300 hover:bg-white hover:shadow-lg dark:border-slate-700 dark:bg-slate-950 dark:hover:border-orange-500/50 dark:hover:bg-slate-900">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-700 transition group-hover:bg-primary group-hover:text-white dark:bg-orange-500/15 dark:text-orange-300">
                        {item.number}
                      </span>
                      <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="rounded-[32px] border border-slate-200 bg-slate-950/5 p-6 shadow-lg">
                  <div className="mb-6 rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                      Tentang Kami
                    </h3>
                    <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
                      Laboratorium kalibrasi kami terakreditasi KAN dengan nomor
                      LK-377-IDN sesuai SNI ISO/IEC 17025:2017 untuk ruang
                      lingkup yang ditetapkan.
                    </p>
                  </div>
                  <div className="navy-accent-card rounded-3xl border border-slate-800 border-l-4 border-l-primary bg-slate-950 px-6 py-5 text-white shadow-xl dark:bg-slate-900">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-300">
                      Dipercaya Lintas Industri
                    </p>
                    <p className="mt-3 text-3xl font-bold">
                      Energi, tambang, surveyor, dan manufaktur
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="calibration-scope"
          aria-labelledby="calibration-scope-title"
          data-reveal
          className="capabilities-surface reveal-section relative scroll-mt-24 overflow-hidden py-16 lg:py-24">
          <div className="container px-4">
            <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
              <span className="inline-flex rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-orange-700 dark:bg-orange-500/10 dark:text-orange-200">
                Kapabilitas
              </span>
              <h2
                id="calibration-scope-title"
                className="mt-5 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
                Layanan yang relevan dengan kebutuhan laboratorium Anda.
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
                Dari pekerjaan teknis hingga pengembangan sistem mutu, setiap
                kebutuhan dibahas lebih dulu agar ruang lingkupnya tepat.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <article className="section-card relative border-t-4 border-t-slate-900 dark:border-t-primary">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-700 dark:text-orange-300">
                      Divisi Kalibrasi
                    </p>
                    <h3 className="mt-3 text-2xl font-bold text-slate-900 dark:text-slate-100 sm:text-3xl">
                      Ringkasan ruang lingkup
                    </h3>
                  </div>
                  <div className="shrink-0 rounded-2xl border border-slate-900 bg-slate-950 px-4 py-3 text-sm font-semibold text-white dark:border-orange-500/40 dark:bg-orange-500/10 dark:text-orange-200">
                    KAN LK-377-IDN
                  </div>
                </div>

                <p className="mt-5 leading-7 text-slate-600 dark:text-slate-300">
                  Laboratorium kalibrasi terakreditasi sesuai SNI ISO/IEC
                  17025:2017 untuk alat dan rentang ukur yang tercantum dalam
                  ruang lingkup resmi.
                </p>

                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  {calibrationScopes.map((scope) => (
                    <div
                      key={scope.title}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-950">
                      <span className="text-xs font-bold text-orange-700 dark:text-orange-300">
                        {scope.number}
                      </span>
                      <h4 className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
                        {scope.title}
                      </h4>
                      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                        {scope.description}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="mt-6 rounded-2xl bg-slate-100 px-5 py-4 text-sm leading-6 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  Kesesuaian jenis alat, metode, dan rentang ukur akan
                  dikonfirmasi oleh tim sebelum pekerjaan dimulai.
                </p>
                <a
                  href="https://drive.google.com/drive/folders/1tsmilFpcN36EiXv0l7QQBm9LcxvT9Nsg"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Lihat dokumen ruang lingkup kalibrasi di Google Drive, buka di tab baru"
                  className="mt-5 flex w-full items-center justify-between gap-4 rounded-2xl border border-primary bg-primary px-5 py-4 text-sm font-semibold text-white shadow-sm transition hover:border-orange-500 hover:bg-orange-500 dark:border-primary dark:bg-primary dark:text-white dark:hover:border-orange-500 dark:hover:bg-orange-500">
                  <span>Lihat Dokumen Ruang Lingkup</span>
                  <span
                    aria-hidden="true"
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20 text-base text-white">
                    ↗
                  </span>
                </a>
              </article>

              <article className="section-card relative border-t-4 border-t-primary">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-700 dark:text-orange-300">
                  Konsultansi & Pelatihan
                </p>
                <h3 className="mt-3 text-2xl font-bold text-slate-900 dark:text-slate-100 sm:text-3xl">
                  Pendampingan dari persiapan sampai proses akhir.
                </h3>

                <ol className="mt-7 space-y-3">
                  {accreditationSteps.map((step, index) => (
                    <li
                      key={step}
                      className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-950">
                      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white dark:bg-orange-600">
                        {index + 1}
                      </span>
                      <span className="text-sm font-medium leading-6 text-slate-700 dark:text-slate-200">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>

                <div className="mt-7">
                  <h4 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    Topik Pelatihan
                  </h4>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {trainingTopics.map((topic) => (
                      <li
                        key={topic}
                        className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-7 rounded-2xl border-l-4 border-l-primary bg-slate-900 p-5 text-white dark:bg-slate-800">
                  <p className="font-semibold">Penyusunan Dokumen Mutu</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Panduan Mutu, SOP, Instruksi Kerja, dan formulir sistem
                    manajemen maupun pengujian.
                  </p>
                </div>

                <a
                  href="#contact"
                  className="mt-7 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 font-semibold text-white transition hover:bg-orange-500">
                  Konsultasikan Kebutuhan
                </a>
              </article>
            </div>
          </div>
        </section>

        <section
          id="portfolio"
          data-reveal
          className="reveal-section scroll-mt-24 bg-white py-16 dark:bg-slate-900 lg:py-28">
          <div className="container">
            <div className="mb-10 px-4 text-center sm:mb-14">
              <span className="inline-flex rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-orange-700 dark:bg-orange-500/10 dark:text-orange-200">
                Galeri Kerja
              </span>
              <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl lg:text-6xl">
                Tampilkan dokumentasi terbaik dari setiap proyek kami.
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
                Jelajahi foto-foto terbaru dari kalibrasi, maintenance, dan
                pemasangan peralatan laboratorium di lapangan.
              </p>
            </div>
            <div className="grid gap-6 px-4 sm:grid-cols-2 xl:grid-cols-4">
              {galleryLinks.map((item) => (
                <Link
                  key={item.slug}
                  to={`/gallery/${item.slug}`}
                  data-reveal
                  className="reveal-card group overflow-hidden rounded-[28px] border border-slate-200 bg-white text-left transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-950/5 dark:border-slate-700 dark:bg-slate-950 dark:hover:border-orange-500/40">
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
                    <img
                      src={item.image}
                      srcSet={item.srcSet}
                      sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                      alt={`Dokumentasi ${item.title}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent" />
                    <span className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-xl text-slate-900 shadow-sm backdrop-blur transition group-hover:bg-primary group-hover:text-white">
                      <span aria-hidden="true">↗</span>
                    </span>
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-700">
                      {item.name}
                    </p>
                    <h3 className="mt-3 text-2xl font-bold text-slate-900 dark:text-slate-100">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                      Lihat dokumentasi pekerjaan selengkapnya.
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section
          id="clients"
          data-reveal
          className="reveal-section scroll-mt-24 bg-slate-50 py-20 text-slate-900 dark:bg-slate-900 dark:text-slate-100 lg:py-28">
          <div className="container">
            <div className="mb-10 w-full px-4 text-center sm:mb-14">
              <p className="mb-2 text-lg font-semibold text-orange-700 dark:text-orange-300">
                Perusahaan
              </p>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 sm:text-4xl lg:text-5xl">
                Yang Pernah Bekerjasama
              </h2>
              <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-600 dark:text-slate-300">
                Dipercaya oleh perusahaan energi, pertambangan, laboratorium,
                dan industri di berbagai wilayah Indonesia.
              </p>
            </div>
            <div className="w-full px-4">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6">
                {clientLogos.map((logo) => (
                  <div
                    key={logo.alt}
                    title={logo.alt}
                    className="group flex h-24 flex-col items-center justify-center gap-1 overflow-hidden rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-md sm:h-28 sm:p-4">
                    <div
                      className={`flex w-4/5 shrink-0 items-center justify-center ${logo.portrait ? "h-16 sm:h-[72px]" : "h-10 sm:h-12"}`}>
                      <img
                        loading="lazy"
                        src={logo.src}
                        alt={logo.alt}
                        className="block h-full w-full object-contain grayscale opacity-75 transition duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                      />
                    </div>
                    {logo.caption && (
                      <span className="text-center text-[10px] font-semibold leading-tight text-slate-500 transition group-hover:text-slate-700 sm:text-xs">
                        {logo.caption}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="faq"
          data-reveal
          className="reveal-section scroll-mt-24 bg-white py-20 dark:bg-slate-900 lg:py-28">
          <div className="container">
            <div className="mb-12 px-4 text-center">
              <span className="inline-flex rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-orange-700 dark:bg-orange-500/10 dark:text-orange-200">
                FAQ
              </span>
              <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl lg:text-6xl">
                Pertanyaan yang sering diajukan
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
                Semua jawaban singkat tentang layanan, proses, dan cara kerja
                kami.
              </p>
            </div>
            <div className="mx-auto max-w-4xl px-4">
              <div className="space-y-4">
                {faqItems.map((item, index) => {
                  const isOpen = index === openFaqIndex;
                  const questionId = `faq-question-${index}`;
                  const answerId = `faq-answer-${index}`;
                  return (
                    <div
                      key={item.question}
                      className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 transition sm:rounded-[28px] hover:border-orange-300 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:hover:border-orange-400 dark:hover:bg-slate-900">
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                        aria-expanded={isOpen}
                        aria-controls={answerId}
                        className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6">
                        <span
                          id={questionId}
                          className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                          {item.question}
                        </span>
                        <span
                          aria-hidden="true"
                          className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-300 text-xl text-slate-700 transition dark:border-slate-700 dark:text-slate-200 ${isOpen ? "border-primary bg-primary text-white" : "bg-white dark:bg-slate-900"}`}>
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>
                      {isOpen && (
                        <div
                          id={answerId}
                          role="region"
                          aria-labelledby={questionId}
                          className="px-5 pb-5 sm:px-6 sm:pb-6">
                          <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
                            {item.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section
          id="location"
          data-reveal
          className="reveal-section scroll-mt-24 bg-slate-50 py-20 dark:bg-slate-950 lg:py-28">
          <div className="container px-4">
            <div className="grid overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_30px_70px_-35px_rgba(15,23,42,0.35)] dark:border-slate-700 dark:bg-slate-900 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="p-7 sm:p-10 lg:p-12">
                <span className="inline-flex rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-orange-700 dark:bg-orange-500/10 dark:text-orange-200">
                  Lokasi Kami
                </span>
                <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
                  Kunjungi kantor Nepatech
                </h2>
                <p className="mt-5 leading-7 text-slate-600 dark:text-slate-300">
                  Grand Wisata, Cluster Garden Hous BG01 No. 75, Lambangjaya,
                  Tambun Selatan, Kabupaten Bekasi, Jawa Barat.
                </p>
                <a
                  href="https://maps.app.goo.gl/YWmghbVbgQzRdMFm7"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 font-semibold text-white transition hover:bg-orange-500">
                  Buka di Google Maps
                  <span aria-hidden="true">↗</span>
                </a>
              </div>

              <div className="min-h-[360px] bg-slate-200 lg:min-h-[460px]">
                <iframe
                  title="Lokasi PT. Nepatech Global Solusindo"
                  src="https://www.google.com/maps?q=Grand%20Wisata%20Cluster%20Garden%20Hous%20BG01%20No.%2075%20Lambangjaya%20Tambun%20Selatan%20Bekasi&output=embed"
                  className="h-full min-h-[360px] w-full border-0 lg:min-h-[460px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </section>

        <ContactForm />
      </main>

      <footer className="bg-slate-950 pb-10 pt-16 text-slate-300 sm:pt-20">
        <div className="container px-4">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="rounded-[32px] border border-slate-800 bg-slate-900/80 p-8 shadow-lg shadow-slate-900/20">
              <h3 className="mb-4 text-3xl font-bold text-white">
                Hubungi Kami
              </h3>
              <a
                href="mailto:operation@ntgs.co.id"
                className="block text-base text-slate-300 transition hover:text-orange-300">
                operation@ntgs.co.id
              </a>
              <a
                href="mailto:nepatech1gs@gmail.com"
                className="mt-1 block text-sm text-slate-400 transition hover:text-orange-300">
                nepatech1gs@gmail.com
              </a>
              <a
                href="tel:+6281267084525"
                className="mt-3 block text-base font-semibold text-white transition hover:text-orange-300">
                +62 812-6708-4525
              </a>
              <p className="mt-4 text-sm leading-7 text-slate-400">
                Grand Wisata, Cluster Garden Hous BG01 No. 75, Lambangjaya,
                Tambun Selatan, Kabupaten Bekasi, Jawa Barat.
              </p>
              <a
                href="https://maps.app.goo.gl/YWmghbVbgQzRdMFm7"
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex text-sm font-semibold text-orange-400 transition hover:text-orange-300">
                Lihat di Google Maps ↗
              </a>
            </div>
            <div className="rounded-[32px] border border-slate-800 bg-slate-900/80 p-8 shadow-lg shadow-slate-900/20">
              <h3 className="mb-5 text-xl font-semibold text-white">
                Galeri Kerja
              </h3>
              <ul className="space-y-3 text-slate-300">
                {galleryLinks.map((item) => (
                  <li key={item.slug}>
                    <Link
                      to={`/gallery/${item.slug}`}
                      className="inline-block text-base transition hover:text-orange-400">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[32px] border border-slate-800 bg-slate-900/80 p-8 shadow-lg shadow-slate-900/20">
              <h3 className="mb-5 text-xl font-semibold text-white">Tautan</h3>
              <ul className="space-y-3 text-slate-300">
                <li>
                  <a
                    href="#home"
                    className="inline-block text-base transition hover:text-orange-400">
                    Beranda
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="inline-block text-base transition hover:text-orange-400">
                    Tentang Kami
                  </a>
                </li>
                <li>
                  <a
                    href="#calibration-scope"
                    className="inline-block text-base transition hover:text-orange-400">
                    Kapabilitas
                  </a>
                </li>
                <li>
                  <a
                    href="#portfolio"
                    className="inline-block text-base transition hover:text-orange-400">
                    Galeri Kerja
                  </a>
                </li>
                <li>
                  <a
                    href="#clients"
                    className="inline-block text-base transition hover:text-orange-400">
                    Pelanggan
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="inline-block text-base transition hover:text-orange-400">
                    Kontak
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;

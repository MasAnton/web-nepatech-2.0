import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ContactForm from "../components/ContactForm";
import Seo from "../components/Seo";
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
    alt: "PT Gema Kreasi Perdana (GKP)",
    caption: "Gema Kreasi Perdana (GKP)",
  },
  {
    src: "/img/PNG/mandiri-coal.webp",
    alt: "Mandiri Coal - PT Mandiri Intiperkasa",
    caption: "Mandiri Coal",
  },
  {
    src: "/img/PNG/BPP.webp",
    alt: "PT Bara Prima Pratama",
    caption: "Bara Prima Pratama",
    portrait: true,
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
  {
    src: "/img/PNG/techno-consult-indonesia.webp",
    alt: "PT Techno Consult Indonesia",
    caption: "Techno Consult Indonesia",
    portrait: true,
  },
  {
    src: "/img/PNG/leon-testing-consultancy.webp",
    alt: "PT Leon Testing and Consultancy",
    caption: "Leon Testing & Consultancy",
  },
  {
    src: "/img/PNG/ugm.webp",
    alt: "Universitas Gadjah Mada",
    caption: "Universitas Gadjah Mada",
  },
  {
    src: "/img/PNG/unsoed.webp",
    alt: "Universitas Jenderal Soedirman",
    caption: "Universitas Jenderal Soedirman",
    portrait: true,
  },
  {
    src: "/img/PNG/itb.webp",
    alt: "Institut Teknologi Bandung",
    caption: "Institut Teknologi Bandung",
    portrait: true,
  },
  {
    src: "/img/PNG/universitas-indonesia.webp",
    alt: "Universitas Indonesia",
    caption: "Universitas Indonesia",
    portrait: true,
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
    compactLogo: true,
  },
  {
    id: "cv-nepa",
    src: "/img/carousel/hero/3.png",
    alt: "Logo CV. Nepa",
    label: "CV. Nepa",
    compactLogo: true,
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
  ["Layanan", "/layanan-kalibrasi"],
  ["Galeri Kerja", "/galeri"],
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

const showLoadedImage = (event) => {
  const image = event.currentTarget;
  image.classList.add("is-loaded");
  image.parentElement?.classList.add("media-loaded");
};

function CredentialHeroSlide({ slide }) {
  const hasMultipleLogos = slide.logos.length > 1;

  return (
    <div
      className="hero-slide flex h-[210px] w-full flex-col items-center justify-center bg-gradient-to-br from-white via-slate-50 to-orange-50 px-3 py-3 text-center sm:h-[300px] sm:px-10 sm:py-8 md:h-[360px] lg:h-[400px]"
      role="group"
      aria-roledescription="slide"
      aria-label={slide.label}>
      <span className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-orange-700 sm:text-xs">
        {slide.eyebrow}
      </span>
      <h2 className="mt-2 text-xl font-black tracking-tight text-slate-900 sm:mt-3 sm:text-3xl lg:text-4xl">
        {slide.title}
      </h2>
      {slide.description && (
        <p className="mt-1 max-w-2xl text-[11px] font-medium leading-4 text-slate-600 sm:mt-2 sm:text-sm sm:leading-5 lg:text-base lg:leading-6">
          {slide.description}
        </p>
      )}

      <div
        className={
          hasMultipleLogos
            ? "mt-3 grid w-full max-w-3xl grid-cols-3 gap-2 sm:mt-5 sm:gap-4"
            : "mt-3 flex justify-center sm:mt-5"
        }>
        {slide.logos.map((logo) => (
          <div
            key={logo.src}
            className={`flex items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm ${
              hasMultipleLogos
                ? "min-h-20 flex-col gap-1 p-2 sm:min-h-28 sm:gap-2 sm:p-4 lg:min-h-32 lg:p-5"
                : "h-16 w-40 p-2 sm:h-36 sm:w-80 sm:p-4 lg:h-40 lg:w-96"
            }`}>
            <img
              src={logo.src}
              alt={logo.alt}
              loading="eager"
              decoding="async"
              onLoad={showLoadedImage}
              onError={showLoadedImage}
              className={
                hasMultipleLogos
                  ? "smooth-media h-10 max-w-full object-contain sm:h-16 lg:h-20"
                  : "smooth-media h-full w-full object-contain"
              }
            />
            {logo.name && (
              <span className="text-[8px] font-bold leading-tight text-slate-700 sm:text-[10px] lg:text-xs">
                {logo.name}
              </span>
            )}
          </div>
        ))}
      </div>

      {slide.details && (
        <div className="mt-2 grid w-full max-w-3xl grid-cols-3 gap-1 sm:mt-4 sm:gap-3">
          {slide.details.map((detail) => (
            <div
              key={detail.title}
              className="block rounded-xl bg-slate-900 px-2 py-2 text-center text-white sm:px-3">
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
  const [carouselPaused, setCarouselPaused] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  });
  const [activeSection, setActiveSection] = useState(() => {
    if (typeof window === "undefined") return "home";
    const hash = decodeURIComponent(window.location.hash.slice(1));
    if (hash === "calibration-scope") return "about";
    return navLinks.some(([, href]) => href === `#${hash}`) ? hash : "home";
  });
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [showAllClients, setShowAllClients] = useState(false);
  const currentHeroSlide = heroSlides[activeSlide];

  useEffect(() => {
    if (carouselPaused) return undefined;

    const timeout = window.setTimeout(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 5000);
    return () => window.clearTimeout(timeout);
  }, [activeSlide, carouselPaused]);

  useEffect(() => {
    const imageSources = heroSlides.flatMap((slide) => [
      ...(slide.src ? [slide.src] : []),
      ...(slide.logos?.map((logo) => logo.src) ?? []),
    ]);
    let cancelled = false;

    const preloadCarouselImages = () => {
      if (cancelled) return;
      imageSources.forEach((src) => {
        const image = new Image();
        image.decoding = "async";
        image.src = src;
      });
    };

    const idleCallback = window.requestIdleCallback?.(
      preloadCarouselImages,
      { timeout: 1200 },
    );
    const fallbackTimer =
      idleCallback === undefined
        ? window.setTimeout(preloadCarouselImages, 150)
        : undefined;

    return () => {
      cancelled = true;
      if (idleCallback !== undefined) {
        window.cancelIdleCallback?.(idleCallback);
      }
      if (fallbackTimer !== undefined) {
        window.clearTimeout(fallbackTimer);
      }
    };
  }, []);

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

  const handleSectionNavigation = (event, href) => {
    const targetId = href.replace("#", "");
    const target = document.getElementById(targetId);
    if (!target) return;

    event.preventDefault();
    setMenuOpen(false);
    setActiveSection(targetId === "calibration-scope" ? "about" : targetId);

    const prefersReducedMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });

    const nextUrl = `${window.location.pathname}${window.location.search}${href}`;
    window.history.replaceState(window.history.state, "", nextUrl);
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
      <div className="fixed bottom-3 right-3 z-40 sm:bottom-5 sm:right-5">
        <a
          href="https://api.whatsapp.com/send?phone=6281267084525"
          target="_blank"
          rel="noreferrer">
          <img
            src="/img/logoWA.png"
            className="w-[44px] transition-transform duration-300 hover:scale-110 sm:w-[50px] md:w-[70px] lg:w-[80px]"
            alt="WhatsApp"
          />
        </a>
      </div>

      <header
        data-site-header
        className="fixed inset-x-0 top-0 z-50 w-full border-b border-slate-200 bg-white/95 shadow-lg backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/95">
        <div className="container relative">
          <div className="flex items-center justify-between gap-2 px-0 py-2 sm:gap-3 sm:px-4 sm:py-3 lg:py-0">
            <div>
              <a
                href="#home"
                onClick={(event) =>
                  handleSectionNavigation(event, "#home")
                }
                className="inline-flex rounded-lg p-1 transition-opacity duration-300 hover:opacity-90 sm:rounded-xl sm:p-1.5">
                <img
                  src={
                    darkMode
                      ? "/img/logoNGS_dark.png?v=2"
                      : "/img/logoNGS.png"
                  }
                  className="w-[82px] sm:w-[120px]"
                  alt="PT. Nepatech Global Solusindo"
                />
              </a>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 lg:order-3">
              <button
                type="button"
                onClick={toggleDarkMode}
                className="inline-flex items-center whitespace-nowrap rounded-full border border-slate-300 bg-white/90 px-2.5 py-1.5 text-[11px] font-semibold text-slate-900 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-100 dark:hover:bg-slate-800 sm:px-4 sm:py-2 sm:text-sm"
                aria-label={
                  darkMode ? "Aktifkan mode terang" : "Aktifkan mode gelap"
                }>
                {darkMode ? "Light Mode" : "Dark Mode"}
              </button>
              <button
                type="button"
                className="inline-flex h-9 w-9 shrink-0 flex-col items-center justify-center rounded-lg border border-slate-300 bg-white/90 text-slate-900 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-100 dark:hover:bg-slate-800 sm:h-11 sm:w-11 lg:hidden"
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
                  const isPageLink = href.startsWith("/");
                  const id = href.replace("#", "");
                  const isActive = activeSection === id;
                  const isContact = id === "contact";
                  return (
                    <li key={label} className="group">
                      {isPageLink ? (
                        <Link
                          to={href}
                          className="site-nav-link mx-3 flex py-2 text-sm font-semibold text-slate-900 dark:text-slate-100 xl:mx-5">
                          {label}
                        </Link>
                      ) : (
                        <a
                          href={href}
                          onClick={(event) =>
                            handleSectionNavigation(event, href)
                          }
                          aria-current={isActive ? "location" : undefined}
                          className={
                            isContact
                              ? `site-nav-contact ml-3 inline-flex rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-500 xl:ml-5 ${isActive ? "is-active" : ""}`
                              : `site-nav-link mx-3 flex py-2 text-sm font-semibold xl:mx-5 ${isActive ? "is-active text-orange-700 dark:text-orange-300" : "text-slate-900 dark:text-slate-100"}`
                          }>
                          {label}
                        </a>
                      )}
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
              className="mobile-menu-enter absolute inset-x-0 top-full max-h-[calc(100vh-4rem)] overflow-y-auto rounded-b-2xl border border-t-0 border-slate-200 bg-white/95 p-2 shadow-xl backdrop-blur-xl dark:border-slate-700 dark:bg-slate-950/95 sm:inset-x-4 sm:max-h-[calc(100vh-5rem)] sm:p-3 lg:hidden">
              <ul className="space-y-1">
                {navLinks.map(([label, href]) => {
                  const isPageLink = href.startsWith("/");
                  const className = `block rounded-lg px-3 py-2 text-sm font-semibold transition sm:rounded-xl sm:px-4 sm:py-3 ${href === "#contact" ? "bg-primary text-center text-white hover:bg-orange-500" : activeSection === href.slice(1) ? "border-l-4 border-primary bg-slate-100 text-orange-700 dark:bg-slate-800 dark:text-orange-300" : "border-l-4 border-transparent text-slate-900 hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800"}`;

                  return (
                    <li key={label}>
                      {isPageLink ? (
                        <Link
                          to={href}
                          className={className}
                          onClick={() => setMenuOpen(false)}>
                          {label}
                        </Link>
                      ) : (
                        <a
                          href={href}
                          aria-current={
                            activeSection === href.slice(1)
                              ? "location"
                              : undefined
                          }
                          className={className}
                          onClick={(event) =>
                            handleSectionNavigation(event, href)
                          }>
                          {label}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          )}
        </div>
      </header>

      <main>
        <section
          id="home"
          className="hero-surface home-hero-surface relative scroll-mt-20 overflow-hidden pb-8 pt-20 sm:scroll-mt-24 sm:pb-16 sm:pt-32 lg:pb-20 lg:pt-36">
          <div className="hero-glow" />
          <div className="container">
            <div className="hero-enter px-0 sm:px-4">
              <div className="text-center">
                <div className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-orange-700 shadow-sm shadow-primary/10 dark:bg-orange-500/10 dark:text-orange-200 sm:px-4 sm:py-2 sm:text-sm">
                  <span className="mr-2 inline-flex h-2 w-2 rounded-full bg-primary" />
                  PT. Nepatech Global Solusindo
                </div>
                <h1 className="mx-auto mt-4 max-w-[1320px] text-balance text-[28px] font-black leading-[1.08] tracking-[-0.035em] text-slate-900 dark:text-slate-100 sm:mt-6 sm:text-5xl sm:leading-[1.04] md:text-6xl lg:text-[80px] lg:leading-[0.98] xl:text-[88px] 2xl:text-[96px]">
                  Solusi laboratorium andal untuk operasional modern
                </h1>
                <p className="mx-auto mt-3 max-w-4xl text-[13px] leading-5 text-slate-600 dark:text-slate-300 sm:mt-5 sm:text-lg sm:leading-8 lg:text-xl lg:leading-9">
                  Kalibrasi dalam ruang lingkup KAN LK-377-IDN, didukung
                  maintenance, supply, konsultansi akreditasi, dan pelatihan
                  untuk kebutuhan laboratorium industri.
                </p>
                <div className="mt-5 flex flex-col justify-center gap-2 sm:mt-8 sm:flex-row sm:gap-3">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-center text-[13px] font-semibold text-white transition duration-300 hover:bg-orange-500 sm:px-8 sm:py-4 sm:text-base">
                    Diskusikan Kebutuhan
                  </a>
                  <a
                    href="#calibration-scope"
                    className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white/80 px-5 py-2.5 text-center text-[13px] font-semibold text-slate-900 transition duration-300 hover:border-primary hover:text-orange-700 dark:border-slate-700 dark:bg-slate-900/80 dark:text-white dark:hover:text-orange-300 sm:px-8 sm:py-4 sm:text-base">
                    Lihat Ruang Lingkup
                  </a>
                </div>
              </div>

              <div className="mx-auto mt-6 max-w-6xl sm:mt-10 xl:max-w-[1240px]">
                <div
                  role="region"
                  aria-roledescription="carousel"
                  aria-label="Akreditasi dan profil perusahaan"
                  aria-live="off"
                  className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 dark:border-slate-700 sm:rounded-[28px]">
                  {currentHeroSlide.type === "credential" ? (
                    <CredentialHeroSlide
                      key={currentHeroSlide.id}
                      slide={currentHeroSlide}
                    />
                  ) : (
                    <div
                      key={currentHeroSlide.id}
                      className="hero-slide flex h-[210px] w-full items-center justify-center overflow-hidden p-3 sm:h-[300px] sm:p-5 md:h-[360px] lg:h-[400px]">
                      <img
                        loading="eager"
                        fetchPriority="high"
                        decoding="async"
                        src={currentHeroSlide.src}
                        alt={currentHeroSlide.alt}
                        onLoad={showLoadedImage}
                        onError={showLoadedImage}
                        className={`hero-logo-media max-h-full w-full object-contain${
                          currentHeroSlide.compactLogo
                            ? " hero-logo-media--compact"
                            : ""
                        }`}
                      />
                    </div>
                  )}
                  <div className="border-t border-slate-200 bg-white px-3 py-2.5 dark:border-slate-700 dark:bg-slate-950 sm:px-5 sm:py-3">
                    <div className="mx-auto flex max-w-xl flex-nowrap items-center justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-semibold text-slate-700 dark:text-slate-200 sm:text-sm">
                          {currentHeroSlide.label}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setActiveSlide(
                              (current) =>
                                (current - 1 + heroSlides.length) %
                                heroSlides.length,
                            );
                          }}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 sm:h-9 sm:w-9"
                          aria-label="Slide sebelumnya">
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 20 20"
                            className="h-4 w-4 fill-none stroke-current"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <path d="m12.5 15-5-5 5-5" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={() => setCarouselPaused((current) => !current)}
                          className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition sm:h-9 sm:w-9 ${carouselPaused ? "bg-orange-100 text-orange-700 hover:bg-orange-200 dark:bg-orange-500/15 dark:text-orange-300 dark:hover:bg-orange-500/25" : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"}`}
                          aria-label={
                            carouselPaused
                              ? "Putar carousel otomatis"
                              : "Jeda carousel otomatis"
                          }
                          aria-pressed={carouselPaused}>
                          {carouselPaused ? (
                            <svg
                              aria-hidden="true"
                              viewBox="0 0 20 20"
                              className="h-3.5 w-3.5 fill-current">
                              <path d="M6.5 4.75a1 1 0 0 1 1.53-.85l7 5.25a1 1 0 0 1 0 1.7l-7 5.25a1 1 0 0 1-1.53-.85V4.75Z" />
                            </svg>
                          ) : (
                            <svg
                              aria-hidden="true"
                              viewBox="0 0 20 20"
                              className="h-3.5 w-3.5 fill-current">
                              <rect x="5" y="4" width="3.5" height="12" rx="1" />
                              <rect x="11.5" y="4" width="3.5" height="12" rx="1" />
                            </svg>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveSlide(
                              (current) => (current + 1) % heroSlides.length,
                            );
                          }}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 sm:h-9 sm:w-9"
                          aria-label="Slide berikutnya">
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 20 20"
                            className="h-4 w-4 fill-none stroke-current"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <path d="m7.5 5 5 5-5 5" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="mt-2.5 flex justify-center gap-1.5 sm:gap-2">
                      {heroSlides.map((slide, index) => (
                        <button
                          key={slide.id}
                          type="button"
                          onClick={() => {
                            setActiveSlide(index);
                          }}
                          className={`h-1.5 w-4 rounded-full transition sm:w-7 ${activeSlide === index ? "bg-primary" : "bg-slate-300 hover:bg-slate-400 dark:bg-slate-700 dark:hover:bg-slate-600"}`}
                          aria-label={`Tampilkan ${slide.label}`}
                          aria-pressed={activeSlide === index}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-2.5 grid grid-cols-[1fr_auto] items-center gap-2 rounded-xl border border-slate-800 bg-slate-950 px-3 py-2.5 text-left text-white shadow-lg shadow-slate-950/10 sm:mt-4 sm:grid-cols-[auto_auto_1fr] sm:gap-5 sm:rounded-2xl sm:px-6 sm:py-4">
                  <div className="flex items-center gap-2 text-sm font-semibold sm:text-base">
                    <span className="inline-flex h-2 w-2 rounded-full bg-primary" />
                    KAN LK-377-IDN
                  </div>
                  <p className="text-xs text-slate-300 sm:border-l sm:border-slate-700 sm:pl-5 sm:text-sm">
                    SNI ISO/IEC 17025:2017
                  </p>
                  <p className="hidden text-xs leading-5 text-slate-400 sm:block sm:text-right sm:text-sm sm:leading-6">
                    Kesesuaian alat, metode, dan rentang ukur dikonfirmasi
                    sebelum pekerjaan dimulai.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="about"
          className="light-ambient-surface scroll-mt-20 bg-white/70 py-8 dark:bg-slate-950 sm:scroll-mt-24 sm:py-16 lg:py-24">
          <div data-reveal className="reveal-content container">
            <div className="section-card grid gap-6 sm:gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
              <div>
                <span className="mb-2 inline-flex rounded-full bg-orange-100 px-2.5 py-1 text-[11px] font-semibold text-orange-700 dark:bg-orange-500/10 dark:text-orange-200 sm:mb-3 sm:px-4 sm:py-2 sm:text-sm">
                  Solusi Laboratorium Terintegrasi
                </span>
                <h2 className="mt-2 text-[22px] font-bold leading-tight text-slate-900 dark:text-slate-100 sm:mt-4 sm:text-4xl lg:text-5xl">
                  Dukungan teknis dan sistem mutu dalam satu mitra.
                </h2>
                <p className="mt-3 max-w-xl text-[13px] leading-5 text-slate-600 dark:text-slate-300 sm:mt-6 sm:text-lg sm:leading-8">
                  Kami membantu kebutuhan laboratorium mulai dari kalibrasi dan
                  perawatan alat hingga pendampingan akreditasi, pelatihan, dan
                  penyusunan dokumen mutu.
                </p>
                <div className="mt-5 grid grid-cols-2 gap-2 sm:mt-8 sm:gap-4">
                  {serviceItems.map((item) => (
                    <div
                      key={item.title}
                      className="group rounded-xl border border-slate-200 bg-slate-50 px-3 py-3.5 transition duration-300 hover:-translate-y-1 hover:border-orange-300 hover:bg-white hover:shadow-lg dark:border-slate-700 dark:bg-slate-950 dark:hover:border-orange-500/50 dark:hover:bg-slate-900 sm:rounded-3xl sm:px-5 sm:py-6">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-[11px] font-bold text-orange-700 transition group-hover:bg-primary group-hover:text-white dark:bg-orange-500/15 dark:text-orange-300 sm:h-9 sm:w-9 sm:text-xs">
                        {item.number}
                      </span>
                      <h3 className="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-100 sm:mt-4 sm:text-lg">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 hidden text-[13px] leading-5 text-slate-500 dark:text-slate-400 sm:mt-2 sm:block sm:text-sm sm:leading-6">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
                <Link
                  to="/layanan-kalibrasi"
                  className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-[13px] font-semibold text-slate-900 transition hover:border-primary hover:text-orange-700 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:border-primary dark:hover:text-orange-300 sm:mt-7 sm:px-6 sm:text-sm">
                  Pelajari layanan kalibrasi
                </Link>
              </div>
              <div className="flex items-center justify-center">
                <div className="rounded-2xl border border-slate-200 bg-slate-950/5 p-3 shadow-lg sm:rounded-[32px] sm:p-6">
                  <div className="mb-3 rounded-xl bg-white p-4 shadow-sm dark:bg-slate-900 sm:mb-6 sm:rounded-3xl sm:p-6">
                    <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 sm:text-xl">
                      Tentang Kami
                    </h3>
                    <p className="mt-2 text-[13px] leading-5 text-slate-600 dark:text-slate-300 sm:mt-4 sm:text-base sm:leading-7">
                      Laboratorium kalibrasi kami terakreditasi KAN dengan nomor
                      LK-377-IDN sesuai SNI ISO/IEC 17025:2017 untuk ruang
                      lingkup yang ditetapkan.
                    </p>
                  </div>
                  <div className="navy-accent-card rounded-xl border border-slate-800 border-l-4 border-l-primary bg-slate-950 px-4 py-3 text-white shadow-xl dark:bg-slate-900 sm:rounded-3xl sm:px-6 sm:py-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-300 sm:text-sm">
                      Dipercaya Lintas Industri
                    </p>
                    <p className="mt-2 text-xl font-bold sm:mt-3 sm:text-3xl">
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
          className="capabilities-surface relative scroll-mt-20 overflow-hidden py-8 sm:scroll-mt-24 sm:py-16 lg:py-24">
          <div data-reveal className="reveal-content container px-0 sm:px-4">
            <div className="mx-auto mb-6 max-w-3xl text-center sm:mb-14">
              <span className="inline-flex rounded-full bg-orange-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-700 dark:bg-orange-500/10 dark:text-orange-200 sm:px-4 sm:py-2 sm:text-sm sm:tracking-[0.2em]">
                Kapabilitas
              </span>
              <h2
                id="calibration-scope-title"
                className="mt-3 text-[22px] font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100 sm:mt-5 sm:text-4xl md:text-5xl">
                Layanan yang relevan dengan kebutuhan laboratorium Anda.
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-[13px] leading-5 text-slate-600 dark:text-slate-300 sm:mt-6 sm:text-lg sm:leading-8">
                Dari pekerjaan teknis hingga pengembangan sistem mutu, setiap
                kebutuhan dibahas lebih dulu agar ruang lingkupnya tepat.
              </p>
            </div>

            <div className="grid gap-3 sm:gap-6 lg:grid-cols-2">
              <article className="section-card relative border-t-4 border-t-slate-900 dark:border-t-primary">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-700 dark:text-orange-300 sm:text-sm">
                      Divisi Kalibrasi
                    </p>
                    <h3 className="mt-2 text-lg font-bold text-slate-900 dark:text-slate-100 sm:mt-3 sm:text-3xl">
                      Ringkasan ruang lingkup
                    </h3>
                  </div>
                  <div className="shrink-0 self-start rounded-xl border border-slate-900 bg-slate-950 px-3 py-2 text-xs font-semibold text-white dark:border-orange-500/40 dark:bg-orange-500/10 dark:text-orange-200 sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm">
                    KAN LK-377-IDN
                  </div>
                </div>

                <p className="mt-3 text-[13px] leading-5 text-slate-600 dark:text-slate-300 sm:mt-5 sm:text-base sm:leading-7">
                  Laboratorium kalibrasi terakreditasi sesuai SNI ISO/IEC
                  17025:2017 untuk alat dan rentang ukur yang tercantum dalam
                  ruang lingkup resmi.
                </p>

                <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-7 sm:gap-4">
                  {calibrationScopes.map((scope) => (
                    <div
                      key={scope.title}
                      className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-950 sm:rounded-2xl sm:p-5">
                      <span className="text-xs font-bold text-orange-700 dark:text-orange-300">
                        {scope.number}
                      </span>
                      <h4 className="mt-1.5 text-sm font-semibold text-slate-900 dark:text-slate-100 sm:mt-2 sm:text-lg">
                        {scope.title}
                      </h4>
                      <p className="mt-1.5 hidden text-xs leading-5 text-slate-600 dark:text-slate-400 sm:mt-2 sm:block sm:text-sm sm:leading-6">
                        {scope.description}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="mt-4 rounded-xl bg-slate-100 px-3 py-2.5 text-xs leading-5 text-slate-600 dark:bg-slate-800 dark:text-slate-300 sm:mt-6 sm:rounded-2xl sm:px-5 sm:py-4 sm:text-sm sm:leading-6">
                  Kesesuaian jenis alat, metode, dan rentang ukur akan
                  dikonfirmasi oleh tim sebelum pekerjaan dimulai.
                </p>
                <a
                  href="https://drive.google.com/drive/folders/1tsmilFpcN36EiXv0l7QQBm9LcxvT9Nsg"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Lihat dokumen ruang lingkup kalibrasi di Google Drive, buka di tab baru"
                  className="mt-4 flex w-full items-center justify-between gap-3 rounded-xl border border-primary bg-primary px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:border-orange-500 hover:bg-orange-500 dark:border-primary dark:bg-primary dark:text-white dark:hover:border-orange-500 dark:hover:bg-orange-500 sm:mt-5 sm:gap-4 sm:rounded-2xl sm:px-5 sm:py-4 sm:text-sm">
                  <span>Lihat Dokumen Ruang Lingkup</span>
                  <span
                    aria-hidden="true"
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20 text-sm text-white sm:h-9 sm:w-9 sm:text-base">
                    ↗
                  </span>
                </a>
                <Link
                  to="/ruang-lingkup"
                  className="mt-2.5 flex min-h-11 w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-900 transition hover:border-primary hover:text-orange-700 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:border-primary dark:hover:text-orange-300 sm:rounded-2xl sm:text-sm">
                  Baca ringkasan ruang lingkup
                </Link>
              </article>

              <article className="section-card relative border-t-4 border-t-primary">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-700 dark:text-orange-300 sm:text-sm">
                  Konsultansi & Pelatihan
                </p>
                <h3 className="mt-2 text-lg font-bold text-slate-900 dark:text-slate-100 sm:mt-3 sm:text-3xl">
                  Pendampingan dari persiapan sampai proses akhir.
                </h3>

                <ol className="mt-5 space-y-2 sm:mt-7 sm:space-y-3">
                  {accreditationSteps.map((step, index) => (
                    <li
                      key={step}
                      className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-950 sm:gap-4 sm:rounded-2xl sm:px-4 sm:py-3">
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white dark:bg-orange-600 sm:h-9 sm:w-9 sm:text-sm">
                        {index + 1}
                      </span>
                      <span className="text-[13px] font-medium leading-5 text-slate-700 dark:text-slate-200 sm:text-sm sm:leading-6">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>

                <div className="mt-5 sm:mt-7">
                  <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400 sm:text-sm sm:tracking-[0.18em]">
                    Topik Pelatihan
                  </h4>
                  <ul className="mt-3 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
                    {trainingTopics.map((topic) => (
                      <li
                        key={topic}
                        className="rounded-full border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 sm:px-3 sm:py-2 sm:text-xs">
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 rounded-xl border-l-4 border-l-primary bg-slate-900 p-4 text-white dark:bg-slate-800 sm:mt-7 sm:rounded-2xl sm:p-5">
                  <p className="text-sm font-semibold sm:text-base">Penyusunan Dokumen Mutu</p>
                  <p className="mt-1.5 text-xs leading-5 text-slate-300 sm:mt-2 sm:text-sm sm:leading-6">
                    Panduan Mutu, SOP, Instruksi Kerja, dan formulir sistem
                    manajemen maupun pengujian.
                  </p>
                </div>

                <div className="mt-5 flex flex-col gap-2.5 sm:mt-7 sm:flex-row">
                  <a
                    href="#contact"
                    className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-500 sm:px-6 sm:py-3 sm:text-base">
                    Konsultasikan Kebutuhan
                  </a>
                  <Link
                    to="/konsultasi-pelatihan"
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:border-primary hover:text-orange-700 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:border-primary dark:hover:text-orange-300 sm:px-6 sm:py-3 sm:text-base">
                    Pelajari program
                  </Link>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section
          id="clients"
          className="light-grid-surface scroll-mt-20 bg-slate-50 py-8 text-slate-900 dark:bg-slate-900 dark:text-slate-100 sm:scroll-mt-24 sm:py-20 lg:py-28">
          <div data-reveal className="reveal-content container">
            <div className="mb-6 w-full px-0 text-center sm:mb-14 sm:px-4">
              <p className="mb-1.5 text-xs font-semibold text-orange-700 dark:text-orange-300 sm:mb-2 sm:text-lg">
                Perusahaan
              </p>
              <h2 className="text-[22px] font-bold leading-tight text-slate-900 dark:text-slate-100 sm:text-4xl lg:text-5xl">
                Yang Pernah Bekerjasama
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-[13px] leading-5 text-slate-600 dark:text-slate-300 sm:mt-5 sm:text-base sm:leading-7">
                Dipercaya oleh perusahaan energi, pertambangan, laboratorium,
                dan industri di berbagai wilayah Indonesia.
              </p>
            </div>
            <div className="w-full">
              <div
                id="client-logo-grid"
                className="grid grid-cols-3 gap-1.5 sm:gap-3 md:grid-cols-4 lg:grid-cols-6">
                {clientLogos.map((logo, index) => (
                  <div
                    key={logo.alt}
                    title={logo.alt}
                    className={`${!showAllClients && index >= 12 ? "hidden sm:flex" : "flex"} group h-16 flex-col items-center justify-center gap-1 overflow-hidden rounded-lg border border-slate-200 bg-white px-1.5 py-1.5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-md sm:h-28 sm:rounded-2xl sm:p-4`}>
                    <div
                      className={`flex w-full shrink-0 items-center justify-center rounded-lg bg-transparent ${
                        logo.portrait
                          ? logo.caption
                            ? "h-9 sm:h-14"
                            : "h-10 sm:h-[72px]"
                          : "h-7 sm:h-12"
                      }`}>
                      <img
                        loading="lazy"
                        decoding="async"
                        src={logo.src}
                        alt={logo.alt}
                        className="block h-full w-full object-contain transition duration-300 lg:grayscale lg:opacity-75 lg:group-hover:scale-[1.03] lg:group-hover:grayscale-0 lg:group-hover:opacity-100"
                      />
                    </div>
                    {logo.caption && (
                      <span className="text-center text-[9px] font-semibold leading-tight text-slate-600 transition group-hover:text-slate-700 sm:text-xs">
                        {logo.caption}
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <button
                type="button"
                aria-expanded={showAllClients}
                aria-controls="client-logo-grid"
                onClick={() => {
                  if (showAllClients) {
                    setShowAllClients(false);
                    window.requestAnimationFrame(() => {
                      document.getElementById("clients")?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    });
                    return;
                  }

                  setShowAllClients(true);
                }}
                className="mx-auto mt-5 inline-flex min-h-11 items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-[13px] font-semibold text-slate-800 shadow-sm transition hover:border-primary hover:text-orange-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:hover:border-primary dark:hover:text-orange-300 sm:hidden">
                {showAllClients
                  ? "Tampilkan lebih sedikit"
                  : `Lihat semua ${clientLogos.length} pelanggan`}
              </button>
            </div>
          </div>
        </section>

        <section
          id="faq"
          className="light-ambient-surface scroll-mt-20 bg-white py-8 dark:bg-slate-900 sm:scroll-mt-24 sm:py-20 lg:py-28">
          <div data-reveal className="reveal-content container">
            <div className="mb-6 px-0 text-center sm:mb-12 sm:px-4">
              <span className="inline-flex rounded-full bg-orange-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-700 dark:bg-orange-500/10 dark:text-orange-200 sm:px-4 sm:py-2 sm:text-sm sm:tracking-[0.2em]">
                FAQ
              </span>
              <h2 className="mt-3 text-[22px] font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100 sm:mt-5 sm:text-4xl md:text-5xl lg:text-6xl">
                Pertanyaan yang sering diajukan
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-[13px] leading-5 text-slate-600 dark:text-slate-300 sm:mt-6 sm:text-lg sm:leading-8">
                Semua jawaban singkat tentang layanan, proses, dan cara kerja
                kami.
              </p>
            </div>
            <div className="mx-auto max-w-4xl px-0 sm:px-4">
              <div className="space-y-2.5 sm:space-y-4">
                {faqItems.map((item, index) => {
                  const isOpen = index === openFaqIndex;
                  const questionId = `faq-question-${index}`;
                  const answerId = `faq-answer-${index}`;
                  return (
                    <div
                      key={item.question}
                      className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition sm:rounded-[28px] hover:border-orange-300 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:hover:border-orange-400 dark:hover:bg-slate-900">
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                        aria-expanded={isOpen}
                        aria-controls={answerId}
                        className="flex w-full items-center justify-between gap-3 p-3 text-left sm:gap-4 sm:p-6">
                        <span
                          id={questionId}
                          className="text-sm font-semibold leading-5 text-slate-900 dark:text-slate-100 sm:text-lg">
                          {item.question}
                        </span>
                        <span
                          aria-hidden="true"
                          className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-300 text-base text-slate-700 transition dark:border-slate-700 dark:text-slate-200 sm:h-10 sm:w-10 sm:text-xl ${isOpen ? "border-primary bg-primary text-white" : "bg-white dark:bg-slate-900"}`}>
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>
                      {isOpen && (
                        <div
                          id={answerId}
                          role="region"
                          aria-labelledby={questionId}
                          className="px-3 pb-3 sm:px-6 sm:pb-6">
                          <p className="text-[13px] leading-5 text-slate-600 dark:text-slate-300 sm:text-sm sm:leading-7">
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
          className="light-grid-surface scroll-mt-20 bg-slate-50 py-8 dark:bg-slate-950 sm:scroll-mt-24 sm:py-20 lg:py-28">
          <div data-reveal className="reveal-content container px-0 sm:px-4">
            <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_30px_70px_-35px_rgba(15,23,42,0.35)] dark:border-slate-700 dark:bg-slate-900 sm:rounded-[32px] lg:grid-cols-[0.85fr_1.15fr]">
              <div className="p-4 sm:p-10 lg:p-12">
                <span className="inline-flex rounded-full bg-orange-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-700 dark:bg-orange-500/10 dark:text-orange-200 sm:px-4 sm:py-2 sm:text-sm sm:tracking-[0.2em]">
                  Lokasi Kami
                </span>
                <h2 className="mt-3 text-[22px] font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100 sm:mt-6 sm:text-4xl">
                  Kunjungi kantor Nepatech
                </h2>
                <p className="mt-3 text-[13px] leading-5 text-slate-600 dark:text-slate-300 sm:mt-5 sm:text-base sm:leading-7">
                  Grand Wisata, Cluster Garden Hous BG01 No. 75, Lambangjaya,
                  Tambun Selatan, Kabupaten Bekasi, Jawa Barat.
                </p>
                <a
                  href="https://maps.app.goo.gl/YWmghbVbgQzRdMFm7"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-[13px] font-semibold text-white transition hover:bg-orange-500 sm:mt-8 sm:px-7 sm:py-3 sm:text-base">
                  Buka di Google Maps
                  <span aria-hidden="true">↗</span>
                </a>
              </div>

              <div className="min-h-[220px] bg-slate-200 sm:min-h-[360px] lg:min-h-[460px]">
                <iframe
                  title="Lokasi PT. Nepatech Global Solusindo"
                  src="https://www.google.com/maps?q=Grand%20Wisata%20Cluster%20Garden%20Hous%20BG01%20No.%2075%20Lambangjaya%20Tambun%20Selatan%20Bekasi&output=embed"
                  className="h-full min-h-[220px] w-full border-0 sm:min-h-[360px] lg:min-h-[460px]"
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

      <footer className="bg-slate-950 pb-6 pt-8 text-slate-300 sm:pb-10 sm:pt-20">
        <div className="container px-0 sm:px-4">
          <div className="grid gap-4 sm:gap-10 lg:grid-cols-3">
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg shadow-slate-900/20 sm:rounded-[32px] sm:p-8">
              <h3 className="mb-3 text-xl font-bold text-white sm:mb-4 sm:text-3xl">
                Hubungi Kami
              </h3>
              <a
                href="mailto:operation@ntgs.co.id"
                className="block text-sm text-slate-300 transition hover:text-orange-300 sm:text-base">
                operation@ntgs.co.id
              </a>
              <a
                href="mailto:nepatech1gs@gmail.com"
                className="mt-1 block text-sm text-slate-400 transition hover:text-orange-300">
                nepatech1gs@gmail.com
              </a>
              <a
                href="tel:+6281267084525"
                className="mt-3 block text-sm font-semibold text-white transition hover:text-orange-300 sm:text-base">
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
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg shadow-slate-900/20 sm:rounded-[32px] sm:p-8">
              <h3 className="mb-4 text-lg font-semibold text-white sm:mb-5 sm:text-xl">
                Galeri Kerja
              </h3>
              <p className="text-sm leading-6 text-slate-400 sm:text-base">
                Lihat dokumentasi kalibrasi, maintenance, dan pemasangan
                peralatan pada halaman galeri khusus.
              </p>
              <Link
                to="/galeri"
                className="mt-4 inline-flex text-sm font-semibold text-orange-400 transition hover:text-orange-300 sm:text-base">
                Buka Galeri Kerja →
              </Link>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg shadow-slate-900/20 sm:rounded-[32px] sm:p-8">
              <h3 className="mb-4 text-lg font-semibold text-white sm:mb-5 sm:text-xl">Tautan</h3>
              <ul className="space-y-2.5 text-slate-300 sm:space-y-3">
                <li>
                  <a
                    href="#home"
                    className="inline-block text-sm transition hover:text-orange-400 sm:text-base">
                    Beranda
                  </a>
                </li>
                <li>
                  <Link
                    to="/layanan-kalibrasi"
                    className="inline-block text-sm transition hover:text-orange-400 sm:text-base">
                    Layanan Kalibrasi
                  </Link>
                </li>
                <li>
                  <Link
                    to="/ruang-lingkup"
                    className="inline-block text-sm transition hover:text-orange-400 sm:text-base">
                    Ruang Lingkup
                  </Link>
                </li>
                <li>
                  <Link
                    to="/konsultasi-pelatihan"
                    className="inline-block text-sm transition hover:text-orange-400 sm:text-base">
                    Konsultansi & Pelatihan
                  </Link>
                </li>
                <li>
                  <Link
                    to="/galeri"
                    className="inline-block text-sm transition hover:text-orange-400 sm:text-base">
                    Galeri Kerja
                  </Link>
                </li>
                <li>
                  <Link
                    to="/kontak"
                    className="inline-block text-sm transition hover:text-orange-400 sm:text-base">
                    Kontak
                  </Link>
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

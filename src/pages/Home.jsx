import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ContactForm from "../components/ContactForm";
import Seo from "../components/Seo";

const galleryLinks = [
  {
    slug: "furnace",
    name: "Suhu",
    title: "Furnace",
    image: "/img/galery/Furnace/1.jpg",
  },
  {
    slug: "kalorimeter",
    name: "Instrument",
    title: "Kalorimeter",
    image: "/img/galery/Kalorimeter/1.jpg",
  },
  {
    slug: "laboratory-mill",
    name: "Laboratory Mill",
    title: "Laboratory Mill",
    image: "/img/galery/LabMill/1.jpg",
  },
  {
    slug: "timbangan",
    name: "Massa",
    title: "Timbangan",
    image: "/img/galery/Massa/1.jpg",
  },
];

const clientLogos = [
  { src: "/img/PNG/atq.png", alt: "ATQ" },
  { src: "/img/PNG/Aetra.png", alt: "Aetra" },
  { src: "/img/PNG/Antam.png", alt: "Antam" },
  { src: "/img/PNG/BP.png", alt: "BP" },
  { src: "/img/PNG/BSA.png", alt: "BSA" },
  { src: "/img/PNG/CGR.png", alt: "CGR" },
  { src: "/img/PNG/Geomin.png", alt: "Geomin" },
  { src: "/img/PNG/Geoservices.png", alt: "Geoservices" },
  { src: "/img/PNG/IBIS.png", alt: "IBIS" },
  { src: "/img/PNG/IP.png", alt: "IP" },
  { src: "/img/PNG/Krakatau.png", alt: "Krakatau" },
  { src: "/img/PNG/LBE.png", alt: "LBE" },
  { src: "/img/PNG/MA.png", alt: "MA" },
  { src: "/img/PNG/MSK.png", alt: "MSK" },
  { src: "/img/PNG/Nusantara Power.png", alt: "Nusantara Power" },
  { src: "/img/PNG/PJB.png", alt: "PJB" },
  { src: "/img/PNG/PLN.png", alt: "PLN" },
  { src: "/img/PNG/SCCI.png", alt: "SCCI" },
  { src: "/img/PNG/Sucofindo.png", alt: "Sucofindo" },
  { src: "/img/PNG/Surveyor Indonesia.png", alt: "Surveyor Indonesia" },
  { src: "/img/PNG/Tek-MIRA.png", alt: "Tek-MIRA" },
  { src: "/img/PNG/TOP.png", alt: "TOP" },
];

const heroSlides = [
  {
    src: "/img/carousel/hero/1.png",
    alt: "Akreditasi KAN LK-377 IDN",
    label: "Laboratorium terakreditasi",
  },
  {
    src: "/img/carousel/hero/2.png",
    alt: "Logo PT. Nepatech Global Solusindo",
    label: "Solusi teknis dari Nepatech",
  },
  {
    src: "/img/carousel/hero/3.png",
    alt: "Identitas PT. Nepatech Global Solusindo",
    label: "Partner operasional tepercaya",
  },
  {
    src: "/img/carousel/hero/4.png",
    alt: "Sertifikasi ISO 45001",
    label: "Berstandar ISO 45001",
  },
];

const serviceItems = [
  {
    number: "01",
    title: "Kalibrasi",
    description: "Pengukuran akurat dengan standar dan dokumentasi yang jelas.",
  },
  {
    number: "02",
    title: "Maintenance",
    description: "Perawatan preventif dan perbaikan untuk menjaga performa alat.",
  },
  {
    number: "03",
    title: "Laboratorium",
    description: "Dukungan teknis untuk kebutuhan operasional laboratorium.",
  },
  {
    number: "04",
    title: "Suku Cadang",
    description: "Pengadaan komponen yang sesuai dengan spesifikasi peralatan.",
  },
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
      "Kami menyediakan kalibrasi, maintenance, supply peralatan laboratorium, dan support teknis untuk industri batu bara dan analitik.",
  },
  {
    question: "Berapa lama waktu pengerjaannya?",
    answer:
      "Durasi bergantung pada jenis alat dan ruang lingkup pekerjaan. Umumnya estimasi dikomunikasikan setelah survei awal.",
  },
  {
    question: "Apakah ada garansi untuk layanan?",
    answer:
      "Ya, setiap layanan kami disertai jaminan kualitas dan dukungan purna jual. Detail garansi akan dijelaskan dalam penawaran.",
  },
  {
    question: "Bagaimana cara menghubungi tim sales?",
    answer:
      "Gunakan formulir kontak di bawah, atau langsung hubungi WhatsApp kami lewat tombol di pojok kanan bawah.",
  },
];

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") return false;
    const stored = window.localStorage.getItem("nepatech-dark-mode");
    if (stored !== null) {
      return stored === "true";
    }

    return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? false;
  });
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [pageVisible, setPageVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsMounted(true);
    const fadeTimer = window.setTimeout(() => setPageVisible(true), 50);
    return () => window.clearTimeout(fadeTimer);
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
    const sections = [
      "home",
      "about",
      "portfolio",
      "clients",
      "faq",
      "location",
      "contact",
    ];
    const observers = [];

    sections.forEach((id) => {
      const target = document.getElementById(id);
      if (!target) return;

      const sectionObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0.2 },
      );

      sectionObserver.observe(target);
      observers.push(sectionObserver);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  useEffect(() => {
    // add a class to the html element so CSS can reveal images after JS mounts
    document.documentElement.classList.add("js-mounted");
    return () => document.documentElement.classList.remove("js-mounted");
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
      className={`${darkMode ? "dark bg-slate-950 text-slate-100" : "bg-white text-slate-900"} page-fade ${pageVisible ? "page-visible" : ""} min-h-screen transition-colors duration-500`}>
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

      <header className="fixed inset-x-0 top-0 z-50 w-full bg-white/90 shadow-lg backdrop-blur-xl border-b border-slate-200 dark:bg-slate-950/90 dark:border-slate-800">
        <div className="container relative">
          <div className="flex items-center justify-between gap-3 px-4 py-3 lg:py-0">
            <div>
              <a
                href="#home"
                className="inline-flex rounded-xl p-1.5 transition-colors duration-300 ring-1 ring-transparent dark:bg-white/95 dark:ring-slate-200 dark:shadow-lg dark:shadow-black/20">
                <img
                  src="/img/logoNGS.png"
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
                aria-label="Toggle dark mode">
                {darkMode ? "Light Mode" : "Dark Mode"}
              </button>
              <button
                type="button"
                className="inline-flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-lg border border-slate-300 bg-white/90 text-slate-900 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-100 dark:hover:bg-slate-800 lg:hidden"
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-label={menuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
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

            <nav className="hidden lg:block lg:order-2">
              <ul className="flex">
                {navLinks.map(([label, href]) => {
                  const id = href.replace("#", "");
                  const isActive = activeSection === id;
                  const isContact = id === "contact";
                  return (
                    <li key={label} className="group">
                      <a
                        href={href}
                        className={
                          isContact
                            ? "ml-3 inline-flex rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-500 xl:ml-5 xl:text-base"
                            : `mx-3 flex py-2 text-sm transition xl:mx-5 xl:text-base ${isActive ? "border-b-4 border-b-primary font-semibold text-primary" : "text-slate-900 group-hover:border-b-4 group-hover:border-b-primary dark:text-slate-100"}`
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
              className="absolute inset-x-4 top-full overflow-hidden rounded-b-2xl border border-t-0 border-slate-200 bg-white/95 p-3 shadow-xl backdrop-blur-xl dark:border-slate-700 dark:bg-slate-950/95 lg:hidden">
              <ul className="space-y-1">
                {navLinks.map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      className={`block rounded-xl px-4 py-3 text-base font-medium transition ${href === "#contact" ? "bg-primary text-center font-semibold text-white hover:bg-orange-500" : activeSection === href.slice(1) ? "bg-slate-100 text-primary dark:bg-slate-800 dark:text-orange-300" : "text-slate-900 hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800"}`}
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

      <main id="home">
        <section data-reveal className="reveal-section relative overflow-hidden pb-16 pt-28 sm:pt-32 lg:pb-24 lg:pt-40">
          <div className="hero-glow" />
          <div className="container">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
              <div className="w-full px-4">
                <div className="section-card overflow-hidden">
                  <div className="mb-6 inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary shadow-sm shadow-primary/10 dark:bg-orange-500/10 dark:text-orange-200">
                    <span className="mr-2 inline-flex h-2 w-2 rounded-full bg-primary" />
                    PT. Nepatech Global Solusindo
                  </div>
                  <h1 className="text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-slate-100">
                    Solusi laboratorium andal untuk operasional modern
                  </h1>
                  <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:mt-6 sm:text-xl sm:leading-8 dark:text-slate-300">
                    Maintenance, kalibrasi, dan supply laboratorium untuk batu
                    bara dan industri analitik. Kami hadir dengan kemampuan
                    teknis yang terakreditasi dan solusi yang siap pakai.
                  </p>
                  <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    <a
                      href="https://drive.google.com/file/d/1yJblUHYLyUX6QVpOTUR0HneuXz67QENs/view?usp=share_link"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-base font-semibold text-white transition duration-300 ease-in-out hover:bg-orange-500">
                      Download Profile
                    </a>
                    <a
                      href="#portfolio"
                      className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-4 text-base font-semibold text-slate-900 transition duration-300 ease-in-out hover:border-primary hover:text-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:text-orange-300">
                      Lihat Galeri
                    </a>
                  </div>
                </div>
              </div>
              <div className="w-full px-4">
                <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-xl shadow-slate-900/5 dark:border-slate-700">
                  {isMounted ? (
                    <img
                      key={heroSlides[activeSlide].src}
                      loading="eager"
                      fetchPriority="high"
                      src={heroSlides[activeSlide].src}
                      alt={heroSlides[activeSlide].alt}
                      className="hero-slide h-[340px] w-full object-contain p-8 pb-28 sm:h-[460px] sm:p-12 sm:pb-32 lg:h-[520px]"
                    />
                  ) : (
                    <div className="h-[340px] w-full bg-white sm:h-[460px] lg:h-[520px]" />
                  )}
                  <div className="absolute inset-x-0 bottom-6 px-4">
                    <div className="mx-auto flex max-w-xl flex-wrap items-center justify-between gap-3 rounded-full bg-slate-950/70 px-4 py-3 text-white backdrop-blur sm:px-6">
                      <div>
                        <p className="text-base font-semibold">
                          {heroSlides[activeSlide].label}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            setActiveSlide(
                              (current) =>
                                (current - 1 + heroSlides.length) %
                                heroSlides.length,
                            )
                          }
                          className="rounded-full bg-white/10 px-3 py-2 text-lg transition hover:bg-white/20"
                          aria-label="Slide sebelumnya">
                          <span aria-hidden="true">‹</span>
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setActiveSlide(
                              (current) => (current + 1) % heroSlides.length,
                            )
                          }
                          className="rounded-full bg-white/10 px-3 py-2 text-lg transition hover:bg-white/20"
                          aria-label="Slide berikutnya">
                          <span aria-hidden="true">›</span>
                        </button>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-center gap-2">
                      {heroSlides.map((_, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setActiveSlide(index)}
                          className={`h-2.5 w-10 rounded-full transition ${activeSlide === index ? "bg-primary" : "bg-white/30 hover:bg-white/50"}`}
                          aria-label={`Slide ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" data-reveal className="reveal-section py-16 lg:py-24">
          <div className="container">
            <div className="section-card grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
              <div>
                <span className="mb-3 inline-flex rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-primary">
                  Solusi Kalibrasi & Maintenance
                </span>
                <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-slate-100 sm:text-4xl lg:text-5xl">
                  Layanan teknis laboratorium yang cepat, akurat, dan bisa
                  diandalkan.
                </h2>
                <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
                  Kami menyediakan jasa kalibrasi, maintenance, dan supply untuk
                  alat laboratorium batu bara, dari pemeriksaan hingga perawatan
                  rutin.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {serviceItems.map((item) => (
                    <div
                      key={item.title}
                      className="group rounded-3xl border border-slate-200 bg-slate-50 px-5 py-6 transition duration-300 hover:-translate-y-1 hover:border-orange-300 hover:bg-white hover:shadow-lg dark:border-slate-700 dark:bg-slate-950 dark:hover:border-orange-500/50 dark:hover:bg-slate-900">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-primary transition group-hover:bg-primary group-hover:text-white dark:bg-orange-500/15">
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
                      Perusahaan kami berfokus pada layanan kalibrasi serta
                      supply peralatan laboratorium yang sesuai standar ISO dan
                      kebutuhan industri.
                    </p>
                  </div>
                  <div className="rounded-3xl bg-gradient-to-r from-primary to-orange-400 px-6 py-5 text-white shadow-xl">
                    <p className="text-sm uppercase tracking-[0.2em]">
                      100+ Klien
                    </p>
                    <p className="mt-3 text-3xl font-bold">
                      Trusted by industry leaders
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="portfolio" data-reveal className="reveal-section py-16 lg:py-28">
          <div className="container">
            <div className="mb-10 px-4 text-center sm:mb-14">
              <span className="inline-flex rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
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
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
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
          className="reveal-section bg-slate-200 py-20 lg:py-28"
          style={{ backgroundColor: "rgb(241,245,249)", color: "rgb(15,23,42)" }}>
          <div className="container">
            <div className="mb-10 w-full px-4 text-center sm:mb-14">
              <h4 className="mb-2 text-lg font-semibold text-primary">
                Perusahaan
              </h4>
              <h2
                className="text-3xl font-bold text-secondary sm:text-4xl lg:text-5xl"
                style={{ color: "rgb(35,25,22)" }}>
                Yang Pernah Bekerjasama
              </h2>
              <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-600">
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
                    className="group flex h-24 items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-md sm:h-28">
                    <img
                      loading="lazy"
                      src={logo.src}
                      alt={logo.alt}
                      className="max-h-14 max-w-full object-contain grayscale opacity-60 transition duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="faq" data-reveal className="reveal-section bg-white py-20 dark:bg-slate-900 lg:py-28">
          <div className="container">
            <div className="mb-12 px-4 text-center">
              <span className="inline-flex rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
                FAQ
              </span>
              <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl lg:text-6xl">
                Pertanyaan yang sering diajukan
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
                Semua jawaban singkat tentang layanan, proses, dan cara kerja kami.
              </p>
            </div>
            <div className="mx-auto max-w-4xl px-4">
              <div className="space-y-4">
                {faqItems.map((item, index) => {
                  const isOpen = index === openFaqIndex;
                  return (
                    <button
                      key={item.question}
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left transition sm:rounded-[28px] sm:p-6 hover:border-orange-300 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:hover:border-orange-400 dark:hover:bg-slate-900">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                          {item.question}
                        </span>
                        <span className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-xl text-slate-700 transition dark:border-slate-700 dark:text-slate-200 ${isOpen ? "bg-primary text-white border-primary" : "bg-white"}`}>
                          {isOpen ? "−" : "+"}
                        </span>
                      </div>
                      {isOpen && (
                        <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                          {item.answer}
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section
          id="location"
          data-reveal
          className="reveal-section bg-slate-50 py-20 dark:bg-slate-950 lg:py-28">
          <div className="container px-4">
            <div className="grid overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_30px_70px_-35px_rgba(15,23,42,0.35)] dark:border-slate-700 dark:bg-slate-900 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="p-7 sm:p-10 lg:p-12">
                <span className="inline-flex rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
                  Lokasi Kami
                </span>
                <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
                  Kunjungi kantor Nepatech
                </h2>
                <p className="mt-5 leading-7 text-slate-600 dark:text-slate-300">
                  Ruko Garden Hous, Jl. Grand Wisata No.75 Blok BG 1,
                  Lambangjaya, Tambun Selatan, Kabupaten Bekasi, Jawa Barat
                  17510.
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
                  src="https://www.google.com/maps?q=Ruko%20Garden%20Hous%20Jl.%20Grand%20Wisata%20No.75%20Blok%20BG%201%20Bekasi%2017510&output=embed"
                  className="h-full min-h-[360px] w-full border-0 lg:min-h-[460px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <ContactForm />

      <footer className="bg-slate-950 pb-10 pt-16 text-slate-300 sm:pt-20">
        <div className="container px-4">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="rounded-[32px] border border-slate-800 bg-slate-900/80 p-8 shadow-lg shadow-slate-900/20">
              <h3 className="mb-4 text-3xl font-bold text-white">
                Hubungi Kami
              </h3>
              <p className="text-base text-slate-400">nepatech1gs@gmail.com</p>
              <p className="mt-4 text-sm leading-7 text-slate-400">
                Hous, Ruko Garden, Jl. Grand Wisata No.75 Blok BG 1,
                Lambangjaya, Kec. Tambun Sel., Kabupaten Bekasi, Jawa Barat
                17510
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

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ContactForm from "../components/ContactForm";

const galleryLinks = [
  { slug: "furnace", name: "Suhu", title: "Furnace" },
  { slug: "kalorimeter", name: "Instrument", title: "Kalorimeter" },
  {
    slug: "laboratory-mill",
    name: "Laboratory Mill",
    title: "Laboratory Mill",
  },
  { slug: "timbangan", name: "Massa", title: "Timbangan" },
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

const galleryImages = Array.from({ length: 11 }, (_, index) => ({
  src: `/img/galery/Furnace/${index + 1}.jpg`,
  alt: `Furnace ${index + 1}`,
}));

const heroSlides = [
  {
    src: "/img/carousel/hero/1.png",
    alt: "Slide 1",
    label: "Maintenance & Calibration",
  },
  {
    src: "/img/carousel/hero/2.png",
    alt: "Slide 2",
    label: "Laboratory Reliability",
  },
  {
    src: "/img/carousel/hero/3.png",
    alt: "Slide 3",
    label: "Advanced Equipment",
  },
  {
    src: "/img/carousel/hero/4.png",
    alt: "Slide 4",
    label: "Field Performance",
  },
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
    setTimeout(() => setPageVisible(true), 50);
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
      { threshold: 0.2 },
    );

    revealTargets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sections = ["home", "about", "portfolio", "clients", "faq", "contact"];
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

  return (
    <div
      className={`${darkMode ? "dark bg-slate-950 text-slate-100" : "bg-white text-slate-900"} page-fade ${pageVisible ? "page-visible" : ""} min-h-screen transition-colors duration-500`}>
      <div className="fixed bottom-5 right-5 z-20">
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
        <div className="container">
          <div className="relative flex flex-wrap items-center justify-between gap-4 px-4 py-4 lg:py-0">
            <div>
              <a href="#home" className="block text-lg font-bold text-primary">
                <img
                  src="/img/logoNGS.png"
                  className="w-[120px] py-2"
                  alt="PT. Nepatech Global Solusindo"
                />
              </a>
            </div>

            <div className="flex items-center gap-3 lg:order-3">
              <button
                type="button"
                onClick={toggleDarkMode}
                className="inline-flex items-center rounded-full border border-slate-300 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-100 dark:hover:bg-slate-800"
                aria-label="Toggle dark mode">
                {darkMode ? "Light Mode" : "Dark Mode"}
              </button>
              <button
                type="button"
                className="inline-flex items-center rounded-lg border border-slate-300 bg-white/90 p-2 text-slate-900 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-100 dark:hover:bg-slate-800 lg:hidden"
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-label="Toggle navigation menu">
                <span className="sr-only">Open main menu</span>
                <div
                  className={`hamburger-line ${menuOpen ? "rotate-45 translate-y-1" : ""}`}
                />
                <div
                  className={`hamburger-line ${menuOpen ? "opacity-0" : ""}`}
                />
                <div
                  className={`hamburger-line ${menuOpen ? "-rotate-45 -translate-y-1" : ""}`}
                />
              </button>
            </div>

            <nav className="hidden lg:block lg:order-2">
              <ul className="flex">
                {[
                  ["Beranda", "#home"],
                  ["Tentang Kami", "#about"],
                  ["Galeri Kerja", "#portfolio"],
                  ["Pelanggan", "#clients"],
                  ["Kontak", "#contact"],
                ].map(([label, href]) => {
                  const id = href.replace("#", "");
                  const isActive = activeSection === id;
                  return (
                    <li key={label} className="group">
                      <a
                        href={href}
                        className={`mx-5 flex py-2 text-base transition ${isActive ? "border-b-4 border-b-primary text-primary font-semibold" : "text-slate-900 group-hover:border-b-4 group-hover:border-b-primary dark:text-slate-100"}`}>
                        {label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {menuOpen && (
            <div className="rounded-b-xl border border-slate-200 border-t-0 bg-white/95 p-4 shadow-lg backdrop-blur-lg lg:hidden">
              <ul className="space-y-3">
                {[
                  ["Beranda", "#home"],
                  ["Tentang Kami", "#about"],
                  ["Galeri Kerja", "#portfolio"],
                  ["Pelanggan", "#clients"],
                  ["Kontak", "#contact"],
                ].map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="block rounded-xl px-4 py-3 text-base font-medium text-slate-900 transition hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800"
                      onClick={() => setMenuOpen(false)}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </header>

      <main id="home">
        <section data-reveal className="reveal-section relative mb-20 pb-10 pt-36">
          <div className="hero-glow" />
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="w-full px-4">
                <div className="section-card overflow-hidden">
                  <div className="mb-6 inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary shadow-sm shadow-primary/10 dark:bg-orange-500/10 dark:text-orange-200">
                    <span className="mr-2 inline-flex h-2 w-2 rounded-full bg-primary" />
                    PT. Nepatech Global Solusindo
                  </div>
                  <h1 className="text-4xl font-black text-slate-900 sm:text-5xl lg:text-6xl dark:text-slate-100">
                    Build better lab services for modern operations
                  </h1>
                  <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl dark:text-slate-300">
                    Maintenance, kalibrasi, dan suplay laboratorium untuk batu
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
                <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-slate-100 shadow-xl shadow-slate-900/5 dark:border-slate-700 dark:bg-slate-900">
                  {isMounted ? (
                    <img
                      loading="lazy"
                      src={heroSlides[activeSlide].src}
                      alt={heroSlides[activeSlide].alt}
                      className="h-[520px] w-full object-cover transition duration-700 ease-in-out"
                    />
                  ) : (
                    <div className="h-[520px] w-full bg-slate-100 dark:bg-slate-900" />
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
                          className="rounded-full bg-white/10 px-3 py-2 text-lg transition hover:bg-white/20">
                          ‹
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setActiveSlide(
                              (current) => (current + 1) % heroSlides.length,
                            )
                          }
                          className="rounded-full bg-white/10 px-3 py-2 text-lg transition hover:bg-white/20">
                          ›
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

        <section id="about" data-reveal className="reveal-section pb-32 pt-16">
          <div className="container">
            <div className="section-card grid gap-10 px-4 py-10 lg:grid-cols-[1.1fr_0.9fr]">
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
                  {[
                    "Kalibrasi",
                    "Maintenance",
                    "Laboratorium",
                    "Suku Cadang",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-6 shadow-sm dark:border-slate-700 dark:bg-slate-950">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                        {item}
                      </h3>
                      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Solusi profesional untuk kebutuhan operasional Anda.
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

        <section id="portfolio" data-reveal className="reveal-section pb-16 pt-36">
          <div className="container">
            <div className="mb-16 px-4 text-center">
              <span className="inline-flex rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
                Galeri Kerja
              </span>
              <h2 className="mt-5 text-4xl font-bold text-slate-900 dark:text-slate-100 sm:text-5xl lg:text-6xl">
                Tampilkan dokumentasi terbaik dari setiap proyek kami.
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
                Jelajahi foto-foto terbaru dari kalibrasi, maintenance, dan
                pemasangan peralatan laboratorium di lapangan.
              </p>
            </div>
            <div className="grid gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3">
              {galleryLinks.map((item) => (
                <Link
                  key={item.slug}
                  to={`/gallery/${item.slug}`}
                  data-reveal
                  className="reveal-card group overflow-hidden rounded-[28px] border border-slate-200 bg-white p-8 text-left transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-950">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                    {item.name}
                  </p>
                  <h3 className="mt-4 text-2xl font-bold text-slate-900 dark:text-slate-100">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                    Lihat galeri dokumentasi lengkap untuk kategori alat ini.
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section
          id="clients"
          data-reveal
          className="reveal-section bg-slate-200 pb-32 pt-36"
          style={{ backgroundColor: "rgb(241,245,249)", color: "rgb(15,23,42)" }}>
          <div className="container">
            <div className="mb-16 w-full px-4 text-center">
              <h4 className="mb-2 text-lg font-semibold text-primary">
                Perusahaan
              </h4>
              <h2
                className="text-3xl font-bold text-secondary sm:text-4xl lg:text-5xl"
                style={{ color: "rgb(35,25,22)" }}>
                Yang Pernah Bekerjasama
              </h2>
            </div>
            <div className="w-full px-4">
              <div className="flex flex-wrap items-center justify-center">
                {clientLogos.map((logo) => (
                  <a
                    key={logo.alt}
                    href="#"
                    className="mx-4 max-w-[60px] py-4 md:max-w-[100px] lg:mx-6 lg:max-w-[120px] xl:mx-8">
                    <img loading="lazy" src={logo.src} alt={logo.alt} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="faq" data-reveal className="reveal-section bg-white pb-32 pt-36 dark:bg-slate-900">
          <div className="container">
            <div className="mb-12 px-4 text-center">
              <span className="inline-flex rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
                FAQ
              </span>
              <h2 className="mt-5 text-4xl font-bold text-slate-900 dark:text-slate-100 sm:text-5xl lg:text-6xl">
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
                      className="w-full rounded-[28px] border border-slate-200 bg-slate-50 p-6 text-left transition hover:border-orange-300 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:hover:border-orange-400 dark:hover:bg-slate-900">
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
      </main>

      <ContactForm />

      <footer className="bg-slate-950 pb-12 pt-24 text-slate-300">
        <div className="container">
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

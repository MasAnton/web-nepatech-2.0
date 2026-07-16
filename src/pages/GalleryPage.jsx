import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Seo from "../components/Seo";

const createGalleryImages = (folder, label, count) =>
  Array.from({ length: count }, (_, index) => {
    const number = index + 1;
    const basePath = `/img/galery/${folder}/${number}`;
    return {
      src: `${basePath}-480.webp`,
      fullSrc: `${basePath}-1280.webp`,
      srcSet: `${basePath}-480.webp 480w, ${basePath}-1280.webp 1280w`,
      alt: `${label} ${number}`,
    };
  });

const galleryData = {
  furnace: {
    title: "Furnace",
    heading: "Suhu",
    images: createGalleryImages("Furnace", "Furnace", 11),
  },
  kalorimeter: {
    title: "Kalorimeter",
    heading: "Instrument",
    images: createGalleryImages("Kalorimeter", "Kalorimeter", 10),
  },
  "laboratory-mill": {
    title: "Laboratory Mill",
    heading: "Laboratory Mill",
    images: createGalleryImages("LabMill", "Laboratory Mill", 12),
  },
  timbangan: {
    title: "Timbangan",
    heading: "Massa",
    images: createGalleryImages("Massa", "Timbangan", 8),
  },
};

function GalleryPage() {
  const { slug } = useParams();
  const current = galleryData[slug] ?? galleryData.furnace;
  const [pageVisible, setPageVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const htmlWasDark = html.classList.contains("dark");
    const bodyWasDark = body.classList.contains("dark");
    if (htmlWasDark) html.classList.remove("dark");
    if (bodyWasDark) body.classList.remove("dark");
    html.classList.add("js-mounted");

    return () => {
      html.classList.remove("js-mounted");
      if (htmlWasDark) html.classList.add("dark");
      if (bodyWasDark) body.classList.add("dark");
    };
  }, []);

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => setPageVisible(true), 50);
    return () => window.clearTimeout(fadeTimer);
  }, []);

  useEffect(() => {
    if (selectedIndex === null) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setSelectedIndex(null);
      if (event.key === "ArrowLeft") {
        setSelectedIndex((index) =>
          (index - 1 + current.images.length) % current.images.length,
        );
      }
      if (event.key === "ArrowRight") {
        setSelectedIndex((index) => (index + 1) % current.images.length);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [current.images.length, selectedIndex]);

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

  return (
    <div
      className={`page-fade min-h-screen bg-slate-100 dark:bg-slate-100 text-slate-800 dark:text-slate-800 ${pageVisible ? "page-visible" : ""}`}
      style={{ backgroundColor: "rgb(241,245,249)", color: "rgb(15,23,42)" }}>
      <Seo
        title={`Galeri ${current.title}`}
        description={`Dokumentasi pekerjaan ${current.title} dari PT. Nepatech Global Solusindo.`}
        image={current.images[0].fullSrc}
      />
      <header
        className="border-b border-slate-200 bg-white py-10 text-slate-800 dark:bg-white dark:text-slate-800 sm:py-14"
        style={{ backgroundColor: "#ffffff", color: "rgb(15,23,42)" }}>
        <div className="container px-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-orange-100 hover:text-orange-600">
            <span aria-hidden="true">←</span> Kembali ke Beranda
          </Link>
          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Galeri {current.heading}
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            {current.title}
          </h1>
          <p className="mt-3 max-w-2xl text-slate-500">
            Dokumentasi pekerjaan dan peralatan dari tim PT. Nepatech Global
            Solusindo. Klik foto untuk melihat detail.
          </p>
        </div>
      </header>

      <main className="container px-4 py-10 sm:py-14">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {current.images.map((image, index) => (
            <button
              type="button"
              key={image.src}
              data-reveal
              onClick={() => setSelectedIndex(index)}
              className="reveal-card group overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-200">
                <img
                  src={image.src}
                  srcSet={image.srcSet}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  alt={image.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute bottom-3 right-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-lg text-slate-900 opacity-0 shadow-sm backdrop-blur transition group-hover:opacity-100">
                  <span aria-hidden="true">↗</span>
                </span>
              </div>
            </button>
          ))}
        </div>
      </main>

      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 p-4 backdrop-blur-sm sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`Pratinjau ${current.images[selectedIndex].alt}`}
          onClick={() => setSelectedIndex(null)}>
          <button
            type="button"
            onClick={() => setSelectedIndex(null)}
            className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition hover:bg-white/20 sm:right-6 sm:top-6"
            aria-label="Tutup galeri">
            ×
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setSelectedIndex(
                (selectedIndex - 1 + current.images.length) %
                  current.images.length,
              );
            }}
            className="absolute left-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-3xl text-white transition hover:bg-white/20 sm:left-6"
            aria-label="Foto sebelumnya">
            ‹
          </button>
          <figure
            className="flex max-h-full max-w-6xl flex-col items-center"
            onClick={(event) => event.stopPropagation()}>
            <img
              src={current.images[selectedIndex].fullSrc}
              alt={current.images[selectedIndex].alt}
              className="max-h-[80vh] max-w-full rounded-xl object-contain shadow-2xl"
            />
            <figcaption className="mt-4 text-center text-sm font-medium text-slate-200">
              {current.images[selectedIndex].alt} · {selectedIndex + 1} dari{" "}
              {current.images.length}
            </figcaption>
          </figure>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setSelectedIndex((selectedIndex + 1) % current.images.length);
            }}
            className="absolute right-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-3xl text-white transition hover:bg-white/20 sm:right-6"
            aria-label="Foto berikutnya">
            ›
          </button>
        </div>
      )}
    </div>
  );
}

export default GalleryPage;

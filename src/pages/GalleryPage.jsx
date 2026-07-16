import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Seo from "../components/Seo";

const galleryData = {
  furnace: {
    title: "Furnace",
    heading: "Suhu",
    images: Array.from({ length: 11 }, (_, index) => ({
      src: `/img/galery/Furnace/${index + 1}.jpg`,
      alt: `Furnace ${index + 1}`,
    })),
  },
  kalorimeter: {
    title: "Kalorimeter",
    heading: "Instrument",
    images: Array.from({ length: 10 }, (_, index) => ({
      src: `/img/galery/Kalorimeter/${index + 1}.jpg`,
      alt: `Kalorimeter ${index + 1}`,
    })),
  },
  "laboratory-mill": {
    title: "Laboratory Mill",
    heading: "Laboratory Mill",
    images: Array.from({ length: 12 }, (_, index) => ({
      src: `/img/galery/LabMill/${index + 1}.jpg`,
      alt: `Laboratory Mill ${index + 1}`,
    })),
  },
  timbangan: {
    title: "Timbangan",
    heading: "Massa",
    images: Array.from({ length: 8 }, (_, index) => ({
      src: `/img/galery/Massa/${index + 1}.jpg`,
      alt: `Timbangan ${index + 1}`,
    })),
  },
};

function GalleryPage() {
  const { slug } = useParams();
  const current = galleryData[slug] ?? galleryData.furnace;
  const [pageVisible, setPageVisible] = useState(false);

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
        image={current.images[0].src}
      />
      <header
        className="bg-white dark:bg-white py-8 text-slate-800 dark:text-slate-800"
        style={{ backgroundColor: "#ffffff", color: "rgb(15,23,42)" }}>
        <div className="container px-4">
          <Link to="/" className="text-sm text-primary hover:text-orange-400">
            ← Kembali ke Beranda
          </Link>
          <h1 className="mt-4 text-3xl font-bold">{current.title}</h1>
          <p className="mt-2 text-slate-300">{current.heading}</p>
        </div>
      </header>

      <main className="container px-4 py-12">
        <div className="flex flex-wrap justify-center">
          {current.images.map((image) => (
            <div
              key={image.src}
              data-reveal
              className="reveal-card w-full p-2 sm:w-1/2 lg:w-1/3">
              <div className="overflow-hidden rounded-md shadow-md">
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="w-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default GalleryPage;

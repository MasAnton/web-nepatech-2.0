import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";

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

  return (
    <div
      className="min-h-screen bg-slate-100 dark:bg-slate-100 text-slate-800 dark:text-slate-800"
      style={{ backgroundColor: "rgb(241,245,249)", color: "rgb(15,23,42)" }}
    >
      <header
        className="bg-white dark:bg-white py-8 text-slate-800 dark:text-slate-800"
        style={{ backgroundColor: "#ffffff", color: "rgb(15,23,42)" }}
      >
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
            <div key={image.src} className="w-full p-2 sm:w-1/2 lg:w-1/3">
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

import { useEffect, useMemo, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import InnerPageLayout from "../components/InnerPageLayout";
import Seo from "../components/Seo";
import galleryManifest from "../data/gallery-manifest.json";

const galleryData = galleryManifest.categories;
const categories = Object.values(galleryData);
const PAGE_SIZE = 12;

const allImages = categories.flatMap((category) =>
  category.images.map((image) => ({
    ...image,
    categorySlug: category.slug,
    categoryTitle: category.title,
    categoryHeading: category.heading,
  })),
);

const showLoadedImage = (event) => {
  const image = event.currentTarget;
  image.classList.add("is-loaded");
  image.parentElement?.classList.add("media-loaded");
};

function GalleryPage() {
  const { slug } = useParams();
  const currentCategory = slug ? galleryData[slug] : null;
  const isOverview = !slug;
  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const gridRef = useRef(null);
  const closeButtonRef = useRef(null);
  const lightboxTriggerRef = useRef(null);

  const filteredImages = useMemo(() => {
    if (!isOverview) return currentCategory?.images ?? [];
    if (activeCategory === "all") return allImages;
    return allImages.filter(
      (image) => image.categorySlug === activeCategory,
    );
  }, [activeCategory, currentCategory, isOverview]);

  const visibleImages = isOverview
    ? filteredImages.slice(0, visibleCount)
    : filteredImages;
  const selectedImage =
    selectedIndex === null ? null : visibleImages[selectedIndex];
  const isLightboxOpen = selectedImage !== null;

  useEffect(() => {
    setActiveCategory("all");
    setVisibleCount(PAGE_SIZE);
    setSelectedIndex(null);
  }, [slug]);

  useEffect(() => {
    const revealTargets = gridRef.current?.querySelectorAll("[data-reveal]");
    if (!revealTargets?.length) return undefined;

    if (!("IntersectionObserver" in window)) {
      revealTargets.forEach((element) =>
        element.classList.add("reveal-visible"),
      );
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("reveal-visible");
          currentObserver.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    revealTargets.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [activeCategory, slug, visibleCount]);

  useEffect(() => {
    if (!isLightboxOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const returnFocusTo = lightboxTriggerRef.current;
    const focusFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setSelectedIndex(null);
      if (event.key === "ArrowLeft") {
        setSelectedIndex(
          (index) =>
            (index - 1 + visibleImages.length) % visibleImages.length,
        );
      }
      if (event.key === "ArrowRight") {
        setSelectedIndex((index) => (index + 1) % visibleImages.length);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      returnFocusTo?.focus();
    };
  }, [isLightboxOpen, visibleImages.length]);

  if (slug && !currentCategory) {
    return <Navigate to="/galeri" replace />;
  }

  const pageTitle = isOverview
    ? "Galeri Pekerjaan Laboratorium"
    : `Galeri ${currentCategory.title}`;
  const pageDescription = isOverview
    ? "Dokumentasi pekerjaan kalibrasi, maintenance, dan peralatan laboratorium PT. Nepatech Global Solusindo. Filter foto berdasarkan kategori pekerjaan."
    : `Dokumentasi pekerjaan ${currentCategory.title} dari PT. Nepatech Global Solusindo.`;
  const pageImage = isOverview
    ? allImages[0].fullSrc
    : currentCategory.images[0].fullSrc;
  const canonicalPath = isOverview ? "/galeri" : `/gallery/${slug}`;
  const breadcrumbItems = isOverview
    ? [{ name: "Galeri", path: "/galeri" }]
    : [
        { name: "Galeri", path: "/galeri" },
        { name: currentCategory.title, path: canonicalPath },
      ];

  const handleFilterChange = (category) => {
    setActiveCategory(category);
    setVisibleCount(PAGE_SIZE);
    setSelectedIndex(null);
  };

  return (
    <InnerPageLayout>
      <Seo
        title={pageTitle}
        description={pageDescription}
        image={pageImage}
        canonicalPath={canonicalPath}
        pageType="CollectionPage"
        breadcrumbs={breadcrumbItems}
      />

      <main>
        <section className="hero-surface border-b border-slate-200 py-9 dark:border-slate-800 sm:py-14">
          <div className="hero-enter container">
            <Link
              to="/"
              className="inline-flex min-h-10 items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-xs font-semibold text-orange-700 transition hover:bg-orange-200 dark:bg-orange-500/10 dark:text-orange-300 dark:hover:bg-orange-500/20 sm:text-sm">
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                className="h-4 w-4 fill-none stroke-current"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="m12.5 4.5-5.5 5.5 5.5 5.5" />
              </svg>
              Kembali ke Beranda
            </Link>
            <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-orange-700 dark:text-orange-300 sm:mt-9 sm:text-sm">
              {isOverview ? "Dokumentasi Pekerjaan" : `Galeri ${currentCategory.heading}`}
            </p>
            <h1 className="mt-2 max-w-4xl text-[30px] font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {isOverview ? "Galeri kerja Nepatech" : currentCategory.title}
            </h1>
            <p className="mt-3 max-w-2xl text-[13px] leading-6 text-slate-600 dark:text-slate-300 sm:mt-5 sm:text-lg sm:leading-8">
              {isOverview
                ? "Jelajahi dokumentasi pekerjaan berdasarkan kategori. Foto dimuat bertahap agar halaman tetap ringan."
                : "Dokumentasi pekerjaan dan peralatan dari tim PT. Nepatech Global Solusindo. Klik foto untuk melihat detail."}
            </p>
            {!isOverview && (
              <Link
                to="/galeri"
                className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:border-primary hover:text-orange-700 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:border-primary dark:hover:text-orange-300">
                Lihat semua kategori
              </Link>
            )}
          </div>
        </section>

        <section className="py-8 sm:py-12 lg:py-16">
          <div className="container">
            {isOverview && (
              <div
                role="group"
                aria-label="Filter kategori galeri"
                className="-mx-4 overflow-x-auto px-4 pb-2">
                <div className="flex min-w-max gap-2">
                  <button
                    type="button"
                    aria-pressed={activeCategory === "all"}
                    onClick={() => handleFilterChange("all")}
                    className={`inline-flex min-h-11 items-center rounded-full px-4 py-2 text-xs font-semibold transition sm:text-sm ${
                      activeCategory === "all"
                        ? "bg-primary text-white shadow-sm"
                        : "border border-slate-300 bg-white text-slate-700 hover:border-primary hover:text-orange-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-primary dark:hover:text-orange-300"
                    }`}>
                    Semua ({allImages.length})
                  </button>
                  {categories.map((category) => (
                    <button
                      type="button"
                      key={category.slug}
                      aria-pressed={activeCategory === category.slug}
                      onClick={() => handleFilterChange(category.slug)}
                      className={`inline-flex min-h-11 items-center rounded-full px-4 py-2 text-xs font-semibold transition sm:text-sm ${
                        activeCategory === category.slug
                          ? "bg-primary text-white shadow-sm"
                          : "border border-slate-300 bg-white text-slate-700 hover:border-primary hover:text-orange-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-primary dark:hover:text-orange-300"
                      }`}>
                      {category.title} ({category.images.length})
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div
              id="gallery-grid"
              ref={gridRef}
              className={`${isOverview ? "mt-5 sm:mt-8" : ""} grid grid-cols-2 gap-2.5 sm:gap-5 lg:grid-cols-3`}>
              {visibleImages.map((image, index) => (
                <button
                  type="button"
                  key={image.id}
                  data-reveal
                  style={{ transitionDelay: `${(index % 3) * 55}ms` }}
                  onClick={(event) => {
                    lightboxTriggerRef.current = event.currentTarget;
                    setSelectedIndex(index);
                  }}
                  className="reveal-card group min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900 dark:hover:border-orange-500/50 sm:rounded-2xl sm:p-2">
                  <div className="lazy-media-frame relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-200 sm:rounded-xl">
                    <img
                      src={image.src}
                      srcSet={image.srcSet}
                      sizes="(min-width: 1024px) 33vw, 50vw"
                      alt={image.alt}
                      loading="lazy"
                      decoding="async"
                      onLoad={showLoadedImage}
                      onError={showLoadedImage}
                      className="smooth-media media-zoom h-full w-full object-cover"
                    />
                    <span className="absolute bottom-2 right-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-900 opacity-0 shadow-sm backdrop-blur transition group-hover:opacity-100 sm:bottom-3 sm:right-3 sm:h-10 sm:w-10">
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 20 20"
                        className="h-4 w-4 fill-none stroke-current"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <path d="M7 3h10v10M17 3 8.5 11.5" />
                        <path d="M14 11v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
                      </svg>
                    </span>
                  </div>
                  {isOverview && (
                    <div className="px-1.5 pb-1 pt-2 sm:px-2 sm:pb-2 sm:pt-3">
                      <p className="truncate text-[10px] font-bold uppercase tracking-[0.12em] text-orange-700 dark:text-orange-300 sm:text-xs">
                        {image.categoryTitle}
                      </p>
                      <p className="mt-0.5 truncate text-xs font-semibold text-slate-700 dark:text-slate-200 sm:mt-1 sm:text-sm">
                        {image.alt}
                      </p>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {isOverview && (
              <div className="mt-7 text-center sm:mt-10">
                <p
                  aria-live="polite"
                  className="text-xs font-medium text-slate-500 dark:text-slate-400 sm:text-sm">
                  Menampilkan {visibleImages.length} dari {filteredImages.length} foto
                </p>
                {visibleImages.length < filteredImages.length && (
                  <button
                    type="button"
                    aria-controls="gallery-grid"
                    onClick={() =>
                      setVisibleCount((count) => count + PAGE_SIZE)
                    }
                    className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-500 sm:px-7 sm:text-base">
                    Muat lebih banyak
                  </button>
                )}
              </div>
            )}
          </div>
        </section>
      </main>

      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 p-3 backdrop-blur-sm sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`Pratinjau ${selectedImage.alt}`}
          onClick={() => setSelectedIndex(null)}>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={() => setSelectedIndex(null)}
            className="absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-6 sm:top-6"
            aria-label="Tutup galeri">
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              className="h-5 w-5 fill-none stroke-current"
              strokeWidth="2"
              strokeLinecap="round">
              <path d="m5 5 10 10M15 5 5 15" />
            </svg>
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setSelectedIndex(
                (selectedIndex - 1 + visibleImages.length) %
                  visibleImages.length,
              );
            }}
            className="absolute left-2 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-6 sm:h-12 sm:w-12"
            aria-label="Foto sebelumnya">
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              className="h-5 w-5 fill-none stroke-current"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path d="m12.5 4.5-5.5 5.5 5.5 5.5" />
            </svg>
          </button>
          <figure
            className="flex max-h-full max-w-6xl flex-col items-center px-10 sm:px-12"
            onClick={(event) => event.stopPropagation()}>
            <img
              src={selectedImage.fullSrc}
              alt={selectedImage.alt}
              className="max-h-[80vh] max-w-full rounded-xl object-contain shadow-2xl"
            />
            <figcaption className="mt-3 text-center text-xs font-medium text-slate-200 sm:mt-4 sm:text-sm">
              {selectedImage.alt} · {selectedIndex + 1} dari {visibleImages.length}
            </figcaption>
          </figure>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setSelectedIndex((selectedIndex + 1) % visibleImages.length);
            }}
            className="absolute right-2 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-6 sm:h-12 sm:w-12"
            aria-label="Foto berikutnya">
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              className="h-5 w-5 fill-none stroke-current"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path d="m7.5 4.5 5.5 5.5-5.5 5.5" />
            </svg>
          </button>
        </div>
      )}
    </InnerPageLayout>
  );
}

export default GalleryPage;

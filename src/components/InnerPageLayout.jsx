import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  brandAssets,
  primaryPages,
  site,
  updateThemeFavicon,
} from "../data/site";

function getInitialDarkMode() {
  if (typeof window === "undefined") return false;
  const stored = window.localStorage.getItem("nepatech-dark-mode");
  if (stored !== null) return stored === "true";
  return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? false;
}

function InnerPageLayout({ children }) {
  const { pathname } = useLocation();
  const [darkMode, setDarkMode] = useState(getInitialDarkMode);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    updateThemeFavicon(darkMode);
  }, [darkMode]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  const toggleDarkMode = () => {
    setDarkMode((current) => {
      const next = !current;
      window.localStorage.setItem("nepatech-dark-mode", String(next));
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <a
        href={site.whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Hubungi Nepatech melalui WhatsApp"
        className="fixed bottom-3 right-3 z-40 transition hover:scale-110 sm:bottom-5 sm:right-5">
        <img
          src="/img/logoWA.png"
          className="w-11 sm:w-14 lg:w-[70px]"
          alt=""
        />
      </a>

      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95">
        <div className="container">
          <div className="flex items-center justify-between gap-3 py-2.5 sm:py-3">
            <Link
              to="/"
              aria-label="Kembali ke beranda Nepatech"
              className="inline-flex rounded-xl p-1 transition hover:opacity-90">
              <img
                src={darkMode ? brandAssets.logoDark : brandAssets.logoLight}
                width="1098"
                height="616"
                className="w-[86px] sm:w-[118px]"
                alt={`Logo ${site.acronym} - ${site.name}`}
              />
            </Link>

            <nav aria-label="Navigasi halaman" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {primaryPages.map((item) => {
                  const isActive = pathname === item.to;
                  return (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        aria-current={isActive ? "page" : undefined}
                        className={`rounded-full px-3 py-2 text-sm font-semibold transition xl:px-4 ${
                          isActive
                            ? "bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300"
                            : "text-slate-700 hover:bg-slate-100 hover:text-orange-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-orange-300"
                        }`}>
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <button
              type="button"
              onClick={toggleDarkMode}
              className="inline-flex min-h-9 items-center rounded-full border border-slate-300 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-900 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 sm:min-h-10 sm:px-4 sm:text-sm"
              aria-label={darkMode ? "Aktifkan mode terang" : "Aktifkan mode gelap"}>
              {darkMode ? "Mode terang" : "Mode gelap"}
            </button>
          </div>

          <nav
            aria-label="Navigasi halaman seluler"
            className="-mx-4 overflow-x-auto border-t border-slate-100 px-4 dark:border-slate-800 lg:hidden">
            <ul className="flex min-w-max gap-1 py-2">
              <li>
                <Link
                  to="/"
                  className="inline-flex min-h-10 items-center rounded-full px-3 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">
                  Beranda
                </Link>
              </li>
              {primaryPages.map((item) => {
                const isActive = pathname === item.to;
                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      aria-current={isActive ? "page" : undefined}
                      className={`inline-flex min-h-10 items-center rounded-full px-3 text-xs font-semibold transition ${
                        isActive
                          ? "bg-primary text-white"
                          : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                      }`}>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </header>

      {children}

      <footer className="border-t border-slate-800 bg-slate-950 py-8 text-slate-300 sm:py-12">
        <div className="container grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="text-lg font-bold text-white">{site.name}</p>
            <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
              Kalibrasi, perawatan, pengadaan, konsultansi akreditasi, dan
              pelatihan untuk kebutuhan laboratorium industri.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-4 inline-flex text-sm font-semibold text-orange-300 transition hover:text-orange-200">
              {site.email}
            </a>
          </div>
          <div>
            <p className="font-semibold text-white">Jelajahi</p>
            <ul className="mt-3 space-y-2 text-sm">
              {primaryPages.slice(0, 3).map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="transition hover:text-orange-300">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-white">Perusahaan</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link to="/galeri" className="transition hover:text-orange-300">
                  Galeri pekerjaan
                </Link>
              </li>
              <li>
                <Link to="/kontak" className="transition hover:text-orange-300">
                  Kontak & penawaran
                </Link>
              </li>
              <li>
                <Link to="/#about" className="transition hover:text-orange-300">
                  Tentang Nepatech
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default InnerPageLayout;

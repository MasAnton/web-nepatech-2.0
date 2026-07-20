import { lazy, Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

const GalleryPage = lazy(() => import("./pages/GalleryPage"));
const ServicePage = lazy(() => import("./pages/ServicePage"));

const INTRO_SESSION_KEY = "nepatech-intro-shown";
const INTRO_HOLD_MS = 1640;
const INTRO_TOTAL_MS = 2000;

const shouldShowIntro = () => {
  if (typeof window === "undefined" || window.location.pathname !== "/") {
    return false;
  }

  if (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) {
    return false;
  }

  try {
    return window.sessionStorage.getItem(INTRO_SESSION_KEY) !== "true";
  } catch {
    return true;
  }
};

function RouteFallback() {
  return (
    <div
      role="status"
      className="flex min-h-screen items-center justify-center bg-slate-50 text-sm font-semibold text-slate-600 dark:bg-slate-950 dark:text-slate-300">
      Memuat halaman...
    </div>
  );
}

function LazyRoute({ children }) {
  return <Suspense fallback={<RouteFallback />}>{children}</Suspense>;
}

function App() {
  const [introStage, setIntroStage] = useState(() =>
    shouldShowIntro() ? "visible" : "done",
  );
  const introVisible = introStage !== "done";

  useEffect(() => {
    if (introStage === "done") return undefined;

    document.documentElement.classList.add("site-intro-active");

    const leaveTimer = window.setTimeout(() => {
      setIntroStage("leaving");
    }, INTRO_HOLD_MS);
    const finishTimer = window.setTimeout(() => {
      try {
        window.sessionStorage.setItem(INTRO_SESSION_KEY, "true");
      } catch {
        // The splash still exits normally when storage is unavailable.
      }

      document.documentElement.classList.remove("site-intro-active");
      setIntroStage("done");
    }, INTRO_TOTAL_MS);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(finishTimer);
      document.documentElement.classList.remove("site-intro-active");
    };
  }, []);

  return (
    <>
      {introVisible && (
        <div
          role="status"
          aria-live="polite"
          className={`site-intro${introStage === "leaving" ? " is-leaving" : ""}`}>
          <div className="site-intro__logo-wrap">
            <img
              src="/img/logoNGS_dark.png?v=2"
              alt=""
              aria-hidden="true"
              decoding="sync"
              fetchPriority="high"
              className="site-intro__logo"
            />
            <span className="sr-only">Memuat situs Nepatech...</span>
          </div>
        </div>
      )}

      <div
        aria-hidden={introVisible ? "true" : undefined}
        inert={introVisible ? "" : undefined}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/galeri"
            element={
              <LazyRoute>
                <GalleryPage />
              </LazyRoute>
            }
          />
          <Route
            path="/gallery/:slug"
            element={
              <LazyRoute>
                <GalleryPage />
              </LazyRoute>
            }
          />
          <Route
            path="/layanan-kalibrasi"
            element={
              <LazyRoute>
                <ServicePage pageKey="calibration" />
              </LazyRoute>
            }
          />
          <Route
            path="/ruang-lingkup"
            element={
              <LazyRoute>
                <ServicePage pageKey="scope" />
              </LazyRoute>
            }
          />
          <Route
            path="/konsultasi-pelatihan"
            element={
              <LazyRoute>
                <ServicePage pageKey="consulting" />
              </LazyRoute>
            }
          />
          <Route
            path="/kontak"
            element={
              <LazyRoute>
                <ServicePage pageKey="contact" />
              </LazyRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

import { useEffect } from "react";

const siteName = "PT. Nepatech Global Solusindo";
const defaultDescription =
  "Jasa kalibrasi, maintenance, dan supply peralatan laboratorium untuk industri batu bara dan analitik di Indonesia.";

function setMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function Seo({ title = siteName, description = defaultDescription, image = "/img/carousel/hero/1.png", noIndex = false }) {
  useEffect(() => {
    const pageTitle = title === siteName ? siteName : `${title} | ${siteName}`;
    const canonicalUrl = `${window.location.origin}${window.location.pathname}`;
    const imageUrl = new URL(image, window.location.origin).href;

    document.title = pageTitle;
    setMeta("name", "description", description);
    setMeta("name", "robots", noIndex ? "noindex, nofollow" : "index, follow");
    setMeta("property", "og:title", pageTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:image", imageUrl);
    setMeta("name", "twitter:title", pageTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", imageUrl);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);
  }, [description, image, noIndex, title]);

  return null;
}

export default Seo;

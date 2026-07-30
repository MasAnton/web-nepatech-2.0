import { useEffect } from "react";
import { brandAssets, faqItems, site, toSiteUrl } from "../data/site";

function setMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function getHomeGraph(canonicalUrl, pageTitle, description) {
  const organizationId = `${site.url}/#organization`;
  const websiteId = `${site.url}/#website`;

  return [
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: `${site.url}/`,
      name: site.brandName,
      alternateName: site.alternateNames,
      inLanguage: "id-ID",
      publisher: { "@id": organizationId },
    },
    {
      "@type": "Organization",
      "@id": organizationId,
      name: site.brandName,
      legalName: site.name,
      alternateName: site.alternateNames,
      description: site.description,
      url: `${site.url}/`,
      email: site.email,
      telephone: site.phoneHref,
      logo: {
        "@type": "ImageObject",
        url: toSiteUrl(brandAssets.organizationLogo),
        contentUrl: toSiteUrl(brandAssets.organizationLogo),
        width: 1098,
        height: 616,
      },
      image: toSiteUrl(brandAssets.socialImage),
      hasMap: site.mapsUrl,
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "Grand Wisata, Cluster Garden Hous BG01 No. 75, Lambangjaya",
        addressLocality: "Tambun Selatan",
        addressRegion: "Jawa Barat",
        addressCountry: "ID",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: site.phoneHref,
        email: site.email,
        contactType: "customer service",
        areaServed: "ID",
        availableLanguage: "Indonesian",
      },
    },
    {
      "@type": "WebPage",
      "@id": `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: pageTitle,
      description,
      inLanguage: "id-ID",
      isPartOf: { "@id": websiteId },
      about: { "@id": organizationId },
    },
    {
      "@type": "FAQPage",
      "@id": `${canonicalUrl}#faq`,
      url: `${canonicalUrl}#faq`,
      inLanguage: "id-ID",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ];
}

function getInnerPageGraph({
  canonicalUrl,
  pageTitle,
  description,
  pageType,
  breadcrumbs,
  structuredData,
}) {
  const crumbItems = [{ name: "Beranda", path: "/" }, ...breadcrumbs].map(
    (crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: toSiteUrl(crumb.path),
    }),
  );

  const graph = [
    {
      "@type": pageType,
      "@id": `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: pageTitle,
      description,
      inLanguage: "id-ID",
      isPartOf: { "@id": `${site.url}/#website` },
      about: { "@id": `${site.url}/#organization` },
      breadcrumb: { "@id": `${canonicalUrl}#breadcrumb` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${canonicalUrl}#breadcrumb`,
      itemListElement: crumbItems,
    },
  ];

  if (structuredData) {
    graph.push({
      ...structuredData,
      url: canonicalUrl,
      provider: structuredData.provider ?? {
        "@id": `${site.url}/#organization`,
      },
    });
  }

  return graph;
}

function Seo({
  title = site.name,
  description = site.description,
  image = brandAssets.socialImage,
  canonicalPath,
  pageType = "WebPage",
  breadcrumbs,
  structuredData,
  noIndex = false,
}) {
  useEffect(() => {
    const pathname = canonicalPath ?? window.location.pathname;
    const canonicalUrl = toSiteUrl(pathname);
    const imageUrl = toSiteUrl(image);
    const isHome = pathname === "/";
    const pageTitle = isHome
      ? site.searchTitle
      : `${title} | ${site.acronym}`;

    document.title = pageTitle;
    setMeta("name", "description", description);
    setMeta("name", "robots", noIndex ? "noindex, nofollow" : "index, follow");
    setMeta("property", "og:type", "website");
    setMeta("property", "og:title", pageTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:image", imageUrl);
    setMeta("name", "twitter:card", "summary_large_image");
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

    let schema = document.getElementById("seo-structured-data");
    if (noIndex) {
      schema?.remove();
      return;
    }

    if (!schema) {
      schema = document.createElement("script");
      schema.id = "seo-structured-data";
      schema.type = "application/ld+json";
      document.head.appendChild(schema);
    }

    const pageBreadcrumbs =
      breadcrumbs ?? (isHome ? [] : [{ name: title, path: pathname }]);
    const graph = isHome
      ? getHomeGraph(canonicalUrl, pageTitle, description)
      : getInnerPageGraph({
          canonicalUrl,
          pageTitle,
          description,
          pageType,
          breadcrumbs: pageBreadcrumbs,
          structuredData,
        });

    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": graph,
    });
  }, [
    breadcrumbs,
    canonicalPath,
    description,
    image,
    noIndex,
    pageType,
    structuredData,
    title,
  ]);

  return null;
}

export default Seo;

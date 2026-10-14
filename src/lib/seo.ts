import type { Metadata } from "next";
import { site } from "./site";

/**
 * Page metadata in one place: title, description, canonical URL, Open Graph
 * and Twitter tags. Every page goes through `pageMetadata` so that link
 * previews show the page's own title and URL (not the homepage's), and so
 * that copies of the site on other hostnames point search engines back to
 * syncmfg.com.
 */

const SUFFIX = ` | ${site.name}`;
/** Search results show roughly this many characters of a title. */
const TITLE_MAX = 60;
const DESCRIPTION_MAX = 160;

export const ogImage = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  alt: "SYNC Manufacturing — Precision Components. Specialized Processes. One Partner.",
};

/** Cut at a word boundary so a description never ends mid-word. */
export function clip(text: string, max = DESCRIPTION_MAX) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:.—–-]+$/, "")}…`;
}

type PageMeta = {
  title: string;
  description: string;
  /** Path on syncmfg.com, e.g. "/markets/aerospace" */
  path: string;
  /** Use the title exactly as given, without " | SYNC Manufacturing" */
  absolute?: boolean;
  article?: { publishedTime: string };
};

export function pageMetadata({
  title,
  description,
  path,
  absolute,
  article,
}: PageMeta): Metadata {
  // Drop the brand suffix when it would push the title past what search
  // results display.
  const withSuffix = `${title}${SUFFIX}`;
  const useSuffix = !absolute && withSuffix.length <= TITLE_MAX;
  const fullTitle = useSuffix ? withSuffix : title;
  const desc = clip(description);

  const shared = {
    siteName: site.name,
    url: path,
    title: fullTitle,
    description: desc,
    locale: "en_US",
    images: [ogImage],
  };

  return {
    title: useSuffix ? title : { absolute: title },
    description: desc,
    alternates: { canonical: path },
    openGraph: article
      ? { ...shared, type: "article", publishedTime: article.publishedTime }
      : { ...shared, type: "website" },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: [ogImage.url],
    },
  };
}

/* ---------------------------------------------------------------
   schema.org structured data
   --------------------------------------------------------------- */

const abs = (path: string) => new URL(path, site.url).toString();

export function organizationSchema(
  locations: {
    name: string;
    address: string[];
    city: string;
    state: string;
    phone?: string;
  }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    logo: abs("/sync-logo.png?v=2"),
    image: abs(ogImage.url),
    description: site.description,
    telephone: "+1-800-733-2648",
    parentOrganization: { "@type": "Organization", name: site.parent },
    location: locations.map((l) => ({
      "@type": "Place",
      name: l.name,
      telephone: l.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: l.address[0],
        addressLocality: l.city,
        addressRegion: l.state,
        postalCode: l.address[l.address.length - 1].match(/\d{5}/)?.[0],
        addressCountry: "US",
      },
    })),
  };
}

export function breadcrumbSchema(crumbs: { label: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: abs(c.href),
    })),
  };
}

export function articleSchema(a: {
  title: string;
  summary: string;
  date: string;
  path: string;
}) {
  const publisher = {
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    logo: { "@type": "ImageObject", url: abs("/sync-logo.png?v=2") },
  };
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: clip(a.title, 110),
    description: a.summary,
    datePublished: a.date,
    image: [abs(ogImage.url)],
    mainEntityOfPage: abs(a.path),
    author: publisher,
    publisher,
  };
}

import fs from "node:fs";
import path from "node:path";

/**
 * Long-form landing pages, one per capability (and the Valve & Flow Control
 * market), converted from the client's Word docs of Nov 20, 2026.
 *
 * Each page is a JSON file in src/content/landing/<slug>.json. The copy is the
 * client's, kept as written apart from brand casing ("SYNC"). To edit a page,
 * edit its JSON; the structure follows the doc's own headings.
 *
 * Server-only: reads the filesystem at build time.
 */

export type LandingLink = { label: string; href: string };

export type LandingBlock =
  | { t: "p" | "h3" | "h4"; text: string }
  | { t: "list"; items: string[] }
  | { t: "terms"; items: { term: string; text: string }[] }
  | { t: "cta"; links: LandingLink[] }
  | { t: "link"; label: string; href: string };

export type LandingImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export type LandingPage = {
  slug: string;
  kind: "solution" | "market";
  /** Solution family slug, for capability pages */
  family: string | null;
  title: string;
  subtitle: string | null;
  tagline: string | null;
  intro: string[];
  ctas: LandingLink[];
  hero: LandingImage | null;
  gallery: LandingImage[];
  sections: { heading: string; blocks: LandingBlock[] }[];
  faq: { q: string; a: LandingBlock[] }[];
  closing: {
    heading: string;
    subheading: string | null;
    paragraphs: string[];
    ctas: LandingLink[];
  };
  /** The Word doc this page came from */
  source: string;
};

const DIR = path.join(process.cwd(), "src", "content", "landing");

let cache: Map<string, LandingPage> | undefined;

function all(): Map<string, LandingPage> {
  if (!cache) {
    cache = new Map();
    for (const f of fs.readdirSync(DIR)) {
      if (!f.endsWith(".json")) continue;
      const page = JSON.parse(
        fs.readFileSync(path.join(DIR, f), "utf8"),
      ) as LandingPage;
      cache.set(page.slug, page);
    }
  }
  return cache;
}

export function getLanding(slug: string): LandingPage | undefined {
  return all().get(slug);
}

/** Capability pages in a solution family, keyed by capability slug. */
export function landingForFamily(family: string): LandingPage[] {
  return [...all().values()].filter(
    (p) => p.kind === "solution" && p.family === family,
  );
}

export function capabilityPages(): LandingPage[] {
  return [...all().values()].filter((p) => p.kind === "solution");
}

export function capabilityHref(page: LandingPage) {
  return `/solutions/${page.family}/${page.slug}`;
}

/** Stable anchor id for a heading. */
export function anchor(text: string) {
  return text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

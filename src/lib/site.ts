/**
 * Site-wide constants: company facts, navigation, locations, contacts.
 *
 * Facts sourced from "SYNC Website Aug 11 2026.pptx".
 * Anything marked DRAFT is placeholder copy written from the deck and should be
 * replaced with the approved text from the corresponding Web Developer Brief.
 */

export const site = {
  name: "SYNC Manufacturing",
  shortName: "SYNC",
  domain: "syncmfg.com",
  url: "https://syncmfg.com",
  tagline: "Precision molded rubber and plastics, in sync with your program.",
  // DRAFT — approved boilerplate pending
  description:
    "SYNC Manufacturing is a Langdale Holdings company delivering thermoset and thermoplastic molding, precision cutting, rubber compounding and bonding for aerospace, defense, medical, utilities, oil & gas and industrial programs.",
  parent: "Langdale Holdings",
  certifications: ["AS9100", "ITAR Registered"],
} as const;

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; blurb?: string }[];
};

export const nav: NavItem[] = [
  {
    label: "Markets",
    href: "/markets",
    children: [
      { label: "Aerospace", href: "/markets/aerospace" },
      { label: "Defense", href: "/markets/defense" },
      { label: "Medical", href: "/markets/medical" },
      { label: "Utilities", href: "/markets/utilities" },
      { label: "Oil & Gas", href: "/markets/oil-and-gas" },
      { label: "Industrial", href: "/markets/industrial" },
    ],
  },
  {
    label: "Solutions",
    href: "/solutions",
    children: [
      { label: "Molding Solutions", href: "/solutions/molding" },
      { label: "Cutting Solutions", href: "/solutions/cutting" },
      {
        label: "Compounding & Bonding",
        href: "/solutions/compounding-and-bonding",
      },
      { label: "Additional Solutions", href: "/solutions/additional" },
    ],
  },
  {
    label: "About Us",
    href: "/about",
    children: [
      { label: "Company Overview", href: "/about" },
      { label: "Langdale Holdings", href: "/about/langdale" },
      { label: "Our History", href: "/about/history" },
      { label: "Quality & Compliance", href: "/about/quality" },
      { label: "Press Releases", href: "/about/press" },
    ],
  },
  { label: "Locations", href: "/locations" },
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/contact" },
];

export type Location = {
  slug: string;
  name: string;
  legacyName: string;
  city: string;
  state: string;
  stateName: string;
  address: string[];
  phone?: string;
  phoneHref?: string;
  tollFree?: string;
  tollFreeHref?: string;
  fax?: string;
  /** Falls back to contacts.corporateHr when a plant has no inbox of its own */
  hrEmail?: string;
  /** One-line summary used on cards. DRAFT unless noted. */
  focus: string;
  /** Longer copy for the Locations page; falls back to `focus` */
  description?: string;
  capabilities: string[];
  mapQuery: string;
};

export const locations: Location[] = [
  {
    slug: "carson-city",
    name: "SYNC Carson City",
    legacyName: "Redco — Rubber Engineering & Development",
    city: "Carson City",
    stateName: "Nevada",
    state: "NV",
    address: ["3000 Arrowhead Drive", "Carson City, NV 89706"],
    phone: "775.882.3100",
    phoneHref: "+17758823100",
    tollFree: "800.733.2648",
    tollFreeHref: "+18007332648",
    hrEmail: "HRCarsoncity@syncmfg.com",
    focus:
      "Thermoset and silicone molding, rubber compounding, and rubber-to-metal bonding for aerospace and defense programs.",
    capabilities: [
      "Thermoset molding",
      "Silicone compression molding",
      "LSR molding",
      "Rubber compounding",
      "Rubber-to-metal bonding",
    ],
    mapQuery: "3000 Arrowhead Drive, Carson City, NV 89706",
  },
  {
    slug: "blackstone",
    name: "SYNC Blackstone",
    legacyName: "Verona Rubber Works",
    city: "Blackstone",
    stateName: "Illinois",
    state: "IL",
    address: ["31577 N. 1250 East Rd.", "Blackstone, IL 61313"],
    phone: "815-673-2929",
    phoneHref: "+18156732929",
    fax: "815-673-2521",
    hrEmail: "HRBlackstone@syncmfg.com",
    focus:
      "Large-format compression molding, rubber rollers, and industrial and utility components.",
    capabilities: [
      "Compression molding 8x8 to 46x46",
      "Transfer molding",
      "New rubber rollers",
      "Refurbished rubber rollers",
      "Die cutting",
    ],
    mapQuery: "31577 N 1250 East Rd, Blackstone, IL 61313",
  },
  {
    slug: "glendora",
    name: "SYNC Glendora",
    legacyName: "Southwest Plastics / Southwest Mold",
    city: "Glendora",
    stateName: "California",
    state: "CA",
    address: ["620 W. Foothill Blvd.", "Glendora, CA 91741"],
    phone: "626-963-6919",
    phoneHref: "+16269636919",
    hrEmail: "HRGlendora@syncmfg.com",
    focus:
      "Thermoplastic injection molding, tooling, and precision plastic components for medical and industrial customers.",
    capabilities: [
      "Thermoplastic injection molding",
      "Tool design & build",
      "Insert molding",
      "Kiss cutting",
      "Scan-to-part modeling",
    ],
    mapQuery: "620 W Foothill Blvd, Glendora, CA 91741",
  },
  {
    // From "Website Updates Sept 26.pptx", slide 12. No phone number or HR
    // inbox was supplied, so the site falls back to corporate contacts.
    slug: "canton",
    name: "SYNC Canton",
    legacyName: "MDI / Aptyx — Rubber Latex Molding",
    city: "Canton",
    stateName: "Ohio",
    state: "OH",
    address: ["5175 Stoneham Rd.", "Canton, OH 44720"],
    focus:
      "Latex dip molding and engineered elastomer components, backed by nearly five decades of manufacturing experience.",
    description:
      "Our Canton, Ohio operation specializes in latex dip molding and engineered elastomer components, supported by nearly five decades of manufacturing experience. Capabilities include in-house latex compounding, chlorination, custom mold development, isostatic press bags, trimming, spray finishing, and semi-automated production, serving demanding medical, industrial, diving, and government applications.",
    capabilities: [
      "Latex dip molding",
      "In-house latex compounding",
      "Chlorination",
      "Custom mold development",
      "Isostatic press bags",
      "Trimming & spray finishing",
      "Semi-automated production",
    ],
    mapQuery: "5175 Stoneham Rd, Canton, OH 44720",
  },
];

// Unnamed on purpose: the client wants a "coming soon" signal without
// committing to a specific site.
export const futureLocations = [{ label: "More locations", note: "Coming soon" }];

export const contacts = {
  corporateHr: "HR@syncmfg.com",
  // DRAFT — confirm the general inbox before launch
  sales: "sales@syncmfg.com",
  info: "info@syncmfg.com",
};

export const acquisitionTimeline = [
  {
    date: "August 2023",
    company: "Southwest Plastics",
    shortName: "Southwest Plastics",
    abbr: "SWP",
    slug: "southwest-plastics-acquisition",
    note: "Glendora, California — thermoplastic injection molding and tooling.",
  },
  {
    date: "October 2023",
    company: "Redco — Rubber Engineering & Development",
    shortName: "Redco",
    abbr: "REDCO",
    slug: "redco-acquisition",
    note: "Carson City, Nevada — thermoset and silicone molding, compounding.",
  },
  {
    date: "March 2024",
    company: "Santa Fe Rubber",
    shortName: "Santa Fe Rubber",
    abbr: "SFR",
    slug: "santa-fe-rubber-acquisition",
    note: "Added rubber capacity and tooling to the Redco platform.",
  },
  {
    date: "October 2025",
    company: "Verona Rubber Works",
    shortName: "Verona Rubber Works",
    abbr: "VRW",
    slug: "verona-rubber-works-acquisition",
    note: "Blackstone, Illinois — large-format compression molding and rollers.",
  },
  {
    date: "August 2026",
    company: "SYNC Manufacturing",
    shortName: "SYNC",
    abbr: "SYNC",
    slug: null,
    note: "Four companies unify under a single name, brand, and quality system.",
  },
  {
    // DRAFT — month not supplied; announcement is
    // Sync_Manufacturing_MDI_Aptyx_Canton_Acquisition_Announcement.docx
    date: "2026",
    company: "MDI / Aptyx",
    shortName: "MDI / Aptyx",
    abbr: "MDI",
    slug: null,
    note: "Canton, Ohio — latex dip molding and engineered elastomer components.",
  },
] as const;

/* ---------------------------------------------------------------
   Derived facts. Pages read these instead of hard-coding "three
   plants" or "four companies", so adding a location or an
   acquisition above updates every count on the site.
   --------------------------------------------------------------- */

const WORDS = [
  "zero", "one", "two", "three", "four", "five", "six", "seven", "eight",
  "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen",
  "sixteen", "seventeen", "eighteen", "nineteen", "twenty",
];

export function numberWord(n: number, capitalize = false) {
  const w = WORDS[n] ?? String(n);
  return capitalize ? w[0].toUpperCase() + w.slice(1) : w;
}

/** "a, b and c" */
export function joinList(items: readonly string[]) {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

export const plantCount = locations.length;

/** Companies brought into SYNC — every timeline entry except SYNC itself */
export const joinedCompanies = acquisitionTimeline.filter(
  (t) => t.abbr !== "SYNC",
);

export const stateList = joinList([
  ...new Set(locations.map((l) => l.stateName)),
]);

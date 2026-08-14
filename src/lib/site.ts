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
  address: string[];
  phone: string;
  phoneHref: string;
  tollFree?: string;
  tollFreeHref?: string;
  fax?: string;
  hrEmail: string;
  /** DRAFT — capability summary per plant */
  focus: string;
  capabilities: string[];
  mapQuery: string;
};

export const locations: Location[] = [
  {
    slug: "carson-city",
    name: "SYNC Carson City",
    legacyName: "Redco — Rubber Engineering & Development",
    city: "Carson City",
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
];

export const futureLocations = [
  { label: "Ohio", note: "Coming soon" },
  { label: "Mexico", note: "Coming soon" },
];

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
    abbr: "SWP",
    slug: "southwest-plastics-acquisition",
    note: "Glendora, California — thermoplastic injection molding and tooling.",
  },
  {
    date: "October 2023",
    company: "Redco — Rubber Engineering & Development",
    abbr: "REDCO",
    slug: "redco-acquisition",
    note: "Carson City, Nevada — thermoset and silicone molding, compounding.",
  },
  {
    date: "March 2024",
    company: "Santa Fe Rubber",
    abbr: "SFR",
    slug: "santa-fe-rubber-acquisition",
    note: "Added rubber capacity and tooling to the Redco platform.",
  },
  {
    date: "October 2025",
    company: "Verona Rubber Works",
    abbr: "VRW",
    slug: "verona-rubber-works-acquisition",
    note: "Blackstone, Illinois — large-format compression molding and rollers.",
  },
  {
    date: "August 2026",
    company: "SYNC Manufacturing",
    abbr: "SYNC",
    slug: null,
    note: "Four companies unify under a single name, brand, and quality system.",
  },
] as const;

/**
 * Press releases.
 *
 * Titles, companies and month/year come from slide 8 of the deck. The exact
 * publication dates below are the first of the stated month as a placeholder —
 * replace with the real dateline from each FINAL.docx.
 *
 * Body copy for the four 2023–2025 releases is DRAFT, written from the deck.
 * Their source documents were never supplied:
 *   Langdale_Holdings_Southwest_Plastics_Acquisition_FINAL.docx
 *   Langdale_Holdings_REDCO_Acquisition_FINAL.docx
 *   Langdale_Holdings_REDCO_Santa_Fe_Rubber_Acquisition_FINAL.docx
 *   Langdale_Holdings_Verona_Rubber_Works_Acquisition_FINAL.docx
 *
 * The Canton release is the client's own text, verbatim from
 * "Canton Acquisition Announcement.docx" (only its `summary` was written
 * here). Do not edit its wording.
 */

/** A paragraph, a pull quote, or an emphasised closing line. */
export type PressBlock =
  | string
  | { quote: string; by: string }
  | { strong: string };

export type PressRelease = {
  slug: string;
  title: string;
  /** ISO date — DRAFT, month and year confirmed, day is a placeholder */
  date: string;
  dateLabel: string;
  location: string;
  summary: string;
  body: PressBlock[];
  sourceDoc: string;
  /** Small label above the title, e.g. "Acquisition announcement" */
  kicker?: string;
  /** Boilerplate printed at the end. Falls back to the site description. */
  about?: { heading: string; text: string }[];
};

export const pressReleases: PressRelease[] = [
  {
    slug: "canton-acquisition",
    kicker: "Acquisition announcement",
    title:
      "Sync Manufacturing Launches with Acquisition of Canton, Ohio Operations",
    date: "2026-10-01",
    dateLabel: "October 1, 2026",
    location: "Canton, Ohio",
    summary:
      "Langdale Dip Moldings LLC, a subsidiary of Langdale Holdings, has acquired the MDI / Aptyx manufacturing operation in Canton, Ohio — the first business to operate under the new Sync Manufacturing brand.",
    body: [
      "Langdale Holdings is pleased to announce that Langdale Dip Moldings LLC, a subsidiary of Langdale Holdings, has acquired the MDI / Aptyx manufacturing operation in Canton, Ohio.",
      "The Canton operation will become the first business to operate under the new Sync Manufacturing brand, marking an important milestone in the continued growth and evolution of Langdale Holdings' U.S. manufacturing platform. Sync Manufacturing is being established to bring the organization's manufacturing businesses together under a unified customer-facing brand, connecting specialized capabilities, technical expertise, and resources across multiple U.S. locations.",
      "Founded in 1976, the Canton operation brings nearly five decades of specialized manufacturing experience, including latex dip molding, in-house latex compounding, chlorination, custom mold development, and secondary finishing. The acquisition adds a highly specialized manufacturing process to Sync and expands the organization's ability to support customers requiring custom elastomer and dip-molded solutions.",
      "Rick Szekelyi has been named Chief Executive Officer of Langdale Dip Moldings LLC and will lead the Canton operation, working closely with the existing team to support customers, strengthen operations, and identify opportunities to grow the business and expand its capabilities.",
      {
        quote:
          "We are very pleased to welcome the Canton team to our organization and equally excited for this operation to represent the first launch under the Sync Manufacturing brand. This business has a long history, unique technical capabilities, and an experienced team that understands a highly specialized manufacturing process. Sync Manufacturing is about bringing specialized manufacturing capabilities together and making it easier for our customers to access the resources they need. Canton is a great place to begin that next chapter.",
        by: "Tobe Allenbrand, President & CEO of Langdale Holdings",
      },
      "The Canton operation will continue to support its established customers and specialized dip-molding programs while gaining access to the broader resources and manufacturing capabilities of the Sync Manufacturing organization. As the Sync Manufacturing brand continues to develop, additional Langdale manufacturing operations will transition under the unified brand.",
      {
        strong:
          "Langdale Dip Moldings LLC officially acquired the Canton operation from MDI / Aptyx effective October 1, 2026.",
      },
    ],
    about: [
      {
        heading: "About Sync Manufacturing",
        text: "The unified manufacturing platform and customer-facing brand of Langdale Holdings, connecting specialized U.S.-based capabilities across plastics, rubber, elastomers, dip molding, tooling, machining, fabrication, and value-added operations.",
      },
      {
        heading: "About Langdale Holdings",
        text: "A privately held U.S. manufacturing company focused on acquiring, developing, and growing specialized manufacturing businesses for the long term. Langdale Holdings is the parent company of Sync Manufacturing and its operating entities.",
      },
    ],
    sourceDoc: "Canton Acquisition Announcement.docx",
  },
  {
    slug: "verona-rubber-works-acquisition",
    title: "Langdale Holdings Acquires Verona Rubber Works",
    date: "2025-10-01",
    dateLabel: "October 2025",
    location: "Blackstone, Illinois",
    summary:
      "The addition of Verona Rubber Works brings large-format compression molding and rubber roller manufacturing to the Langdale platform, extending its reach into the Midwest.",
    body: [
      "Langdale Holdings today announced the acquisition of Verona Rubber Works of Blackstone, Illinois. Founded as a custom rubber molder serving industrial and agricultural customers, Verona brings large-format compression molding capacity — up to 46 by 46 inches — along with new and refurbished rubber roller manufacturing.",
      "The acquisition is the fourth for the platform in just over two years, following Southwest Plastics, Redco and Santa Fe Rubber. It gives the group its first Midwest manufacturing footprint and adds capabilities that complement, rather than duplicate, those of the existing plants.",
      "Verona's operations will continue at the Blackstone facility with its existing workforce, and its customers will retain their current points of contact.",
    ],
    sourceDoc: "Langdale_Holdings_Verona_Rubber_Works_Acquisition_FINAL.docx",
  },
  {
    slug: "santa-fe-rubber-acquisition",
    title: "Redco Acquires Santa Fe Rubber",
    date: "2024-03-01",
    dateLabel: "March 2024",
    location: "Carson City, Nevada",
    summary:
      "Santa Fe Rubber joins Redco, consolidating rubber molding capacity and tooling capability within the Langdale Holdings family of companies.",
    body: [
      "Redco, a Langdale Holdings company, has acquired Santa Fe Rubber. The transaction consolidates additional rubber molding capacity and tooling capability into the Carson City operation.",
      "The combination expands available press capacity for customers in aerospace, defense and industrial markets, and deepens the compounding expertise that has been central to Redco's work since its founding.",
      "Santa Fe Rubber customers will be served through Redco's Carson City facility with continuity of program management and quality documentation.",
    ],
    sourceDoc: "Langdale_Holdings_REDCO_Santa_Fe_Rubber_Acquisition_FINAL.docx",
  },
  {
    slug: "redco-acquisition",
    title: "Langdale Holdings Acquires Redco — Rubber Engineering & Development",
    date: "2023-10-01",
    dateLabel: "October 2023",
    location: "Carson City, Nevada",
    summary:
      "Redco adds thermoset and silicone molding, in-house rubber compounding, and AS9100-certified aerospace production to the Langdale platform.",
    body: [
      "Langdale Holdings has acquired Redco — Rubber Engineering & Development of Carson City, Nevada. Redco brings thermoset, silicone and LSR molding, rubber-to-metal bonding, and in-house rubber compounding to the platform, along with an AS9100-certified quality system and ITAR registration.",
      "The acquisition follows Langdale's purchase of Southwest Plastics two months earlier and establishes the pairing of rubber and plastics capability that would define the group's strategy.",
      "Redco continues to operate from its Carson City facility on Arrowhead Drive.",
    ],
    sourceDoc: "Langdale_Holdings_REDCO_Acquisition_FINAL.docx",
  },
  {
    slug: "southwest-plastics-acquisition",
    title: "Langdale Holdings Acquires Southwest Plastics",
    date: "2023-08-01",
    dateLabel: "August 2023",
    location: "Glendora, California",
    summary:
      "Southwest Plastics becomes the founding acquisition of the Langdale Holdings manufacturing platform, contributing thermoplastic injection molding and tooling.",
    body: [
      "Langdale Holdings announced today the acquisition of Southwest Plastics of Glendora, California, the first investment in what would become a multi-plant precision manufacturing platform.",
      "Southwest Plastics contributes thermoplastic injection molding, insert molding and in-house tool design and build, serving medical, industrial and consumer customers from Southern California.",
      "The company continues to operate from its Glendora facility with its existing management and workforce.",
    ],
    sourceDoc: "Langdale_Holdings_Southwest_Plastics_Acquisition_FINAL.docx",
  },
];

export function getPressRelease(slug: string) {
  return pressReleases.find((p) => p.slug === slug);
}

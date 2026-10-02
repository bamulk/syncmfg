import fs from "node:fs";
import path from "node:path";

/**
 * Photographic page heroes.
 *
 * Every page that can carry a hero photo has a slot here. To add one, save the
 * image as public/images/heroes/<slot>.jpg (or .webp/.png) — it is picked up at
 * the next build with no code change. Pages without a file keep the plain navy
 * hero. See IMAGES.md for sizes and the generation prompts for each slot.
 *
 * Server-only: reads the filesystem at build time.
 */

export type HeroImage = {
  src: string;
  alt: string;
  /** CSS object-position, for keeping the subject in frame when cropped */
  position?: string;
};

const SLOTS = {
  about: {
    alt: "Molded rubber and plastic seals, bellows and housings on a factory floor",
    position: "60% 72%",
  },
  langdale: {
    alt: "Molded rubber bellows, seals and plastic brackets in front of production equipment",
    position: "35% 60%",
  },
  history: {
    alt: "SYNC technician setting a mold in a compression press",
    position: "60% 40%",
  },
  locations: {
    alt: "Map of SYNC Manufacturing plants in Carson City, Glendora, Blackstone and Canton",
    position: "42% 50%",
  },
  quality: {
    alt: "Inspector measuring a molded rubber part with calipers",
    position: "70% 30%",
  },
  careers: {
    alt: "Two machine operators reviewing a molded part beside a press",
    position: "50% 32%",
  },
  contact: {
    alt: "Engineer reviewing a part drawing beside molded components",
    position: "70% 35%",
  },
  "markets-aerospace": { alt: "Commercial aircraft wing above the clouds" },
  "markets-defense": { alt: "Military ground vehicle on a test range" },
  "markets-medical": {
    alt: "Silicone medical device components in a clean environment",
    position: "70% 62%",
  },
  "markets-utilities": { alt: "Polymer insulator on a transmission tower at dusk" },
  "markets-oil-and-gas": { alt: "Wellhead valves at an oil and gas site" },
  "markets-industrial": { alt: "Heavy industrial equipment with rubber rollers" },
  "solutions-molding": {
    alt: "Compression molding press with an open mold",
    position: "70% 60%",
  },
  "solutions-cutting": { alt: "Die-cut rubber gaskets on a cutting table" },
  "solutions-compounding-and-bonding": { alt: "Rubber compound being milled on a two-roll mill" },
  "solutions-additional": { alt: "3D scanner capturing a legacy rubber part" },
} as const satisfies Record<string, { alt: string; position?: string }>;

export type HeroSlot = keyof typeof SLOTS;

const DIR = path.join(process.cwd(), "public", "images", "heroes");
const EXTS = ["jpg", "webp", "png"];

export function getHero(slot: HeroSlot | string): HeroImage | undefined {
  const meta = (SLOTS as Record<string, { alt: string; position?: string }>)[slot];
  if (!meta) return undefined;
  for (const ext of EXTS) {
    if (fs.existsSync(path.join(DIR, `${slot}.${ext}`))) {
      return { src: `/images/heroes/${slot}.${ext}`, ...meta };
    }
  }
  return undefined;
}

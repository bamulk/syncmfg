/**
 * Market landing pages.
 *
 * The six markets and their order come from slide 4 of the deck. Each one has a
 * "Sync_<Market>_Landing_Page_Web_Developer_Brief.docx" that was not supplied —
 * every string below marked DRAFT is placeholder copy to be replaced with the
 * approved text from that brief.
 */

export type Market = {
  slug: string;
  name: string;
  /** DRAFT */
  eyebrow: string;
  /** DRAFT */
  intro: string;
  /** DRAFT */
  body: string[];
  /** DRAFT */
  applications: string[];
  /** DRAFT */
  materials: string[];
  /** Certifications and controls that genuinely apply to this market */
  compliance: string[];
  /** Slugs from solutions.ts that this market leans on */
  relatedSolutions: string[];
  icon: MarketIcon;
};

export type MarketIcon =
  | "aerospace"
  | "defense"
  | "medical"
  | "utilities"
  | "oil"
  | "industrial";

export const markets: Market[] = [
  {
    slug: "aerospace",
    name: "Aerospace",
    icon: "aerospace",
    eyebrow: "Flight-critical elastomers",
    intro:
      "AS9100-certified molding for seals, grommets, bumpers and vibration control on commercial and rotary-wing platforms.",
    body: [
      "Aerospace programs live or die on repeatability. SYNC builds aerospace parts inside an AS9100 quality system with full lot traceability from raw compound through final inspection, so the part you qualify in year one is the part you receive in year ten.",
      "Our Carson City plant runs thermoset, silicone and LSR molding for flight hardware, with rubber-to-metal bonded assemblies for mounts and isolators. First article inspection reports, certificates of conformance and material certifications ship with every lot.",
    ],
    applications: [
      "O-rings, seals and gaskets",
      "Vibration isolators and mounts",
      "Grommets, bumpers and edge trim",
      "Environmental and fluid seals",
      "Bonded rubber-to-metal assemblies",
    ],
    materials: [
      "Silicone (VMQ)",
      "Fluorosilicone (FVMQ)",
      "Fluorocarbon (FKM)",
      "EPDM",
      "Nitrile (NBR)",
    ],
    compliance: ["AS9100", "ITAR Registered", "Full lot traceability", "FAIR / PPAP on request"],
    relatedSolutions: ["molding", "compounding-and-bonding"],
  },
  {
    slug: "defense",
    name: "Defense",
    icon: "defense",
    eyebrow: "ITAR-registered production",
    intro:
      "ITAR-registered domestic manufacturing for ground, sea and air platforms, from prototype tooling through sustained low-rate production.",
    body: [
      "SYNC is an ITAR-registered manufacturer with all production performed in the United States. We support defense primes and their tiers with controlled drawings, secure handling of technical data, and the documentation packages your DCMA reviews expect.",
      "Long-life programs need a supplier who can still make the part after the original tooling is thirty years old. We reverse engineer legacy components with scan-to-part modeling, rebuild tooling in house, and re-qualify compounds when a specified material goes obsolete.",
    ],
    applications: [
      "Sealing systems for ground vehicles",
      "Shock and vibration isolation",
      "Legacy component reverse engineering",
      "Cable and harness grommets",
      "Blast and ballistic support components",
    ],
    materials: [
      "Nitrile (NBR)",
      "EPDM",
      "Neoprene (CR)",
      "Silicone (VMQ)",
      "Natural rubber",
    ],
    compliance: [
      "ITAR Registered",
      "AS9100",
      "Domestic supply chain",
      "Obsolescence and last-time-buy support",
    ],
    relatedSolutions: ["molding", "additional"],
  },
  {
    slug: "medical",
    name: "Medical",
    icon: "medical",
    eyebrow: "Clean, repeatable, documented",
    intro:
      "LSR and thermoplastic molding for device components where dimensional stability and material traceability are non-negotiable.",
    body: [
      "Medical device work rewards discipline over speed. SYNC molds liquid silicone rubber and medical-grade thermoplastics in controlled cells, with documented process parameters and validated tooling so every cavity behaves the same way across every shift.",
      "Our Glendora plant handles tool design, insert molding and precision plastic components; Carson City covers silicone and LSR. Working across both means a device assembly that mixes rubber and plastic parts can come from a single supplier under a single quality system.",
    ],
    applications: [
      "Device seals, septa and valves",
      "Overmolded handles and grips",
      "Fluid path components",
      "Insert-molded assemblies",
      "Single-use disposables",
    ],
    materials: [
      "Liquid silicone rubber (LSR)",
      "Medical-grade silicone",
      "Polycarbonate",
      "Polypropylene",
      "TPE / TPU",
    ],
    compliance: [
      "Documented process validation",
      "Material traceability",
      "Controlled molding cells",
      "Change control on tooling and compounds",
    ],
    relatedSolutions: ["molding", "cutting"],
  },
  {
    slug: "utilities",
    name: "Utilities",
    icon: "utilities",
    eyebrow: "Built for the grid",
    intro:
      "Molded insulating and weather-sealing components for transmission, distribution and substation hardware.",
    body: [
      "Utility components sit outdoors for decades. SYNC compounds elastomers for UV, ozone and temperature-cycling resistance, then molds and tests them against the dielectric and weathering requirements your specification calls out.",
      "Large-format compression molding at Blackstone handles the oversized parts other shops turn away, up to 46 x 46 inches, without splitting a single component across multiple tools.",
    ],
    applications: [
      "Insulating boots and covers",
      "Weather seals and gaskets",
      "Cable terminations and grommets",
      "Substation hardware components",
      "Bushings and pads",
    ],
    materials: ["EPDM", "Silicone (VMQ)", "Neoprene (CR)", "Nitrile (NBR)", "SBR"],
    compliance: [
      "Dielectric-grade compounding",
      "UV and ozone resistance testing",
      "Large-format tooling to 46x46",
    ],
    relatedSolutions: ["molding", "compounding-and-bonding"],
  },
  {
    slug: "oil-and-gas",
    name: "Oil & Gas",
    icon: "oil",
    eyebrow: "Downhole and surface duty",
    intro:
      "Elastomers engineered for pressure, temperature and chemical attack, from wellhead seals to surface handling equipment.",
    body: [
      "Oilfield service pulls elastomers apart: sour gas, high pressure, thermal cycling and explosive decompression. SYNC compounds in house, which means we can adjust a formulation for your well conditions instead of forcing your application onto a stock compound.",
      "We support both new production and refurbishment, including rubber rollers and rebuilt sealing components that return equipment to service without a full replacement.",
    ],
    applications: [
      "Wellhead and valve seals",
      "Packer and downhole elements",
      "Pump and rotating equipment seals",
      "Wear pads and protectors",
      "Roller refurbishment",
    ],
    materials: [
      "Fluorocarbon (FKM)",
      "HNBR",
      "Nitrile (NBR)",
      "Aflas (FEPM)",
      "EPDM",
    ],
    compliance: [
      "Custom compounding for well conditions",
      "RGD-resistant formulations",
      "Documented material certifications",
    ],
    relatedSolutions: ["compounding-and-bonding", "molding"],
  },
  {
    slug: "industrial",
    name: "Industrial",
    icon: "industrial",
    eyebrow: "Volume, tooling, and turnaround",
    intro:
      "Custom molded and die-cut components for OEMs across converting, material handling, agriculture and heavy equipment.",
    body: [
      "Most industrial programs are won on total cost, not unit price. SYNC quotes tooling and part together, builds tools in house where it shortens the loop, and holds inventory programs so your line does not stop waiting on a gasket.",
      "Kiss cutting and die cutting sit alongside molding, so a job that starts as a molded seal and ends as a die-cut sheet gasket does not need a second supplier or a second quality system.",
    ],
    applications: [
      "Custom gaskets and sheet parts",
      "New and refurbished rubber rollers",
      "Bumpers, pads and wear components",
      "Bonded rubber-to-metal assemblies",
      "Vibration damping components",
    ],
    materials: ["Nitrile (NBR)", "EPDM", "Neoprene (CR)", "Natural rubber", "Urethane"],
    compliance: [
      "In-house tool design and build",
      "Inventory and kanban programs",
      "PPAP documentation on request",
    ],
    relatedSolutions: ["cutting", "molding", "compounding-and-bonding"],
  },
];

export function getMarket(slug: string) {
  return markets.find((m) => m.slug === slug);
}

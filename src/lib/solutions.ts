/**
 * Solutions / Capabilities.
 *
 * The four categories and every sub-capability below are transcribed verbatim
 * from the "Solutions We Provide" graphic on slide 5 of the deck — do not add or
 * rename a bullet without approval.
 *
 * Descriptive prose is DRAFT: the deck notes "We can work on this content", and
 * Sync_Plastic_Molding_Capability_Web_Developer_Brief.docx was not supplied.
 */

export type Capability = {
  slug: string;
  name: string;
  /** DRAFT */
  summary: string;
  /** DRAFT */
  detail?: string;
  /** DRAFT */
  specs?: { label: string; value: string }[];
};

export type Solution = {
  slug: string;
  name: string;
  icon: "molding" | "cutting" | "compounding" | "additional";
  /** DRAFT */
  eyebrow: string;
  /** DRAFT */
  intro: string;
  /** DRAFT */
  body: string[];
  capabilities: Capability[];
};

export const solutions: Solution[] = [
  {
    slug: "molding",
    name: "Molding Solutions",
    icon: "molding",
    eyebrow: "Thermoset, thermoplastic, silicone",
    intro:
      "Thermoset, thermoplastic and silicone molding under one roof, from micro LSR components to 46 x 46 inch compression tools.",
    body: [
      "Choosing the process is half of the engineering. A part that is wrong for transfer molding may be ideal for compression; a design that fights an injection tool may mold cleanly in silicone. SYNC runs all of them, so the recommendation you get is driven by your part rather than by the one press we happen to own.",
      "Tooling is designed and built in house wherever it shortens the development loop. That keeps first-article timelines short and keeps tool maintenance, cavity repair and engineering changes with the same team that cut the steel.",
    ],
    capabilities: [
      {
        slug: "thermoset-molding",
        name: "Thermoset Molding",
        summary:
          "Cured elastomer parts with the thermal and chemical resistance that thermoplastics cannot reach.",
      },
      {
        slug: "thermoplastic-injection-molding",
        name: "Thermoplastic Injection Molding",
        summary:
          "High-repeatability plastic components, insert molding and overmolding, tooled and run at our Glendora plant.",
      },
      {
        slug: "transfer-molding",
        name: "Transfer Molding",
        summary:
          "The right process for bonded inserts and tight-tolerance features on medium-volume elastomer parts.",
      },
      {
        slug: "compression-molding",
        name: "Compression Molding 8x8 to 46x46",
        summary:
          "Large-format capacity up to 46 x 46 inches for oversized seals, pads and utility components.",
        specs: [{ label: "Platen range", value: "8x8 in. to 46x46 in." }],
      },
      {
        slug: "silicone-compression-molding",
        name: "Silicone Compression Molding",
        summary:
          "Temperature-stable silicone parts for aerospace, medical and utility service.",
      },
      {
        slug: "lsr-molding",
        name: "LSR Molding",
        summary:
          "Liquid silicone rubber for fine features, high volumes and clean, flash-minimal parts.",
      },
      {
        slug: "rubber-molding",
        name: "Rubber Molding",
        summary:
          "Custom rubber components molded from compounds we mix ourselves to your application's requirements.",
      },
    ],
  },
  {
    slug: "cutting",
    name: "Cutting Solutions",
    icon: "cutting",
    eyebrow: "Precision converting",
    intro:
      "Kiss cutting and die cutting for gaskets, shims, insulators and adhesive-backed parts.",
    body: [
      "Not every part should be molded. When the geometry is flat and the volume is right, cutting is faster to tool and cheaper per piece, and SYNC will tell you when that is the better answer for your print.",
      "Because cutting sits alongside molding in the same organization, a program can move between the two as volumes change without re-qualifying a new supplier.",
    ],
    capabilities: [
      {
        slug: "kiss-cutting",
        name: "Kiss Cutting",
        summary:
          "Cuts the part without cutting the liner, for adhesive-backed gaskets, insulators and pads that ship ready to apply.",
      },
      {
        slug: "die-cutting",
        name: "Die Cutting",
        summary:
          "Through-cut sheet parts in rubber, foam, film and composite stack-ups, from prototype quantities to production runs.",
      },
    ],
  },
  {
    slug: "compounding-and-bonding",
    name: "Compounding & Bonding Solutions",
    icon: "compounding",
    eyebrow: "Materials engineered in house",
    intro:
      "Custom rubber compounding, rubber-to-metal bonding, and new and refurbished rubber rollers.",
    body: [
      "SYNC mixes its own rubber. That is unusual for a molder, and it is the reason we can tune a compound to your service conditions instead of asking your application to tolerate a catalog material.",
      "The same materials capability underpins our bonding and roller work: adhesion systems are selected for the substrate and the duty cycle, and refurbished rollers come back with a documented durometer and finish rather than whatever the shop had on hand.",
    ],
    capabilities: [
      {
        slug: "rubber-compounding",
        name: "Rubber Compounding",
        summary:
          "In-house mixing and formulation development, including custom compounds for temperature, chemical and dielectric requirements.",
      },
      {
        slug: "rubber-to-metal-bonding",
        name: "Rubber to Metal Bonding",
        summary:
          "Bonded assemblies for mounts, isolators and sealing hardware, with surface preparation and adhesion testing in process.",
      },
      {
        slug: "new-rubber-rollers",
        name: "New Rubber Rollers",
        summary:
          "Covered rollers built to your core, durometer, crown and finish specification.",
      },
      {
        slug: "refurbish-rubber-rollers",
        name: "Refurbish Rubber Rollers",
        summary:
          "Strip, recover, grind and balance existing cores to return equipment to service at a fraction of replacement cost.",
      },
    ],
  },
  {
    slug: "additional",
    name: "Additional Solutions",
    icon: "additional",
    eyebrow: "Where programs get unstuck",
    intro:
      "PFAS-free material alternatives and scan-to-part modeling for legacy and obsolete components.",
    body: [
      "Two problems come up again and again: a specified material is being regulated out of the supply chain, or the only remaining record of a part is the worn part itself. SYNC handles both.",
      "PFAS restrictions are reshaping elastomer selection across every market we serve. We qualify alternative compounds against your original performance requirements so the change is an engineering decision with data behind it, not a scramble at end of life.",
    ],
    capabilities: [
      {
        slug: "pfas-free-alternatives",
        name: "PFAS-Free Alternatives",
        summary:
          "Qualified replacement compounds for fluorinated materials facing regulatory restriction, tested against your original spec.",
      },
      {
        slug: "scan-to-part-model",
        name: "Scan-to-Part Model",
        summary:
          "3D scanning of legacy or obsolete components into a manufacturable CAD model and new tooling, with no original drawing required.",
      },
    ],
  },
];

export function getSolution(slug: string) {
  return solutions.find((s) => s.slug === slug);
}

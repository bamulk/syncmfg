import type { Metadata } from "next";
import { acquisitionTimeline, futureLocations, locations } from "@/lib/site";
import {
  CheckList,
  Container,
  CtaBand,
  Eyebrow,
  PageHero,
  Prose,
  SectionHeading,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Langdale Holdings",
  description:
    "Langdale Holdings is the investment platform behind SYNC Manufacturing, acquiring and growing precision rubber and plastics manufacturers across North America.",
};

/* DRAFT — replace with the approved copy from
   Langdale_Holdings_Landing_Page_Web_Developer_Brief.docx (not supplied). */
const body = [
  "Langdale Holdings acquires and builds North American precision manufacturers. Since 2023 the platform has brought together four rubber and plastics companies — Southwest Plastics, Redco, Santa Fe Rubber and Verona Rubber Works — into what is today SYNC Manufacturing.",
  "The model is long-hold, not turnaround. Langdale buys companies with real process knowledge and durable customer relationships, invests in capacity and systems, and keeps the operating teams in place. Where most acquirers consolidate plants, Langdale consolidated the things customers never wanted to duplicate — quality systems, documentation, supplier qualification — and left the manufacturing where it was.",
  "That approach continues. Additional capacity is in development in Ohio and Mexico, and the platform actively evaluates manufacturers whose capabilities complement rather than overlap the existing footprint.",
];

const criteria = [
  "Precision rubber, plastics and elastomer manufacturers",
  "Established customer relationships in regulated markets",
  "Capabilities that complement, not duplicate, the platform",
  "Owners seeking succession without dismantling the business",
  "North American operations",
];

export default function LangdalePage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Langdale Holdings"
        intro="The investment platform behind SYNC Manufacturing — building North American precision manufacturing capacity company by company."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about" },
          { label: "Langdale Holdings", href: "/about/langdale" },
        ]}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_340px] lg:gap-16">
            <div className="max-w-2xl">
              <SectionHeading
                eyebrow="The platform"
                title="Buy well-run manufacturers. Keep them well-run."
              />
              <div className="mt-8">
                <Prose paragraphs={body} />
              </div>

              <div className="mt-12">
                <Eyebrow>Acquisition criteria</Eyebrow>
                <h3 className="mt-2 mb-6 text-xl font-bold text-navy">
                  What Langdale looks for
                </h3>
                <CheckList items={criteria} />
              </div>
            </div>

            <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-lg border border-line bg-surface p-6">
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-navy">
                  Platform companies
                </h3>
                <ul className="mt-4 space-y-3.5">
                  {acquisitionTimeline
                    .filter((t) => t.abbr !== "SYNC")
                    .map((t) => (
                      <li key={t.company}>
                        <p className="font-semibold leading-snug text-navy">
                          {t.company}
                        </p>
                        <p className="text-sm text-muted">{t.date}</p>
                      </li>
                    ))}
                </ul>
              </div>

              <div className="rounded-lg border border-line p-6">
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-navy">
                  Footprint
                </h3>
                <ul className="mt-4 space-y-3">
                  {locations.map((l) => (
                    <li key={l.slug} className="text-[15px] leading-snug">
                      <span className="font-semibold text-navy">
                        {l.city}, {l.state}
                      </span>
                      <span className="block text-sm text-muted">
                        {l.legacyName}
                      </span>
                    </li>
                  ))}
                  {futureLocations.map((f) => (
                    <li key={f.label} className="text-[15px] leading-snug">
                      <span className="font-semibold text-gray-metal">
                        {f.label}
                      </span>
                      <span className="ml-2 rounded bg-surface px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-blue">
                        {f.note}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <CtaBand
        title="Considering a sale, or looking for a manufacturing partner?"
        intro="Langdale evaluates acquisition opportunities across North American precision manufacturing. SYNC quotes production work every day. Either conversation starts the same way."
        primary={{ href: "/contact", label: "Get in touch" }}
        secondary={{ href: "/about/history", label: "Our history" }}
      />
    </>
  );
}

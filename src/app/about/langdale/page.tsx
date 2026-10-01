import type { Metadata } from "next";
import {
  futureLocations,
  joinedCompanies,
  locations,
} from "@/lib/site";
import { getHero } from "@/lib/heroes";
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
    "Langdale Holdings is privately held and family-owned, acquiring established North American manufacturers and investing in their future.",
};

/* Copy from "Website Updates Sept 26.pptx", slides 4–8 (client-approved). */
const body = [
  "Langdale Holdings acquires established North American manufacturers with strong teams, deep process knowledge and durable customer relationships.",
  "Our approach is long-term. We invest in equipment, systems, people and capacity while preserving the operating knowledge and customer relationships that made each business successful.",
  "We do not believe growth has to mean stripping away what works. Our goal is to strengthen each business, expand its capabilities and create more opportunities for employees and customers over time.",
  "As the organization grows, we continue to look for manufacturers that bring complementary capabilities, technical expertise or geographic reach to the group.",
];

const criteria = [
  "Precision rubber, plastics, elastomer and related manufacturing businesses",
  "Strong operating teams and experienced employees",
  "Established customer relationships",
  "Specialized or technically differentiated capabilities",
  "Technical, regulated or mission-critical end markets",
  "Owners considering succession or a long-term transition",
  "North American manufacturing operations",
];

export default function LangdalePage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Langdale Holdings"
        intro="Privately held. Family-owned. Investing in the future of North American manufacturing."
        image={getHero("langdale")}
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
                title="We preserve what works, invest where it matters, and build for the long term."
              />
              <div className="mt-8">
                <Prose paragraphs={body} />
              </div>

              <div className="mt-12">
                <Eyebrow>Acquisition criteria</Eyebrow>
                <h3 className="mt-2 text-xl font-bold text-navy">
                  Companies that fit how we build.
                </h3>
                <p className="mt-3 mb-6 text-[17px] leading-relaxed text-muted">
                  We look for well-run businesses with strong people,
                  differentiated capabilities and a foundation we can continue
                  building on.
                </p>
                <CheckList items={criteria} />
              </div>
            </div>

            {/* Both lists are generated from src/lib/site.ts — adding a
                location or an acquisition there updates them here. */}
            <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-lg border border-line bg-surface p-6">
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-navy">
                  Platform companies
                </h3>
                <ul className="mt-4 space-y-3.5">
                  {joinedCompanies.map((t) => (
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
        title="Preserve what was built. Invest in what comes next."
        intro={[
          "For owners considering succession or a sale, Langdale offers a long-term home for businesses built on decades of manufacturing knowledge, strong customer relationships and experienced people.",
          "We believe preserving North American manufacturing means more than keeping machines running. It means protecting the know-how, craftsmanship and relationships that make these businesses valuable — while investing in the people, systems and capacity needed for the future.",
        ]}
        primary={{ href: "/contact", label: "Let’s start the conversation" }}
      />
    </>
  );
}

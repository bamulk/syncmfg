import type { Metadata } from "next";
import Link from "next/link";
import { acquisitionTimeline } from "@/lib/site";
import { pressReleases } from "@/lib/press";
import { ArrowIcon } from "@/components/Icons";
import {
  Container,
  CtaBand,
  Eyebrow,
  PageHero,
  SectionHeading,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Our History",
  description:
    "From four independent rubber and plastics manufacturers to a single company: the history of SYNC Manufacturing, 2023 to 2026.",
};

/* DRAFT — the approved narrative lives in
   Sync_Manufacturing_Website_History_FINAL.docx, which was not supplied.
   Everything below is placeholder written from the deck's timeline. */
const chapters = [
  {
    heading: "A platform, not a roll-up",
    paragraphs: [
      "Langdale Holdings began acquiring precision manufacturers in 2023 with a specific thesis: the American rubber and plastics industry is full of excellent, decades-old shops with deep process knowledge and no succession plan. Buying them is easy. Keeping what makes them good is the hard part.",
      "Each acquisition was chosen because it added a capability the platform did not already have, not because it added revenue to a capability it did. That discipline is why SYNC today can quote a thermoset seal, an injection molded housing, a die-cut gasket and a rebuilt roller without sending any of it outside.",
    ],
  },
  {
    heading: "Building the capability set",
    paragraphs: [
      "Southwest Plastics came first, in August 2023, bringing thermoplastic injection molding and in-house tool building from Glendora, California. Two months later Redco joined the platform, adding thermoset and silicone molding, rubber-to-metal bonding, and the in-house compounding capability that would become central to the group's engineering identity.",
      "Santa Fe Rubber followed in March 2024, consolidating additional rubber capacity into the Carson City operation. In October 2025, Verona Rubber Works added large-format compression molding to 46 by 46 inches and a rubber roller business — and gave the platform its first Midwest footprint.",
    ],
  },
  {
    heading: "One name, August 2026",
    paragraphs: [
      "By 2026 the four companies were quoting each other's customers, sharing engineering resources and running overlapping quality documentation. Customers were qualifying the same organization two and three times over.",
      "SYNC Manufacturing resolved that. One name, one quality system, one point of contact — with the plants, the people and the process knowledge left exactly where they were. Legacy names remain visible in our locations and our history because those reputations were earned, and because the people who earned them still work here.",
    ],
  },
];

export default function HistoryPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Our History"
        intro="Four companies, three years, one name. How SYNC Manufacturing came together — and why the plants that built it are still doing the work."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about" },
          { label: "History", href: "/about/history" },
        ]}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_360px] lg:gap-16">
            <div className="max-w-2xl space-y-14">
              {chapters.map((c) => (
                <div key={c.heading}>
                  <h2 className="text-2xl font-bold text-navy sm:text-3xl">
                    {c.heading}
                  </h2>
                  <div className="mt-5 space-y-5">
                    {c.paragraphs.map((p, i) => (
                      <p
                        key={i}
                        className="text-[17px] leading-relaxed text-muted"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Vertical timeline */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-xl border border-line bg-surface p-7">
                <Eyebrow>Acquisition timeline</Eyebrow>
                <ol className="mt-7">
                  {acquisitionTimeline.map((t, i) => {
                    const release = t.slug
                      ? pressReleases.find((p) => p.slug === t.slug)
                      : undefined;
                    const last = i === acquisitionTimeline.length - 1;
                    return (
                      <li key={t.company} className="relative flex gap-5 pb-8 last:pb-0">
                        {!last && (
                          <span
                            className="absolute left-[9px] top-5 h-full w-px bg-line"
                            aria-hidden="true"
                          />
                        )}
                        <span
                          className={`relative z-10 mt-1 h-[18px] w-[18px] shrink-0 rounded-full border-[3px] border-surface ${
                            last ? "bg-blue ring-4 ring-blue/20" : "bg-gray-metal"
                          }`}
                          aria-hidden="true"
                        />
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-blue">
                            {t.date}
                          </p>
                          <p className="mt-0.5 font-bold leading-snug text-navy">
                            {t.company}
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-muted">
                            {t.note}
                          </p>
                          {release && (
                            <Link
                              href={`/about/press/${release.slug}`}
                              className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-blue hover:gap-2.5"
                            >
                              Read the release
                              <ArrowIcon className="h-3.5 w-3.5" />
                            </Link>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="bg-surface py-16">
        <Container>
          <SectionHeading
            eyebrow="Newsroom"
            title="Acquisition announcements"
            intro="Every step of the platform's growth, as announced."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pressReleases.map((p) => (
              <Link
                key={p.slug}
                href={`/about/press/${p.slug}`}
                className="group flex flex-col rounded-lg border border-line bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-blue/40"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-blue">
                  {p.dateLabel}
                </p>
                <h3 className="mt-2 flex-1 font-bold leading-snug text-navy">
                  {p.title}
                </h3>
                <ArrowIcon className="mt-4 h-4 w-4 text-gray-metal group-hover:text-blue" />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        title="The next chapter is the part you need made."
        intro="Three plants, four solution families and a century of combined process knowledge — pointed at your program."
        secondary={{ href: "/about/langdale", label: "About Langdale Holdings" }}
      />
    </>
  );
}

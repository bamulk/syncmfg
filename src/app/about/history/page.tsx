import type { Metadata } from "next";
import Link from "next/link";
import { acquisitionTimeline } from "@/lib/site";
import { pressReleases } from "@/lib/press";
import { getHero } from "@/lib/heroes";
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
    "Decades of manufacturing experience brought together under one name: the history of SYNC Manufacturing.",
};

/* Copy from "Website Updates Sept 26.pptx", slide 10 (client-approved). */
const chapters = [
  {
    heading: "Built on what already worked",
    paragraphs: [
      "SYNC Manufacturing was created by bringing together established manufacturers with decades of experience in rubber, plastics, and engineered components.",
      "These businesses were successful long before they became part of SYNC. They had experienced people, specialized process knowledge, long-standing customer relationships, and reputations earned over many years.",
      "Our approach has been to preserve those strengths while investing in the equipment, systems and resources needed to help them grow.",
    ],
  },
  {
    heading: "Expanding capabilities with purpose",
    paragraphs: [
      "As the organization has grown, so has the range of manufacturing capabilities available to our customers.",
      "What began with individual companies specializing in particular processes has become a broader manufacturing organization that supports customers across thermoplastic injection molding, thermoset and silicone molding, compression molding, rubber-to-metal bonding, compounding, tooling, and other specialized processes.",
      "The goal is not simply to become larger. It is to build a manufacturing organization with complementary capabilities that can solve more problems for customers.",
    ],
  },
  {
    heading: "One organization. Built from decades of experience.",
    paragraphs: [
      "SYNC Manufacturing brings these capabilities together under one name and one customer-facing organization while preserving the people and process knowledge behind them.",
      "Customers gain access to a broader manufacturing network, coordinated quality systems and a single point of contact without losing the specialized expertise that made each operation successful in the first place.",
      "Our history remains an important part of who we are. The names and companies that built SYNC represent decades of manufacturing knowledge — and that experience continues to shape how we operate today.",
    ],
  },
];

export default function HistoryPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Our History"
        intro="Decades of manufacturing experience, brought together under one name."
        image={getHero("history")}
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
                    const isSync = t.abbr === "SYNC";
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
                            isSync ? "bg-blue ring-4 ring-blue/20" : "bg-gray-metal"
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
        intro="Specialized plants, a full range of processes and decades of combined process knowledge — pointed at your program."
        secondary={{ href: "/about/langdale", label: "About Langdale Holdings" }}
      />
    </>
  );
}

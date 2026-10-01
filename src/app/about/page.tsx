import type { Metadata } from "next";
import Link from "next/link";
import { acquisitionTimeline, locations, site } from "@/lib/site";
import { getHero } from "@/lib/heroes";
import { solutions } from "@/lib/solutions";
import { ArrowIcon, solutionIcons } from "@/components/Icons";
import {
  Container,
  CtaBand,
  Eyebrow,
  IconBadge,
  PageHero,
  SectionHeading,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "SYNC Manufacturing brings together established rubber and plastics manufacturers under one organization, giving customers broader capabilities, consistent quality, and a single point of contact.",
};

/* Copy from "Website Updates Sept 26.pptx", slides 2–3 (client-approved). */
const overview = [
  "SYNC Manufacturing is a North American manufacturer of precision rubber and plastic components serving demanding applications across aerospace, defense, medical, utilities, oil & gas and industrial markets.",
  "Our organization was built by bringing together established manufacturers with decades of specialized process knowledge. Each operation retains the people, equipment and expertise that made it successful, while SYNC connects those capabilities through a common organization focused on quality, responsiveness and long-term customer support.",
  "The result is broader manufacturing capability without sacrificing the technical knowledge that comes from years of making difficult parts.",
];

const values = [
  {
    title: "Engineering-driven solutions",
    body: "We work with customers to solve manufacturing challenges, improve manufacturability and identify the right process and material for the application.",
  },
  {
    title: "Specialized manufacturing expertise",
    body: "Our facilities maintain the process knowledge, equipment and experienced teams behind the capabilities they have developed over decades.",
  },
  {
    title: "Quality built into the process",
    body: "From material control and lot traceability to inspection and documentation, our quality systems are designed for demanding and regulated programs.",
  },
  {
    title: "Built for long-term programs",
    body: "We support products throughout their lifecycle, from development and qualification through ongoing production and legacy program support.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Built from experience. Unified for what’s next."
        intro="SYNC Manufacturing brings together established rubber and plastics manufacturers under one organization, giving customers broader capabilities, consistent quality, and a single point of contact."
        image={getHero("about")}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about" },
        ]}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_340px] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Who we are"
                title="Manufacturing expertise, brought together."
              />
              <div className="mt-8 space-y-5">
                {overview.map((p, i) => (
                  <p key={i} className="text-[17px] leading-relaxed text-muted">
                    {p}
                  </p>
                ))}
              </div>

              <div className="mt-12 grid gap-6 sm:grid-cols-2">
                {values.map((v) => (
                  <div key={v.title} className="border-l-2 border-blue pl-5">
                    <h3 className="font-bold text-navy">{v.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-muted">
                      {v.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
              {[
                {
                  href: "/about/langdale",
                  title: "Langdale Holdings",
                  body: "The investment platform behind SYNC and its acquisitions.",
                },
                {
                  href: "/about/history",
                  title: "Our History",
                  body: "Decades of manufacturing experience brought together under one name.",
                },
                {
                  href: "/about/quality",
                  title: "Quality & Compliance",
                  body: "AS9100 certification, ITAR registration and traceability.",
                },
                {
                  href: "/about/press",
                  title: "Press Releases",
                  body: "Acquisition announcements and company news.",
                },
                {
                  href: "/careers",
                  title: "Careers",
                  body: "Open roles across every SYNC location.",
                },
              ].map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="group block rounded-lg border border-line p-5 transition-colors hover:border-blue/40 hover:bg-surface"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-bold text-navy">{c.title}</h3>
                    <ArrowIcon className="h-4 w-4 shrink-0 text-gray-metal group-hover:text-blue" />
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {c.body}
                  </p>
                </Link>
              ))}
            </aside>
          </div>
        </Container>
      </section>

      {/* At a glance */}
      <section className="bg-surface py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="At a glance"
            title="What SYNC brings to a program"
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {solutions.map((s) => {
              const Icon = solutionIcons[s.icon];
              return (
                <Link
                  key={s.slug}
                  href={`/solutions/${s.slug}`}
                  className="group rounded-lg border border-line bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-blue/40"
                >
                  <IconBadge>
                    <Icon className="h-6 w-6" />
                  </IconBadge>
                  <h3 className="mt-4 font-bold text-navy">{s.name}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {s.capabilities.length} capabilities
                  </p>
                </Link>
              );
            })}
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {locations.map((l) => (
              <div
                key={l.slug}
                className="rounded-lg border border-line bg-white p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-blue">
                  {l.city}, {l.state}
                </p>
                <h3 className="mt-1.5 font-bold text-navy">{l.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {l.focus}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Timeline strip */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading eyebrow="Timeline" title="From acquisition to one name" />
            <Link
              href="/about/history"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-blue hover:gap-3"
            >
              Full history
              <ArrowIcon />
            </Link>
          </div>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {acquisitionTimeline.map((t) => (
              <li
                key={t.company}
                className={`rounded-lg border p-5 ${
                  t.abbr === "SYNC"
                    ? "border-blue bg-blue/[0.04]"
                    : "border-line"
                }`}
              >
                <Eyebrow>{t.date}</Eyebrow>
                <p className="mt-2 font-bold leading-snug text-navy">
                  {t.company}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {t.note}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <CtaBand
        title={`Work with ${site.shortName}.`}
        intro="Whether you are qualifying a new supplier or moving an existing program, start with a conversation about the part."
        secondary={{ href: "/careers", label: "See open roles" }}
      />
    </>
  );
}

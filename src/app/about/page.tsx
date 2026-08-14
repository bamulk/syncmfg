import type { Metadata } from "next";
import Link from "next/link";
import { acquisitionTimeline, locations, site } from "@/lib/site";
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
    "SYNC Manufacturing unites Redco, Southwest Plastics, Santa Fe Rubber and Verona Rubber Works under one name, one quality system and one point of contact.",
};

/* DRAFT — replace with approved boilerplate from
   Sync_Manufacturing_Website_History_FINAL.docx */
const overview = [
  "SYNC Manufacturing is a precision rubber and plastics manufacturer built from four established companies acquired by Langdale Holdings between 2023 and 2025. In August 2026 those companies took a single name.",
  "The point of unifying was never the logo. It was that customers were already buying molded rubber from one of our plants and injection molded plastic from another, running two supplier qualifications, two quality systems and two sets of paperwork for parts that ended up in the same assembly. SYNC removes that duplication without removing the plants, the people or the process knowledge that made each company worth acquiring.",
  "Today that means three manufacturing facilities in Nevada, Illinois and California, with additional capacity in development in Ohio and Mexico — all operating under a shared AS9100 quality system and ITAR registration.",
];

const values = [
  {
    title: "Engineering answers, not order taking",
    body: "If your part would be cheaper or more reliable made a different way, we will say so before we quote it — even when the honest answer is a process with a lower margin for us.",
  },
  {
    title: "The plants keep their expertise",
    body: "Unification consolidated systems, not knowledge. The engineers who have run these compounds and these presses for decades are the same ones running your job.",
  },
  {
    title: "Documentation that survives an audit",
    body: "Lot traceability, material certifications and certificates of conformance are standard, not an upcharge triggered by a customer request.",
  },
  {
    title: "Long-life program support",
    body: "We keep making the part after the original tooling wears out, the drawing goes missing and the specified compound gets regulated away.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Four companies. One manufacturer."
        intro="SYNC Manufacturing brings Redco, Southwest Plastics, Santa Fe Rubber and Verona Rubber Works together under a single name, quality system and point of contact."
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
                title="A manufacturer assembled on purpose"
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
                  body: "How four companies became one, from 2023 to today.",
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
                  body: "Open roles across all three manufacturing locations.",
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

          <div className="mt-12 grid gap-5 sm:grid-cols-3">
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
          <ol className="mt-10 grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {acquisitionTimeline.map((t, i) => (
              <li
                key={t.company}
                className={`rounded-lg border p-5 ${
                  i === acquisitionTimeline.length - 1
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

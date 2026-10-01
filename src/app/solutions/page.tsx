import type { Metadata } from "next";
import Link from "next/link";
import { solutions } from "@/lib/solutions";
import { numberWord } from "@/lib/site";

const capabilityCount = solutions.reduce(
  (n, s) => n + s.capabilities.length,
  0,
);
import { ArrowIcon, CheckIcon, solutionIcons } from "@/components/Icons";
import {
  Container,
  CtaBand,
  IconBadge,
  PageHero,
  SectionHeading,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Solutions & Capabilities",
  description:
    "Molding, cutting, compounding and bonding solutions from SYNC Manufacturing — including thermoset, thermoplastic injection, LSR and compression molding to 46x46.",
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions we provide"
        title={`${numberWord(solutions.length, true)} solution families. ${numberWord(capabilityCount, true)} ways to make your part.`}
        intro="SYNC runs the full range of elastomer and plastics processes, so the recommendation you get is the right one for your part rather than the only one we can run."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions" },
        ]}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="space-y-16">
            {solutions.map((s) => {
              const Icon = solutionIcons[s.icon];
              return (
                <div
                  key={s.slug}
                  className="grid gap-8 border-b border-line pb-16 last:border-0 last:pb-0 lg:grid-cols-[380px_1fr] lg:gap-14"
                >
                  <div>
                    <IconBadge size="lg">
                      <Icon className="h-6 w-6" />
                    </IconBadge>
                    <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-blue">
                      {s.eyebrow}
                    </p>
                    <h2 className="mt-1.5 text-2xl font-bold text-navy">
                      {s.name}
                    </h2>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted">
                      {s.intro}
                    </p>
                    <Link
                      href={`/solutions/${s.slug}`}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue hover:gap-3"
                    >
                      Full detail
                      <ArrowIcon />
                    </Link>
                  </div>

                  <ul className="grid gap-3 sm:grid-cols-2 lg:content-start">
                    {s.capabilities.map((c) => (
                      <li
                        key={c.slug}
                        className="rounded-lg border border-line p-5"
                      >
                        <div className="flex items-start gap-2.5">
                          <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-blue" />
                          <div>
                            <h3 className="font-semibold leading-snug text-navy">
                              {c.name}
                            </h3>
                            <p className="mt-1.5 text-sm leading-relaxed text-muted">
                              {c.summary}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-surface py-16 sm:py-20">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Choosing a process"
            title="Not sure which process your part needs?"
            intro="That is the question we get most, and it is the one worth getting right. Molding, cutting and bonding each win on different geometry, volume and tolerance combinations."
          />
          <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-3">
            {[
              {
                q: "Flat geometry, moderate volume?",
                a: "Die or kiss cutting tools faster and costs less per piece than a mold.",
                href: "/solutions/cutting",
                label: "Cutting solutions",
              },
              {
                q: "Complex 3D form or tight tolerance?",
                a: "Compression, transfer or injection molding, chosen by volume and material.",
                href: "/solutions/molding",
                label: "Molding solutions",
              },
              {
                q: "Metal substrate or specialty material?",
                a: "Rubber-to-metal bonding with a compound developed for the duty cycle.",
                href: "/solutions/compounding-and-bonding",
                label: "Compounding & bonding",
              },
            ].map((item) => (
              <div
                key={item.q}
                className="flex flex-col rounded-lg border border-line bg-white p-6"
              >
                <h3 className="text-lg font-bold leading-snug text-navy">
                  {item.q}
                </h3>
                <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-muted">
                  {item.a}
                </p>
                <Link
                  href={item.href}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue hover:gap-3"
                >
                  {item.label}
                  <ArrowIcon />
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        title="Send the print. We'll recommend the process."
        intro="Include your drawing, target volume and service conditions. Our engineers will tell you the most economical way to make the part — even when that means a different process than you asked for."
        secondary={{ href: "/markets", label: "Browse by market" }}
      />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { pressReleases } from "@/lib/press";
import { contacts } from "@/lib/site";
import { ArrowIcon } from "@/components/Icons";
import { Container, CtaBand, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Press Releases",
  description:
    "News and acquisition announcements from SYNC Manufacturing and Langdale Holdings.",
};

export default function PressIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Newsroom"
        title="Press Releases"
        intro="Acquisition announcements and company news from SYNC Manufacturing and Langdale Holdings."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about" },
          { label: "Press", href: "/about/press" },
        ]}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_300px] lg:gap-16">
            <ul className="divide-y divide-line">
              {pressReleases.map((p) => (
                <li key={p.slug} className="py-8 first:pt-0 last:pb-0">
                  <article>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold uppercase tracking-wider">
                      <time dateTime={p.date} className="text-blue">
                        {p.dateLabel}
                      </time>
                      <span aria-hidden="true" className="text-line">
                        &bull;
                      </span>
                      <span className="text-gray-metal">{p.location}</span>
                    </div>
                    <h2 className="mt-2.5 text-2xl font-bold leading-snug text-navy">
                      <Link
                        href={`/about/press/${p.slug}`}
                        className="hover:text-blue"
                      >
                        {p.title}
                      </Link>
                    </h2>
                    <p className="mt-3 max-w-2xl text-[17px] leading-relaxed text-muted">
                      {p.summary}
                    </p>
                    <Link
                      href={`/about/press/${p.slug}`}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue hover:gap-3"
                    >
                      Read the full release
                      <ArrowIcon />
                    </Link>
                  </article>
                </li>
              ))}
            </ul>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-lg border border-line bg-surface p-6">
                <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-navy">
                  Media inquiries
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">
                  For interviews, photography or additional information about
                  SYNC Manufacturing and Langdale Holdings.
                </p>
                <a
                  href={`mailto:${contacts.info}`}
                  className="mt-4 inline-block font-semibold text-blue hover:underline"
                >
                  {contacts.info}
                </a>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <CtaBand
        title="Following the story? The work is the interesting part."
        intro="Three plants, four solution families, and a growing footprint across North America."
        primary={{ href: "/about/history", label: "Read our history" }}
        secondary={{ href: "/solutions", label: "See capabilities" }}
      />
    </>
  );
}

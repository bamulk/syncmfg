import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPressRelease, pressReleases } from "@/lib/press";
import { contacts, site } from "@/lib/site";
import { ArrowIcon } from "@/components/Icons";
import { Container, CtaBand, PageHero } from "@/components/ui";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return pressReleases.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const release = getPressRelease(slug);
  if (!release) return {};
  return {
    title: release.title,
    description: release.summary,
    openGraph: { type: "article", publishedTime: release.date },
  };
}

export default async function PressReleasePage({ params }: Params) {
  const { slug } = await params;
  const release = getPressRelease(slug);
  if (!release) notFound();

  const others = pressReleases.filter((p) => p.slug !== release.slug);

  return (
    <>
      <PageHero
        eyebrow={`${release.dateLabel} · ${release.location}`}
        title={release.title}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about" },
          { label: "Press", href: "/about/press" },
        ]}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_300px] lg:gap-16">
            <article className="max-w-2xl">
              <p className="border-l-4 border-blue pl-5 text-xl leading-relaxed font-medium text-navy">
                {release.summary}
              </p>
              <div className="mt-9 space-y-5">
                <p className="text-[17px] leading-relaxed text-muted">
                  <span className="font-semibold uppercase tracking-wide text-navy">
                    {release.location}
                  </span>
                  <span className="mx-2 text-gray-metal">&mdash;</span>
                  {release.body[0]}
                </p>
                {release.body.slice(1).map((p, i) => (
                  <p key={i} className="text-[17px] leading-relaxed text-muted">
                    {p}
                  </p>
                ))}
              </div>

              <div className="mt-12 rounded-lg border border-line bg-surface p-6">
                <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-navy">
                  About {site.name}
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">
                  {site.description}
                </p>
              </div>

              <div className="mt-8 border-t border-line pt-6">
                <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-navy">
                  Media contact
                </h2>
                <a
                  href={`mailto:${contacts.info}`}
                  className="mt-2 inline-block font-semibold text-blue hover:underline"
                >
                  {contacts.info}
                </a>
              </div>
            </article>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-lg border border-line p-6">
                <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-navy">
                  More releases
                </h2>
                <ul className="mt-4 space-y-4">
                  {others.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/about/press/${p.slug}`} className="group">
                        <p className="text-xs font-semibold uppercase tracking-wider text-blue">
                          {p.dateLabel}
                        </p>
                        <p className="mt-1 font-semibold leading-snug text-navy group-hover:text-blue">
                          {p.title}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/about/press"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue hover:gap-3"
                >
                  All press releases
                  <ArrowIcon />
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <CtaBand
        title="Put our capabilities to work."
        intro="Every acquisition added a process. Tell us about your part and we will point you at the right one."
        secondary={{ href: "/about/history", label: "Our history" }}
      />
    </>
  );
}

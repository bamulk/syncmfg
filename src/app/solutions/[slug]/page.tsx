import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSolution, solutions } from "@/lib/solutions";
import { markets } from "@/lib/markets";
import { ArrowIcon, CheckIcon, solutionIcons } from "@/components/Icons";
import {
  Container,
  CtaBand,
  Eyebrow,
  IconBadge,
  PageHero,
  Prose,
} from "@/components/ui";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) return {};
  return { title: solution.name, description: solution.intro };
}

export default async function SolutionPage({ params }: Params) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) notFound();

  const Icon = solutionIcons[solution.icon];
  const others = solutions.filter((s) => s.slug !== solution.slug);
  const servedMarkets = markets.filter((m) =>
    m.relatedSolutions.includes(solution.slug),
  );

  return (
    <>
      <PageHero
        eyebrow={solution.eyebrow}
        title={solution.name}
        intro={solution.intro}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions" },
          { label: solution.name, href: `/solutions/${solution.slug}` },
        ]}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_320px] lg:gap-16">
            <div>
              <div className="mb-8 flex items-center gap-4">
                <IconBadge size="lg">
                  <Icon className="h-6 w-6" />
                </IconBadge>
                <h2 className="text-2xl font-bold text-navy">
                  What this covers
                </h2>
              </div>

              <Prose paragraphs={solution.body} />

              <div className="mt-14">
                <Eyebrow>Capabilities</Eyebrow>
                <h3 className="mt-2 text-2xl font-bold text-navy">
                  {solution.capabilities.length} processes in this family
                </h3>
                <ul className="mt-8 space-y-4">
                  {solution.capabilities.map((c) => (
                    <li
                      key={c.slug}
                      id={c.slug}
                      className="rounded-lg border border-line p-6 scroll-mt-28"
                    >
                      <div className="flex items-start gap-3">
                        <CheckIcon className="mt-1 h-5 w-5 shrink-0 text-blue" />
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-navy">
                            {c.name}
                          </h4>
                          <p className="mt-2 text-[15px] leading-relaxed text-muted">
                            {c.summary}
                          </p>
                          {c.detail && (
                            <p className="mt-2 text-[15px] leading-relaxed text-muted">
                              {c.detail}
                            </p>
                          )}
                          {c.specs && (
                            <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-2 border-t border-line pt-4">
                              {c.specs.map((s) => (
                                <div key={s.label}>
                                  <dt className="text-xs font-semibold uppercase tracking-wider text-gray-metal">
                                    {s.label}
                                  </dt>
                                  <dd className="mt-0.5 font-semibold text-navy">
                                    {s.value}
                                  </dd>
                                </div>
                              ))}
                            </dl>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              <nav
                aria-label="On this page"
                className="rounded-lg border border-line p-6"
              >
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-navy">
                  On this page
                </h3>
                <ul className="mt-4 space-y-2">
                  {solution.capabilities.map((c) => (
                    <li key={c.slug}>
                      <a
                        href={`#${c.slug}`}
                        className="text-[15px] leading-snug text-muted hover:text-blue"
                      >
                        {c.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              {servedMarkets.length > 0 && (
                <div className="rounded-lg border border-line p-6">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-navy">
                    Markets served
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {servedMarkets.map((m) => (
                      <li key={m.slug}>
                        <Link
                          href={`/markets/${m.slug}`}
                          className="inline-block rounded border border-line px-3 py-1.5 text-sm font-medium text-navy hover:border-blue hover:text-blue"
                        >
                          {m.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="rounded-lg bg-navy p-6 text-white">
                <h3 className="text-lg font-bold">Quote this capability</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[#c3d3e6]">
                  Send drawings and volumes for a quote, or just describe the
                  problem and let us suggest an approach.
                </p>
                <Link
                  href="/contact#quote"
                  className="mt-5 inline-flex items-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-navy hover:bg-[#eaf2fb]"
                >
                  Request a quote
                  <ArrowIcon />
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-surface py-14">
        <Container>
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-navy">
            Other solutions
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {others.map((s) => {
              const OIcon = solutionIcons[s.icon];
              return (
                <Link
                  key={s.slug}
                  href={`/solutions/${s.slug}`}
                  className="group flex items-start gap-4 rounded-lg border border-line bg-white p-5 transition-colors hover:border-blue/40"
                >
                  <OIcon className="h-6 w-6 shrink-0 text-blue" />
                  <div>
                    <h3 className="font-bold leading-snug text-navy">
                      {s.name}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {s.capabilities.length} capabilities
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <CtaBand
        title="Talk to an engineer, not a call center."
        intro="Our quotes come from the people who will run the job. Bring the hard questions."
        secondary={{ href: "/locations", label: "Find a plant" }}
      />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMarket, markets } from "@/lib/markets";
import { getSolution } from "@/lib/solutions";
import { ArrowIcon, marketIcons, solutionIcons } from "@/components/Icons";
import {
  CheckList,
  Container,
  CtaBand,
  Eyebrow,
  IconBadge,
  PageHero,
  Prose,
} from "@/components/ui";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return markets.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const market = getMarket(slug);
  if (!market) return {};
  return {
    title: `${market.name} Manufacturing`,
    description: market.intro,
  };
}

export default async function MarketPage({ params }: Params) {
  const { slug } = await params;
  const market = getMarket(slug);
  if (!market) notFound();

  const Icon = marketIcons[market.icon];
  const related = market.relatedSolutions
    .map((s) => getSolution(s))
    .filter((s) => s !== undefined);
  const others = markets.filter((m) => m.slug !== market.slug);

  return (
    <>
      <PageHero
        eyebrow={market.eyebrow}
        title={`${market.name} Manufacturing`}
        intro={market.intro}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Markets", href: "/markets" },
          { label: market.name, href: `/markets/${market.slug}` },
        ]}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_340px] lg:gap-16">
            <div>
              <div className="mb-8 flex items-center gap-4">
                <IconBadge size="lg">
                  <Icon className="h-6 w-6" />
                </IconBadge>
                <h2 className="text-2xl font-bold text-navy">
                  How we support {market.name.toLowerCase()} programs
                </h2>
              </div>

              <Prose paragraphs={market.body} />

              <div className="mt-12">
                <Eyebrow>Typical applications</Eyebrow>
                <h3 className="mt-2 mb-6 text-xl font-bold text-navy">
                  Parts we make for this market
                </h3>
                <CheckList items={market.applications} columns={2} />
              </div>

              <div className="mt-12 rounded-lg border border-line bg-surface p-7">
                <Eyebrow>Materials</Eyebrow>
                <h3 className="mt-2 mb-5 text-xl font-bold text-navy">
                  Commonly specified compounds
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {market.materials.map((mat) => (
                    <li
                      key={mat}
                      className="rounded-md border border-line bg-white px-3 py-1.5 text-sm font-medium text-steel"
                    >
                      {mat}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-sm leading-relaxed text-muted">
                  We compound in house, so this list is a starting point rather
                  than a catalog. If your application needs a formulation that
                  does not exist yet, that is a conversation we are set up to
                  have.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-lg border border-line p-6">
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-navy">
                  Certifications &amp; controls
                </h3>
                <ul className="mt-4 space-y-3">
                  {market.compliance.map((c) => (
                    <li
                      key={c}
                      className="border-l-2 border-blue pl-3 text-[15px] leading-snug text-ink"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border border-line p-6">
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-navy">
                  Solutions used here
                </h3>
                <ul className="mt-4 space-y-1">
                  {related.map((s) => {
                    const SIcon = solutionIcons[s.icon];
                    return (
                      <li key={s.slug}>
                        <Link
                          href={`/solutions/${s.slug}`}
                          className="group -mx-2 flex items-center gap-3 rounded px-2 py-2.5 hover:bg-surface"
                        >
                          <SIcon className="h-5 w-5 shrink-0 text-blue" />
                          <span className="flex-1 text-[15px] font-medium text-navy">
                            {s.name}
                          </span>
                          <ArrowIcon className="h-4 w-4 text-gray-metal group-hover:text-blue" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="rounded-lg bg-navy p-6 text-white">
                <h3 className="text-lg font-bold">
                  Have a {market.name.toLowerCase()} print to quote?
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[#c3d3e6]">
                  Send drawings, specs and volumes. We respond within two
                  business days.
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

      {/* Other markets */}
      <section className="border-t border-line bg-surface py-14">
        <Container>
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-navy">
            Other markets we serve
          </h2>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {others.map((m) => (
              <li key={m.slug}>
                <Link
                  href={`/markets/${m.slug}`}
                  className="inline-flex items-center gap-2 rounded-md border border-line bg-white px-4 py-2.5 text-sm font-semibold text-navy transition-colors hover:border-blue hover:text-blue"
                >
                  {m.name}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand
        title={`Let's talk about your ${market.name.toLowerCase()} program.`}
        intro="Engineering questions, material selection, tooling strategy — start with a conversation, not a form letter."
        secondary={{ href: "/about/quality", label: "Quality & compliance" }}
      />
    </>
  );
}

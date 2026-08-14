import type { Metadata } from "next";
import Link from "next/link";
import { markets } from "@/lib/markets";
import { ArrowIcon, marketIcons } from "@/components/Icons";
import { Container, CtaBand, IconBadge, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Markets",
  description:
    "SYNC Manufacturing serves aerospace, defense, medical, utilities, oil & gas and industrial markets with precision molded rubber and plastic components.",
};

export default function MarketsPage() {
  return (
    <>
      <PageHero
        eyebrow="Markets"
        title="Six markets. One standard of evidence."
        intro="Every market we serve has its own qualification path, documentation requirements and material constraints. We build to the one your program answers to."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Markets", href: "/markets" },
        ]}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-5 lg:grid-cols-2">
            {markets.map((m) => {
              const Icon = marketIcons[m.icon];
              return (
                <Link
                  key={m.slug}
                  href={`/markets/${m.slug}`}
                  className="group flex flex-col rounded-lg border border-line bg-white p-7 transition-all hover:-translate-y-0.5 hover:border-blue/40 hover:shadow-[0_8px_24px_rgba(1,35,76,.09)]"
                >
                  <div className="flex items-start gap-5">
                    <IconBadge size="lg">
                      <Icon className="h-6 w-6" />
                    </IconBadge>
                    <div className="flex-1">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue">
                        {m.eyebrow}
                      </p>
                      <h2 className="mt-1.5 text-2xl font-bold text-navy">
                        {m.name}
                      </h2>
                      <p className="mt-3 text-[15px] leading-relaxed text-muted">
                        {m.intro}
                      </p>
                    </div>
                  </div>

                  <ul className="mt-6 flex flex-wrap gap-1.5 border-t border-line pt-5">
                    {m.compliance.slice(0, 3).map((c) => (
                      <li
                        key={c}
                        className="rounded bg-surface px-2.5 py-1 text-xs font-medium text-steel"
                      >
                        {c}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue group-hover:gap-3">
                    {m.name} capabilities
                    <ArrowIcon />
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <CtaBand
        title="Not sure which of our plants fits your program?"
        intro="Tell us the market, the volume and the material. We'll route you to the right facility and the right process."
        secondary={{ href: "/solutions", label: "See all solutions" }}
      />
    </>
  );
}

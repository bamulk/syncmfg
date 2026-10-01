import Link from "next/link";
import { markets } from "@/lib/markets";
import { solutions } from "@/lib/solutions";
import {
  acquisitionTimeline,
  joinedCompanies,
  locations,
  numberWord,
  plantCount,
  site,
  stateList,
} from "@/lib/site";
import { pressReleases } from "@/lib/press";
import CubeSection from "@/components/cube/CubeSection";
import {
  ArrowIcon,
  marketIcons,
  solutionIcons,
  PinIcon,
} from "@/components/Icons";
import {
  Button,
  Card,
  Container,
  CtaBand,
  Eyebrow,
  IconBadge,
  SectionHeading,
} from "@/components/ui";

const moldingProcesses =
  solutions.find((s) => s.slug === "molding")?.capabilities.length ?? 0;

// Counts come from src/lib — adding a plant or acquisition updates them.
const stats = [
  { value: String(plantCount), label: "Manufacturing plants" },
  { value: String(joinedCompanies.length), label: "Companies unified" },
  { value: String(moldingProcesses), label: "Molding processes" },
  { value: "46″", label: "Max compression platen" },
];

export default function HomePage() {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="bg-steel-field relative overflow-hidden">
        <div className="bg-grid absolute inset-0" aria-hidden="true" />
        <Container className="relative py-20 sm:py-28">
          <div className="max-w-3xl">
            <Eyebrow tone="light">
              Formerly{" "}
              {joinedCompanies.map((c) => c.shortName).join(" · ")}
            </Eyebrow>
            <h1 className="mt-4 text-4xl font-bold leading-[1.05] text-white sm:text-6xl">
              {numberWord(joinedCompanies.length, true)} rubber and plastics
              manufacturers.
              <br className="hidden sm:block" /> One name.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#c3d3e6] sm:text-xl">
              SYNC Manufacturing molds, cuts, compounds and bonds precision
              components for aerospace, defense, medical, utilities, oil &amp;
              gas and industrial programs &mdash; with coordinated quality
              systems and a single point of contact.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/contact#quote" variant="light">
                Request a quote
                <ArrowIcon />
              </Button>
              <Button href="/solutions" variant="ghost">
                Explore capabilities
              </Button>
            </div>
          </div>

          <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/15 pt-10 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block text-4xl font-bold text-white sm:text-5xl">
                    {s.value}
                  </span>
                  <span className="mt-1.5 block text-sm text-[#9fb8d4]">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* ---------------- Cube (prototype) ---------------- */}
      <CubeSection />

      {/* ---------------- Solutions ---------------- */}
      <section className="py-20 sm:py-24">
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Solutions we provide"
              title="Every process we run, under one roof"
              intro="Molding, cutting, compounding and bonding sit inside a single organization, so a program can move between processes without moving suppliers."
            />
            <Link
              href="/solutions"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-blue hover:gap-3"
            >
              All solutions
              <ArrowIcon />
            </Link>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {solutions.map((s) => {
              const Icon = solutionIcons[s.icon];
              return (
                <Card key={s.slug} href={`/solutions/${s.slug}`}>
                  <div className="flex items-start gap-5">
                    <IconBadge size="lg">
                      <Icon className="h-6 w-6" />
                    </IconBadge>
                    <div>
                      <h3 className="text-xl font-bold text-navy">{s.name}</h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-muted">
                        {s.intro}
                      </p>
                      <ul className="mt-4 flex flex-wrap gap-1.5">
                        {s.capabilities.slice(0, 4).map((c) => (
                          <li
                            key={c.slug}
                            className="rounded bg-surface px-2.5 py-1 text-xs font-medium text-steel"
                          >
                            {c.name}
                          </li>
                        ))}
                        {s.capabilities.length > 4 && (
                          <li className="rounded bg-surface px-2.5 py-1 text-xs font-medium text-muted">
                            +{s.capabilities.length - 4} more
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ---------------- Markets ---------------- */}
      <section className="bg-surface py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Markets we serve"
            title="Industries where the part cannot fail"
            intro="Six markets, each with its own qualification requirements, documentation expectations and material demands."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {markets.map((m) => {
              const Icon = marketIcons[m.icon];
              return (
                <Link
                  key={m.slug}
                  href={`/markets/${m.slug}`}
                  className="group flex flex-col rounded-lg border border-line bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-blue/40 hover:shadow-[0_8px_24px_rgba(1,35,76,.09)]"
                >
                  <IconBadge>
                    <Icon className="h-6 w-6" />
                  </IconBadge>
                  <h3 className="mt-5 text-lg font-bold text-navy">{m.name}</h3>
                  <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted">
                    {m.intro}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue group-hover:gap-3">
                    Learn more
                    <ArrowIcon />
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ---------------- Why SYNC ---------------- */}
      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <SectionHeading
                eyebrow="Why SYNC"
                title={`The advantages of ${numberWord(plantCount)} plants, without ${numberWord(plantCount)} suppliers`}
                intro="Consolidation only helps customers if it removes friction. Ours was built to do exactly that."
              />
              <div className="mt-9 space-y-7">
                {[
                  {
                    title: "We mix our own rubber",
                    body: "In-house compounding means a formulation can be tuned to your service conditions instead of forcing your application onto a catalog material.",
                  },
                  {
                    title: "Process-agnostic recommendations",
                    body: "Running the full range of molding processes plus cutting means the answer you get is driven by your part, not by the one press we happen to own.",
                  },
                  {
                    title: "Coordinated quality across every plant",
                    body: "Material control, lot traceability and documentation packages that hold up under audit, backed by AS9100 certification and ITAR registration.",
                  },
                  {
                    title: "Legacy and obsolete part support",
                    body: "Scan-to-part modeling and in-house tooling bring components back into production when the original drawings and tools are long gone.",
                  },
                ].map((item) => (
                  <div key={item.title} className="border-l-2 border-blue pl-5">
                    <h3 className="text-lg font-bold text-navy">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-muted">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:pt-4">
              <div className="rounded-xl border border-line bg-surface p-8">
                <Eyebrow>Our history</Eyebrow>
                <h3 className="mt-3 text-2xl font-bold text-navy">
                  Built by acquisition, unified in 2026
                </h3>
                <ol className="mt-8 space-y-0">
                  {acquisitionTimeline.map((t, i) => (
                    <li key={t.company} className="relative flex gap-5 pb-8 last:pb-0">
                      {i < acquisitionTimeline.length - 1 && (
                        <span
                          className="absolute left-[9px] top-5 h-full w-px bg-line"
                          aria-hidden="true"
                        />
                      )}
                      <span
                        className={`relative z-10 mt-1 h-[18px] w-[18px] shrink-0 rounded-full border-[3px] border-white ${
                          t.abbr === "SYNC"
                            ? "bg-blue ring-4 ring-blue/20"
                            : "bg-gray-metal"
                        }`}
                        aria-hidden="true"
                      />
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-blue">
                          {t.date}
                        </p>
                        <p className="mt-0.5 font-bold text-navy">
                          {t.company}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-muted">
                          {t.note}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
                <Link
                  href="/about/history"
                  className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-blue hover:gap-3"
                >
                  Read the full story
                  <ArrowIcon />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------------- Locations ---------------- */}
      <section className="bg-navy py-20 sm:py-24">
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              tone="light"
              eyebrow="Locations"
              title={`${numberWord(plantCount, true)} plants, coast to coast`}
              intro={`${stateList} today — with more locations coming soon.`}
            />
            <Link
              href="/locations"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-white hover:gap-3"
            >
              All locations
              <ArrowIcon />
            </Link>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {locations.map((l) => (
              <Link
                key={l.slug}
                href={`/locations#${l.slug}`}
                className="group rounded-lg border border-white/15 bg-white/[0.04] p-6 transition-colors hover:border-white/35 hover:bg-white/[0.08]"
              >
                <IconBadge tone="light" size="sm">
                  <PinIcon className="h-5 w-5" />
                </IconBadge>
                <h3 className="mt-4 text-lg font-bold text-white">{l.name}</h3>
                <p className="mt-1 text-sm text-[#8fa8c4]">{l.legacyName}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-[#c3d3e6]">
                  {l.focus}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------------- Press ---------------- */}
      <section className="py-20 sm:py-24">
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading eyebrow="Newsroom" title="Latest press releases" />
            <Link
              href="/about/press"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-blue hover:gap-3"
            >
              All releases
              <ArrowIcon />
            </Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {pressReleases.slice(0, 3).map((p) => (
              <Card key={p.slug} href={`/about/press/${p.slug}`}>
                <p className="text-xs font-semibold uppercase tracking-wider text-blue">
                  {p.dateLabel}
                </p>
                <h3 className="mt-2 text-lg font-bold leading-snug text-navy">
                  {p.title}
                </h3>
                <p className="mt-2.5 line-clamp-3 text-[15px] leading-relaxed text-muted">
                  {p.summary}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        title="Send us a print. We'll tell you the right way to make it."
        intro={`Quotes, capability questions and material recommendations from the engineers who will run the job. ${site.shortName} responds to every RFQ within two business days.`}
        secondary={{ href: "/locations", label: "Find a plant" }}
      />
    </>
  );
}

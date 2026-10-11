import Image from "next/image";
import Link from "next/link";
import { markets } from "@/lib/markets";
import { solutions } from "@/lib/solutions";
import { acquisitionTimeline, locations, plantCount } from "@/lib/site";
import { pressReleases } from "@/lib/press";
import { getHero, getHomeHeroes } from "@/lib/heroes";
import HeroRotator from "@/components/HeroRotator";
import { StateShape } from "@/components/StateShape";
import {
  ArrowIcon,
  DefenseIcon,
  GearIcon,
  IndustrialIcon,
  PeopleIcon,
  marketIcons,
  solutionIcons,
  PinIcon,
} from "@/components/Icons";
import {
  Card,
  Container,
  CtaBand,
  Eyebrow,
  IconBadge,
  SectionHeading,
} from "@/components/ui";

/* Copy on this page is from "Website Update Oct 9 Home Page.pptx"
   (client-approved). Counts come from src/lib, so adding a plant or a
   capability updates them. */

const capabilityCount = solutions.reduce(
  (n, s) => n + s.capabilities.length,
  0,
);

const stats = [
  {
    icon: IndustrialIcon,
    value: String(plantCount),
    label: "U.S. Manufacturing Locations",
  },
  {
    icon: GearIcon,
    value: `${capabilityCount}+`,
    label: "Specialized Capabilities",
  },
  { icon: PeopleIcon, value: "One", label: "Manufacturing Partner" },
];

/** Faded photo behind a card's text, fading out toward the copy. */
function CardPhoto({ src, position }: { src: string; position?: string }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-0 w-[62%] opacity-[0.22] transition-opacity duration-300 [mask-image:linear-gradient(to_right,transparent_0%,#000_70%)] group-hover:opacity-[0.34]"
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="(min-width: 640px) 380px, 62vw"
        className="object-cover"
        style={{ objectPosition: position ?? "center" }}
      />
    </div>
  );
}

export default function HomePage() {
  const heroPhotos = getHomeHeroes();

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="bg-steel-field relative overflow-hidden">
        {/* Photo sits behind the headline only, not the stats band below */}
        <div className="relative">
          {heroPhotos.length > 0 && (
            <div className="absolute inset-0 lg:left-auto lg:w-[62%] lg:[mask-image:linear-gradient(to_right,transparent_0%,#000_42%)]">
              <HeroRotator photos={heroPhotos} />
              <div className="absolute inset-0 bg-navy/80 lg:hidden" />
            </div>
          )}
          <div
            className="bg-grid absolute inset-0 [mask-image:linear-gradient(to_right,#000_30%,transparent_60%)]"
            aria-hidden="true"
          />
          <Container className="relative py-16 sm:py-20 lg:py-24">
            <div className="max-w-2xl">
              <Eyebrow tone="light">
                Precision manufacturing across plastics, rubber and elastomers.
              </Eyebrow>
              <span
                className="mt-4 block h-0.5 w-14 bg-blue"
                aria-hidden="true"
              />
              <h1 className="mt-6 text-4xl font-bold leading-[1.06] text-white sm:text-5xl lg:text-[3.25rem]">
                Precision Components.
                <br />
                Specialized Processes.
                <br />
                <span className="text-[#3b9eff]">One Partner.</span>
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#c3d3e6]">
                SYNC Manufacturing brings together specialized plastic, rubber,
                and elastomer manufacturing capabilities to support demanding
                aerospace, defense, medical, utilities, oil &amp; gas, and
                industrial applications.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/contact#quote"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-blue px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0a82f0]"
                >
                  Request a Quote
                  <ArrowIcon />
                </Link>
                <Link
                  href="/solutions"
                  className="inline-flex items-center justify-center rounded-md border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
                >
                  Explore Capabilities
                </Link>
              </div>
            </div>
          </Container>
        </div>

        {/* Stats band */}
        <div className="relative border-t border-white/10 bg-navy/85 backdrop-blur-sm">
          <Container className="py-8">
            <dl className="grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1.5fr] lg:divide-x lg:divide-white/15">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`flex items-center gap-4 ${i > 0 ? "lg:pl-8" : ""}`}
                >
                  <s.icon className="h-9 w-9 shrink-0 text-[#3b9eff]" />
                  <div>
                    <dd className="text-3xl font-bold leading-none text-white">
                      {s.value}
                    </dd>
                    <dt className="mt-1.5 text-sm leading-snug text-[#b5c8de]">
                      {s.label}
                    </dt>
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-4 lg:pl-8">
                <DefenseIcon className="h-9 w-9 shrink-0 text-[#3b9eff]" />
                <div>
                  <dt className="text-base font-bold leading-snug text-white">
                    Built for Demanding Applications
                  </dt>
                  <dd className="mt-1.5 flex flex-wrap gap-x-2 gap-y-0.5 text-xs text-[#b5c8de]">
                    {markets.map((m, i) => (
                      <span key={m.slug} className="flex items-center gap-2">
                        {i > 0 && (
                          <span aria-hidden="true" className="text-white/30">
                            |
                          </span>
                        )}
                        {m.name}
                      </span>
                    ))}
                  </dd>
                </div>
              </div>
            </dl>
          </Container>
        </div>
      </section>

      {/* ---------------- Solutions ---------------- */}
      <section className="py-20 sm:py-24">
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Solutions we provide"
              title="More capabilities. Fewer handoffs."
              intro="From molding and cutting to compounding, bonding, dip molding, and value-added operations, Sync connects specialized manufacturing capabilities across our U.S. locations—giving customers one coordinated manufacturing partner."
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
              const photo = getHero(`solutions-${s.slug}`);
              return (
                <Card
                  key={s.slug}
                  href={`/solutions/${s.slug}`}
                  className="relative overflow-hidden"
                >
                  {photo && (
                    <CardPhoto src={photo.src} position={photo.position} />
                  )}
                  <div className="relative flex items-start gap-5">
                    <IconBadge size="lg">
                      <Icon className="h-6 w-6" />
                    </IconBadge>
                    <div>
                      <h3 className="text-xl font-bold text-navy">{s.name}</h3>
                      <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-muted">
                        {s.intro}
                      </p>
                      <ul className="mt-4 flex flex-wrap gap-1.5">
                        {s.capabilities.slice(0, 4).map((c) => (
                          <li
                            key={c.slug}
                            className="rounded bg-surface/90 px-2.5 py-1 text-xs font-medium text-steel"
                          >
                            {c.name}
                          </li>
                        ))}
                        {s.capabilities.length > 4 && (
                          <li className="rounded bg-surface/90 px-2.5 py-1 text-xs font-medium text-muted">
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
            title="Markets that demand precision, reliability, and accountability."
            intro="We support aerospace, defense, medical, utilities, oil & gas, and industrial programs where material performance, consistent quality, traceability, and documentation matter."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {markets.map((m) => {
              const Icon = marketIcons[m.icon];
              const photo = getHero(`markets-${m.slug}`);
              return (
                <Link
                  key={m.slug}
                  href={`/markets/${m.slug}`}
                  className="group relative flex flex-col overflow-hidden rounded-lg border border-line bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-blue/40 hover:shadow-[0_8px_24px_rgba(1,35,76,.09)]"
                >
                  {photo && (
                    <CardPhoto src={photo.src} position={photo.position} />
                  )}
                  <div className="relative flex flex-1 flex-col">
                    <IconBadge>
                      <Icon className="h-6 w-6" />
                    </IconBadge>
                    <h3 className="mt-5 text-lg font-bold text-navy">
                      {m.name}
                    </h3>
                    <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted">
                      {m.intro}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue group-hover:gap-3">
                      Learn more
                      <ArrowIcon />
                    </span>
                  </div>
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
                title="More capability. Less complexity."
                intro="Bringing specialized manufacturing processes together only matters if it makes business easier for our customers. Sync connects material expertise, manufacturing capabilities, and responsive teams across our locations through one coordinated manufacturing platform."
              />
              <div className="mt-9 space-y-7">
                {[
                  {
                    title: "Material expertise in-house",
                    body: "Our rubber compounding capabilities let us develop and adjust materials to meet application requirements, performance needs, and operating environments.",
                  },
                  {
                    title: "Multiple processes. One manufacturing partner.",
                    body: "Plastic molding, rubber molding, dip molding, cutting, bonding, compounding, and value-added operations give customers access to a broader range of manufacturing solutions without managing a broader supplier base.",
                  },
                  {
                    title: "Coordinated quality and program support",
                    body: "Our teams work together around customer requirements, traceability, documentation, and consistent execution. We maintain certifications and registrations at qualified locations based on customer and program requirements.",
                  },
                  {
                    title: "Support for legacy and hard-to-source components",
                    body: "Scan-to-part modeling, tooling capabilities, and manufacturing experience can help bring older or difficult-to-source components back into production, even when original tooling or complete documentation is no longer available.",
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
                    <li
                      key={t.company}
                      className="relative flex gap-5 pb-8 last:pb-0"
                    >
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
              title="Specialized capabilities, strategically located."
              intro="Sync Manufacturing brings together specialized facilities across the U.S., each with distinct process strengths and all connected through one coordinated manufacturing platform."
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
                className="group relative overflow-hidden rounded-lg border border-white/15 bg-white/[0.04] p-6 transition-colors hover:border-white/35 hover:bg-white/[0.08]"
              >
                <StateShape
                  state={l.state}
                  className="pointer-events-none absolute -right-3 top-4 h-32 w-32 text-white/[0.08] transition-colors group-hover:text-white/[0.13]"
                />
                <div className="relative">
                  <IconBadge tone="light" size="sm">
                    <PinIcon className="h-5 w-5" />
                  </IconBadge>
                  <h3 className="mt-4 text-lg font-bold text-white">
                    {l.name}
                  </h3>
                  <p className="mt-0.5 text-[15px] text-[#c3d3e6]">
                    {l.city}, {l.stateName}
                  </p>
                  <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8fa8c4]">
                    Formerly {l.formerly}
                  </p>
                  <p className="mt-4 text-[15px] leading-relaxed text-[#c3d3e6]">
                    {l.focus}
                  </p>
                </div>
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
        eyebrow="Ready to start a conversation?"
        title="Send us your requirements. We’ll help move the program forward."
        intro="Share your drawing, specifications, or application requirements with our team. We’ll review the opportunity, identify the appropriate Sync capabilities, and connect you with the right manufacturing team."
        primary={{ href: "/contact#quote", label: "Request a quote" }}
        secondary={{ href: "/locations", label: "Find a plant" }}
      />
    </>
  );
}

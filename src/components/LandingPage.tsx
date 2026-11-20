import Image from "next/image";
import Link from "next/link";
import type {
  LandingBlock,
  LandingLink,
  LandingPage as Page,
} from "@/lib/landing";
import { anchor } from "@/lib/landing";
import { ArrowIcon, CheckIcon } from "./Icons";
import JsonLd from "./JsonLd";
import {
  Button,
  CheckList,
  Container,
  CtaBand,
  Eyebrow,
  PageHero,
} from "./ui";

/**
 * Renders a long-form landing page converted from the client's Word docs
 * (see src/lib/landing.ts). The doc's H2s become sections, H3s subheadings,
 * and runs of bold item titles (H4) with their paragraphs become card grids.
 */

type Item = { title: string; body: LandingBlock[] };
type Node =
  | { k: "block"; b: LandingBlock }
  | { k: "items"; items: Item[] };

/** Group each H4 with the blocks that follow it, and runs of those into grids. */
function group(blocks: LandingBlock[]): Node[] {
  const out: Node[] = [];
  let current: Item | null = null;
  for (const b of blocks) {
    if (b.t === "h4") {
      current = { title: b.text, body: [] };
      const last = out[out.length - 1];
      if (last?.k === "items") last.items.push(current);
      else out.push({ k: "items", items: [current] });
      continue;
    }
    if (current && b.t !== "h3" && b.t !== "cta") {
      current.body.push(b);
      continue;
    }
    current = null;
    out.push({ k: "block", b });
  }
  // A lone bold line with nothing under it is a statement, not a card.
  return out.flatMap((n): Node[] =>
    n.k === "items" && n.items.length === 1 && n.items[0].body.length === 0
      ? [{ k: "block", b: { t: "p", text: n.items[0].title } }]
      : [n],
  );
}

function Links({ links }: { links: LandingLink[] }) {
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      {links.map((l, i) => (
        <Button key={l.label} href={l.href} variant={i === 0 ? "primary" : "outline"}>
          {l.label}
          {i === 0 && <ArrowIcon />}
        </Button>
      ))}
    </div>
  );
}

function TextLink({ label, href }: LandingLink) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-sm font-semibold text-blue hover:gap-3"
    >
      {label}
      <ArrowIcon />
    </Link>
  );
}

function Block({ b, compact }: { b: LandingBlock; compact?: boolean }) {
  const text = compact
    ? "text-[15px] leading-relaxed text-muted"
    : "text-[17px] leading-relaxed text-muted";
  switch (b.t) {
    case "p":
      return <p className={text}>{b.text}</p>;
    case "h3":
      return (
        <h3 className="pt-4 text-xl font-bold leading-snug text-navy">
          {b.text}
        </h3>
      );
    case "h4":
      return <h4 className="font-bold text-navy">{b.text}</h4>;
    case "list":
      return compact ? (
        <ul className="space-y-2">
          {b.items.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-blue" />
              <span className="text-[15px] leading-snug text-ink">{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-lg bg-surface p-6">
          <CheckList items={b.items} columns={b.items.length > 4 ? 2 : 1} />
        </div>
      );
    case "terms":
      return (
        <dl className="space-y-3">
          {b.items.map((i) => (
            <div key={i.term} className={text}>
              <dt className="inline font-semibold text-navy">{i.term}: </dt>
              <dd className="inline">{i.text}</dd>
            </div>
          ))}
        </dl>
      );
    case "link":
      return (
        <div>
          <TextLink label={b.label} href={b.href} />
        </div>
      );
    case "cta":
      return <Links links={b.links} />;
  }
}

function Items({ items }: { items: Item[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <div
          key={item.title}
          className="rounded-lg border border-line bg-white p-6"
        >
          <h4 className="text-lg font-bold leading-snug text-navy">
            {item.title}
          </h4>
          <div className="mt-2.5 space-y-3">
            {item.body.map((b, i) => (
              <Block key={i} b={b} compact />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function Gallery({ images }: { images: Page["gallery"] }) {
  if (images.length === 0) return null;
  const cols =
    images.length === 1
      ? ""
      : images.length === 2 || images.length === 4
        ? "sm:grid-cols-2"
        : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <div className={`grid gap-4 ${cols}`}>
      {images.map((img) => (
        <figure
          key={img.src}
          className="relative aspect-[4/3] overflow-hidden rounded-lg border border-line bg-surface"
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 100vw"
            className="object-cover"
          />
        </figure>
      ))}
    </div>
  );
}

export default function LandingPage({
  page,
  eyebrow,
  breadcrumb,
}: {
  page: Page;
  eyebrow: string;
  breadcrumb: { label: string; href: string }[];
}) {
  const faqId = "frequently-asked-questions";
  const toc = [
    ...page.sections.map((s) => ({ id: anchor(s.heading), label: s.heading })),
    ...(page.faq.length
      ? [{ id: faqId, label: "Frequently Asked Questions" }]
      : []),
  ];
  const [primary, secondary] = page.closing.ctas;

  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={page.title}
        intro={page.subtitle ?? undefined}
        image={page.hero ?? undefined}
        breadcrumb={breadcrumb}
      />

      <section className="border-b border-line py-14 sm:py-16">
        <Container>
          <div className="max-w-3xl">
            {page.tagline && (
              <p className="mb-5 text-lg font-semibold text-blue">
                {page.tagline}
              </p>
            )}
            <div className="space-y-5">
              {page.intro.map((p, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "text-xl leading-relaxed text-ink"
                      : "text-[17px] leading-relaxed text-muted"
                  }
                >
                  {p}
                </p>
              ))}
            </div>
            {page.ctas.length > 0 && <Links links={page.ctas} />}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_280px] lg:gap-16">
            <div className="min-w-0 space-y-16">
              {page.sections.map((s, si) => (
                <div key={s.heading} className="space-y-6">
                  <h2
                    id={anchor(s.heading)}
                    className="scroll-mt-28 text-2xl font-bold leading-tight text-navy sm:text-3xl"
                  >
                    {s.heading}
                  </h2>
                  {group(s.blocks).map((n, i) =>
                    n.k === "items" ? (
                      <Items key={i} items={n.items} />
                    ) : (
                      <Block key={i} b={n.b} />
                    ),
                  )}
                  {si === 0 && <Gallery images={page.gallery} />}
                </div>
              ))}

              {page.faq.length > 0 && (
                <div className="space-y-6">
                  <JsonLd
                    data={{
                      "@context": "https://schema.org",
                      "@type": "FAQPage",
                      mainEntity: page.faq.map((f) => ({
                        "@type": "Question",
                        name: f.q,
                        acceptedAnswer: {
                          "@type": "Answer",
                          text: f.a
                            .map((b) =>
                              "text" in b
                                ? b.text
                                : b.t === "list"
                                  ? b.items.join("; ")
                                  : "",
                            )
                            .filter(Boolean)
                            .join(" "),
                        },
                      })),
                    }}
                  />
                  <h2
                    id={faqId}
                    className="scroll-mt-28 text-2xl font-bold leading-tight text-navy sm:text-3xl"
                  >
                    Frequently Asked Questions
                  </h2>
                  <div className="divide-y divide-line rounded-lg border border-line">
                    {page.faq.map((f) => (
                      <details key={f.q} className="group px-6 py-5">
                        <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-navy marker:hidden">
                          {f.q}
                          <span
                            aria-hidden="true"
                            className="mt-0.5 text-blue transition-transform group-open:rotate-45"
                          >
                            +
                          </span>
                        </summary>
                        <div className="mt-3 space-y-3">
                          {f.a.map((b, i) => (
                            <Block key={i} b={b} compact />
                          ))}
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <aside className="hidden lg:block">
              <nav
                aria-label="On this page"
                className="sticky top-28 rounded-lg border border-line p-6"
              >
                <Eyebrow>On this page</Eyebrow>
                <ul className="mt-4 space-y-2.5">
                  {toc.map((t) => (
                    <li key={t.id}>
                      <a
                        href={`#${t.id}`}
                        className="text-[15px] leading-snug text-muted hover:text-blue"
                      >
                        {t.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact#quote"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-blue px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0060bb]"
                >
                  Request a Quote
                  <ArrowIcon />
                </Link>
              </nav>
            </aside>
          </div>
        </Container>
      </section>

      <CtaBand
        eyebrow={page.closing.subheading ?? undefined}
        title={page.closing.heading}
        intro={page.closing.paragraphs}
        primary={primary}
        secondary={secondary}
      />
    </>
  );
}

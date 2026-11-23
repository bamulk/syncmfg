import Image from "next/image";
import Link from "next/link";
import type {
  LandingBlock,
  LandingCard,
  LandingContent,
  LandingLink,
} from "@/lib/landing";
import type { HeroImage } from "@/lib/heroes";
import { faqSchema } from "@/lib/seo";
import { ArrowIcon, CheckIcon, ChevronIcon } from "./Icons";
import JsonLd from "./JsonLd";
import { Container, CtaBand, PageHero } from "./ui";

/**
 * Renders one of the client's long-form landing pages (src/content/landing).
 * The copy is theirs, verbatim; this component only decides the layout.
 */

type Crumb = { label: string; href: string };

export default function LandingPage({
  content: c,
  eyebrow,
  breadcrumb,
  quoteHref,
  related,
  fallbackHero,
}: {
  content: LandingContent;
  eyebrow: string;
  breadcrumb: Crumb[];
  /** Where "Request a Quote" buttons go, pre-filled for this page */
  quoteHref: string;
  /** Sidebar list of neighbouring pages, e.g. the rest of the family */
  related?: { heading: string; items: { label: string; href: string; current?: boolean }[] };
  /** Header photo for a document that came without one (src/lib/heroes.ts) */
  fallbackHero?: HeroImage;
}) {
  const resolve = (l: LandingLink) => ({
    label: l.label,
    href: l.href === "quote" ? quoteHref : l.href,
  });
  const toc = [
    ...c.sections.map((s) => ({ id: s.id, label: s.heading })),
    ...(c.faq ? [{ id: c.faq.id, label: c.faq.heading }] : []),
  ];
  const closingButtons = (c.closing?.cta ?? []).map(resolve);

  return (
    <>
      {c.faq && <JsonLd data={faqSchema(c.faq.items)} />}

      <PageHero
        eyebrow={eyebrow}
        title={c.title}
        intro={c.subtitle ?? undefined}
        image={c.hero ? { ...c.hero, position: "70% 50%" } : fallbackHero}
        breadcrumb={breadcrumb}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16">
            <div className="min-w-0">
              {/* Introduction */}
              {c.tagline && (
                <p className="text-2xl font-bold leading-snug text-navy sm:text-3xl">
                  {c.tagline}
                </p>
              )}
              <div className={`space-y-5 ${c.tagline ? "mt-6" : ""}`}>
                {c.intro.map((p, i) => (
                  <p key={i} className="text-[17px] leading-relaxed text-muted">
                    {p}
                  </p>
                ))}
              </div>
              {c.cta.length > 0 && (
                <ButtonRow items={c.cta.map(resolve)} className="mt-8" />
              )}

              {c.sections.map((s, i) => (
                <div key={s.id}>
                  <section
                    id={s.id}
                    aria-labelledby={`${s.id}-h`}
                    className="mt-16 scroll-mt-28 border-t border-line pt-12"
                  >
                    <h2
                      id={`${s.id}-h`}
                      className="text-2xl font-bold leading-tight text-navy sm:text-3xl"
                    >
                      {s.heading}
                    </h2>
                    {s.lead && (
                      <p className="mt-2 text-lg font-semibold text-blue">
                        {s.lead}
                      </p>
                    )}
                    <Blocks blocks={s.blocks} level={3} />
                  </section>
                  {i === 0 && c.gallery.length > 0 && (
                    <Gallery images={c.gallery} />
                  )}
                </div>
              ))}

              {c.faq && (
                <section
                  id={c.faq.id}
                  aria-labelledby="faq-h"
                  className="mt-16 scroll-mt-28 border-t border-line pt-12"
                >
                  <h2
                    id="faq-h"
                    className="text-2xl font-bold leading-tight text-navy sm:text-3xl"
                  >
                    {c.faq.heading}
                  </h2>
                  <div className="mt-6 divide-y divide-line rounded-lg border border-line">
                    {c.faq.items.map((f) => (
                      <details key={f.q} className="group">
                        <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-4 text-[16px] font-semibold text-navy marker:content-none hover:text-blue [&::-webkit-details-marker]:hidden">
                          {f.q}
                          <ChevronIcon className="mt-1 h-4 w-4 shrink-0 text-gray-metal transition-transform group-open:rotate-180" />
                        </summary>
                        <div className="space-y-3 px-5 pb-5">
                          {f.a.map((a, i) => (
                            <p
                              key={i}
                              className="text-[15px] leading-relaxed text-muted"
                            >
                              {a}
                            </p>
                          ))}
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              {toc.length > 2 && (
                <nav
                  aria-label="On this page"
                  className="hidden rounded-lg border border-line p-6 lg:block"
                >
                  <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-navy">
                    On this page
                  </h2>
                  <ul className="mt-4 space-y-2">
                    {toc.map((t) => (
                      <li key={t.id}>
                        <a
                          href={`#${t.id}`}
                          className="block text-[14px] leading-snug text-muted hover:text-blue"
                        >
                          {t.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}

              <div className="rounded-lg bg-navy p-6 text-white">
                <h2 className="text-lg font-bold">Have a drawing to quote?</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-[#c3d3e6]">
                  Send drawings, specifications and volumes. Our team typically
                  responds to RFQs within two business days.
                </p>
                <Link
                  href={quoteHref}
                  className="mt-5 inline-flex items-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-navy hover:bg-[#eaf2fb]"
                >
                  Request a Quote
                  <ArrowIcon />
                </Link>
              </div>

              {related && related.items.length > 0 && (
                <nav
                  aria-label={related.heading}
                  className="rounded-lg border border-line p-6"
                >
                  <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-navy">
                    {related.heading}
                  </h2>
                  <ul className="mt-4 space-y-1">
                    {related.items.map((r) => (
                      <li key={r.href}>
                        {r.current ? (
                          <span
                            aria-current="page"
                            className="-mx-2 block rounded bg-surface px-2 py-1.5 text-[14px] font-semibold text-navy"
                          >
                            {r.label}
                          </span>
                        ) : (
                          <Link
                            href={r.href}
                            className="-mx-2 block rounded px-2 py-1.5 text-[14px] text-muted hover:bg-surface hover:text-blue"
                          >
                            {r.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </aside>
          </div>
        </Container>
      </section>

      {c.closing && (
        <CtaBand
          eyebrow={c.closing.eyebrow ?? undefined}
          title={c.closing.title}
          intro={[...c.closing.body, ...c.closing.footnote]}
          primary={closingButtons[0] ?? { href: quoteHref, label: "Request a Quote" }}
          secondary={closingButtons[1]}
        />
      )}
    </>
  );
}

/* ----------------------------------------------------------- blocks */

function Blocks({ blocks, level }: { blocks: LandingBlock[]; level: 3 | 4 }) {
  return (
    <div className="mt-6 space-y-6">
      {blocks.map((b, i) => (
        <Block key={i} block={b} level={level} />
      ))}
    </div>
  );
}

function Block({ block: b, level }: { block: LandingBlock; level: 3 | 4 }) {
  switch (b.type) {
    case "p":
      return (
        <p className="text-[17px] leading-relaxed text-muted">
          {b.label && <strong className="font-semibold text-navy">{b.label}:</strong>}{" "}
          {b.text}
        </p>
      );
    case "list": {
      const short = b.items.every((x) => !x.label && x.text.length < 60);
      return (
        <ul
          className={`grid gap-x-8 gap-y-3 ${short && b.items.length > 4 ? "sm:grid-cols-2" : ""}`}
        >
          {b.items.map((x, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-blue" />
              <span className="text-[16px] leading-snug text-ink">
                {x.label && <strong className="font-semibold text-navy">{x.label}:</strong>}{" "}
                {x.text}
              </span>
            </li>
          ))}
        </ul>
      );
    }
    case "cards":
      return (
        <ul className="grid gap-4 sm:grid-cols-2">
          {b.items.map((card) => (
            <li key={card.title}>
              <CardItem card={card} level={level} />
            </li>
          ))}
        </ul>
      );
    case "steps":
      return (
        <ol className="grid gap-4 sm:grid-cols-2">
          {b.items.map((card) => {
            const m = card.title.match(/^(\d+)\.\s*(.*)$/);
            return (
              <li
                key={card.title}
                className="flex gap-4 rounded-lg border border-line bg-white p-5"
              >
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-bold text-white"
                >
                  {m?.[1]}
                </span>
                <div>
                  <Heading level={level} className="font-bold leading-snug text-navy">
                    <span className="sr-only">{m?.[1]}. </span>
                    {m?.[2] ?? card.title}
                  </Heading>
                  {card.body.map((p, i) => (
                    <p key={i} className="mt-2 text-[15px] leading-relaxed text-muted">
                      {p}
                    </p>
                  ))}
                </div>
              </li>
            );
          })}
        </ol>
      );
    case "links":
      return (
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {b.items.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue hover:gap-3"
            >
              {l.label}
              <ArrowIcon />
            </Link>
          ))}
        </div>
      );
    case "buttons":
      return <ButtonRow items={b.items} />;
    case "tagline":
      return (
        <p className="border-l-4 border-blue pl-5 text-xl font-semibold leading-snug text-navy">
          {b.text}
        </p>
      );
    case "sub":
      return (
        <div className="pt-4">
          <Heading level={level} className="text-xl font-bold leading-snug text-navy">
            {b.href ? (
              <Link href={b.href} className="hover:text-blue">
                {b.heading}
              </Link>
            ) : (
              b.heading
            )}
          </Heading>
          {b.image ? (
            <div className="mt-4 grid gap-6 sm:grid-cols-[minmax(0,1fr)_200px]">
              <div className="min-w-0 [&>div]:mt-0">
                <Blocks blocks={b.blocks} level={4} />
              </div>
              <Image
                src={b.image.src}
                alt={b.image.alt}
                width={b.image.width}
                height={b.image.height}
                sizes="200px"
                className="order-first w-full max-w-[260px] rounded-lg border border-line bg-white sm:order-none sm:max-w-none"
              />
            </div>
          ) : (
            <div className="[&>div]:mt-4">
              <Blocks blocks={b.blocks} level={4} />
            </div>
          )}
        </div>
      );
  }
}

function CardItem({ card, level }: { card: LandingCard; level: 3 | 4 }) {
  return (
    <div className="flex h-full flex-col rounded-lg border border-line bg-white p-5">
      <Heading level={level} className="font-bold leading-snug text-navy">
        {card.href ? (
          <Link href={card.href} className="hover:text-blue">
            {card.title}
          </Link>
        ) : (
          card.title
        )}
      </Heading>
      {card.body.map((p, i) => (
        <p key={i} className="mt-2 text-[15px] leading-relaxed text-muted">
          {p}
        </p>
      ))}
      {card.links && (
        <div className="mt-auto pt-4">
          {card.links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue hover:gap-3"
            >
              {l.label}
              <ArrowIcon />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function Heading({
  level,
  className,
  children,
}: {
  level: 3 | 4;
  className: string;
  children: React.ReactNode;
}) {
  return level === 3 ? (
    <h3 className={className}>{children}</h3>
  ) : (
    <h4 className={className}>{children}</h4>
  );
}

function ButtonRow({
  items,
  className = "",
}: {
  items: LandingLink[];
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {items.map((l, i) => (
        <Link
          key={l.label}
          href={l.href}
          className={
            i === 0
              ? "inline-flex items-center gap-2 rounded-md bg-blue px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0060bb]"
              : "inline-flex items-center gap-2 rounded-md border border-line bg-white px-6 py-3 text-sm font-semibold text-navy transition-colors hover:border-blue hover:text-blue"
          }
        >
          {l.label}
          {i === 0 && <ArrowIcon />}
        </Link>
      ))}
    </div>
  );
}

function Gallery({
  images,
}: {
  images: LandingContent["gallery"];
}) {
  const cols =
    images.length === 1
      ? ""
      : images.length === 2 || images.length === 4
        ? "sm:grid-cols-2"
        : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <div className={`mt-12 grid gap-4 ${cols}`}>
      {images.map((img) => (
        <Image
          key={img.src}
          src={img.src}
          alt={img.alt}
          width={img.width}
          height={img.height}
          sizes={images.length === 1 ? "(min-width: 1024px) 700px, 100vw" : "(min-width: 1024px) 340px, 50vw"}
          className={`w-full rounded-lg border border-line object-cover ${
            images.length === 1 && img.width === img.height ? "mx-auto max-w-md" : ""
          }`}
        />
      ))}
    </div>
  );
}

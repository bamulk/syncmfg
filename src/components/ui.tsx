import Link from "next/link";
import { ArrowIcon, CheckIcon } from "./Icons";

export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1200px] px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Eyebrow({
  children,
  tone = "blue",
}: {
  children: React.ReactNode;
  tone?: "blue" | "light";
}) {
  return (
    <p
      className={`text-xs font-semibold uppercase tracking-[0.18em] ${
        tone === "light" ? "text-[#8fc4f5]" : "text-blue"
      }`}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "dark",
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  tone?: "dark" | "light";
  align?: "left" | "center";
}) {
  return (
    <div
      className={`${align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}
    >
      {eyebrow && (
        <div className="mb-3">
          <Eyebrow tone={tone === "light" ? "light" : "blue"}>{eyebrow}</Eyebrow>
        </div>
      )}
      <h2
        className={`text-3xl font-bold leading-[1.12] sm:text-4xl ${
          tone === "light" ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-4 text-lg leading-relaxed ${
            tone === "light" ? "text-[#c3d3e6]" : "text-muted"
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost" | "light";
  className?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const styles = {
    primary:
      "bg-blue text-white hover:bg-[#0060bb] shadow-[0_1px_2px_rgba(1,35,76,.25)]",
    outline:
      "border border-line bg-white text-navy hover:border-blue hover:text-blue",
    ghost:
      "border border-white/30 text-white hover:border-white hover:bg-white/10",
    light: "bg-white text-navy hover:bg-[#eaf2fb]",
  }[variant];

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-semibold transition-colors ${styles} ${className}`}
    >
      {children}
    </Link>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  breadcrumb,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  breadcrumb?: { label: string; href: string }[];
}) {
  return (
    <section className="bg-steel-field relative overflow-hidden">
      <div className="bg-grid absolute inset-0" aria-hidden="true" />
      <Container className="relative py-16 sm:py-20">
        {breadcrumb && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-[#9fb8d4]">
              {breadcrumb.map((c, i) => (
                <li key={c.href} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true">/</span>}
                  <Link href={c.href} className="hover:text-white">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        )}
        {eyebrow && (
          <div className="mb-3">
            <Eyebrow tone="light">{eyebrow}</Eyebrow>
          </div>
        )}
        <h1 className="max-w-4xl text-4xl font-bold leading-[1.08] text-white sm:text-5xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#c3d3e6]">
            {intro}
          </p>
        )}
      </Container>
    </section>
  );
}

export function Card({
  href,
  children,
  className = "",
}: {
  href?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const cls = `group block rounded-lg border border-line bg-white p-6 transition-all ${
    href ? "hover:-translate-y-0.5 hover:border-blue/40 hover:shadow-[0_8px_24px_rgba(1,35,76,.09)]" : ""
  } ${className}`;
  return href ? (
    <Link href={href} className={cls}>
      {children}
    </Link>
  ) : (
    <div className={cls}>{children}</div>
  );
}

export function IconBadge({
  children,
  size = "md",
  tone = "navy",
}: {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  tone?: "navy" | "light";
}) {
  const dims = { sm: "h-10 w-10", md: "h-12 w-12", lg: "h-14 w-14" }[size];
  const colors =
    tone === "navy" ? "bg-navy text-white" : "bg-white/10 text-white ring-1 ring-white/20";
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full ${dims} ${colors}`}
    >
      {children}
    </span>
  );
}

export function CheckList({
  items,
  columns = 1,
  tone = "dark",
}: {
  items: readonly string[];
  columns?: 1 | 2;
  tone?: "dark" | "light";
}) {
  return (
    <ul
      className={`grid gap-x-8 gap-y-3 ${columns === 2 ? "sm:grid-cols-2" : ""}`}
    >
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <CheckIcon
            className={`mt-0.5 h-5 w-5 shrink-0 ${
              tone === "light" ? "text-[#4ea3f0]" : "text-blue"
            }`}
          />
          <span
            className={`text-[15px] leading-snug ${
              tone === "light" ? "text-[#d3e0ee]" : "text-ink"
            }`}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function CtaBand({
  title,
  intro,
  primary = { href: "/contact", label: "Request a quote" },
  secondary,
}: {
  title: string;
  intro?: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="bg-steel-field relative overflow-hidden">
      <div className="bg-grid absolute inset-0" aria-hidden="true" />
      <Container className="relative py-16 sm:py-20">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
              {title}
            </h2>
            {intro && (
              <p className="mt-4 text-lg leading-relaxed text-[#c3d3e6]">
                {intro}
              </p>
            )}
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Button href={primary.href} variant="light">
              {primary.label}
              <ArrowIcon />
            </Button>
            {secondary && (
              <Button href={secondary.href} variant="ghost">
                {secondary.label}
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

export function Prose({ paragraphs }: { paragraphs: readonly string[] }) {
  return (
    <div className="space-y-5">
      {paragraphs.map((p, i) => (
        <p key={i} className="text-[17px] leading-relaxed text-muted">
          {p}
        </p>
      ))}
    </div>
  );
}

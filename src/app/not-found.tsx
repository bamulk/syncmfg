import Link from "next/link";
import { Button, Container } from "@/components/ui";
import { ArrowIcon } from "@/components/Icons";

const suggestions = [
  { label: "Markets", href: "/markets" },
  { label: "Solutions", href: "/solutions" },
  { label: "Locations", href: "/locations" },
  { label: "About Us", href: "/about" },
  { label: "Careers", href: "/careers" },
];

export default function NotFound() {
  return (
    <section className="bg-steel-field relative overflow-hidden">
      <div className="bg-grid absolute inset-0" aria-hidden="true" />
      <Container className="relative py-24 sm:py-32">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8fc4f5]">
          404
        </p>
        <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-[1.08] text-white sm:text-5xl">
          That page isn&apos;t in production.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#c3d3e6]">
          The link may be out of date, or the page may have moved when our
          companies came together under one name.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Button href="/" variant="light">
            Back to home
            <ArrowIcon />
          </Button>
          <Button href="/contact" variant="ghost">
            Contact us
          </Button>
        </div>
        <ul className="mt-12 flex flex-wrap gap-2.5 border-t border-white/15 pt-8">
          {suggestions.map((s) => (
            <li key={s.href}>
              <Link
                href={s.href}
                className="inline-block rounded-md border border-white/25 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
              >
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

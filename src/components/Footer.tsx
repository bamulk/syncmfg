import Image from "next/image";
import Link from "next/link";
import { markets } from "@/lib/markets";
import { solutions } from "@/lib/solutions";
import { contacts, locations, site } from "@/lib/site";
import { Container } from "./ui";

const companyLinks = [
  { label: "Company Overview", href: "/about" },
  { label: "Langdale Holdings", href: "/about/langdale" },
  { label: "Our History", href: "/about/history" },
  { label: "Quality & Compliance", href: "/about/quality" },
  { label: "Press Releases", href: "/about/press" },
  { label: "Careers", href: "/careers" },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-[#a9bed6]">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Image
              src="/sync-logo-white.png"
              alt="SYNC Manufacturing"
              width={329}
              height={104}
              className="h-10 w-auto"
            />
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed">
              {site.tagline}
            </p>
            <p className="mt-4 text-sm">
              A{" "}
              <Link
                href="/about/langdale"
                className="font-semibold text-white underline-offset-4 hover:underline"
              >
                {site.parent}
              </Link>{" "}
              company.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {site.certifications.map((c) => (
                <span
                  key={c}
                  className="rounded border border-white/20 px-2.5 py-1 text-xs font-semibold tracking-wide text-white"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          <FooterColumn
            title="Markets"
            links={markets.map((m) => ({
              label: m.name,
              href: `/markets/${m.slug}`,
            }))}
          />
          <FooterColumn
            title="Solutions"
            links={solutions.map((s) => ({
              label: s.name.replace(" Solutions", ""),
              href: `/solutions/${s.slug}`,
            }))}
          />
          <FooterColumn title="Company" links={companyLinks} />
        </div>

        <div className="mt-14 grid gap-8 border-t border-white/12 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {locations.map((l) => (
            <div key={l.slug}>
              <p className="text-sm font-semibold text-white">{l.name}</p>
              <p className="mt-1.5 text-sm leading-relaxed">
                {l.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
              {l.phone && (
                <a
                  href={`tel:${l.phoneHref}`}
                  className="mt-1.5 inline-block text-sm hover:text-white"
                >
                  {l.phone}
                </a>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/12 pt-8 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a
              href={`mailto:${contacts.info}`}
              className="hover:text-white"
            >
              {contacts.info}
            </a>
            <Link href="/contact" className="hover:text-white">
              Contact
            </Link>
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-[15px] hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

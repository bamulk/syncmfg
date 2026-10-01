import type { Metadata } from "next";
import { getHero } from "@/lib/heroes";
import Link from "next/link";
import QuoteForm from "@/components/QuoteForm";
import { contacts, locations } from "@/lib/site";
import { CheckIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/Icons";
import { Container, Eyebrow, IconBadge, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Request a quote from SYNC Manufacturing, or contact our Carson City, Blackstone or Glendora plants directly.",
};

const whatToInclude = [
  "Drawing or sketch, even a rough one",
  "Material or performance requirement",
  "Annual volume and order pattern",
  "Service conditions — temperature, chemicals, pressure",
  "Whether tooling exists, and who owns it",
  "Target timeline and any qualification requirements",
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="Tell us about the part."
        intro="Quotes, capability questions and material recommendations come from the engineers who would run the job — not from a call center."
        image={getHero("contact")}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
        ]}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_360px] lg:gap-16">
            {/* Form */}
            <div id="quote" className="scroll-mt-28">
              <Eyebrow>Request for quote</Eyebrow>
              <h2 className="mt-2 text-2xl font-bold text-navy sm:text-3xl">
                Submit an RFQ
              </h2>
              <p className="mt-3 max-w-xl text-[17px] leading-relaxed text-muted">
                The more you tell us, the more useful the first response will
                be. If you are not sure which process your part needs, say so —
                that is a question we like.
              </p>
              <div className="mt-9">
                <QuoteForm />
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="rounded-xl border border-line bg-surface p-7">
                <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-navy">
                  What to include
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {whatToInclude.map((w) => (
                    <li
                      key={w}
                      className="flex items-start gap-2.5 text-[15px] leading-snug text-ink"
                    >
                      <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-blue" />
                      {w}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 border-t border-line pt-5 text-sm leading-relaxed text-muted">
                  Missing half of it? Send what you have. We would rather start
                  the conversation than wait for a complete package.
                </p>
              </div>

              <div className="rounded-xl border border-line p-7">
                <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-navy">
                  Prefer email or phone?
                </h2>
                <dl className="mt-4 space-y-4">
                  <div className="flex items-start gap-3">
                    <MailIcon className="mt-0.5 h-5 w-5 shrink-0 text-blue" />
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wider text-gray-metal">
                        Quotes &amp; sales
                      </dt>
                      <dd>
                        <a
                          href={`mailto:${contacts.sales}`}
                          className="break-all font-medium text-navy hover:text-blue hover:underline"
                        >
                          {contacts.sales}
                        </a>
                      </dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MailIcon className="mt-0.5 h-5 w-5 shrink-0 text-blue" />
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wider text-gray-metal">
                        General inquiries
                      </dt>
                      <dd>
                        <a
                          href={`mailto:${contacts.info}`}
                          className="break-all font-medium text-navy hover:text-blue hover:underline"
                        >
                          {contacts.info}
                        </a>
                      </dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <PhoneIcon className="mt-0.5 h-5 w-5 shrink-0 text-blue" />
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wider text-gray-metal">
                        Toll free
                      </dt>
                      <dd>
                        <a
                          href="tel:+18007332648"
                          className="font-medium text-navy hover:text-blue hover:underline"
                        >
                          800.733.2648
                        </a>
                      </dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MailIcon className="mt-0.5 h-5 w-5 shrink-0 text-blue" />
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wider text-gray-metal">
                        Careers
                      </dt>
                      <dd>
                        <a
                          href={`mailto:${contacts.corporateHr}`}
                          className="break-all font-medium text-navy hover:text-blue hover:underline"
                        >
                          {contacts.corporateHr}
                        </a>
                        <Link
                          href="/careers"
                          className="ml-2 text-sm font-semibold text-blue hover:underline"
                        >
                          See openings
                        </Link>
                      </dd>
                    </div>
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* Plant contacts */}
      <section className="bg-surface py-16 sm:py-20">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Direct lines</Eyebrow>
            <h2 className="mt-2 text-2xl font-bold text-navy sm:text-3xl">
              Or call the plant
            </h2>
            <p className="mt-3 text-[17px] leading-relaxed text-muted">
              If you already know which facility runs your part, going direct is
              faster.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {locations.map((l) => (
              <div
                key={l.slug}
                className="flex flex-col rounded-lg border border-line bg-white p-6"
              >
                <IconBadge size="sm">
                  <PinIcon className="h-5 w-5" />
                </IconBadge>
                <h3 className="mt-4 font-bold text-navy">{l.name}</h3>
                <p className="mt-1 text-sm text-gray-metal">{l.legacyName}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {l.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
                <div className="mt-4 space-y-1.5 border-t border-line pt-4">
                  {l.tollFree && (
                    <a
                      href={`tel:${l.tollFreeHref}`}
                      className="block text-sm font-semibold text-navy hover:text-blue"
                    >
                      {l.tollFree}{" "}
                      <span className="font-normal text-gray-metal">
                        toll free
                      </span>
                    </a>
                  )}
                  {l.phone && (
                    <a
                      href={`tel:${l.phoneHref}`}
                      className="block text-sm font-semibold text-navy hover:text-blue"
                    >
                      {l.phone}
                    </a>
                  )}
                  <Link
                    href={`/locations#${l.slug}`}
                    className="inline-block pt-1 text-sm font-semibold text-blue hover:underline"
                  >
                    Plant details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

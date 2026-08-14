import type { Metadata } from "next";
import Link from "next/link";
import { contacts, futureLocations, locations } from "@/lib/site";
import { CheckIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/Icons";
import {
  Container,
  CtaBand,
  Eyebrow,
  IconBadge,
  PageHero,
  SectionHeading,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Locations",
  description:
    "SYNC Manufacturing operates plants in Carson City, Nevada; Blackstone, Illinois; and Glendora, California, with new capacity in development in Ohio and Mexico.",
};

export default function LocationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Locations"
        title="Three plants today. Two more in development."
        intro="Nevada, Illinois and California cover rubber, plastics and large-format work. Ohio and Mexico are next."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/locations" },
        ]}
      />

      {/* Quick jump */}
      <section className="border-b border-line bg-surface py-5">
        <Container>
          <ul className="flex flex-wrap items-center gap-2">
            <li className="mr-2 text-sm font-semibold text-navy">Jump to:</li>
            {locations.map((l) => (
              <li key={l.slug}>
                <a
                  href={`#${l.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-md border border-line bg-white px-3.5 py-2 text-sm font-medium text-navy transition-colors hover:border-blue hover:text-blue"
                >
                  <PinIcon className="h-4 w-4" />
                  {l.city}, {l.state}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="space-y-14">
            {locations.map((l) => (
              <div
                key={l.slug}
                id={l.slug}
                className="grid scroll-mt-32 gap-8 border-b border-line pb-14 last:border-0 last:pb-0 lg:grid-cols-[1fr_420px] lg:gap-12"
              >
                <div>
                  <div className="flex items-start gap-5">
                    <IconBadge size="lg">
                      <PinIcon className="h-6 w-6" />
                    </IconBadge>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue">
                        {l.city}, {l.state}
                      </p>
                      <h2 className="mt-1.5 text-2xl font-bold text-navy sm:text-3xl">
                        {l.name}
                      </h2>
                      <p className="mt-1 text-[15px] text-gray-metal">
                        Formerly {l.legacyName}
                      </p>
                    </div>
                  </div>

                  <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted">
                    {l.focus}
                  </p>

                  <div className="mt-8">
                    <Eyebrow>Capabilities at this plant</Eyebrow>
                    <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                      {l.capabilities.map((c) => (
                        <li
                          key={c}
                          className="flex items-start gap-2.5 text-[15px] leading-snug text-ink"
                        >
                          <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-blue" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Contact card */}
                <div className="rounded-xl border border-line bg-surface p-7">
                  <address className="not-italic">
                    <p className="text-[15px] font-semibold leading-relaxed text-navy">
                      {l.address.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </p>

                    <dl className="mt-6 space-y-3.5 border-t border-line pt-6">
                      {l.tollFree && (
                        <ContactRow
                          icon={<PhoneIcon className="h-5 w-5" />}
                          label="Toll free"
                          value={l.tollFree}
                          href={`tel:${l.tollFreeHref}`}
                        />
                      )}
                      <ContactRow
                        icon={<PhoneIcon className="h-5 w-5" />}
                        label="Phone"
                        value={l.phone}
                        href={`tel:${l.phoneHref}`}
                      />
                      {l.fax && (
                        <ContactRow
                          icon={<PhoneIcon className="h-5 w-5" />}
                          label="Fax"
                          value={l.fax}
                        />
                      )}
                      <ContactRow
                        icon={<MailIcon className="h-5 w-5" />}
                        label="Careers"
                        value={l.hrEmail}
                        href={`mailto:${l.hrEmail}`}
                      />
                    </dl>
                  </address>

                  <div className="mt-6 flex flex-wrap gap-3 border-t border-line pt-6">
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(l.mapQuery)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-md border border-line bg-white px-4 py-2.5 text-sm font-semibold text-navy transition-colors hover:border-blue hover:text-blue"
                    >
                      <PinIcon className="h-4 w-4" />
                      Directions
                    </a>
                    <Link
                      href="/contact#quote"
                      className="inline-flex items-center rounded-md bg-blue px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0060bb]"
                    >
                      Quote from this plant
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Coming soon */}
      <section className="bg-surface py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="In development"
            title="Where we're expanding next"
            intro="Two additional facilities are in development to add capacity and shorten lead times for customers in the eastern United States and in nearshore supply chains."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:max-w-2xl">
            {futureLocations.map((f) => (
              <div
                key={f.label}
                className="rounded-lg border border-dashed border-gray-metal/60 bg-white p-6"
              >
                <span className="inline-block rounded bg-blue/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue">
                  {f.note}
                </span>
                <h3 className="mt-4 text-xl font-bold text-navy">{f.label}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">
                  Details to be announced. Contact us to discuss capacity
                  planning for programs in this region.
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        title="Not sure which plant should quote your part?"
        intro={`Send it to ${contacts.sales} and we will route it to the facility with the right process and the right capacity.`}
        secondary={{ href: "/solutions", label: "Browse capabilities" }}
      />
    </>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 shrink-0 text-blue">{icon}</span>
      <div className="min-w-0">
        <dt className="text-xs font-semibold uppercase tracking-wider text-gray-metal">
          {label}
        </dt>
        <dd className="mt-0.5 break-words text-[15px] font-medium text-navy">
          {href ? (
            <a href={href} className="hover:text-blue hover:underline">
              {value}
            </a>
          ) : (
            value
          )}
        </dd>
      </div>
    </div>
  );
}

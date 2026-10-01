import type { Metadata } from "next";
import Link from "next/link";
import {
  contacts,
  futureLocations,
  locations,
  numberWord,
  plantCount,
  stateList,
} from "@/lib/site";
import { getHero } from "@/lib/heroes";
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
  description: `SYNC Manufacturing operates ${numberWord(plantCount)} plants across ${stateList}, connected by one organization and a single point of contact.`,
};

export default function LocationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Locations"
        title="One network. Coast to coast."
        intro={`${numberWord(plantCount, true)} specialized plants across ${stateList} — connected by coordinated quality systems and a single point of contact.`}
        image={getHero("locations")}
        imageLayout="banner"
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
                    {l.description ?? l.focus}
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
                      {l.phone && (
                        <ContactRow
                          icon={<PhoneIcon className="h-5 w-5" />}
                          label="Phone"
                          value={l.phone}
                          href={`tel:${l.phoneHref}`}
                        />
                      )}
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
                        value={l.hrEmail ?? contacts.corporateHr}
                        href={`mailto:${l.hrEmail ?? contacts.corporateHr}`}
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
          <div className="grid gap-8 lg:grid-cols-[1fr_420px] lg:items-center lg:gap-12">
            <SectionHeading
              eyebrow="Growing"
              title="More locations coming soon"
              intro="SYNC continues to add manufacturing capacity and capabilities across North America. Contact us to discuss capacity planning for your program."
            />
            <ul className="space-y-3">
              {futureLocations.map((f) => (
                <li
                  key={f.label}
                  className="flex items-center justify-between gap-4 rounded-lg border border-dashed border-gray-metal/60 bg-white px-6 py-5"
                >
                  <span className="text-lg font-bold text-navy">{f.label}</span>
                  <span className="rounded bg-blue/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue">
                    {f.note}
                  </span>
                </li>
              ))}
            </ul>
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

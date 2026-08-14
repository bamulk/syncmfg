import type { Metadata } from "next";
import { CheckIcon } from "@/components/Icons";
import {
  CheckList,
  Container,
  CtaBand,
  Eyebrow,
  PageHero,
  Prose,
  SectionHeading,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Quality & Compliance",
  description:
    "SYNC Manufacturing operates an AS9100-certified quality system and is ITAR registered, with full lot traceability across all facilities.",
};

/* DRAFT — the deck lists only "ITAR" and "AS9100" for this page. Certificate
   numbers, registrar, scope statements and audit dates must come from Quality
   before launch. */
const certifications = [
  {
    name: "AS9100",
    scope: "Aerospace quality management system",
    body: "AS9100 builds on ISO 9001 with the configuration management, risk management, first article inspection and counterfeit-parts controls that aerospace and defense customers require. Our certification governs how work is planned, verified and documented across the organization.",
    details: [
      "Documented first article inspection (FAIR) on request",
      "Configuration and change control on tooling and compounds",
      "Nonconformance and corrective action tracking",
      "Supplier qualification and incoming inspection",
    ],
    // TODO: confirm registrar, certificate number and scope statement
    meta: "Certificate details available on request",
  },
  {
    name: "ITAR Registered",
    scope: "International Traffic in Arms Regulations",
    body: "SYNC is registered with the U.S. Department of State Directorate of Defense Trade Controls. Technical data covered by ITAR is handled under access controls, and all production covered by those programs is performed domestically by U.S. persons.",
    details: [
      "Controlled handling of ITAR technical data",
      "Domestic manufacturing, U.S. persons only on controlled work",
      "Access-restricted drawing and file storage",
      "Export compliance review on inquiry",
    ],
    meta: "Registration details available on request",
  },
];

const practices = [
  "Full lot traceability from raw compound to shipped part",
  "Certificates of conformance with every shipment",
  "Material certifications retained and reproducible",
  "In-process dimensional and durometer verification",
  "Documented process parameters per tool and cavity",
  "PPAP and FAIR documentation packages on request",
];

export default function QualityPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Quality & Compliance"
        intro="An AS9100-certified quality system and ITAR registration, applied consistently across every SYNC facility."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about" },
          { label: "Quality", href: "/about/quality" },
        ]}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="max-w-2xl">
            <SectionHeading
              eyebrow="Our approach"
              title="Documentation is part of the part"
            />
            <div className="mt-8">
              <Prose
                paragraphs={[
                  "A component that meets print but arrives without traceable material certifications is not a finished deliverable in the markets we serve. SYNC treats the documentation package as part of the product: it ships with the parts, it reproduces on demand years later, and it does not carry a separate line item.",
                  "The unification of four companies under one quality system was the single largest benefit of becoming SYNC. Customers who buy from more than one of our plants now qualify one organization, audit one system, and receive one consistent set of records.",
                ]}
              />
            </div>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {certifications.map((c) => (
              <div
                key={c.name}
                className="rounded-xl border border-line p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-navy">{c.name}</h2>
                    <p className="mt-1 text-sm font-medium text-blue">
                      {c.scope}
                    </p>
                  </div>
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy text-white">
                    <CheckIcon className="h-6 w-6" />
                  </span>
                </div>
                <p className="mt-5 text-[15px] leading-relaxed text-muted">
                  {c.body}
                </p>
                <ul className="mt-6 space-y-2.5 border-t border-line pt-6">
                  {c.details.map((d) => (
                    <li
                      key={d}
                      className="flex items-start gap-2.5 text-[15px] leading-snug text-ink"
                    >
                      <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-blue" />
                      {d}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-sm text-gray-metal">{c.meta}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-surface py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Eyebrow>Standard practice</Eyebrow>
              <h2 className="mt-2 text-2xl font-bold text-navy sm:text-3xl">
                What ships with every order
              </h2>
              <p className="mt-4 text-[17px] leading-relaxed text-muted">
                These are not options. They are how we run every job, in every
                market, at every plant.
              </p>
            </div>
            <CheckList items={practices} />
          </div>
        </Container>
      </section>

      <CtaBand
        title="Need our certificates for a supplier qualification?"
        intro="We will send current certifications, quality manual excerpts and any documentation your qualification package requires."
        primary={{ href: "/contact", label: "Request documentation" }}
        secondary={{ href: "/markets", label: "Markets we serve" }}
      />
    </>
  );
}

import type { Metadata } from "next";
import { contacts, site } from "@/lib/site";
import { Container, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects and uses information submitted through syncmfg.com.`,
};

/* DRAFT — placeholder policy. Have counsel review and replace before launch;
   the specifics below describe what this site actually does today. */
const sections = [
  {
    heading: "What we collect",
    body: [
      "When you submit a request for quote or contact form on syncmfg.com, we collect the information you provide: your name, company, email address, phone number, and the details you share about your part or inquiry.",
      "We do not collect payment information through this website, and we do not sell or rent the information you submit.",
    ],
  },
  {
    heading: "How we use it",
    body: [
      "Submitted information is used to respond to your inquiry, prepare quotes, and communicate about your program. It is routed internally to the personnel who handle that inquiry and to the manufacturing facility best suited to the work.",
      "Technical data covered by ITAR or marked proprietary is handled under our export-compliance and confidentiality procedures. Do not transmit ITAR-controlled technical data through this website's forms — contact us first and we will provide a controlled transfer method.",
    ],
  },
  {
    heading: "Analytics and cookies",
    body: [
      "This site may use privacy-respecting analytics to understand which pages are useful. Analytics data is aggregated and is not used to identify individual visitors.",
    ],
  },
  {
    heading: "Retention and access",
    body: [
      "Inquiry records are retained as part of our normal business records. To request a copy of the information you have submitted, or to ask that it be deleted, contact us at the address below.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        title="Privacy Policy"
        intro="How SYNC Manufacturing handles the information you submit through this website."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Privacy", href: "/privacy" },
        ]}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="max-w-2xl space-y-10">
            {sections.map((s) => (
              <div key={s.heading}>
                <h2 className="text-xl font-bold text-navy">{s.heading}</h2>
                <div className="mt-4 space-y-4">
                  {s.body.map((p, i) => (
                    <p key={i} className="text-[17px] leading-relaxed text-muted">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            <div className="rounded-lg border border-line bg-surface p-6">
              <h2 className="text-xl font-bold text-navy">Contact</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                Questions about this policy can be directed to{" "}
                <a
                  href={`mailto:${contacts.info}`}
                  className="font-semibold text-blue hover:underline"
                >
                  {contacts.info}
                </a>
                .
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

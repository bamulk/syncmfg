import type { Metadata } from "next";
import { getHero } from "@/lib/heroes";
import { contacts, locations, stateList } from "@/lib/site";
import { CheckIcon, MailIcon, PinIcon } from "@/components/Icons";
import {
  Container,
  CtaBand,
  Eyebrow,
  IconBadge,
  PageHero,
  Prose,
  SectionHeading,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Careers",
  description: `Careers at SYNC Manufacturing — skilled trades, engineering, quality and operations roles across our ${stateList} plants.`,
};

/* DRAFT — the deck specifies "a generic landing page, then work to an
   interactive page." This is the generic version: each plant routes to its own
   HR inbox, with a corporate inbox as fallback. A job board or ATS embed can
   replace the roles section later. */
const roleAreas = [
  {
    title: "Skilled trades & production",
    roles: [
      "Press operators",
      "Mold setters",
      "Tool & die makers",
      "Compounders / mixers",
      "Finishers and trimmers",
    ],
  },
  {
    title: "Engineering & quality",
    roles: [
      "Process engineers",
      "Tooling engineers",
      "Quality inspectors",
      "Quality engineers",
      "CAD / design technicians",
    ],
  },
  {
    title: "Operations & support",
    roles: [
      "Production planning",
      "Shipping & receiving",
      "Maintenance technicians",
      "Customer service",
      "Purchasing",
    ],
  },
];

/* Copy from "Website Update Oct 9 2022.pptx", slides 4–5 (client-approved). */
const working = [
  "Great manufacturing starts with people who know their craft. Across Sync, our teams bring years of hands-on experience in molding, compounding, tooling, machining, cutting, bonding, and other specialized manufacturing processes.",
  "We’re building on that experience by investing in our people, our facilities and the future of American manufacturing. Whether you’ve spent decades running a press or are just beginning a career in manufacturing, Sync is a place to learn, contribute and grow.",
  "As our organization expands, so do the opportunities. Our manufacturing locations offer exposure to different processes, markets, and technologies, all connected by a shared commitment to quality, safety, hard work, and caring for our customers.",
];

const whyChooseSync = [
  {
    title: "Experienced teams and skilled trades",
    body: "work alongside people who have spent years mastering specialized manufacturing processes.",
  },
  {
    title: "Opportunities to learn and grow",
    body: "develop new skills through hands-on training, mentorship, and expanded responsibilities.",
  },
  {
    title: "Work that matters",
    body: "support customers in aerospace, defense, medical, utilities, industrial, and other demanding markets.",
  },
  {
    title: "Investment in manufacturing",
    body: "we continue to invest in equipment, facilities, technology and additional capabilities.",
  },
  {
    title: "A growing U.S. manufacturing organization",
    body: "build your career with a company focused on long-term growth and domestic manufacturing.",
  },
  {
    title: "A culture built around the work",
    body: "practical problem-solving, teamwork, and pride in making quality products.",
  },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build what matters. Grow with us."
        intro="Join skilled manufacturing, engineering, quality, and operations teams across Sync’s growing North American manufacturing network. Bring your experience, learn new skills, and help us build the next generation of American manufacturing."
        image={getHero("careers")}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Careers", href: "/careers" },
        ]}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Working at SYNC"
                title="Built by skilled people. Growing together."
              />
              <div className="mt-8">
                <Prose paragraphs={working} />
              </div>

              <div className="mt-10">
                <Eyebrow>Why people choose SYNC</Eyebrow>
                <ul className="mt-5 space-y-3.5">
                  {whyChooseSync.map((w) => (
                    <li
                      key={w.title}
                      className="flex items-start gap-3 text-[15px] leading-relaxed text-muted"
                    >
                      <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-blue" />
                      <span>
                        <span className="font-semibold text-navy">
                          {w.title}
                        </span>{" "}
                        — {w.body}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <Eyebrow>Roles we hire for</Eyebrow>
              <h2 className="mt-2 text-2xl font-bold text-navy">
                Open across all locations
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                We accept applications on an ongoing basis. Send a resume to the
                plant you are interested in, or to corporate HR if you are open
                to any location.
              </p>
              <div className="mt-8 space-y-4">
                {roleAreas.map((area) => (
                  <div
                    key={area.title}
                    className="rounded-lg border border-line p-6"
                  >
                    <h3 className="font-bold text-navy">{area.title}</h3>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {area.roles.map((r) => (
                        <li
                          key={r}
                          className="rounded bg-surface px-2.5 py-1.5 text-sm font-medium text-steel"
                        >
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Apply by location */}
      <section className="bg-surface py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="How to apply"
            title="Send your resume to the plant you want to work at"
            intro="Each location manages its own hiring. If you are flexible on location, corporate HR will route your resume to whichever plant is hiring."
          />

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
                <p className="mt-1 text-sm text-gray-metal">
                  {l.city}, {l.state} &middot; Formerly {l.legacyName}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {l.focus}
                </p>
                <a
                  href={`mailto:${l.hrEmail ?? contacts.corporateHr}?subject=${encodeURIComponent(
                    `Application — ${l.name}`,
                  )}`}
                  className="mt-5 inline-flex items-center gap-2 break-all text-sm font-semibold text-blue hover:underline"
                >
                  <MailIcon className="h-4 w-4 shrink-0" />
                  {l.hrEmail ?? contacts.corporateHr}
                </a>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-lg border border-line bg-navy p-8 text-white sm:flex sm:items-center sm:justify-between sm:gap-8">
            <div>
              <h3 className="text-xl font-bold">Open to any location?</h3>
              <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-[#c3d3e6]">
                Send your resume to corporate HR and we will forward it to every
                plant with an opening that fits.
              </p>
            </div>
            <a
              href={`mailto:${contacts.corporateHr}?subject=${encodeURIComponent(
                "Application — SYNC Manufacturing",
              )}`}
              className="mt-5 inline-flex shrink-0 items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-navy hover:bg-[#eaf2fb] sm:mt-0"
            >
              <MailIcon className="h-4 w-4" />
              {contacts.corporateHr}
            </a>
          </div>

          <p className="mt-6 text-sm leading-relaxed text-muted">
            SYNC Manufacturing is an equal opportunity employer. Some positions
            support ITAR-controlled work and require that the employee be a U.S.
            person as defined by 22 CFR 120.62.
          </p>
        </Container>
      </section>

      <CtaBand
        title="Questions before you apply?"
        intro="Ask about shifts, training, or what a role actually involves day to day. We would rather answer up front."
        primary={{ href: "/contact", label: "Contact us" }}
        secondary={{ href: "/locations", label: "See our plants" }}
      />
    </>
  );
}

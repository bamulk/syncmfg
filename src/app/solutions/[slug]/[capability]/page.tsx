import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  capabilityHref,
  capabilityPages,
  getCapabilityPage,
  quoteHref,
} from "@/lib/capabilities";
import { getHero } from "@/lib/heroes";
import { getLanding } from "@/lib/landing";
import { pageMetadata, serviceSchema } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import LandingPage from "@/components/LandingPage";

type Params = { params: Promise<{ slug: string; capability: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return capabilityPages().map((p) => ({
    slug: p.solution.slug,
    capability: p.capability.slug,
  }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug, capability } = await params;
  const found = getCapabilityPage(slug, capability);
  const content = found && getLanding(found.capability.page!);
  if (!found || !content) return {};
  return pageMetadata({
    title: content.title,
    description: content.summary,
    path: `/solutions/${slug}/${capability}`,
  });
}

export default async function CapabilityPage({ params }: Params) {
  const { slug, capability } = await params;
  const found = getCapabilityPage(slug, capability);
  const content = found && getLanding(found.capability.page!);
  if (!found || !content) notFound();
  const { solution, capability: cap } = found;
  const path = `/solutions/${solution.slug}/${cap.slug}`;

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: content.title,
          description: content.summary,
          path,
        })}
      />
      <LandingPage
        content={content}
        eyebrow={solution.name}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions" },
          { label: solution.name, href: `/solutions/${solution.slug}` },
          { label: cap.name, href: path },
        ]}
        quoteHref={quoteHref({ process: cap.name })}
        fallbackHero={getHero(`capabilities-${cap.slug}`)}
        related={{
          heading: solution.name,
          items: solution.capabilities.map((c) => ({
            label: c.name,
            href: capabilityHref(solution, c) ?? `/solutions/${solution.slug}#${c.slug}`,
            current: c.slug === cap.slug,
          })),
        }}
      />
    </>
  );
}

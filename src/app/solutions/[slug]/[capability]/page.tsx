import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSolution } from "@/lib/solutions";
import { capabilityPages, getLanding } from "@/lib/landing";
import { pageMetadata } from "@/lib/seo";
import LandingPage from "@/components/LandingPage";

type Params = { params: Promise<{ slug: string; capability: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return capabilityPages().map((p) => ({
    slug: p.family!,
    capability: p.slug,
  }));
}

function load(slug: string, capability: string) {
  const solution = getSolution(slug);
  const page = getLanding(capability);
  const cap = solution?.capabilities.find((c) => c.slug === capability);
  if (!solution || !page || !cap || page.family !== slug) return undefined;
  return { solution, page, cap };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug, capability } = await params;
  const found = load(slug, capability);
  if (!found) return {};
  return pageMetadata({
    title: found.page.title,
    description: found.page.intro[0] ?? found.cap.summary,
    path: `/solutions/${slug}/${capability}`,
  });
}

export default async function CapabilityPage({ params }: Params) {
  const { slug, capability } = await params;
  const found = load(slug, capability);
  if (!found) notFound();
  const { solution, page, cap } = found;

  return (
    <LandingPage
      page={page}
      eyebrow={solution.name}
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Solutions", href: "/solutions" },
        { label: solution.name, href: `/solutions/${solution.slug}` },
        { label: cap.name, href: `/solutions/${solution.slug}/${cap.slug}` },
      ]}
    />
  );
}

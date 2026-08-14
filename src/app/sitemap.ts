import type { MetadataRoute } from "next";
import { markets } from "@/lib/markets";
import { solutions } from "@/lib/solutions";
import { pressReleases } from "@/lib/press";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    { path: "/", priority: 1 },
    { path: "/markets", priority: 0.9 },
    { path: "/solutions", priority: 0.9 },
    { path: "/locations", priority: 0.8 },
    { path: "/about", priority: 0.7 },
    { path: "/about/langdale", priority: 0.6 },
    { path: "/about/history", priority: 0.6 },
    { path: "/about/quality", priority: 0.7 },
    { path: "/about/press", priority: 0.5 },
    { path: "/careers", priority: 0.7 },
    { path: "/contact", priority: 0.8 },
    { path: "/privacy", priority: 0.2 },
  ];

  return [
    ...staticPaths.map((p) => ({
      url: `${site.url}${p.path}`,
      changeFrequency: "monthly" as const,
      priority: p.priority,
    })),
    ...markets.map((m) => ({
      url: `${site.url}/markets/${m.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...solutions.map((s) => ({
      url: `${site.url}/solutions/${s.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...pressReleases.map((p) => ({
      url: `${site.url}/about/press/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "yearly" as const,
      priority: 0.4,
    })),
  ];
}

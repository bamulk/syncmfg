import { getLanding } from "./landing";
import { solutions, type Capability, type Solution } from "./solutions";

/** Link to a capability's own page, or undefined if it has none yet. */
export function capabilityHref(s: Solution, c: Capability) {
  return c.page ? `/solutions/${s.slug}/${c.slug}` : undefined;
}

/** Card text: the client's own summary when the capability has a page. */
export function capabilitySummary(c: Capability) {
  return (c.page && getLanding(c.page)?.summary) || c.summary || "";
}

/** Every capability that has a landing page, with its family. */
export function capabilityPages() {
  return solutions.flatMap((solution) =>
    solution.capabilities
      .filter((capability) => capability.page)
      .map((capability) => ({ solution, capability })),
  );
}

export function getCapabilityPage(family: string, slug: string) {
  return capabilityPages().find(
    (p) => p.solution.slug === family && p.capability.slug === slug,
  );
}

/** The RFQ form, with the process or market pre-selected. */
export function quoteHref(prefill: { process?: string; market?: string }) {
  const q = new URLSearchParams(
    Object.entries(prefill).filter((e): e is [string, string] => !!e[1]),
  ).toString();
  return `/contact${q ? `?${q}` : ""}#quote`;
}

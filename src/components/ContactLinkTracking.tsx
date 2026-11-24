"use client";

/**
 * GA4 click events for email (mailto:) and phone (tel:) links, via one
 * delegated document-level listener so no link component needs changing.
 *
 * Sends only where the link sits (link_area) and, for email, whether it is the
 * careers (hr@) address or a business one. Never sends the address, number,
 * subject or any other part of the href. Rendered by GoogleAnalytics.tsx, so it
 * only exists when GA is active.
 */
import { useEffect } from "react";

function linkArea(a: Element): string {
  const tagged = a.closest("[data-analytics-area]");
  if (tagged) return tagged.getAttribute("data-analytics-area") || "page";
  if (a.closest('[role="dialog"]')) return "menu";
  if (a.closest("header")) return "header";
  if (a.closest("footer")) return "footer";
  return "page";
}

export default function ContactLinkTracking() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const a = (e.target as Element | null)?.closest?.(
        'a[href^="mailto:"], a[href^="tel:"]',
      );
      if (!a) return;

      const href = a.getAttribute("href") ?? "";
      const link_area = linkArea(a);

      if (href.toLowerCase().startsWith("mailto:")) {
        const address = href.slice("mailto:".length).split("?")[0];
        const contact_category = address.toLowerCase().startsWith("hr")
          ? "careers"
          : "business";
        window.gtag?.("event", "email_click", { link_area, contact_category });
      } else {
        window.gtag?.("event", "phone_click", { link_area });
      }
    }

    document.addEventListener("click", onClick, { capture: true });
    return () =>
      document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}

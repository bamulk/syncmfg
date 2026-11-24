/**
 * Google Analytics 4 (gtag.js).
 *
 * Production only: renders nothing unless site.googleAnalyticsId is set AND
 * VERCEL_ENV is "production" (set at build time on Vercel), so localhost and
 * preview deployments never send data to Google Analytics.
 */
import Script from "next/script";
import { site } from "@/lib/site";

export default function GoogleAnalytics() {
  const id = site.googleAnalyticsId;
  if (!id || process.env.VERCEL_ENV !== "production") return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', ${JSON.stringify(id)});`}
      </Script>
    </>
  );
}

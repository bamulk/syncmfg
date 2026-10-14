import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";
import { ogImage } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Precision Molded Rubber & Plastics`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  // Pages override these through pageMetadata() in src/lib/seo.ts.
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    images: [ogImage],
  },
  twitter: { card: "summary_large_image", images: [ogImage.url] },
  icons: {
    icon: "/sync-mark.png?v=2",
    apple: "/sync-mark.png?v=2",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-blue focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        {/* Vercel Web Analytics: cookie-free page-view counts. Records
            nothing until Web Analytics is enabled on the Vercel project. */}
        <Analytics />
      </body>
    </html>
  );
}

# SEO

## How it's wired

- **Titles, descriptions, canonical URLs, Open Graph and Twitter tags** all come
  from `pageMetadata()` in `src/lib/seo.ts`. Every page calls it with a title,
  description and its own path. It drops the " | SYNC Manufacturing" suffix when
  the title would run past ~60 characters and trims descriptions to 160 at a
  word boundary.
- **Canonical URLs** point every page at `https://syncmfg.com/...`, so copies of
  the site on other hostnames (syncmfg-pi.vercel.app) don't compete with it.
- **Share image** is `public/og.jpg` (1200×630), used for every page.
- **Structured data** (schema.org JSON-LD):
  - `Organization` with all plant addresses and phones, on `/` and `/locations`
    (`organizationSchema()`, built from `locations` in `src/lib/site.ts`)
  - `NewsArticle` on each press release (`articleSchema()`)
  - `BreadcrumbList` on every page with a breadcrumb (rendered by `PageHero`)
- **Sitemap and robots**: `src/app/sitemap.ts` and `src/app/robots.ts`; both
  generated from the same data, so new markets, solutions and releases appear
  automatically.

Adding a page: export `metadata = pageMetadata({ title, description, path })`.

## Not done in code (needs the client or an account)

1. **Google Search Console** — verify `syncmfg.com` (DNS TXT record at GoDaddy)
   and submit `https://syncmfg.com/sitemap.xml`. Same in Bing Webmaster Tools.
2. **Google Business Profile** for each plant, with the exact name, address and
   phone shown on `/locations`. This drives "rubber molding near me"-type
   results more than anything on the site.
3. **Legacy domains** — if Sync still owns the Redco, Verona Rubber Works,
   Southwest Plastics or MDI / Aptyx websites, redirect each one (301) to the
   matching `syncmfg.com` page instead of letting them lapse; that carries their
   search history over.
4. **Analytics** — none installed. Vercel Web Analytics or GA4.
5. **Placeholder copy** — the six market pages, the four 2023–2025 press
   releases (text and exact dates) and the Quality page are still DRAFT
   (see CONTENT.md). Real, specific copy is the biggest remaining ranking factor
   on this site.

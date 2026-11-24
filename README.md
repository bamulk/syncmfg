# syncmfg.com

Marketing site for SYNC Manufacturing — Next.js 16 (App Router) + Tailwind v4 +
TypeScript. Built from `SYNC Website Aug 11 2026.pptx`.

**Read [CONTENT.md](./CONTENT.md) before editing copy** — a lot of the text is
placeholder standing in for Word documents that were never supplied.

## Running it

```bash
npm install && npm run dev
```

## Structure

```
src/
  app/
    page.tsx                    home
    markets/                    index + [slug] (7 markets)
    solutions/                  index + [slug] (4 families) + [slug]/[capability]
                                (one page per capability that has a client document)
    about/                      overview, langdale, history, quality, press/[slug]
    locations/  careers/  contact/  privacy/
    api/contact/route.ts        RFQ handler
    sitemap.ts  robots.ts  not-found.tsx
  components/
    Header.tsx  Footer.tsx      shell
    ui.tsx                      Container, PageHero, Card, CtaBand, CheckList…
    Icons.tsx                   inline SVG set
    QuoteForm.tsx               RFQ form (client); reads ?process= / ?market=
    LandingPage.tsx             renders a client landing page document
  content/landing/*.json        generated from the client's Word documents
  lib/
    site.ts                     company facts, nav, locations, timeline
    markets.ts  solutions.ts  press.ts
    landing.ts  capabilities.ts landing page content + capability page helpers
scripts/
  deploy.py                     production deploy (see Deploying)
  import-landing-pages.py       Word documents → src/content/landing
```

**All copy lives in `src/lib/`.** Pages read from those files, so updating a
market or press release is a data edit, not a layout edit. Adding a market to
`markets.ts` generates its page, nav entry, footer link and sitemap row
automatically.

### Client landing pages (Word documents)

Since November 2026 the client writes full landing pages as Word documents,
one per capability (plus Valve & Flow Control under Markets). They are
converted, word for word, by:

```
python3 -I scripts/import-landing-pages.py "<folder with the .docx files>"
```

The script maps each document to a page (`PAGES` at the top), extracts the
photos into `public/images/landing/<page>/`, and refuses to write anything if
a single paragraph of the document would be lost or changed. Heading sizes in
the document decide the structure (title, sections, sub-sections), bold lines
become card titles and buttons. To change a page, edit the document and re-run
the script; don't edit the JSON by hand. A capability gets its page by setting
`page:` in `solutions.ts`; a market by setting `page:` in `markets.ts`.

## Brand tokens

Defined once in `src/app/globals.css` under `@theme`, per the brand guide on
slide 2:

| Token | Hex | Use |
|---|---|---|
| `navy` | `#01234C` | headlines, primary text, footer |
| `blue` | `#0070D6` | buttons, links, CTAs |
| `blue-600` | `#0152A2` | supporting graphics |
| `navy-800` | `#01356E` | borders, dividers |
| `steel` | `#27476C` | secondary UI text |
| `gray-metal` | `#8497AA` | muted text, cube highlights |

Use `text-navy`, `bg-blue`, etc. Don't hardcode hex values in components.

## Contact form

`POST /api/contact` sends via Resend's REST API. Set in the hosting environment:

```
RESEND_API_KEY=...        # added by the Resend integration on Vercel
RESEND_EMAIL_DOMAIN=...   # added by the integration
CONTACT_TO=<the inbox that should receive RFQs>
CONTACT_FROM=...          # optional; defaults to rfq@<RESEND_EMAIL_DOMAIN>
```

Each submission sends two emails: the RFQ to `CONTACT_TO` (reply-to is the
customer), and a fixed-text confirmation to the customer (reply-to is
`CONTACT_TO`), which is the email the form tells them to reply to with drawings.
`syncmfg.com` must be verified in Resend first; the domain's DMARC policy is
`quarantine`, so unverified mail would land in spam.

Without those it logs submissions to the server console and still returns
success, so the form works in local dev. It validates required fields and email
format, and drops bot submissions via a honeypot field.

Drawings are deliberately **not** uploaded through the form — the confirmation
copy asks customers to reply to the email with attachments, which keeps
potentially ITAR-controlled prints off a public upload endpoint. If Sync wants
real uploads later, that should go to a private bucket with access controls, not
a public form.

### Google Analytics

GA4 is set by `site.googleAnalyticsId` in `src/lib/site.ts` and loads on
production deploys only (`VERCEL_ENV=production`), never locally or on previews.

Events sent:

- `generate_lead` — quote form submitted (`form`, `market`, `process`)
- `email_click` — a mailto: link clicked (`link_area`, `contact_category`)
- `phone_click` — a tel: link clicked (`link_area`)

No personal data or form contents are sent (no names, addresses, numbers or
messages). Mark `generate_lead`, `email_click` and `phone_click` as key events
in GA Admin. Don't also install the client's Google Tag Manager container
(`GTM-N3R6CPGQ`) with a GA4 tag, or page views will be counted twice.

## Deploying

The site is hosted on the client's Vercel project (`syncmfg`), live at
https://syncmfg.com. `www.syncmfg.com` and the old preview address
`syncmfg-pi.vercel.app` both redirect (308) to it. The project has **no Git
connection**, so pushing to GitHub does not deploy. Deploy the committed tree with:

```bash
python3 scripts/deploy.py
```

It needs `VERCEL_TOKEN=...` in `.env.local` (gitignored) and a clean working
tree. Set `site.url` in `src/lib/site.ts` if the domain changes — sitemap,
robots and Open Graph tags all read from it.

## Not built yet

- Product photography (icons only today) — see CONTENT.md
- Interactive careers page / job board — the deck asks for a generic landing
  page first, which is what this is
- Locations map graphic — the deck's map is Langdale-branded and shows legacy
  logos, so the page uses address cards with Google Maps links instead

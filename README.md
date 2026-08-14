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
    markets/                    index + [slug] (6 markets)
    solutions/                  index + [slug] (4 families, 15 capabilities)
    about/                      overview, langdale, history, quality, press/[slug]
    locations/  careers/  contact/  privacy/
    api/contact/route.ts        RFQ handler
    sitemap.ts  robots.ts  not-found.tsx
  components/
    Header.tsx  Footer.tsx      shell
    ui.tsx                      Container, PageHero, Card, CtaBand, CheckList…
    Icons.tsx                   inline SVG set
    QuoteForm.tsx               RFQ form (client)
  lib/
    site.ts                     company facts, nav, locations, timeline
    markets.ts  solutions.ts  press.ts
```

**All copy lives in `src/lib/`.** Pages read from those files, so updating a
market or press release is a data edit, not a layout edit. Adding a market to
`markets.ts` generates its page, nav entry, footer link and sitemap row
automatically.

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
RESEND_API_KEY=re_...
CONTACT_TO=sales@syncmfg.com
CONTACT_FROM=SYNC Website <website@syncmfg.com>
```

Without those it logs submissions to the server console and still returns
success, so the form works in local dev. It validates required fields and email
format, and drops bot submissions via a honeypot field.

Drawings are deliberately **not** uploaded through the form — the confirmation
copy asks customers to reply to the email with attachments, which keeps
potentially ITAR-controlled prints off a public upload endpoint. If Sync wants
real uploads later, that should go to a private bucket with access controls, not
a public form.

## Deploying

Vercel, with `syncmfg.com` as the production domain. Set `site.url` in
`src/lib/site.ts` if the domain changes — sitemap, robots and Open Graph tags
all read from it.

## Not built yet

- Product photography (icons only today) — see CONTENT.md
- Interactive careers page / job board — the deck asks for a generic landing
  page first, which is what this is
- Locations map graphic — the deck's map is Langdale-branded and shows legacy
  logos, so the page uses address cards with Google Maps links instead
- Analytics

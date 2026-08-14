# Content status — what's real, what's placeholder

The site was built from `SYNC Website Aug 11 2026.pptx`. The deck referenced 12
Word documents ("Web Developer Briefs") that were **not included** with it, so
every page that depends on one has placeholder copy written from the deck's own
notes plus industry context.

Placeholder copy is marked `DRAFT` in the source. To find all of it:

```bash
grep -rn "DRAFT\|TODO" src/
```

---

## Confirmed from the deck (do not change without checking)

| Item | Source |
|---|---|
| Brand colors — Navy `#01234C`, Primary Blue `#0070D6`, Secondary Blue `#0152A2`, Dark Accent `#01356E`, Steel Blue `#27476C`, Metallic Gray `#8497AA` | Slide 2 |
| Logo artwork | Extracted from slide 3 (see *Logo* below) |
| Navigation: Markets, Solutions, About Us, Careers, Locations, Contact Us | Slide 3 |
| Six markets and their order | Slide 4 |
| Four solution categories and all 15 sub-capabilities, verbatim | Slide 5 graphic |
| Acquisition timeline and dates | Slide 7 |
| All three plant addresses, phone numbers, fax | Slide 10 |
| `HRCarsoncity@syncmfg.com`, `HR@syncmfg.com` | Slide 11 |
| ITAR and AS9100 | Slide 9 |
| Ohio and Mexico "coming soon" | Slide 10 map graphic |

---

## Missing documents → the pages waiting on them

| Document referenced in the deck | Page | File to edit |
|---|---|---|
| `Sync_Aerospace_Landing_Page_Web_Developer_Brief.docx` | /markets/aerospace | `src/lib/markets.ts` |
| `Sync_Defense_Landing_Page_Web_Developer_Brief.docx` | /markets/defense | `src/lib/markets.ts` |
| `Sync_Medical_Landing_Page_Web_Developer_Brief.docx` | /markets/medical | `src/lib/markets.ts` |
| `Sync_Utilities_Landing_Page_Web_Developer_Brief.docx` | /markets/utilities | `src/lib/markets.ts` |
| `Sync_Oil_Gas_Landing_Page_Web_Developer_Brief.docx` | /markets/oil-and-gas | `src/lib/markets.ts` |
| `Sync_Industrial_Landing_Page_Web_Developer_Brief.docx` | /markets/industrial | `src/lib/markets.ts` |
| `Sync_Plastic_Molding_Capability_Web_Developer_Brief.docx` | /solutions/molding | `src/lib/solutions.ts` |
| `Sync_Manufacturing_Website_History_FINAL.docx` | /about/history | `src/app/about/history/page.tsx` |
| `Langdale_Holdings_Landing_Page_Web_Developer_Brief.docx` | /about/langdale | `src/app/about/langdale/page.tsx` |
| `Langdale_Holdings_Southwest_Plastics_Acquisition_FINAL.docx` | press release | `src/lib/press.ts` |
| `Langdale_Holdings_REDCO_Acquisition_FINAL.docx` | press release | `src/lib/press.ts` |
| `Langdale_Holdings_REDCO_Santa_Fe_Rubber_Acquisition_FINAL.docx` | press release | `src/lib/press.ts` |
| `Langdale_Holdings_Verona_Rubber_Works_Acquisition_FINAL.docx` | press release | `src/lib/press.ts` |

Because content is separated into `src/lib/*.ts`, replacing copy for a market or
a press release means editing one object — no layout work.

---

## Things invented that need a decision before launch

These are placeholders that look real and will ship as fact if nobody checks
them.

1. **Email addresses.** Only `HRCarsoncity@` and `HR@` came from the deck.
   Invented: `HRBlackstone@syncmfg.com`, `HRGlendora@syncmfg.com`,
   `sales@syncmfg.com`, `info@syncmfg.com`. → `src/lib/site.ts`
2. **Press release dates.** The deck gave month and year only; each release is
   dated the 1st of that month. → `src/lib/press.ts`
3. **Per-plant capability lists.** Which processes actually run at Carson City
   vs. Blackstone vs. Glendora is an educated guess from the legacy company
   names. Operations should confirm. → `src/lib/site.ts`
4. **Market materials and applications.** Standard elastomer/plastic lists, not
   Sync's actual qualified compounds. → `src/lib/markets.ts`
5. **AS9100 / ITAR specifics.** No registrar, certificate number, scope
   statement or audit date — the page says "available on request" instead.
   → `src/app/about/quality/page.tsx`
6. **"Two business days" RFQ response** and **"Ohio / Mexico"** descriptions.
7. **Privacy policy.** Placeholder describing what the site actually does.
   Needs counsel review. → `src/app/privacy/page.tsx`
8. **Glendora naming.** The deck says "Southwest Mold" on slide 10 but
   "Southwest Plastics" everywhere else. Currently shown as
   "Southwest Plastics / Southwest Mold" — pick one.

---

## Logo

`public/sync-logo.png` was extracted from the PowerPoint and had its white
background keyed out; `sync-logo-white.png` is a reversed version for the dark
footer; `sync-mark.png` is the cube alone, used as the favicon.

**The source is only 329 × 104 px.** It looks fine at current sizes but will not
survive a large hero treatment or print. Ask Sync's designer for the vector
(`.ai`, `.eps` or `.svg`) and drop it in — the brand guide on slide 2 specifies a
blue gradient cube with metallic gray lower faces, which a vector would preserve.

---

## Photography

The site currently uses no product photography. The deck's "Solutions We
Provide" graphic contains excellent product shots (molded boots, O-rings, die-cut
gaskets, rollers, scan-to-part). Getting those original images would let the
solution pages carry real product imagery instead of icons alone.

Also worth requesting: plant exteriors/interiors for the Locations page, and
people-at-work shots for Careers.

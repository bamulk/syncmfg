# Hero images

Page heroes can carry a photo that fades into the navy field, matching the
mockups in `Website Updates Sept 26.pptx`. Each page has a **slot**; save an
image at `public/images/heroes/<slot>.jpg` and it appears on the next build —
no code change. Slots and alt text live in `src/lib/heroes.ts`.

## In place now

These were cropped from the client's slide mockups.

| Slot | Page | Source | Size |
|---|---|---|---|
| `about` | /about | slide 2 | 788×409 — **soft on retina; regenerate at full size** |
| `langdale` | /about/langdale | slide 4 | 1085×560 |
| `history` | /about/history | slide 9 | 1072×556 |
| `locations` | /locations (full-width banner) | slide 11 | 2127×739 |

The slide 1 aerospace mockup couldn't be reused: the photo is only 772×330 and
has the "Trusted in flight" tagline baked into it. Regenerate it with the
prompt below.

**Note:** the Locations map has the four plant names drawn into the image. When
a plant is added, that image needs regenerating too.

## Specs for new images

- Landscape **2:1**, at least **2400×1200** px, JPG
- Subject in the **right 60%** of the frame. The left 40% sits behind the
  headline and is faded out, so keep it dark and low-detail.
- On phones the whole photo sits behind the text with a navy tint, so busy
  detail anywhere will compete with the headline.

## Prompts

These were written to match the look of the slide images (they appear to be
ChatGPT-generated). Paste the shared style block, then the slot's subject.

**Shared style — paste first:**

> Photorealistic editorial industrial photograph, wide 2:1 landscape. Place the
> subject in the right 60% of the frame; keep the left 40% dark, soft and
> low-detail so it can sit behind white headline text. Cool color grade
> dominated by deep navy (#01234C) and steel blue, with neutral metallic grays
> and occasional bright SYNC-blue (#0070D6) accents. Shallow depth of field,
> soft bokeh of a clean, modern manufacturing facility with blue machinery.
> No text, no logos, no watermarks. People, if any, do not look at the camera.

| Slot | Subject |
|---|---|
| `markets-aerospace` | A commercial jet wing and winglet extending in from the right edge, above a sea of clouds at golden hour; sun low on the horizon. (Same scene as slide 1, **without** any text.) |
| `markets-defense` | A rugged tactical military ground vehicle on a desert test range at dusk, low side angle on the wheel, suspension and rubber components. No insignia or markings. |
| `markets-medical` | Translucent and white silicone medical components — valves, septa, tubing connectors, a molded mask seal — arranged on a clean reflective surface in a bright cleanroom. |
| `markets-utilities` | Close-up of polymer insulators and hardware on a high-voltage transmission tower against a deep blue twilight sky. |
| `markets-oil-and-gas` | A steel wellhead valve assembly at an oil field during blue hour, flanges and black elastomer seals visible, pipelines receding into soft focus. |
| `markets-industrial` | Large black rubber-covered industrial rollers and conveyor equipment on a factory floor, one roller in sharp focus in the foreground. |
| `solutions-molding` | An open compression-molding press with a polished steel mold and freshly molded black rubber parts resting in the cavities, faint heat haze. |
| `solutions-cutting` | Die-cut black and red rubber gaskets with clean punched holes laid out on a steel cutting table, die-cutting press softly blurred behind. |
| `solutions-compounding-and-bonding` | A sheet of black rubber compound coming off a two-roll mill; in the foreground, rubber-to-metal bonded mounts with machined steel plates. |
| `solutions-additional` | A blue-light 3D scanner on a tripod capturing a worn black rubber part, with a monitor in the background showing the part as a blue CAD model. |
| `quality` | An inspector in safety glasses measuring a black molded rubber part with digital calipers at an inspection bench; gauges and parts trays nearby. |
| `careers` | Two machine operators in safety glasses and navy work shirts reviewing a molded part together beside a press; candid, mid-conversation. |
| `contact` | An engineer at a workbench reviewing a printed technical drawing, with molded rubber and plastic parts laid out beside it. |

Also worth regenerating at full size: **`about`** (same scene as slide 2:
molded rubber seals, bellows, white and blue plastic bushings on a reflective
factory floor).

## Adding one

Save as `public/images/heroes/<slot>.jpg` (exact slot name from the table), then
commit and push. To change the alt text or the crop focus, edit the slot in
`src/lib/heroes.ts` (`position` takes CSS `object-position`, e.g. `"60% 40%"`).

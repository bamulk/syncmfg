#!/usr/bin/env python3
"""
Turn the client's landing-page Word documents into page content.

    python3 -I scripts/import-landing-pages.py "<folder with the .docx files>"

Writes src/content/landing/<key>.json and public/images/landing/<key>/*.jpg.
The client's wording is kept exactly; only structure is inferred, from the
heading sizes the documents use consistently:

    48pt bold  page title          36pt bold  section heading
    27pt bold  sub-heading         bold body  card title, tagline, link or
                                              button row ("A | B")

Re-run it whenever the client sends revised documents. PAGES below maps each
document to its page and says which embedded photos to use.
"""
import io
import json
import os
import re
import site
import sys
import zipfile
import xml.etree.ElementTree as ET

try:
    from PIL import Image
except ImportError:  # running with -I hides the user site-packages
    sys.path.append(site.getusersitepackages())
    from PIL import Image

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"
R = "{http://schemas.openxmlformats.org/officeDocument/2006/relationships}"
A = "{http://schemas.openxmlformats.org/drawingml/2006/main}"

M = "/solutions/molding"
CB = "/solutions/compounding-and-bonding"

# Pages that other pages' "Explore …" lines and headings may link to.
PAGE_LINKS = {
    "compression molding": f"{M}/compression-molding",
    "transfer molding": f"{M}/transfer-molding",
    "thermoset molding": f"{M}/thermoset-molding",
    "thermoplastic injection molding": f"{M}/thermoplastic-injection-molding",
    "silicone compression molding": f"{M}/silicone-compression-molding",
    "silicone molding": f"{M}/silicone-compression-molding",
    "lsr molding": f"{M}/lsr-molding",
    "rubber molding": f"{M}/rubber-molding",
    "dip molding": f"{M}/dip-molding",
    "rubber compounding": f"{CB}/rubber-compounding",
    "custom rubber compounding": f"{CB}/rubber-compounding",
    "rubber-to-metal bonding": f"{CB}/rubber-to-metal-bonding",
    "rubber roller manufacturing": f"{CB}/custom-rubber-rollers",
    "custom rubber rollers": f"{CB}/custom-rubber-rollers",
}

# Button labels in "Request a Quote | Contact Our Team" rows.
BUTTONS = {
    "request a quote": "quote",
    "request a technical review": "quote",
    "request a refurbishment quote": "quote",
    "discuss your roller application": "quote",
    "contact our team": "/contact",
    "contact our engineering team": "/contact",
    "explore our molding solutions": M,
    "explore our molding capabilities": M,
    "explore our compounding & bonding solutions": CB,
    "explore our bonding capabilities": CB,
    "explore our manufacturing capabilities": "/solutions",
}

# key, document, and photos: (document, embedded image) pairs. "hero" is the
# banner; "gallery" shows after the first section; "inline" pins a photo to a
# sub-heading; "crop" trims the caption panel off card-style images.
C = "Compression Molding .docx"
RO = "Custom Rubber Rollers.docx"
RTM = "Rubber to Metal Bonding.docx"
V = "Valve & Flow Control Manufacturing.docx"
PAGES = [
    dict(key="thermoset-molding", doc="Thermoset Molding Services.docx",
         hero=(C, "image2.jpeg", "Orange and green molded thermoset plastic components")),
    dict(key="thermoplastic-injection-molding", doc="Thermoplastic Injection Molding.docx"),
    dict(key="transfer-molding", doc="Transfer Molding.docx",
         hero=(RTM, "image4.jpeg", "Rubber components molded around metal inserts")),
    dict(key="compression-molding", doc=C,
         hero=(C, "image1.jpeg", "Assortment of compression-molded rubber and plastic components"),
         gallery=[(C, "image2.jpeg", "Molded thermoset plastic components in orange and green"),
                  (C, "image3.jpeg", "Colored silicone and rubber molded parts, including seals and caps")]),
    dict(key="silicone-compression-molding", doc="Silicone Compression Molding.docx",
         hero=(C, "image3.jpeg", "Colored silicone molded parts, including seals and caps")),
    dict(key="lsr-molding", doc="LSR Molding.docx",
         hero=("LSR Molding.docx", "image2.jpeg", "Liquid silicone rubber parts in pastel colors"),
         gallery=[("LSR Molding.docx", "image1.png", "Batch of gray molded silicone parts")]),
    dict(key="rubber-molding", doc="Rubber Molding.docx",
         hero=("Rubber Molding.docx", "image2.jpeg", "Molded rubber gaskets, seals and diaphragms"),
         gallery=[("Rubber Molding.docx", "image1.jpeg", "Custom molded rubber and plastic parts in several colors")]),
    dict(key="dip-molding", doc="Dip Molding.docx"),
    dict(key="rubber-compounding", doc="Rubber Compounding .docx",
         hero=("Rubber Compounding .docx", "image1.jpeg", "SYNC operator milling rubber compound on a two-roll mill"),
         gallery=[("Rubber Compounding .docx", "image2.jpeg", "Rubber mixing area with mills and compound ready for molding")]),
    dict(key="rubber-to-metal-bonding", doc=RTM,
         hero=(RTM, "image3.jpeg", "Rubber-to-metal bonded components with brass and steel inserts"),
         gallery=[(RTM, "image1.jpeg", "Rows of bonded rubber-to-metal mounts"),
                  (RTM, "image2.jpeg", "Bonded rubber-and-metal roller hub"),
                  (RTM, "image5.jpeg", "Black bonded rubber hub assembly")]),
    dict(key="custom-rubber-rollers", doc=RO,
         hero=(RO, "image1.jpeg", "Rubber-covered rollers and wheels with metal cores"),
         gallery=[(RO, "image2.jpeg", "Black rubber roller with a bearing core"),
                  (RO, "image3.jpeg", "Red rubber-covered roller on a steel shaft"),
                  (RO, "image4.jpeg", "Gray, black and red rubber rollers of different diameters"),
                  (RO, "image5.jpeg", "Yellow rubber-covered rollers"),
                  (RO, "image8.jpeg", "Red and black rubber roller wheels on shafts"),
                  (RO, "image9.jpeg", "Blue, black and orange rubber rollers, including a grooved roller")]),
    dict(key="refurbished-rubber-rollers", doc="Refurbishing Rubber Rollers.docx",
         hero=(RO, "image7.jpeg", "Red rubber-covered roller"),
         gallery=[("Refurbishing Rubber Rollers.docx", "image2.png",
                   "A worn roller before refurbishment and the same roller after recovering")]),
    dict(key="valve-and-flow-control", doc=V,
         inline={
             "Eccentric Plug Valve Components": (V, "image4.png", "Cutaway of an eccentric plug valve"),
             "Resilient-Seated Gate Valve Wedges": (V, "image2.png", "Cutaway of a resilient-seated gate valve"),
             "Rubber Flapper Check Valve Components": (V, "image3.png", "Cutaway of a rubber flapper check valve"),
             "Butterfly Valve Components": (V, "image1.jpeg", "Butterfly valve with a resilient rubber seat"),
         },
         crop=True),
]


# ------------------------------------------------------------------ reading

def run_text(r):
    return "".join((x.text or "") if x.tag == W + "t" else ("\t" if x.tag == W + "tab" else "") for x in r.iter())


def is_bold(r):
    rp = r.find(W + "rPr")
    b = rp.find(W + "b") if rp is not None else None
    return b is not None and b.get(W + "val") not in ("0", "false")


def first_size(p):
    for r in p.iter(W + "r"):
        if run_text(r).strip():
            rp = r.find(W + "rPr")
            s = rp.find(W + "sz") if rp is not None else None
            return s.get(W + "val") if s is not None else None


def read_blocks(path):
    """Paragraphs as typed blocks: h1, h2, h3, b (bold line), p, li."""
    root = ET.fromstring(zipfile.ZipFile(path).read("word/document.xml"))
    out = []
    for p in root.find(W + "body").iter(W + "p"):
        runs = [(run_text(r), is_bold(r)) for r in p.iter(W + "r")]
        text = re.sub(r"\s+", " ", "".join(t for t, _ in runs)).strip()
        if not text:
            continue
        all_bold = all(b for t, b in runs if t.strip())
        is_li = p.find(f"{W}pPr/{W}numPr") is not None
        if is_li or not all_bold:
            label = None
            if not all_bold and runs and runs[0][1]:
                lead = ""
                for t, b in runs:
                    if not b:
                        break
                    lead += t
                lead = re.sub(r"\s+", " ", lead).strip()
                if lead and text.startswith(lead) and len(lead) < len(text):
                    label = lead
            elif all_bold and is_li:
                m = re.match(r"^([^:]{2,80}:)\s*(.+)$", text)
                if m:
                    label = m.group(1)
            block = {"t": "li" if is_li else "p", "text": text[len(label):].strip() if label else text}
            if label:
                block["label"] = label.rstrip(":").strip()
            out.append(block)
        else:
            out.append({"t": {"48": "h1", "36": "h2", "27": "h3"}.get(first_size(p), "b"), "text": text})
    return out


def doc_images(path):
    z = zipfile.ZipFile(path)
    return {os.path.basename(n): z.read(n) for n in z.namelist() if n.startswith("word/media/")}


# ------------------------------------------------------------- structuring

def slugify(s):
    return re.sub(r"[^a-z0-9]+", "-", s.lower().replace("&", "and")).strip("-")


def norm(s):
    return re.sub(r"\s+", " ", s.lower().strip())


def page_link(title, self_href):
    href = PAGE_LINKS.get(norm(title))
    return href if href and href != self_href else None


def parse_buttons(text):
    out = []
    for label in [x.strip() for x in text.split("|")]:
        target = BUTTONS.get(norm(label))
        if target is None:
            raise SystemExit(f"Unknown button label {label!r}: add it to BUTTONS")
        out.append({"label": label, "href": target})
    return out


def explore_links(text, self_href):
    out = []
    for part in [x.strip() for x in text.split("|")]:
        name = re.sub(r"^(explore|learn more about)\s+", "", part, flags=re.I)
        href = PAGE_LINKS.get(norm(name))
        if href is None:
            raise SystemExit(f"Unknown link {part!r}: add it to PAGE_LINKS")
        if href != self_href:
            out.append({"label": part, "href": href})
    return out


def is_link_line(b):
    return re.match(r"^(explore|learn more about)\s", b["text"], re.I) is not None


def parse_body(items, self_href):
    """Blocks inside a section or sub-section (no h2s)."""
    blocks, i = [], 0
    while i < len(items):
        it = items[i]
        t = it["t"]
        if t == "p":
            blk = {"type": "p", "text": it["text"]}
            if it.get("label"):
                blk["label"] = it["label"]
            blocks.append(blk)
            i += 1
        elif t == "li":
            lst = []
            while i < len(items) and items[i]["t"] == "li":
                entry = {"text": items[i]["text"]}
                if items[i].get("label"):
                    entry["label"] = items[i]["label"]
                lst.append(entry)
                i += 1
            blocks.append({"type": "list", "items": lst})
        elif t == "b" and is_link_line(it):
            links = explore_links(it["text"], self_href)
            if links:
                blocks.append({"type": "links", "items": links})
            i += 1
        elif t == "b" and " | " in it["text"]:
            blocks.append({"type": "buttons", "items": parse_buttons(it["text"])})
            i += 1
        elif t == "b":
            nxt = items[i + 1]["t"] if i + 1 < len(items) else None
            if nxt != "p":  # a bold line with no paragraph under it is a tagline
                blocks.append({"type": "tagline", "text": it["text"]})
                i += 1
                continue
            cards = []
            while i < len(items) and items[i]["t"] == "b" and not is_link_line(items[i]) and " | " not in items[i]["text"]:
                if i + 1 >= len(items) or items[i + 1]["t"] != "p":
                    break
                title = items[i]["text"]
                body = [items[i + 1]["text"]]
                j = i + 2
                # Further paragraphs stay with this card only if another card follows them.
                k = j
                while k < len(items) and items[k]["t"] == "p":
                    k += 1
                if k < len(items) and items[k]["t"] == "b" and not is_link_line(items[k]) and " | " not in items[k]["text"]:
                    body += [x["text"] for x in items[j:k]]
                    j = k
                card = {"title": title, "body": body}
                href = page_link(title, self_href)
                if href:
                    card["href"] = href
                cards.append(card)
                i = j
            blocks.append({"type": "cards", "items": cards})
        else:
            raise SystemExit(f"Unexpected {t} block: {it['text'][:60]!r}")
    return blocks


def is_short(sub):
    kinds = [b["type"] for b in sub["blocks"]]
    paras = kinds.count("p")
    return 1 <= paras <= 2 and set(kinds) <= {"p", "links"} and kinds.count("links") <= 1


def parse_section(items, self_href, inline):
    """An h2's content: intro blocks, then h3 sub-sections."""
    first_h3 = next((n for n, it in enumerate(items) if it["t"] == "h3"), len(items))
    lead = None
    intro_items = items[:first_h3]
    if intro_items and intro_items[0]["t"] == "b" and not is_link_line(intro_items[0]) \
            and " | " not in intro_items[0]["text"] and (len(intro_items) < 2 or intro_items[1]["t"] == "p"):
        # a bold line straight under the heading, followed by text, is the section's lead
        nxt_is_card = len(intro_items) > 2 and intro_items[2]["t"] == "b"
        if not nxt_is_card:
            lead = intro_items[0]["text"]
            intro_items = intro_items[1:]
    blocks = parse_body(intro_items, self_href)

    subs, n = [], first_h3
    while n < len(items):
        heading = items[n]["text"]
        m = n + 1
        while m < len(items) and items[m]["t"] != "h3":
            m += 1
        sub = {"type": "sub", "heading": heading, "blocks": parse_body(items[n + 1:m], self_href)}
        href = page_link(heading, self_href)
        if href:
            sub["href"] = href
        if heading in inline:
            sub["image"] = inline[heading]
        subs.append(sub)
        n = m

    # Runs of two or more short sub-sections read better as a grid of cards.
    k = 0
    while k < len(subs):
        run = k
        while run < len(subs) and is_short(subs[run]) and "image" not in subs[run]:
            run += 1
        if run - k >= 2:
            items_ = []
            for s in subs[k:run]:
                card = {"title": s["heading"], "body": [b["text"] for b in s["blocks"] if b["type"] == "p"]}
                links = [b for b in s["blocks"] if b["type"] == "links"]
                if links:
                    card["links"] = links[0]["items"]
                if s.get("href"):
                    card["href"] = s["href"]
                items_.append(card)
            steps = all(re.match(r"^\d+\.\s", c["title"]) for c in items_)
            blocks.append({"type": "steps" if steps else "cards", "items": items_})
            k = run
        else:
            blocks.append(subs[k])
            k += 1
    return lead, blocks


def build(blocks, self_href, inline):
    if blocks[0]["t"] != "h1":
        raise SystemExit("Document must start with the 48pt title")
    page = {"title": blocks[0]["text"], "subtitle": None, "tagline": None, "intro": [], "cta": []}
    i = 1
    while i < len(blocks) and blocks[i]["t"] != "h2":
        b = blocks[i]
        if b["t"] == "h3" and page["subtitle"] is None and not page["intro"]:
            page["subtitle"] = b["text"]
        elif b["t"] == "b" and " | " in b["text"]:
            page["cta"] = parse_buttons(b["text"])
        elif b["t"] == "b" and page["tagline"] is None:
            page["tagline"] = b["text"]
        elif b["t"] == "p":
            page["intro"].append(b["text"])
        else:
            raise SystemExit(f"Unexpected block before first section: {b}")
        i += 1

    # The summary used on cards and in search results: the first intro
    # paragraph that says what SYNC does.
    page["summary"] = next((p for p in page["intro"] if re.match(r"^sync\b", p, re.I)), page["intro"][0])

    h2s = [n for n in range(i, len(blocks)) if blocks[n]["t"] == "h2"]
    bounds = list(zip(h2s, h2s[1:] + [len(blocks)]))
    sections, faq, closing = [], None, None
    for idx, (s, e) in enumerate(bounds):
        heading = blocks[s]["text"]
        body = blocks[s + 1:e]
        last = idx == len(bounds) - 1
        if norm(heading) == "frequently asked questions":
            qs, n = [], 0
            while n < len(body):
                if body[n]["t"] != "h3":
                    raise SystemExit(f"FAQ expects questions as sub-headings, got {body[n]}")
                m = n + 1
                answer = []
                while m < len(body) and body[m]["t"] != "h3":
                    answer.append(body[m]["text"])
                    m += 1
                qs.append({"q": body[n]["text"], "a": answer})
                n = m
            faq = {"id": "faq", "heading": heading, "items": qs}
        elif last and re.match(r"^(partner with|let.s|request a roller)", heading, re.I):
            closing = {"eyebrow": None, "title": heading, "body": [], "cta": [], "footnote": []}
            rest = list(body)
            if rest and rest[0]["t"] in ("h3", "b") and " | " not in rest[0]["text"]:
                closing["eyebrow"] = heading
                closing["title"] = rest.pop(0)["text"]
            for b in rest:
                if b["t"] == "b" and " | " in b["text"]:
                    closing["cta"] = parse_buttons(b["text"])
                elif b["t"] in ("p", "li"):
                    (closing["footnote"] if closing["cta"] else closing["body"]).append(b["text"])
                else:
                    raise SystemExit(f"Unexpected block in closing section: {b}")
        else:
            lead, sec_blocks = parse_section(body, self_href, inline)
            sec = {"id": slugify(heading), "heading": heading, "blocks": sec_blocks}
            if lead:
                sec["lead"] = lead
            sections.append(sec)
    page.update(sections=sections, faq=faq, closing=closing)
    return page


def all_text(blocks, self_href):
    out = []
    for b in blocks:
        if b.get("label"):
            out.append(f"{b['label']} {b['text']}")
        elif b["t"] == "b" and " | " in b["text"] or b["t"] == "b" and is_link_line(b):
            # button and link rows become one entry per button; a link to
            # the page itself is dropped on purpose
            for part in [x.strip() for x in b["text"].split("|")]:
                name = re.sub(r"^(explore|learn more about)\s+", "", part, flags=re.I)
                to_self = self_href and is_link_line({"text": part}) and PAGE_LINKS.get(norm(name)) == self_href
                if not to_self:
                    out.append(part)
        else:
            out.append(b["text"])
    return out


def json_text(page):
    """Every string in the page content, for the no-text-lost check."""
    out = []

    def walk(x):
        if isinstance(x, dict):
            if "label" in x and "text" in x:
                out.append(f"{x['label']} {x['text']}")
                return
            for k, v in x.items():
                if k in ("href", "type", "id", "image", "hero", "gallery", "summary", "source", "src", "alt", "width", "height"):
                    continue
                walk(v)
        elif isinstance(x, list):
            for v in x:
                walk(v)
        elif isinstance(x, str):
            out.append(x)
    walk(page)
    return out


# ------------------------------------------------------------------ images

def save_jpg(data, dest, crop=False, max_w=1600):
    im = Image.open(io.BytesIO(data)).convert("RGB")
    if crop:
        im = crop_card_photo(im)
    if im.width > max_w:
        im = im.resize((max_w, round(im.height * max_w / im.width)), Image.LANCZOS)
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    im.save(dest, quality=86, optimize=True, progressive=True)
    return im.size


def crop_card_photo(im):
    """Card-style images: keep the photo, drop the white caption panel."""
    px, w, h = im.load(), im.width, im.height

    def white(y):
        xs = range(int(w * 0.1), int(w * 0.9), 6)
        return sum(1 for x in xs if sum(px[x, y]) > 735) / len(xs)

    top = next(y for y in range(h) if white(y) < 0.5)
    bottom = next(y for y in range(int(h * 0.4), h) if white(y) > 0.97)
    left = next(x for x in range(w) if sum(px[x, (top + bottom) // 2]) < 735)
    right = next(x for x in range(w - 1, 0, -1) if sum(px[x, (top + bottom) // 2]) < 735)
    return im.crop((left + 4, top + 4, right - 4, bottom - 4))


# -------------------------------------------------------------------- main

def main(src):
    content_dir = os.path.join(REPO, "src", "content", "landing")
    os.makedirs(content_dir, exist_ok=True)
    cache = {}

    def image(doc, name):
        if doc not in cache:
            cache[doc] = doc_images(os.path.join(src, doc))
        return cache[doc][name]

    for cfg in PAGES:
        key = cfg["key"]
        self_href = next((h for h in PAGE_LINKS.values() if h.endswith("/" + key)), None)
        img_dir = os.path.join(REPO, "public", "images", "landing", key)
        inline = {}
        for heading, (doc, name, alt) in cfg.get("inline", {}).items():
            fn = f"{slugify(heading)}.jpg"
            w, h = save_jpg(image(doc, name), os.path.join(img_dir, fn), crop=cfg.get("crop", False), max_w=900)
            inline[heading] = {"src": f"/images/landing/{key}/{fn}", "alt": alt, "width": w, "height": h}

        blocks = read_blocks(os.path.join(src, cfg["doc"]))
        page = build(blocks, self_href, inline)
        page = {"source": cfg["doc"], **page, "hero": None, "gallery": []}
        if cfg.get("hero"):
            doc, name, alt = cfg["hero"]
            save_jpg(image(doc, name), os.path.join(img_dir, "hero.jpg"))
            page["hero"] = {"src": f"/images/landing/{key}/hero.jpg", "alt": alt}
        for n, (doc, name, alt) in enumerate(cfg.get("gallery", []), 1):
            fn = f"gallery-{n}.jpg"
            w, h = save_jpg(image(doc, name), os.path.join(img_dir, fn), max_w=1200)
            page["gallery"].append({"src": f"/images/landing/{key}/{fn}", "alt": alt, "width": w, "height": h})
        missing = [h for h in cfg.get("inline", {}) if h not in json.dumps(page, ensure_ascii=False)]
        if missing:
            raise SystemExit(f"{key}: inline image headings not found: {missing}")

        # No text lost, none invented: every paragraph of the document appears
        # exactly once in the page content (the summary repeats an intro line).
        source = all_text(blocks, self_href)
        produced = json_text({k: v for k, v in page.items() if k != "summary"})
        if sorted(source) != sorted(produced):
            lost = [t for t in source if t not in produced]
            extra = [t for t in produced if t not in source]
            raise SystemExit(f"{key}: text mismatch\n lost: {lost[:5]}\n extra: {extra[:5]}")

        with open(os.path.join(content_dir, f"{key}.json"), "w") as f:
            json.dump(page, f, indent=2, ensure_ascii=False)
            f.write("\n")
        print(f"{key:34s} {len(page['sections'])} sections, "
              f"{len(page['faq']['items']) if page['faq'] else 0} FAQs, "
              f"{len(page['gallery'])} gallery, hero={'yes' if page['hero'] else 'no'}")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise SystemExit(__doc__)
    main(sys.argv[1])

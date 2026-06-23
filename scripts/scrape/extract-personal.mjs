#!/usr/bin/env node
// Personal (staff) extractor — pulls each teacher / staff member out of
// the cached HTML for /didactic, /didactic-auxiliar, /nedidactic, and the
// /conducerea-scolii family. Writes one JSON per person to
// scripts/scrape/content/personal/<slug>.json, with photo URL preserved
// so download-images.mjs can pull it on the next run.

import * as cheerio from "cheerio";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const RAW = join(__dirname, "raw");
const OUT = join(__dirname, "content", "personal");
mkdirSync(OUT, { recursive: true });

/**
 * Source pages and the default category assigned to everyone listed on each.
 * The DIRECTOR entry inside /didactic gets bumped to "conducere" via a
 * special case below.
 */
const SOURCES = [
  { file: "%2Fdidactic.html", category: "didactic" },
  { file: "%2Fdidactic-auxiliar.html", category: "didactic-auxiliar" },
  { file: "%2Fnedidactic.html", category: "nedidactic" },
  { file: "%2Fconducerea-scolii.html", category: "conducere" },
  { file: "%2Fdirector.html", category: "conducere" },
  { file: "%2Fconsiliul-de-administratie.html", category: "conducere" },
  { file: "%2Fconsiliul-profesoral.html", category: "conducere" },
];

/** Strip Zyro's CDN transform suffix so we keep the original asset URL. */
function originalUrl(url) {
  return url.replace(/\/cdn-cgi\/image\/[^/]+\//, "/");
}

/**
 * Convert a person's display name to a URL-safe slug.
 * "Pr. Prof. Alin – Marian Pleşa" → "pr-prof-alin-marian-plesa"
 */
function slugify(name) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")  // strip diacritics for the slug only
    .replace(/[șş]/g, "s")
    .replace(/[țţ]/g, "t")
    .replace(/[ăâ]/g, "a")
    .replace(/î/g, "i")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * A heading that starts with one of these professional-title tokens reads
 * as a person's name rather than a role/subject label. Romanian seminary
 * staff prefixes seen in the source:
 *   Pr. / Preot / Presv.   — clergy
 *   Prof. / Dr. / Conf. / Lect. / Asist.  — academic
 *   Ing. / Ec.             — secretary, accountant (didactic-auxiliar)
 */
const NAME_RX =
  /^(pr\.?|p\.|presv\.|preot|prof\.?|dr\.?|conf\.?|lect\.?|asist\.?|ing\.?|ec\.?)\s/i;

function isName(text) {
  return NAME_RX.test(text);
}

/**
 * Page-header headings repeat across every Zyro page; they shouldn't end
 * up in the per-person extraction.
 */
const PAGE_HEADER_BLOCKLIST = [
  /de peste 30 de ani/i,
  /dac[aă]-?ți/i,
  /^personalul/i,
  /^conducerea\b/i,
  // NOTE: "DIRECTOR" is intentionally NOT blocked — when it appears as a
  // role-heading inside a person's section.block, the special-case below
  // bumps that person's category from "didactic" to "conducere".
];

function isPageChrome(text) {
  return PAGE_HEADER_BLOCKLIST.some((rx) => rx.test(text));
}

/** Pull the first real Zyrosite photo from a block. */
function findPhoto($, block) {
  const seen = new Set();
  for (const el of $(block).find("img").toArray()) {
    const raw = $(el).attr("src") || $(el).attr("data-src");
    if (!raw || !/zyrosite\.com/.test(raw)) continue;
    if (/\.(svg|gif)(\?|$)/i.test(raw)) continue;
    const url = originalUrl(raw);
    if (seen.has(url)) continue;
    seen.add(url);
    // First non-trivial image wins.
    return {
      src: url,
      alt: $(el).attr("alt") || "",
    };
  }
  return null;
}

const records = [];
const seenSlugs = new Set();

for (const source of SOURCES) {
  const path = join(RAW, source.file);
  if (!existsSync(path)) {
    console.warn(`! missing raw file: ${source.file}`);
    continue;
  }
  const $ = cheerio.load(readFileSync(path, "utf8"));
  const blocks = $("section.block");

  blocks.each((_, el) => {
    const $block = $(el);
    const headings = $block
      .find("h3, h2")
      .toArray()
      .map((h) => $(h).text().replace(/\s+/g, " ").trim())
      .filter((t) => t.length > 2 && t.length < 120 && !isPageChrome(t));

    // We expect at least: [role/subject, name] — sometimes [name only] for
    // pages where the role is implicit (e.g. /director).
    const nameHeading = headings.find(isName);
    if (!nameHeading) return;
    const roleHeading = headings.find((h) => h !== nameHeading && !isName(h));

    const slug = slugify(nameHeading);
    if (!slug || seenSlugs.has(slug)) return;
    seenSlugs.add(slug);

    const photo = findPhoto($, el);

    // The "DIRECTOR" role on /didactic should land on "conducere", not "didactic".
    const category =
      roleHeading && /^director$/i.test(roleHeading)
        ? "conducere"
        : source.category;

    records.push({
      slug,
      name: nameHeading,
      role: roleHeading ?? null,
      category,
      photo,
      sourcePage: "/" + source.file.replace(/^%2F/, "").replace(/\.html$/, ""),
    });
  });
}

// Emit one JSON file per person.
for (const r of records) {
  writeFileSync(join(OUT, `${r.slug}.json`), JSON.stringify(r, null, 2));
}

console.log(
  `Extracted ${records.length} staff records → scripts/scrape/content/personal/`,
);
console.log("Breakdown by category:");
const counts = records.reduce((m, r) => ((m[r.category] = (m[r.category] ?? 0) + 1), m), {});
for (const [c, n] of Object.entries(counts)) {
  console.log(`  ${c.padEnd(20)} ${n}`);
}

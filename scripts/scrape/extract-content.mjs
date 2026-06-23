#!/usr/bin/env node
// Content extractor for seminarortodoxtargoviste.ro
// Step 2 of docs/ARCHITECTURE.md §5. Reads scripts/scrape/inventory.json,
// fetches each page, and writes a CMS-neutral JSON describing the content.
//
// Per-anchor pages (activitati-*, admitere, avizier, …) emit ONE record per
// anchor slug into content/activities/<slug>.json (or content/<section>/<slug>.json).
// Other pages emit a single record at content/pages/<path>.json.
//
// The schema is intentionally generic — both Sanity and Payload can ingest it.

import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as cheerio from "cheerio";
import TurndownService from "turndown";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = "https://seminarortodoxtargoviste.ro";
const OUT = join(__dirname, "content");
const RAW = join(__dirname, "raw");
mkdirSync(OUT, { recursive: true });
mkdirSync(RAW, { recursive: true });

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) " +
  "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137 Safari/537.36";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const turndown = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  bulletListMarker: "-",
});
// Strip Zyro's wrapper divs so the markdown stays clean.
turndown.remove(["script", "style", "noscript"]);

const inventory = JSON.parse(
  readFileSync(join(__dirname, "inventory.json"), "utf8"),
);

/**
 * Anchor-soup pages — each anchor inside one of these gets its own record.
 * Keys are the path; values are the section the records belong to.
 */
const ANCHORED_PAGES = {
  "/activitati-2022-2023": { section: "activities", schoolYear: "2022-2023" },
  "/activitati-2023-2024": { section: "activities", schoolYear: "2023-2024" },
  "/activitati-2024-2025": { section: "activities", schoolYear: "2024-2025" },
  "/activitati-2025-2026": { section: "activities", schoolYear: "2025-2026" },
  "/admitere": { section: "admission" },
  "/avizier": { section: "announcements" },
  "/anunturi": { section: "announcements" },
  "/erasmusmobilitati": { section: "erasmus" },
  "/erasmusrezultate": { section: "erasmus" },
  "/erasmusvizibilitate": { section: "erasmus" },
  "/erasmusdiseminare": { section: "erasmus" },
  "/erasmusexperiente": { section: "erasmus" },
  "/erasmusfollow": { section: "erasmus" },
  "/erasmusinstrumente": { section: "erasmus" },
};

/**
 * Real article slugs are the ones referenced from elsewhere on the site
 * (captured during inventory). Zyro-internal IDs like "z0WHCB" or "zhrp8x"
 * never appear in inventory.anchorsReferenced, so this is a clean filter.
 */
function isContentSlugFor(path, id) {
  if (!id) return false;
  const entry = inventory.pages.find((p) => p.path === path);
  return Boolean(entry?.anchorsReferenced?.includes(id));
}

async function fetchHtml(url) {
  const cached = join(RAW, encodeURIComponent(url.replace(ROOT, "")) + ".html");
  try {
    return readFileSync(cached, "utf8");
  } catch {}
  const res = await fetch(url, {
    headers: { "user-agent": UA, accept: "text/html,*/*" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const html = await res.text();
  writeFileSync(cached, html);
  return html;
}

/** Pick image URLs from the live zyrosite CDN, ignore tiny icons and SVG-as-img. */
function extractImages($, root) {
  const out = [];
  $(root)
    .find("img")
    .each((_, el) => {
      const src = $(el).attr("src") || $(el).attr("data-src");
      if (!src) return;
      if (src.startsWith("data:")) return;
      if (!/zyrosite\.com/.test(src)) return;
      if (/\.(svg|gif)(\?|$)/i.test(src)) return;
      // Skip Zyro UI sprites — they tend to live under /shared/ or /icon
      if (/\/(shared|icon|spinner)/i.test(src)) return;
      out.push({
        src,
        alt: $(el).attr("alt") || "",
        width: Number($(el).attr("width")) || null,
        height: Number($(el).attr("height")) || null,
      });
    });
  // dedupe
  const seen = new Set();
  return out.filter((i) => {
    const k = i.src.split("?")[0];
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

/**
 * Pull a heading + paragraphs of text from a Zyro block.
 * @param {string} [fallbackTitle] Used when no heading or significant text is found inside the block (Zyro sometimes renders the title outside the section element).
 */
function extractTextBlock($, root, fallbackTitle) {
  // Clone, then drop chrome so the markdown stays clean
  const clone = $(root).clone();
  clone.find("script,style,noscript,iframe,header,footer,nav").remove();

  // Title: first h1-h6, else first short paragraph, else fallback
  let title = clone.find("h1, h2, h3, h4").first().text().trim();
  if (!title) {
    const firstP = clone
      .find("p")
      .toArray()
      .map((el) => $(el).text().trim())
      .find((t) => t.length > 4 && t.length < 200);
    if (firstP) title = firstP;
  }
  if (!title && fallbackTitle) title = fallbackTitle;

  const html = clone.html() ?? "";
  const markdown = turndown.turndown(html).trim();

  // Try to fish out a date — Zyro often renders dd luna yyyy in a small span
  const dateMatch = markdown.match(
    /\b(\d{1,2})\s+(ianuarie|februarie|martie|aprilie|mai|iunie|iulie|august|septembrie|octombrie|noiembrie|decembrie)\s+(\d{4})\b/i,
  );
  const date = dateMatch ? dateMatch[0] : null;

  return { title, markdown, date };
}

/** Pretty title from a kebab-case slug — used as last-resort fallback. */
function slugToTitle(slug) {
  return slug
    .split("-")
    .map((w) => (w.length > 0 ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

function writeJson(path, data) {
  const full = join(OUT, path);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, JSON.stringify(data, null, 2));
}

const stats = {
  pagesProcessed: 0,
  articlesExtracted: 0,
  pagesExtracted: 0,
  imagesReferenced: 0,
  skipped: [],
};

async function processPage(page) {
  if (page.path.startsWith("/_astro")) return;
  if (page.path === "/") return; // homepage rendered separately

  let html;
  try {
    html = await fetchHtml(page.url);
  } catch (e) {
    stats.skipped.push({ path: page.path, reason: e.message });
    return;
  }
  const $ = cheerio.load(html);

  stats.pagesProcessed++;

  if (page.path in ANCHORED_PAGES) {
    const meta = ANCHORED_PAGES[page.path];
    // Find every block-background container with a content-slug id
    const blocks = $('[id]').filter((_, el) => isContentSlugFor(page.path, $(el).attr("id")));
    blocks.each((_, el) => {
      const slug = $(el).attr("id");
      const { title, markdown, date } = extractTextBlock(
        $,
        el,
        slugToTitle(slug),
      );
      const images = extractImages($, el);
      if (markdown.length < 30) return; // probably a sidebar/empty block

      stats.articlesExtracted++;
      stats.imagesReferenced += images.length;

      const record = {
        type: "activity",
        section: meta.section,
        slug,
        title,
        date,
        schoolYear: meta.schoolYear ?? null,
        source: {
          page: page.path,
          anchor: slug,
        },
        body: { markdown },
        images,
      };
      writeJson(`${meta.section}/${slug}.json`, record);
    });
  } else {
    // standard page → one record. Target Zyro's page__blocks (the actual
    // content container), stripping nav/header/footer entirely.
    const pageSlug = page.path.replace(/^\//, "").replace(/\//g, "_") || "index";
    const body = $(".page__blocks, main").first();
    const root = body.length ? body : $("body");
    root.find("header, footer, nav").remove();
    // Use the SEO title from inventory (cleaner than picking the school's H1 logo)
    const seoTitle = (page.title || "").replace(/&quot;/g, '"').split("|")[0].trim();
    const { markdown } = extractTextBlock($, root, seoTitle);
    const images = extractImages($, root);

    stats.pagesExtracted++;
    stats.imagesReferenced += images.length;

    writeJson(`pages/${pageSlug}.json`, {
      type: "page",
      slug: pageSlug,
      path: page.path,
      title: seoTitle || pageSlug,
      seo: {
        title: page.title || null,
        description: page.description || null,
        ogImage: page.ogImage || null,
      },
      body: { markdown },
      images,
    });
  }

  await sleep(150);
}

for (const page of inventory.pages) {
  await processPage(page);
}

writeJson("_stats.json", {
  generatedAt: new Date(parseInt(process.env.NOW_TS ?? "0") || Date.now()).toISOString(),
  inventoryPageCount: inventory.pageCount,
  ...stats,
});

console.log(
  `\n✓ ${stats.pagesProcessed} pages processed → ` +
    `${stats.articlesExtracted} activity records, ` +
    `${stats.pagesExtracted} standalone pages, ` +
    `${stats.imagesReferenced} images referenced` +
    (stats.skipped.length ? `, ${stats.skipped.length} skipped` : ""),
);

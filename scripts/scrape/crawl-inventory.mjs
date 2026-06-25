#!/usr/bin/env node
// Inventory crawler for seminarortodoxtargoviste.ro
// Step 1 of docs/ARCHITECTURE.md §5 — produces inventory.json with one entry
// per unique page (URL, title, description, anchor sections found inside).
//
// Polite: small concurrency, ~150ms delay between fetches, real UA.

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = "https://seminarortodoxtargoviste.ro";
const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "raw");
mkdirSync(OUT_DIR, { recursive: true });

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) " +
  "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137 Safari/537.36";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** @param {string} url */
async function fetchHtml(url) {
  const res = await fetch(url, {
    headers: { "user-agent": UA, accept: "text/html,*/*" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

/** Extract every internal href; normalise to absolute URLs without trailing slashes. */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function extractLinks(html, _base) {
  const links = new Set();
  for (const m of html.matchAll(/href="([^"]+)"/g)) {
    let h = m[1];
    if (!h || h.startsWith("javascript:") || h.startsWith("mailto:") || h.startsWith("tel:")) continue;
    if (h.startsWith("//")) h = "https:" + h;
    if (h.startsWith("/")) h = ROOT + h;
    if (!h.startsWith(ROOT)) continue;
    // strip query strings; keep anchors for now
    h = h.split("?")[0];
    if (h === ROOT || h === ROOT + "/") h = ROOT + "/";
    links.add(h);
  }
  return [...links];
}

function pageKey(url) {
  return url.split("#")[0];
}

function tag(html, tagName) {
  const m = html.match(new RegExp(`<${tagName}[^>]*>([^<]+)</${tagName}>`, "i"));
  return m ? m[1].trim() : null;
}

function metaContent(html, name) {
  const m = html.match(
    new RegExp(`<meta[^>]*(?:name|property)="${name}"[^>]*content="([^"]+)"`, "i"),
  );
  return m ? m[1].trim() : null;
}

/** Anchors found on a page (the Zyro-style #slug list that the architecture flags as the chief structural problem). */
function extractAnchorSlugs(html) {
  const slugs = new Set();
  for (const m of html.matchAll(/\sid="([a-z0-9-]+)"/gi)) slugs.add(m[1]);
  return [...slugs];
}

const visited = new Map(); // pageKey -> entry
const anchors = new Map(); // pageKey -> Set of anchor slugs referenced from elsewhere
const queue = [ROOT + "/"];

async function crawl() {
  while (queue.length) {
    const url = queue.shift();
    const key = pageKey(url);
    if (visited.has(key)) continue;

    let html;
    try {
      html = await fetchHtml(key);
    } catch (e) {
      console.warn("skip", key, e.message);
      visited.set(key, { url: key, error: e.message });
      continue;
    }

    const title = tag(html, "title");
    const description = metaContent(html, "description");
    const ogImage = metaContent(html, "og:image");
    const anchorsOnPage = extractAnchorSlugs(html);

    const entry = {
      url: key,
      path: key.replace(ROOT, "") || "/",
      title,
      description,
      ogImage,
      anchorCount: anchorsOnPage.length,
      anchorsReferenced: [...(anchors.get(key) ?? new Set())].sort(),
    };
    visited.set(key, entry);
    console.log(`✓ ${entry.path} — ${title?.slice(0, 70) ?? ""}`);

    // queue new internal links
    for (const link of extractLinks(html, key)) {
      const linkKey = pageKey(link);
      const hash = link.includes("#") ? link.split("#")[1] : null;
      if (hash) {
        if (!anchors.has(linkKey)) anchors.set(linkKey, new Set());
        anchors.get(linkKey).add(hash);
      }
      if (!visited.has(linkKey) && !queue.includes(linkKey)) queue.push(linkKey);
    }

    await sleep(150);
  }

  // backfill: now that we've collected all referenced anchors, attach them
  for (const [key, set] of anchors) {
    const e = visited.get(key);
    if (e) e.anchorsReferenced = [...set].sort();
  }
}

await crawl();

const pages = [...visited.values()]
  .filter((p) => !p.error)
  .sort((a, b) => a.path.localeCompare(b.path));

writeFileSync(
  join(__dirname, "inventory.json"),
  JSON.stringify(
    {
      crawledAt: new Date(parseInt(process.env.NOW_TS ?? "0") || Date.now()).toISOString(),
      root: ROOT,
      pageCount: pages.length,
      pages,
    },
    null,
    2,
  ),
);

console.log(`\nWrote inventory.json — ${pages.length} pages.`);

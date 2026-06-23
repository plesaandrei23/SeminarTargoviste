#!/usr/bin/env node
// Image downloader — Phase 3 of docs/ARCHITECTURE.md §5.
// Reads every JSON in scripts/scrape/content/, dedupes image URLs across all
// records, and downloads each to scripts/scrape/images/<filename>.
//
// Critical: this protects against the Hostinger Website Builder subscription
// being canceled mid-migration. The current images live on assets.zyrosite.com
// which goes dark when the sub ends.

import { readdirSync, statSync, readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join, basename } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = join(__dirname, "content");
const OUT_DIR = join(__dirname, "images");
mkdirSync(OUT_DIR, { recursive: true });

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) " +
  "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137 Safari/537.36";
const CONCURRENCY = 6;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Recursively list every JSON file under a directory. */
function listJson(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...listJson(full));
    else if (entry.endsWith(".json") && entry !== "_stats.json") out.push(full);
  }
  return out;
}

/** Strip Zyrosite's cdn-cgi/image transform prefix → original asset URL. */
function originalUrl(url) {
  // e.g. https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=800/d95.../foo.jpg
  // → https://assets.zyrosite.com/d95.../foo.jpg
  return url.replace(/\/cdn-cgi\/image\/[^/]+\//, "/");
}

/** Filename for the local copy — keeps Zyro's hash-suffixed name. */
function localFilename(url) {
  const u = new URL(originalUrl(url));
  return basename(u.pathname);
}

// Build a set of all referenced image URLs (deduped, normalized to originals)
const urls = new Map(); // localFilename → { src, alt, used_in: [slug...] }
for (const file of listJson(CONTENT_DIR)) {
  const data = JSON.parse(readFileSync(file, "utf8"));
  const slug = data.slug || basename(file, ".json");
  // Activity / page records keep their images in an `images` array.
  // Personal records (one photo per person) keep theirs in `photo`.
  const candidates = [
    ...(Array.isArray(data.images) ? data.images : []),
    ...(data.photo ? [data.photo] : []),
  ];
  for (const img of candidates) {
    if (!img?.src) continue;
    const src = originalUrl(img.src);
    const name = localFilename(src);
    if (!urls.has(name))
      urls.set(name, { src, alt: img.alt || "", used_in: [] });
    urls.get(name).used_in.push(slug);
  }
}

console.log(`Found ${urls.size} unique images across ${listJson(CONTENT_DIR).length} records.\n`);

const results = { downloaded: [], skipped: [], failed: [] };

async function download(name, info) {
  const out = join(OUT_DIR, name);
  if (existsSync(out)) {
    results.skipped.push(name);
    return;
  }
  try {
    const res = await fetch(info.src, { headers: { "user-agent": UA } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    writeFileSync(out, buf);
    results.downloaded.push(name);
    process.stdout.write(`✓ ${name} (${(buf.length / 1024).toFixed(0)}KB)\n`);
  } catch (e) {
    results.failed.push({ name, src: info.src, error: e.message });
    process.stdout.write(`✗ ${name} — ${e.message}\n`);
  }
}

// Concurrent pool
const entries = [...urls.entries()];
let cursor = 0;
async function worker() {
  while (cursor < entries.length) {
    const i = cursor++;
    const [name, info] = entries[i];
    await download(name, info);
    await sleep(80); // be polite
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));

// Write a manifest so the CMS import knows which slug used each image.
writeFileSync(
  join(OUT_DIR, "_manifest.json"),
  JSON.stringify(
    {
      generatedAt: new Date(parseInt(process.env.NOW_TS ?? "0") || Date.now()).toISOString(),
      totalUnique: urls.size,
      ...results,
      images: Object.fromEntries(urls),
    },
    null,
    2,
  ),
);

console.log(
  `\n${results.downloaded.length} downloaded, ${results.skipped.length} already cached, ${results.failed.length} failed.`,
);

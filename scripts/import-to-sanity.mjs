#!/usr/bin/env node
// Sanity import script — Phase 3 of docs/ARCHITECTURE.md §5.
//
// Reads:   scripts/scrape/content/**/*.json + scripts/scrape/images/*
// Writes:  Sanity documents (idempotent — re-runnable)
//
// Required env: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN
//
// Run:  pnpm tsx ./scripts/import-to-sanity.mjs       # all sections
//       pnpm tsx ./scripts/import-to-sanity.mjs --only=activities

import { createClient } from "@sanity/client";
import { marked } from "marked";
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { dirname, join, basename } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCRAPE_ROOT = join(__dirname, "scrape");
const CONTENT_DIR = join(SCRAPE_ROOT, "content");
const IMAGES_DIR = join(SCRAPE_ROOT, "images");

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => a.split("=")),
);
const onlySection = args["--only"];

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN.");
  console.error("Copy .env.example → .env.local and fill the values.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-06-23",
  token,
  useCdn: false,
});

// ─────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────

function listJson(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...listJson(full));
    else if (entry.endsWith(".json") && !entry.startsWith("_")) out.push(full);
  }
  return out;
}

function deterministicKey(input) {
  // tiny pseudo-random; Portable Text just needs unique keys per array
  let h = 0;
  for (let i = 0; i < input.length; i++) h = (h * 31 + input.charCodeAt(i)) | 0;
  return Math.abs(h).toString(36).padStart(8, "0");
}

/**
 * Markdown → Portable Text. Uses marked's lexer to enumerate top-level tokens
 * and maps each to a Portable Text block. Inline formatting (bold/italic/link)
 * lives on the span via `marks`.
 */
function markdownToPortableText(md, imageMap) {
  if (!md) return [];
  const tokens = marked.lexer(md);
  const blocks = [];
  let blockIdx = 0;

  const nextKey = (label) =>
    deterministicKey(`${label}-${blockIdx++}-${md.length}`);

  function flattenInline(inlineTokens) {
    const spans = [];
    const walk = (toks, marks) => {
      for (const t of toks ?? []) {
        if (t.type === "text" || t.type === "escape") {
          spans.push({
            _type: "span",
            _key: nextKey("span"),
            text: t.text,
            marks,
          });
        } else if (t.type === "strong") {
          walk(t.tokens, [...marks, "strong"]);
        } else if (t.type === "em") {
          walk(t.tokens, [...marks, "em"]);
        } else if (t.type === "codespan") {
          spans.push({
            _type: "span",
            _key: nextKey("span"),
            text: t.text,
            marks: [...marks, "code"],
          });
        } else if (t.type === "link") {
          // For now: render link as plain text + custom mark. A full
          // implementation would register a markDef + reference it here.
          walk(t.tokens, marks);
        } else if (t.type === "image") {
          // inline images get hoisted to their own block above; skip here
        } else if (t.tokens) {
          walk(t.tokens, marks);
        } else if (t.text) {
          spans.push({
            _type: "span",
            _key: nextKey("span"),
            text: t.text,
            marks,
          });
        }
      }
    };
    walk(inlineTokens, []);
    return spans;
  }

  for (const t of tokens) {
    if (t.type === "heading") {
      blocks.push({
        _type: "block",
        _key: nextKey("h"),
        style: t.depth === 1 ? "h2" : `h${Math.min(t.depth + 1, 4)}`,
        children: flattenInline(t.tokens),
        markDefs: [],
      });
    } else if (t.type === "paragraph") {
      // detect markdown images in the paragraph → emit them as image blocks
      const imageTokens = (t.tokens ?? []).filter((x) => x.type === "image");
      if (imageTokens.length > 0) {
        for (const img of imageTokens) {
          const assetId = imageMap.get(img.href);
          if (assetId) {
            blocks.push({
              _type: "localizedImage",
              _key: nextKey("img"),
              asset: { _type: "reference", _ref: assetId },
              alt: img.text || img.title || "Imagine",
            });
          }
        }
        // also emit any surrounding text
        const nonImage = (t.tokens ?? []).filter((x) => x.type !== "image");
        if (nonImage.some((x) => (x.text ?? "").trim())) {
          blocks.push({
            _type: "block",
            _key: nextKey("p"),
            style: "normal",
            children: flattenInline(nonImage),
            markDefs: [],
          });
        }
        continue;
      }
      blocks.push({
        _type: "block",
        _key: nextKey("p"),
        style: "normal",
        children: flattenInline(t.tokens),
        markDefs: [],
      });
    } else if (t.type === "list") {
      for (const item of t.items) {
        blocks.push({
          _type: "block",
          _key: nextKey("li"),
          style: "normal",
          listItem: t.ordered ? "number" : "bullet",
          level: 1,
          children: flattenInline(item.tokens),
          markDefs: [],
        });
      }
    } else if (t.type === "blockquote") {
      blocks.push({
        _type: "block",
        _key: nextKey("bq"),
        style: "blockquote",
        children: flattenInline(t.tokens ?? []),
        markDefs: [],
      });
    } else if (t.type === "code") {
      blocks.push({
        _type: "block",
        _key: nextKey("code"),
        style: "normal",
        children: [
          {
            _type: "span",
            _key: nextKey("span"),
            text: t.text,
            marks: ["code"],
          },
        ],
        markDefs: [],
      });
    }
  }

  return blocks;
}

/** Upload an image to Sanity (or return cached asset id from manifest). */
const uploadCache = new Map();
async function uploadImage(url) {
  if (uploadCache.has(url)) return uploadCache.get(url);
  // Strip Zyro CDN transform so we look up the original
  const original = url.replace(/\/cdn-cgi\/image\/[^/]+\//, "/");
  const filename = basename(new URL(original).pathname);
  const localPath = join(IMAGES_DIR, filename);
  if (!existsSync(localPath)) {
    console.warn(`  ! missing local image: ${filename}`);
    return null;
  }
  const buffer = readFileSync(localPath);
  const asset = await client.assets.upload("image", buffer, { filename });
  uploadCache.set(url, asset._id);
  return asset._id;
}

/** Convert a slug to a stable Sanity document _id. */
const docId = (type, slug) => `${type}.${slug}`.replace(/[^a-z0-9_.-]/gi, "-");

// ─────────────────────────────────────────────────────────────────
// Section importers
// ─────────────────────────────────────────────────────────────────

function parseRoDate(str) {
  if (!str) return null;
  const months = {
    ianuarie: 0, februarie: 1, martie: 2, aprilie: 3, mai: 4, iunie: 5,
    iulie: 6, august: 7, septembrie: 8, octombrie: 9, noiembrie: 10, decembrie: 11,
  };
  const m = str.toLowerCase().match(/(\d{1,2})\s+([a-zăîâșț]+)\s+(\d{4})/);
  if (!m) return null;
  const month = months[m[2]];
  if (month === undefined) return null;
  const d = new Date(Date.UTC(+m[3], month, +m[1]));
  return isNaN(d.getTime()) ? null : d.toISOString().slice(0, 10);
}

async function importActivity(record) {
  const imageMap = new Map();
  for (const img of record.images ?? []) {
    const id = await uploadImage(img.src);
    if (id) imageMap.set(img.src, id);
  }
  const body = markdownToPortableText(record.body?.markdown, imageMap);
  const coverImage =
    record.images?.[0] && imageMap.get(record.images[0].src)
      ? {
          _type: "localizedImage",
          asset: { _type: "reference", _ref: imageMap.get(record.images[0].src) },
          alt: record.images[0].alt || record.title || "Imagine activitate",
        }
      : undefined;

  const doc = {
    _id: docId("activitate", record.slug),
    _type: "activitate",
    title: record.title,
    slug: { _type: "slug", current: record.slug },
    date: parseRoDate(record.date) || "2026-01-01",
    schoolYear: record.schoolYear ?? null,
    coverImage,
    body,
    gallery: (record.images ?? [])
      .slice(1)
      .map((img) => imageMap.get(img.src))
      .filter(Boolean)
      .map((ref, i) => ({
        _type: "localizedImage",
        _key: deterministicKey(`gallery-${i}-${record.slug}`),
        asset: { _type: "reference", _ref: ref },
        alt: record.title,
      })),
    legacySource: record.source,
  };
  await client.createOrReplace(doc);
  console.log(`✓ activitate · ${record.slug}`);
}

async function importPage(record) {
  const imageMap = new Map();
  for (const img of record.images ?? []) {
    const id = await uploadImage(img.src);
    if (id) imageMap.set(img.src, id);
  }
  const body = markdownToPortableText(record.body?.markdown, imageMap);
  const doc = {
    _id: docId("pagina", record.slug),
    _type: "pagina",
    title: record.title,
    slug: { _type: "slug", current: record.slug },
    body,
    seo: {
      _type: "seo",
      title: record.seo?.title?.replace(/&quot;/g, '"')?.split("|")[0]?.trim(),
      description: record.seo?.description,
    },
  };
  await client.createOrReplace(doc);
  console.log(`✓ pagina · ${record.slug}`);
}

async function importErasmus(record) {
  const imageMap = new Map();
  for (const img of record.images ?? []) {
    const id = await uploadImage(img.src);
    if (id) imageMap.set(img.src, id);
  }
  const body = markdownToPortableText(record.body?.markdown, imageMap);
  const doc = {
    _id: docId("erasmus", record.slug),
    _type: "erasmus",
    title: record.title,
    slug: { _type: "slug", current: record.slug },
    date: parseRoDate(record.date),
    body,
    gallery: (record.images ?? [])
      .map((img) => imageMap.get(img.src))
      .filter(Boolean)
      .map((ref, i) => ({
        _type: "localizedImage",
        _key: deterministicKey(`gallery-${i}-${record.slug}`),
        asset: { _type: "reference", _ref: ref },
        alt: record.title,
      })),
  };
  await client.createOrReplace(doc);
  console.log(`✓ erasmus · ${record.slug}`);
}

async function importAdmission(record) {
  const imageMap = new Map();
  for (const img of record.images ?? []) {
    const id = await uploadImage(img.src);
    if (id) imageMap.set(img.src, id);
  }
  const body = markdownToPortableText(record.body?.markdown, imageMap);
  const doc = {
    _id: docId("admitere", record.slug),
    _type: "admitere",
    year: record.title?.match(/\d{4}\s*-\s*\d{4}/)?.[0]?.replace(/\s/g, "") ?? "2026-2027",
    specialization: "Teologie Pastorală",
    body,
  };
  await client.createOrReplace(doc);
  console.log(`✓ admitere · ${record.slug}`);
}

// ─────────────────────────────────────────────────────────────────
// Run
// ─────────────────────────────────────────────────────────────────

const handlers = {
  activities: importActivity,
  pages: importPage,
  erasmus: importErasmus,
  admission: importAdmission,
};

const sections = onlySection ? [onlySection] : Object.keys(handlers);

for (const section of sections) {
  const dir = join(CONTENT_DIR, section);
  if (!existsSync(dir)) continue;
  console.log(`\n▸ ${section}`);
  for (const file of listJson(dir)) {
    const record = JSON.parse(readFileSync(file, "utf8"));
    try {
      await handlers[section](record);
    } catch (e) {
      console.error(`  ✗ ${record.slug ?? file} — ${e.message}`);
    }
  }
}

console.log("\nDone.");

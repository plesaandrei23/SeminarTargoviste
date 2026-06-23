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
import { imageSize } from "image-size";
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

/**
 * Read the dimensions of an already-downloaded image. Returns null if the
 * file is missing or unreadable (e.g. a CSS pseudo-image).
 */
function localImageDims(src) {
  const original = src.replace(/\/cdn-cgi\/image\/[^/]+\//, "/");
  const filename = basename(new URL(original).pathname);
  const localPath = join(IMAGES_DIR, filename);
  if (!existsSync(localPath)) return null;
  try {
    const { width, height } = imageSize(readFileSync(localPath));
    return { width, height };
  } catch {
    return null;
  }
}

/**
 * Skip Zyro UI chrome dressed up as images:
 *   - thin decorative banners (the cross-border strip is 684×59)
 *   - sub-200px icons
 *   - extreme aspect ratios (panoramic banners, vertical stripes)
 * Keep anything that reads as a real photograph.
 */
function isContentImage(dims) {
  if (!dims) return false;
  const { width, height } = dims;
  if (width < 400 || height < 240) return false;
  const aspect = width / height;
  if (aspect < 0.4 || aspect > 3.0) return false;
  return true;
}

/**
 * Infer a category from the article's Romanian title. Most fall cleanly
 * into one of the schema's enum values; whatever doesn't lands on "alta"
 * and a human can pick the right one in Studio.
 */
function inferCategory(title) {
  const t = (title ?? "").toLowerCase();
  if (/erasmus|mobilit[aă]ț?|antalya/.test(t)) return "erasmus";
  if (/olimpiad|premii|rezultat[e]? remarcabile|excep[tț]ie|performan[tț]a?\s*[șs]i\s*pasiune|performan[tț]/.test(t))
    return "performanta";
  if (/concert|coralia|martisor|talent|spectacol|teatru|scen[aă]|versur|gand|poem/.test(t))
    return "cultural";
  if (/festivitat|deschidere|ceremonie|absolv/.test(t)) return "eveniment";
  if (/concurs|competi[tț]i|comunic[aă]ri|provocarea/.test(t)) return "concurs";
  if (/sf[iî]nt|duhovnic|preot|liturg|biseric|hristos|spiritual|maica/.test(t))
    return "spiritualitate";
  if (/lect[uú]r|cart|biblio|invat|invat[aă]|educa[tț]i|cer[ck]ul|s[aă]pt[aă]m[aâ]na|verde|risip|maniere|siguran[tț]/.test(t))
    return "educatie";
  return "alta";
}

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
  // Score images by dimensions so the cover is a real photo, not the Zyro
  // template's decorative cross-border strip (684×59 px, sneaks in as
  // images[0] because it appears at the top of each article's markdown).
  const sourceImages = record.images ?? [];
  const annotated = sourceImages.map((img) => ({
    ...img,
    dims: localImageDims(img.src),
  }));
  const contentImages = annotated.filter((img) => isContentImage(img.dims));
  // Cover = first content image; everything else goes to gallery.
  // If the article has zero real photos we leave cover undefined and let
  // the listing fall back to its gradient placeholder.
  const cover = contentImages[0];
  const rest = contentImages.slice(1);

  // Upload only the images we'll actually use — saves Sanity asset slots.
  const imageMap = new Map();
  for (const img of contentImages) {
    const id = await uploadImage(img.src);
    if (id) imageMap.set(img.src, id);
  }
  const body = markdownToPortableText(record.body?.markdown, imageMap);

  const coverImage =
    cover && imageMap.get(cover.src)
      ? {
          _type: "localizedImage",
          asset: { _type: "reference", _ref: imageMap.get(cover.src) },
          alt: cover.alt || record.title || "Imagine activitate",
        }
      : undefined;

  const doc = {
    _id: docId("activitate", record.slug),
    _type: "activitate",
    title: record.title,
    slug: { _type: "slug", current: record.slug },
    date: parseRoDate(record.date) || "2026-01-01",
    schoolYear: record.schoolYear ?? null,
    category: inferCategory(record.title),
    coverImage,
    body,
    gallery: rest
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
  console.log(
    `✓ activitate · ${record.slug} · ${doc.category} · ${contentImages.length}/${sourceImages.length} images`,
  );
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

/**
 * Map the raw role-heading from the scraped staff page to the personal
 * schema's two distinct fields: `role` (job title) and `subject`
 * (discipline / department). The seminary's source page conflates them
 * — DIRECTOR / Spiritual / Secretar / Contabil are real job titles,
 * everything else ("Limba Latină", "Vechiul şi Noul Testament", etc.)
 * is the subject the person teaches.
 */
function classifyPersonal(rawRole, category) {
  if (!rawRole) {
    if (category === "didactic-auxiliar") return { role: "Personal auxiliar", subject: null };
    if (category === "nedidactic") return { role: "Personal nedidactic", subject: null };
    return { role: "Profesor", subject: null };
  }
  const t = rawRole.trim();
  if (/^director$/i.test(t)) return { role: "Director", subject: null };
  if (/^spiritual$/i.test(t) || /duhovnic/i.test(t))
    return { role: "Duhovnic", subject: null };
  if (/^secretar/i.test(t)) return { role: "Secretar", subject: null };
  if (/^contabil/i.test(t)) return { role: "Contabil", subject: null };
  if (/^bibliotecar/i.test(t)) return { role: "Bibliotecar", subject: null };
  if (/^consilier/i.test(t)) return { role: "Consilier școlar", subject: null };
  // Everything else reads as a teaching subject.
  return { role: "Profesor", subject: t };
}

async function importPersonal(record, index) {
  if (!record.photo?.src) {
    console.warn(`  ! ${record.slug} has no photo, skipping`);
    return;
  }
  const photoId = await uploadImage(record.photo.src);
  const { role, subject } = classifyPersonal(record.role, record.category);

  const doc = {
    _id: docId("personal", record.slug),
    _type: "personal",
    name: record.name,
    role,
    category: record.category,
    subject,
    photo: photoId
      ? {
          _type: "localizedImage",
          asset: { _type: "reference", _ref: photoId },
          alt: record.photo.alt || `Portret ${record.name}`,
        }
      : undefined,
    order: index,
  };
  await client.createOrReplace(doc);
  console.log(
    `✓ personal · ${record.slug.padEnd(40)} · ${role}${subject ? " · " + subject : ""}`,
  );
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
  personal: importPersonal,
};

const sections = onlySection ? [onlySection] : Object.keys(handlers);

for (const section of sections) {
  const dir = join(CONTENT_DIR, section);
  if (!existsSync(dir)) continue;
  console.log(`\n▸ ${section}`);
  // Personal needs the array index passed in (used as the order field
  // so the original source-page ordering shows up in Studio + lists).
  const files = listJson(dir);
  for (let i = 0; i < files.length; i++) {
    const record = JSON.parse(readFileSync(files[i], "utf8"));
    try {
      await handlers[section](record, i);
    } catch (e) {
      console.error(`  ✗ ${record.slug ?? files[i]} — ${e.message}`);
    }
  }
}

console.log("\nDone.");

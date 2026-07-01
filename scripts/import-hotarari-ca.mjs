#!/usr/bin/env node
// Import the 101 scraped C.A. hotărâri into Sanity as hotarareCA documents.
//
// Reads:   scripts/scrape/content/consiliul-de-administratie-hotarari.json
// Writes:  Sanity hotarareCA documents (idempotent via `createIfNotExists`)
//
// Run:  node --env-file=.env.local scripts/import-hotarari-ca.mjs
//       node --env-file=.env.local scripts/import-hotarari-ca.mjs --execute
//
// Each document's _id is deterministic (`hotarareCA.<year>-<nr>`) so the
// script can be re-run any time — no duplicates. `summary` is left empty
// for the school's secretariat to fill in via Sanity Studio.

import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SOURCE = join(
  __dirname,
  "scrape/content/consiliul-de-administratie-hotarari.json",
);

const execute = process.argv.includes("--execute");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-06-25",
  token,
  useCdn: false,
});

const raw = JSON.parse(readFileSync(SOURCE, "utf8"));
const documents = raw.documents || [];

console.log(`\n${execute ? "🔥 EXECUTING" : "🔍 DRY RUN"} on dataset "${dataset}"`);
console.log(`Source: ${documents.length} scraped hotărâri\n`);

let created = 0;
let skipped = 0;

for (const doc of documents) {
  if (doc.nr == null || !doc.date || !doc.year) {
    console.log(`  ⚠️  Skipping malformed: ${doc.label}`);
    continue;
  }
  const _id = `hotarareCA.${doc.year}-${String(doc.nr).padStart(2, "0")}`;

  if (execute) {
    // createIfNotExists means re-runs never overwrite editor changes to
    // `summary` or a manual pdf upload — only fills in missing records.
    const result = await client.createIfNotExists({
      _id,
      _type: "hotarareCA",
      nr: doc.nr,
      date: doc.date,
      year: doc.year,
      originalUrl: doc.url,
    });
    if (result._createdAt === result._updatedAt) {
      created++;
      console.log(`  + ${_id}  ·  ${doc.date}`);
    } else {
      skipped++;
    }
  } else {
    // Check if it already exists so the dry-run tally is accurate.
    const existing = await client.fetch(`*[_id == $id][0]{ _id }`, { id: _id });
    if (existing) {
      skipped++;
    } else {
      created++;
      console.log(`  + ${_id}  ·  ${doc.date}`);
    }
  }
}

console.log(
  `\n${execute ? "✓" : "Would"} create ${created} new document(s), skip ${skipped} existing.\n`,
);
if (!execute) console.log(`Re-run with --execute to apply.\n`);

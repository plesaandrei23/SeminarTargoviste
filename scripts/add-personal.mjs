#!/usr/bin/env node
// Add a personnel record to Sanity. Fill in the RECORDS array below with
// as many entries as you want to create in one run.
//
// Run:  node --env-file=.env.local scripts/add-personal.mjs
//       node --env-file=.env.local scripts/add-personal.mjs --execute
//
// The dry run prints what would be created so you can verify before writing.

import { createClient } from "@sanity/client";

/**
 * Records to create. `slug` is derived from `name` (kebab, no diacritics)
 * so the doc id stays deterministic — re-running the script won't duplicate
 * existing records.
 */
const RECORDS = [
  {
    name: "Prof. Dr. Florinel Ciprian Cazan",
    role: "Profesor",
    category: "didactic",
    subject: "Muzică bisericească · dirijor Corul „Sf. Voievod Neagoe Basarab”",
    order: 50,
  },
];

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

// Match the import script's slug format so we don't drift.
function slugify(input) {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

console.log(`\n${execute ? "🔥 EXECUTING" : "🔍 DRY RUN"} on dataset "${dataset}"\n`);

for (const record of RECORDS) {
  const slug = slugify(record.name);
  const _id = `personal.${slug}`;

  // Skip if already exists so re-runs are safe.
  const existing = await client.fetch(`*[_id == $id][0]{ _id, name }`, { id: _id });
  if (existing) {
    console.log(`  – ${record.name}  →  already exists (${_id}), skipping`);
    continue;
  }

  console.log(`  • ${record.name}  →  ${_id}`);
  console.log(
    `      role: ${record.role}  ·  category: ${record.category}  ·  subject: ${record.subject ?? "—"}`,
  );

  if (execute) {
    await client.createIfNotExists({
      _id,
      _type: "personal",
      name: record.name,
      role: record.role,
      category: record.category,
      subject: record.subject,
      order: record.order ?? 100,
    });
  }
}

console.log(
  `\n${execute ? "✓ Done." : "Re-run with --execute to actually create."}\n`,
);

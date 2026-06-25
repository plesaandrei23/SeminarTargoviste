#!/usr/bin/env node
// One-off deletion: remove three obsolete personnel records.
//
// Run:   node --env-file=.env.local scripts/delete-personal.mjs
//        node --env-file=.env.local scripts/delete-personal.mjs --execute
//
// Without --execute it's a dry run. The record matcher uses the scraped
// slugs (stable across imports), with a name fallback for safety.

import { createClient } from "@sanity/client";

const TARGETS = [
  { slug: "pr-prof-constantin-radulescu", nameContains: "Rădulescu" },
  { slug: "pr-prof-marian-badea", nameContains: "Badea" },
  { slug: "ing-delia-elena-chiriac", nameContains: "Chiriac" },
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

console.log(`\n${execute ? "🔥 EXECUTING" : "🔍 DRY RUN"} on dataset "${dataset}"\n`);

let totalDeleted = 0;
for (const target of TARGETS) {
  // Match both the slug and the name fallback so we don't miss records
  // that imported with a slightly different slug.
  const docs = await client.fetch(
    `*[_type == "personal" && (slug.current == $slug || name match $name)]{
       _id, name, role, "slug": slug.current
     }`,
    { slug: target.slug, name: `*${target.nameContains}*` },
  );

  if (docs.length === 0) {
    console.log(`  ⚠️  ${target.slug} — no match found`);
    continue;
  }

  for (const doc of docs) {
    console.log(`  • ${doc.name} (${doc.role}) · ${doc._id}`);
    if (execute) {
      // Delete both draft and published if a draft exists.
      const ids = doc._id.startsWith("drafts.")
        ? [doc._id]
        : [doc._id, `drafts.${doc._id}`];
      for (const id of ids) {
        await client.delete(id).catch(() => {
          /* draft may not exist, ignore */
        });
      }
      totalDeleted++;
    }
  }
}

if (execute) {
  console.log(`\n✓ Deleted ${totalDeleted} record(s).\n`);
} else {
  console.log(`\nRe-run with --execute to actually delete.\n`);
}

#!/usr/bin/env node
// Content cleanup — every activitate imported from the legacy Zyro site
// ends up with a stray block whose only content is the word "Back" (the
// old "back to top" link from the Zyro article template got captured as
// article body text).
//
// Run:   node --env-file=.env.local scripts/strip-legacy-back-blocks.mjs
//        node --env-file=.env.local scripts/strip-legacy-back-blocks.mjs --execute

import { createClient } from "@sanity/client";

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

/**
 * Returns true if this Portable Text block is a plain-text block whose
 * entire content is the word "Back" (case-insensitive, whitespace ignored).
 * That's the Zyro import artifact — nothing else legitimately looks like it.
 */
function isStrayBackBlock(block) {
  if (!block || block._type !== "block") return false;
  if (!Array.isArray(block.children)) return false;
  const text = block.children.map((c) => c.text ?? "").join("").trim();
  return text.toLowerCase() === "back";
}

console.log(`\n${execute ? "🔥 EXECUTING" : "🔍 DRY RUN"} on dataset "${dataset}"\n`);

const activities = await client.fetch(
  `*[_type == "activitate" && defined(body)]{ _id, title, body }`,
);

let touched = 0;
let removedBlocks = 0;

for (const a of activities) {
  const filtered = a.body.filter((b) => !isStrayBackBlock(b));
  const dropped = a.body.length - filtered.length;
  if (dropped === 0) continue;

  touched++;
  removedBlocks += dropped;
  console.log(`  • ${a._id.padEnd(60)} · ${dropped} block(s)`);

  if (execute) {
    // Also patch the draft if one exists — otherwise the stray block reappears
    // when the editor next hits "Publish" on an unrelated field change.
    const ids = [a._id, `drafts.${a._id}`];
    for (const id of ids) {
      await client
        .patch(id)
        .set({ body: filtered })
        .commit({ visibility: "async" })
        .catch(() => {
          /* draft may not exist */
        });
    }
  }
}

console.log(
  `\n${execute ? "✓ Cleaned" : "Would clean"} ${removedBlocks} block(s) across ${touched} activit${touched === 1 ? "y" : "ies"}.\n`,
);
if (!execute) console.log(`Re-run with --execute to actually apply.\n`);

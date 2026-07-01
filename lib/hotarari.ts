/**
 * Client-side helpers for the C.A. archive UI. The `HotarareCA` type
 * comes from Sanity — see sanity/lib/types.ts. Formatting + grouping
 * lives here so both the server component (page.tsx) and the client
 * component (HotarariArchive.tsx) share one source of truth.
 */

import type { HotarareCA } from "@/sanity/lib/types";

/** Group by year — used by the listing UI for tabs / sections. */
export function groupByYear(list: HotarareCA[]): Map<number, HotarareCA[]> {
  const map = new Map<number, HotarareCA[]>();
  for (const h of list) {
    const y = h.year ?? 0;
    if (!map.has(y)) map.set(y, []);
    map.get(y)!.push(h);
  }
  return map;
}

const ROMANIAN_MONTHS = [
  "ian.",
  "feb.",
  "mar.",
  "apr.",
  "mai",
  "iun.",
  "iul.",
  "aug.",
  "sept.",
  "oct.",
  "nov.",
  "dec.",
];

/** Format an ISO date string as e.g. "9 oct. 2025". */
export function formatHotarareDate(iso: string | null | undefined): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${d} ${ROMANIAN_MONTHS[m - 1] ?? ""} ${y}`;
}

/** Pick whichever URL is set: freshly-uploaded Sanity file wins over the archive link. */
export function resolveHotarareUrl(h: HotarareCA): string | null {
  return h.pdfUrl ?? h.originalUrl ?? null;
}

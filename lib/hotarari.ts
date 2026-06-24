import hotarariJson from "@/scripts/scrape/content/consiliul-de-administratie-hotarari.json";

/**
 * Snapshot of the Consiliul de Administrație decisions, scraped from the
 * legacy seminarortodoxtargoviste.ro on 2026-06-24. Numbering, dates and
 * the original PDF URLs are preserved. Brief summaries are intentionally
 * NOT shipped yet — the seminary team will add them through the CMS
 * once we wire a `hotarareCA` schema in a follow-up.
 *
 * URLs still point at assets.zyrosite.com (the Hostinger CDN). They
 * survive until the legacy subscription is cancelled — Phase 3 in
 * plan.md re-hosts them into Sanity.
 */

export type Hotarare = {
  /** Hotărâre number, scoped to its school year. */
  nr: number | null;
  /** ISO date — YYYY-MM-DD. Always set since we re-parsed every label. */
  date: string | null;
  /** Original label (e.g. "Hotărârea nr. 27/9.10.2025"). */
  label: string;
  /** Direct PDF URL — still on assets.zyrosite.com for now. */
  url: string;
  /** Calendar year for fast year-tab grouping. */
  year: number | null;
};

type RawDoc = {
  nr: number | null;
  date: string | null;
  label: string;
  url: string;
  year: number | null;
};

const data = hotarariJson as { source: string; count: number; documents: RawDoc[] };

export const HOTARARI: Hotarare[] = data.documents;

/** Years present in the dataset, newest first. */
export const HOTARARI_YEARS: number[] = Array.from(
  new Set(HOTARARI.map((h) => h.year).filter((y): y is number => y !== null)),
).sort((a, b) => b - a);

/** Group by year — used by the listing UI for tabs / sections. */
export function groupByYear(
  list: Hotarare[],
): Map<number, Hotarare[]> {
  const map = new Map<number, Hotarare[]>();
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
export function formatHotarareDate(iso: string | null): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${d} ${ROMANIAN_MONTHS[m - 1] ?? ""} ${y}`;
}

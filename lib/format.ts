/** "2026-06-12" → "12 iunie 2026" (RO locale). */
export function formatRoDate(iso: string | undefined | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("ro-RO", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}

export const CATEGORY_LABELS: Record<string, string> = {
  eveniment: "Eveniment",
  cultural: "Cultural",
  erasmus: "Erasmus+",
  performanta: "Performanță",
  educatie: "Educație",
  spiritualitate: "Spiritualitate",
  concurs: "Concurs",
  alta: "Activitate",
};

export function categoryLabel(cat: string | undefined | null): string {
  if (!cat) return "Activitate";
  return CATEGORY_LABELS[cat] ?? "Activitate";
}

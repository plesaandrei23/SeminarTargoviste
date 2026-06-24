"use client";

import { useMemo, useState } from "react";
import { Download, FileText, Search, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  HOTARARI,
  HOTARARI_YEARS,
  formatHotarareDate,
  groupByYear,
  type Hotarare,
} from "@/lib/hotarari";

const ALL_YEARS_KEY = "__all";

export function HotarariArchive() {
  const [year, setYear] = useState<number | typeof ALL_YEARS_KEY>(HOTARARI_YEARS[0] ?? ALL_YEARS_KEY);
  const [q, setQ] = useState("");

  const totalsByYear = useMemo(() => {
    const map = new Map<number, number>();
    for (const h of HOTARARI) {
      if (h.year == null) continue;
      map.set(h.year, (map.get(h.year) ?? 0) + 1);
    }
    return map;
  }, []);

  const filtered = useMemo(() => {
    const trimmed = q.trim().toLowerCase();
    return HOTARARI.filter((h) => {
      if (year !== ALL_YEARS_KEY && h.year !== year) return false;
      if (!trimmed) return true;
      const haystack = [
        h.label,
        h.nr != null ? `nr ${h.nr}` : "",
        h.date ? formatHotarareDate(h.date).toLowerCase() : "",
        h.date ?? "",
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(trimmed);
    });
  }, [year, q]);

  const groups = useMemo(() => groupByYear(filtered), [filtered]);
  const groupedYears = [...groups.keys()].sort((a, b) => b - a);

  return (
    <section className="wrap mt-12">
      {/* Year tabs */}
      <div className="flex flex-wrap gap-2">
        <YearChip
          label="Toate"
          active={year === ALL_YEARS_KEY}
          onClick={() => setYear(ALL_YEARS_KEY)}
          count={HOTARARI.length}
        />
        {HOTARARI_YEARS.map((y) => (
          <YearChip
            key={y}
            label={String(y)}
            active={year === y}
            onClick={() => setYear(y)}
            count={totalsByYear.get(y) ?? 0}
          />
        ))}
      </div>

      {/* Search */}
      <div className="mt-6 relative max-w-md">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted"
          strokeWidth={1.75}
        />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Caută după număr sau dată — ex. 22 sau 09.2025"
          className="w-full rounded-full border border-navy/10 bg-paper py-3 pl-11 pr-10 text-sm text-ink shadow-sm transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
        />
        {q && (
          <button
            type="button"
            onClick={() => setQ("")}
            aria-label="Șterge căutarea"
            className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex size-7 items-center justify-center rounded-full text-muted transition-colors hover:bg-navy/5 hover:text-navy"
          >
            <X className="size-4" strokeWidth={1.75} />
          </button>
        )}
      </div>

      <p className="mt-4 text-sm text-muted">
        {filtered.length === 0
          ? "Nicio hotărâre nu corespunde filtrului."
          : `${filtered.length} ${filtered.length === 1 ? "hotărâre găsită" : "hotărâri găsite"}`}
      </p>

      {/* Grouped list */}
      <div className="mt-10 space-y-12">
        {groupedYears.map((y) => {
          const items = groups.get(y) ?? [];
          return (
            <section key={y}>
              <div className="flex items-end justify-between gap-4 border-b border-navy/10 pb-4">
                <h2 className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-tight text-navy">
                  {y || "Nedatate"}
                </h2>
                <p className="text-xs uppercase tracking-[0.14em] text-gold-deep">
                  {items.length} {items.length === 1 ? "hotărâre" : "hotărâri"}
                </p>
              </div>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {items.map((h) => (
                  <HotarareCard key={h.url} h={h} />
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </section>
  );
}

function YearChip({
  label,
  active,
  onClick,
  count,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  count: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all",
        active
          ? "border-navy bg-navy text-white shadow-sm"
          : "border-navy/10 bg-paper text-navy hover:border-gold",
      )}
    >
      {label}
      <Badge
        variant="secondary"
        className={cn(
          "ml-0.5 h-5 min-w-5 px-1.5 text-[0.65rem] font-semibold",
          active
            ? "bg-gold text-navy-deep hover:bg-gold-light"
            : "bg-navy/8 text-navy",
        )}
      >
        {count}
      </Badge>
    </button>
  );
}

function HotarareCard({ h }: { h: Hotarare }) {
  return (
    <li>
      <a
        href={h.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block focus:outline-none focus-visible:rounded-2xl focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
      >
        <Card className="h-full border-navy/10 bg-paper transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-gold group-hover:shadow-[var(--shadow-elevated)]">
          <CardContent className="flex items-start gap-4 p-5">
            <span
              aria-hidden="true"
              className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold-deep transition-colors group-hover:bg-gold group-hover:text-navy-deep"
            >
              <FileText className="size-5" strokeWidth={1.75} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs uppercase tracking-[0.14em] text-gold-deep">
                {h.date ? formatHotarareDate(h.date) : "Fără dată"}
              </p>
              <p className="mt-1 font-serif text-base font-semibold leading-tight text-navy text-balance">
                {h.nr != null ? `Hotărârea nr. ${h.nr}` : h.label}
              </p>
              <p className="mt-2 text-xs text-muted">
                Consiliul de Administrație · PDF
              </p>
            </div>
            <span
              aria-hidden="true"
              className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-navy/15 text-navy/70 transition-all group-hover:border-gold group-hover:bg-gold group-hover:text-navy-deep"
            >
              <Download className="size-4 transition-transform group-hover:translate-y-0.5" strokeWidth={2} />
            </span>
          </CardContent>
        </Card>
      </a>
    </li>
  );
}

"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";
import type { Personal } from "@/sanity/lib/types";

/**
 * The full teaching staff with a discipline filter on top. Renders a portrait
 * card per professor — wide enough to read the subject + name without
 * cramping, square photo with a gold inner ring.
 */
export function ProfessorGrid({ people }: { people: Personal[] }) {
  const didactic = useMemo(
    () => people.filter((p) => p.category === "didactic"),
    [people],
  );

  // Build subject groupings, alphabetical. "Toate" is the default view.
  const subjects = useMemo(() => {
    const set = new Set<string>();
    for (const p of didactic) if (p.subject) set.add(p.subject);
    return [...set].sort((a, b) => a.localeCompare(b, "ro"));
  }, [didactic]);

  const [active, setActive] = useState<string>("__all");
  const visible = useMemo(
    () =>
      active === "__all"
        ? didactic
        : didactic.filter((p) => p.subject === active),
    [active, didactic],
  );

  if (didactic.length === 0) return null;

  return (
    <section className="wrap mt-24">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal as="p" className="eyebrow">
          Corp didactic
        </Reveal>
        <Reveal as="h2" delay={1} className="mt-3 text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight">
          Cine predă la seminar
        </Reveal>
        <Reveal as="p" delay={2} className="mt-4 text-pretty text-muted">
          Filtrează după disciplină pentru a găsi cadrul didactic care
          predă materia care te interesează.
        </Reveal>
      </div>

      <Reveal delay={2} className="mt-10 flex flex-wrap justify-center gap-2">
        <FilterChip
          label="Toate disciplinele"
          active={active === "__all"}
          onClick={() => setActive("__all")}
          count={didactic.length}
        />
        {subjects.map((s) => {
          const count = didactic.filter((p) => p.subject === s).length;
          return (
            <FilterChip
              key={s}
              label={s}
              active={active === s}
              onClick={() => setActive(s)}
              count={count}
            />
          );
        })}
      </Reveal>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {visible.map((p, i) => (
          <ProfessorCard
            key={p._id}
            person={p}
            delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
          />
        ))}
      </div>
    </section>
  );
}

function FilterChip({
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
          : "border-navy/10 bg-white text-navy hover:border-gold",
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

function ProfessorCard({
  person,
  delay,
}: {
  person: Personal;
  delay: 1 | 2 | 3 | 4;
}) {
  const initials = person.name
    .split(" ")
    .filter((s) => /^[A-ZȘȚĂÎÂ]/.test(s))
    .slice(0, 2)
    .map((s) => s[0])
    .join("");

  return (
    <Reveal delay={delay}>
      <Card className="group h-full overflow-hidden border-navy/10 bg-paper transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]">
        <div className="relative aspect-square overflow-hidden border-b border-navy/10 bg-gradient-to-br from-navy via-navy-soft to-gold-deep">
          {person.photo?.asset ? (
            <Image
              src={person.photo.asset.url}
              alt={person.photo.alt || person.name}
              fill
              sizes="(min-width: 1024px) 280px, (min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            />
          ) : (
            <span className="absolute inset-0 flex items-center justify-center font-serif text-5xl font-semibold text-gold-light">
              {initials}
            </span>
          )}
        </div>
        <CardContent className="p-5">
          {person.subject && (
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-gold-deep">
              {person.subject}
            </p>
          )}
          <p className="mt-1 font-serif text-base font-semibold leading-tight text-navy text-balance">
            {person.name}
          </p>
          <p className="mt-2 text-xs text-muted">{person.role}</p>
        </CardContent>
      </Card>
    </Reveal>
  );
}

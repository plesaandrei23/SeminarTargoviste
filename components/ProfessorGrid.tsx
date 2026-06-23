"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";
import type { Personal } from "@/sanity/lib/types";

/**
 * Full teaching staff with a discipline filter on top + a click-to-open
 * detail dialog per professor. Portrait cards use `object-top` so the
 * head always stays above the fold — legacy portraits frame from the
 * chest up and a centered square crop slices through the eyes.
 */
export function ProfessorGrid({ people }: { people: Personal[] }) {
  /*
   * Grid covers everyone who teaches OR runs the school — director +
   * duhovnici + teachers. Auxiliary / nedidactic still get their own
   * strip lower down, since they're a different kind of role and don't
   * map onto a subject filter.
   */
  const teaching = useMemo(
    () =>
      people.filter(
        (p) => p.category === "didactic" || p.category === "conducere",
      ),
    [people],
  );

  const subjects = useMemo(() => {
    const set = new Set<string>();
    for (const p of teaching) if (p.subject) set.add(p.subject);
    return [...set].sort((a, b) => a.localeCompare(b, "ro"));
  }, [teaching]);

  const [active, setActive] = useState<string>("__all");
  const visible = useMemo(
    () =>
      active === "__all"
        ? teaching
        : teaching.filter((p) => p.subject === active),
    [active, teaching],
  );

  if (teaching.length === 0) return null;

  return (
    <section className="wrap mt-24">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal as="p" className="eyebrow">
          Corp didactic
        </Reveal>
        <Reveal
          as="h2"
          delay={1}
          className="mt-3 text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight"
        >
          Cine predă la seminar
        </Reveal>
        <Reveal as="p" delay={2} className="mt-4 text-pretty text-muted">
          Filtrează după disciplină pentru a găsi cadrul didactic care
          predă materia care te interesează. Apasă pe un profesor pentru
          mai multe detalii.
        </Reveal>
      </div>

      <Reveal delay={2} className="mt-10 flex flex-wrap justify-center gap-2">
        <FilterChip
          label="Toate disciplinele"
          active={active === "__all"}
          onClick={() => setActive("__all")}
          count={teaching.length}
        />
        {subjects.map((s) => {
          const count = teaching.filter((p) => p.subject === s).length;
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

/**
 * Click-to-open card. The whole tile is a button (DialogTrigger asChild)
 * so the entire surface is clickable, not just a label.
 */
export function ProfessorCard({
  person,
  delay,
}: {
  person: Personal;
  delay?: 1 | 2 | 3 | 4;
}) {
  const initials = person.name
    .split(" ")
    .filter((s) => /^[A-ZȘȚĂÎÂ]/.test(s))
    .slice(0, 2)
    .map((s) => s[0])
    .join("");

  return (
    <Reveal delay={delay}>
      <Dialog>
        <DialogTrigger asChild>
          <button
            type="button"
            className="group block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:rounded-2xl"
            aria-label={`Detalii despre ${person.name}`}
          >
            <Card className="h-full overflow-hidden border-navy/10 bg-paper transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[var(--shadow-elevated)]">
              <div className="relative aspect-[4/5] overflow-hidden border-b border-navy/10 bg-gradient-to-br from-navy via-navy-soft to-gold-deep">
                {person.photo?.asset ? (
                  <Image
                    src={person.photo.asset.url}
                    alt={person.photo.alt || person.name}
                    fill
                    sizes="(min-width: 1024px) 280px, (min-width: 640px) 33vw, 50vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
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
          </button>
        </DialogTrigger>

        <ProfessorDialog person={person} />
      </Dialog>
    </Reveal>
  );
}

/** Detail panel — large portrait + grouped facts. Read-only for now;
 *  a future PR can add a bio field rendered via @portabletext/react. */
export function ProfessorDialog({ person }: { person: Personal }) {
  return (
    <DialogContent className="overflow-hidden bg-paper p-0 sm:max-w-2xl">
      <div className="grid sm:grid-cols-[1fr_1.1fr]">
        <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-navy via-navy-soft to-gold-deep sm:aspect-auto">
          {person.photo?.asset ? (
            <Image
              src={person.photo.asset.url}
              alt={person.photo.alt || person.name}
              fill
              sizes="(min-width: 640px) 320px, 100vw"
              className="object-cover object-top"
            />
          ) : null}
        </div>
        <div className="flex flex-col gap-5 p-7 sm:p-8">
          <DialogHeader className="space-y-2 text-left">
            <Badge variant="outline" className="w-fit border-gold/40 text-gold-deep">
              {categoryLabel(person.category)}
            </Badge>
            <DialogTitle className="font-serif text-2xl font-semibold leading-tight text-navy text-balance">
              {person.name}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Detalii despre {person.name}
            </DialogDescription>
          </DialogHeader>
          <dl className="space-y-3 text-sm">
            <Fact label="Funcție" value={person.role} />
            {person.subject && <Fact label="Disciplină" value={person.subject} />}
          </dl>
          <div className="mt-auto rounded-xl border border-navy/10 bg-parchment p-4 text-sm text-muted text-pretty">
            Biografie detaliată în pregătire. Vrei să iei legătura cu{" "}
            {person.name.split(" ").slice(-1)[0]}? Contactează secretariatul
            seminarului.
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[5rem_1fr] gap-3">
      <dt className="text-xs uppercase tracking-[0.14em] text-gold-deep">
        {label}
      </dt>
      <dd className="font-medium text-navy">{value}</dd>
    </div>
  );
}

function categoryLabel(c: Personal["category"]) {
  switch (c) {
    case "conducere":
      return "Conducere";
    case "didactic":
      return "Corp didactic";
    case "didactic-auxiliar":
      return "Personal auxiliar";
    case "nedidactic":
      return "Personal nedidactic";
  }
}

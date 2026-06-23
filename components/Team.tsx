"use client";

import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

type Category =
  | "Toți"
  | "Conducere"
  | "Teologie"
  | "Limbi"
  | "Real"
  | "Uman";

type Professor = {
  initials: string;
  name: string;
  role: string;
  subject: string;
  category: Exclude<Category, "Toți">;
};

const PROFESSORS: Professor[] = [
  { initials: "N", name: "Pr. Prof. Director", role: "Conducere", subject: "Teologie Dogmatică", category: "Conducere" },
  { initials: "SN", name: "Pr. Prof. Ștefan N.", role: "Duhovnic", subject: "Religie · Spiritualitate", category: "Teologie" },
  { initials: "LP", name: "Prof. Liana P.", role: "Catedra de Limbi", subject: "Limba și literatura română", category: "Limbi" },
  { initials: "FG", name: "Prof. Florentin G.", role: "Catedra de Limbi", subject: "Limba și literatura română", category: "Limbi" },
  { initials: "AM", name: "Prof. de Matematică", role: "Catedra Real", subject: "Matematică · Informatică", category: "Real" },
  { initials: "EN", name: "Prof. de Engleză", role: "Catedra de Limbi", subject: "Limba engleză", category: "Limbi" },
  { initials: "IS", name: "Prof. de Istorie", role: "Catedra Uman", subject: "Istorie · Socio-umane", category: "Uman" },
  { initials: "MZ", name: "Prof. de Muzică", role: "Catedra Artă", subject: "Muzică bisericească", category: "Teologie" },
];

const CATEGORIES: Category[] = [
  "Toți",
  "Conducere",
  "Teologie",
  "Limbi",
  "Real",
  "Uman",
];

export function Team() {
  const [active, setActive] = useState<Category>("Toți");
  const visible =
    active === "Toți"
      ? PROFESSORS
      : PROFESSORS.filter((p) => p.category === active);

  return (
    <section id="team" className="bg-paper py-[clamp(4rem,9vw,8rem)]">
      <div className="wrap">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <Reveal as="p" className="eyebrow">
            Corpul profesoral
          </Reveal>
          <Reveal as="h2" delay={1} className="mt-2 text-[clamp(2rem,4.4vw,3.3rem)]">
            Dascăli dedicați, modele de urmat
          </Reveal>
          <Reveal as="p" delay={2} className="mt-3 text-muted">
            Preoți profesori și cadre didactice care îmbină competența
            academică cu îndrumarea duhovnicească.
          </Reveal>
        </div>

        <Reveal delay={2} className="mb-10 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              aria-pressed={active === cat}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-all",
                active === cat
                  ? "border-navy bg-navy text-white"
                  : "border-navy/10 bg-white text-navy hover:border-gold",
              )}
            >
              {cat}
            </button>
          ))}
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((p, i) => (
            <Reveal
              key={p.name}
              delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
              className="group rounded-2xl border border-navy/10 bg-parchment p-7 text-center transition-all duration-500 hover:-translate-y-1.5 hover:bg-white hover:shadow-[var(--shadow-elevated)]"
            >
              <div
                className="relative mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full border-2 border-gold font-serif text-3xl font-semibold text-navy"
                style={{
                  background:
                    "radial-gradient(circle at 30% 25%, #fff, var(--color-parchment-2))",
                }}
              >
                {p.initials}
                <span
                  aria-hidden="true"
                  className="absolute -inset-2 rounded-full border border-gold/35 transition-all duration-500 group-hover:-inset-3"
                />
              </div>
              <div className="font-serif text-xl font-semibold text-navy">
                {p.name}
              </div>
              <div className="mt-1 text-[0.78rem] font-semibold tracking-wide text-gold-deep">
                {p.role}
              </div>
              <div className="mt-2 text-sm text-muted text-pretty">
                {p.subject}
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-muted">
          Date demonstrative — profilele reale vor fi gestionate din CMS.
        </p>
      </div>
    </section>
  );
}

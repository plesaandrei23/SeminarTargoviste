"use client";

import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

type ZoneId =
  | "capela"
  | "clase"
  | "internat"
  | "secretariat"
  | "biblioteca"
  | "festivitati";

type Zone = {
  id: ZoneId;
  label: string;
  icon: string;
  description: string;
  rect: { x: number; y: number; w: number; h: number };
};

const ZONES: Zone[] = [
  {
    id: "capela",
    label: "Capela",
    icon: "⛪",
    description:
      "Inima duhovnicească a seminarului, unde elevii participă la slujbe și la viața liturgică zilnică.",
    rect: { x: 40, y: 40, w: 180, h: 120 },
  },
  {
    id: "clase",
    label: "Săli de clasă",
    icon: "📚",
    description:
      "Spații moderne de învățare pentru disciplinele teologice și de cultură generală.",
    rect: { x: 240, y: 40, w: 320, h: 120 },
  },
  {
    id: "internat",
    label: "Internat",
    icon: "🛏️",
    description:
      "Cazare pentru elevii din afara localității, într-un mediu sigur și supravegheat.",
    rect: { x: 40, y: 185, w: 200, h: 195 },
  },
  {
    id: "secretariat",
    label: "Secretariat",
    icon: "🗂️",
    description:
      "Acte, înscrieri și informații administrative — program Luni–Vineri, 08:00–16:00.",
    rect: { x: 260, y: 185, w: 150, h: 90 },
  },
  {
    id: "biblioteca",
    label: "Bibliotecă",
    icon: "📖",
    description:
      "Fond de carte teologic și academic, spațiu de studiu și lectură.",
    rect: { x: 430, y: 185, w: 130, h: 90 },
  },
  {
    id: "festivitati",
    label: "Sala de festivități",
    icon: "🎭",
    description:
      "Locul evenimentelor, concertelor, serbărilor și întâlnirilor duhovnicești.",
    rect: { x: 260, y: 295, w: 300, h: 85 },
  },
];

export function CampusMap() {
  const [active, setActive] = useState<ZoneId>("capela");
  const current = ZONES.find((z) => z.id === active)!;

  return (
    <section
      id="campus"
      className="overflow-hidden bg-navy py-[clamp(4rem,9vw,8rem)] text-white"
    >
      <div className="wrap">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <Reveal as="p" className="eyebrow !text-gold-light">
            Explorează
          </Reveal>
          <Reveal as="h2" delay={1} className="mt-2 !text-white text-[clamp(2rem,4.4vw,3.3rem)]">
            Campusul, la un clic distanță
          </Reveal>
          <Reveal as="p" delay={2} className="mt-3 text-white/70">
            Apasă pe o zonă pentru a afla informații și a ajunge direct la
            departamentul dorit.
          </Reveal>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.9fr]">
          <Reveal className="rounded-3xl border border-gold/25 bg-gradient-to-br from-[#13314f] to-[#0c2138] p-5 sm:p-6 min-h-[380px]">
            <svg
              viewBox="0 0 600 420"
              role="img"
              aria-label="Hartă interactivă a campusului seminarului"
              className="w-full h-auto block"
            >
              {ZONES.map((z) => (
                <g
                  key={z.id}
                  role="button"
                  tabIndex={0}
                  aria-label={z.label}
                  aria-pressed={active === z.id}
                  className="cursor-pointer focus:outline-none"
                  onClick={() => setActive(z.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActive(z.id);
                    }
                  }}
                >
                  <rect
                    x={z.rect.x}
                    y={z.rect.y}
                    width={z.rect.w}
                    height={z.rect.h}
                    rx={10}
                    className={cn(
                      "transition-all duration-300",
                      active === z.id
                        ? "fill-[rgba(200,160,78,0.22)] stroke-gold-light"
                        : "fill-white/[0.05] stroke-gold/45 hover:fill-[rgba(200,160,78,0.15)] hover:stroke-gold-light",
                    )}
                    strokeWidth={1.5}
                  />
                  <circle
                    cx={z.rect.x + 20}
                    cy={z.rect.y + 20}
                    r={5}
                    className={cn(
                      "transition-colors",
                      active === z.id ? "fill-gold-light" : "fill-gold",
                    )}
                  />
                  <text
                    x={z.rect.x + 34}
                    y={z.rect.y + 24}
                    className="pointer-events-none fill-white/85 text-[11px] font-medium"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {z.label}
                  </text>
                </g>
              ))}
            </svg>
          </Reveal>

          <Reveal
            delay={2}
            className="flex flex-col rounded-3xl border border-white/15 bg-white/[0.04] p-8"
          >
            <p className="text-[0.72rem] tracking-[0.14em] uppercase text-white/45 mb-4">
              Departament selectat
            </p>
            <div
              aria-hidden="true"
              className="mb-4 flex h-13 w-13 items-center justify-center rounded-2xl bg-gold/15 text-2xl"
              style={{ height: 52, width: 52 }}
            >
              {current.icon}
            </div>
            <h3 className="!text-white text-[clamp(1.5rem,2.5vw,2rem)] mb-2 transition-opacity">
              {current.label}
            </h3>
            <p className="text-white/70 mb-6 transition-opacity text-pretty">
              {current.description}
            </p>
            <a
              href="#"
              className="mt-auto self-start inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy-deep transition-all hover:bg-gold-light hover:-translate-y-0.5"
            >
              Mergi la secțiune →
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

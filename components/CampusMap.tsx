"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { CAMPUS_ZONES, type CampusZone } from "@/lib/campus";

/**
 * Map positions for each zone on the interactive SVG. Slugs match the
 * single source of truth in `@/lib/campus` so the rest of the data
 * (icon, tagline, etc.) doesn't drift.
 */
const ZONE_RECTS: Record<string, { x: number; y: number; w: number; h: number }> = {
  capela: { x: 40, y: 40, w: 180, h: 120 },
  "sali-de-clasa": { x: 240, y: 40, w: 320, h: 120 },
  internat: { x: 40, y: 185, w: 200, h: 195 },
  secretariat: { x: 260, y: 185, w: 150, h: 90 },
  biblioteca: { x: 430, y: 185, w: 130, h: 90 },
  "sala-de-festivitati": { x: 260, y: 295, w: 300, h: 85 },
};

type ZoneWithRect = CampusZone & {
  rect: { x: number; y: number; w: number; h: number };
};

const ZONES: ZoneWithRect[] = CAMPUS_ZONES.map((z) => ({
  ...z,
  rect: ZONE_RECTS[z.slug] ?? { x: 0, y: 0, w: 100, h: 60 },
}));

export function CampusMap() {
  const [active, setActive] = useState<string>(ZONES[0].slug);
  const current = ZONES.find((z) => z.slug === active)!;

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
                  key={z.slug}
                  role="button"
                  tabIndex={0}
                  aria-label={z.name}
                  aria-pressed={active === z.slug}
                  className="cursor-pointer focus:outline-none"
                  onClick={() => setActive(z.slug)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActive(z.slug);
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
                      active === z.slug
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
                      active === z.slug ? "fill-gold-light" : "fill-gold",
                    )}
                  />
                  <text
                    x={z.rect.x + 34}
                    y={z.rect.y + 24}
                    className="pointer-events-none fill-white/85 text-[11px] font-medium"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {z.name}
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
              className="mb-4 flex items-center justify-center rounded-2xl bg-gold/15"
              style={{ height: 52, width: 52 }}
            >
              <current.Icon className="size-6 text-gold-light" strokeWidth={1.5} />
            </div>
            <h3 className="!text-white text-[clamp(1.5rem,2.5vw,2rem)] mb-2 transition-opacity">
              {current.name}
            </h3>
            <p className="text-white/70 mb-6 transition-opacity text-pretty">
              {current.tagline}.
            </p>
            <Link
              href={`/campus/${current.slug}`}
              className="mt-auto self-start inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy-deep transition-all hover:bg-gold-light hover:-translate-y-0.5"
            >
              Vezi pagina
              <ArrowRight className="size-4" strokeWidth={1.75} />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

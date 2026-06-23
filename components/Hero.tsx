"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Globe } from "@/components/Globe";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

type Phase = "intro" | "hero";

const INTRO_DURATION_MS = 2400;
const STORAGE_KEY = "hero-intro-seen";

export function Hero() {
  const [phase, setPhase] = useState<Phase>("intro");
  // Render the globe layer only while it's needed, then unmount it for perf.
  const [mountGlobe, setMountGlobe] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const seen = sessionStorage.getItem(STORAGE_KEY) === "1";

    if (reduce || seen) {
      setPhase("hero");
      setMountGlobe(false);
      return;
    }

    const transitionTimer = setTimeout(() => {
      setPhase("hero");
      sessionStorage.setItem(STORAGE_KEY, "1");
    }, INTRO_DURATION_MS);

    const unmountTimer = setTimeout(
      () => setMountGlobe(false),
      INTRO_DURATION_MS + 900,
    );

    return () => {
      clearTimeout(transitionTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  const skip = () => {
    setPhase("hero");
    sessionStorage.setItem(STORAGE_KEY, "1");
    setTimeout(() => setMountGlobe(false), 700);
  };

  return (
    <section
      id="top"
      className="relative isolate min-h-[100svh] flex items-center overflow-hidden text-white"
    >
      {/* ─── Hero photo layer (fades in after intro) ─────────── */}
      <div
        className={cn(
          "absolute inset-0 -z-10 transition-opacity duration-[900ms]",
          phase === "hero" ? "opacity-100" : "opacity-0",
        )}
      >
        <Image
          src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920/d95MN2J9V3cXzoxX/8-AR0L6W6RkKHel340.jpeg"
          alt="Curtea Seminarului Teologic Ortodox din Târgoviște"
          fill
          priority
          sizes="100vw"
          className="object-cover animate-[kenburns_22s_ease-in-out_infinite_alternate]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,28,48,0.6)_0%,rgba(10,28,48,0.35)_35%,rgba(10,28,48,0.85)_100%),radial-gradient(120%_90%_at_70%_20%,rgba(10,28,48,0)_30%,rgba(10,28,48,0.55)_100%)]"
        />
      </div>

      {/* ─── Globe intro layer ───────────────────────────────── */}
      {mountGlobe && (
        <div
          className={cn(
            "absolute inset-0 z-20 bg-navy-deep flex items-center justify-center overflow-hidden transition-opacity duration-[900ms]",
            phase === "intro"
              ? "opacity-100"
              : "opacity-0 pointer-events-none",
          )}
        >
          {/* the canvas itself — scales up as the intro plays */}
          <div
            className={cn(
              "relative aspect-square transition-transform duration-[2200ms] ease-[cubic-bezier(0.7,0.02,0.84,0.36)]",
              phase === "intro" ? "scale-[2.4]" : "scale-[0.7]",
            )}
            style={{ width: "min(64vmin, 720px)" }}
          >
            <Globe rotationSpeed={0.013} />
            {/* gold pulsing marker — sits roughly over Targoviste once globe locks */}
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 block size-3 rounded-full bg-gold opacity-0 animate-[pin-in_2.4s_ease-out_forwards]"
            />
          </div>

          <div className="absolute bottom-[18%] inset-x-0 text-center text-white/85 text-xs tracking-[0.32em] uppercase font-sans animate-[label-fade_2.4s_ease_forwards]">
            {siteConfig.city} · România
          </div>

          <button
            type="button"
            onClick={skip}
            className="absolute bottom-6 right-6 z-30 inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20"
          >
            Sari peste ↓
          </button>
        </div>
      )}

      {/* ─── Hero content ─────────────────────────────────────── */}
      <div className="wrap relative z-10 pt-24 pb-12">
        <Reveal as="p" className="eyebrow !text-gold-light">
          {siteConfig.diocese}
        </Reveal>
        <Reveal as="h1" delay={1} className="mt-3 mb-2 text-white text-balance">
          <span className="block text-[clamp(2.4rem,6vw,5.2rem)] font-semibold leading-[1.05] [text-shadow:0_2px_30px_rgba(0,0,0,0.3)]">
            Seminarul Teologic Ortodox
          </span>
          <span className="block text-[clamp(2.4rem,6vw,5.2rem)] italic text-gold-light leading-[1.05]">
            „{siteConfig.patron}”
          </span>
        </Reveal>
        <Reveal
          as="p"
          delay={2}
          className="mt-6 max-w-xl text-base sm:text-lg font-light text-white/90 text-pretty"
        >
          <span
            aria-hidden="true"
            className="inline-block h-px w-12 bg-gold align-middle mr-4"
          />
          {siteConfig.tagline}, în inima cetății {siteConfig.city}.
        </Reveal>
        <Reveal as="div" delay={3} className="mt-8 flex flex-wrap gap-3">
          <Link
            href="#admitere"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-[0.95rem] font-semibold text-navy-deep transition-all duration-300 hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-[var(--shadow-gold)]"
          >
            Admitere {siteConfig.admission.cycle} →
          </Link>
          <Link
            href="#campus"
            className="inline-flex items-center gap-2 rounded-full border border-white/50 px-7 py-3.5 text-[0.95rem] font-semibold text-white transition-all duration-300 hover:bg-white/10 hover:border-white"
          >
            Descoperă campusul
          </Link>
        </Reveal>
      </div>

      {/* scroll-down indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-white/75 text-[0.66rem] tracking-[0.22em] uppercase">
        <span
          aria-hidden="true"
          className="relative w-6 h-9 rounded-xl border-2 border-white/60"
        >
          <span
            className="absolute top-1.5 left-1/2 -translate-x-1/2 w-[3px] h-[7px] rounded-sm bg-gold-light"
            style={{ animation: "wheel 1.6s infinite" }}
          />
        </span>
        Scroll
      </div>

      {/* keyframes specific to this hero */}
      <style>{`
        @keyframes pin-in {
          0%, 52% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); box-shadow: 0 0 0 0 rgba(200,160,78,0); }
          60%     { opacity: 1; transform: translate(-50%, -50%) scale(1.1); box-shadow: 0 0 0 0 rgba(200,160,78,0.6); }
          80%     { opacity: 1; transform: translate(-50%, -50%) scale(1); box-shadow: 0 0 0 20px rgba(200,160,78,0); }
          100%    { opacity: 0; transform: translate(-50%, -50%) scale(2.2); }
        }
        @keyframes label-fade {
          0%, 12% { opacity: 0; transform: translateY(8px); }
          32%     { opacity: 1; transform: translateY(0); }
          82%     { opacity: 1; }
          100%    { opacity: 0; }
        }
      `}</style>
    </section>
  );
}

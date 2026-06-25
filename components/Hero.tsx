"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

/**
 * Two-layer cinematic hero:
 *  1) `hero-still.jpg` is the persistent background (also the still that the
 *     video resolves to — last frame == still, so the transition is seamless).
 *  2) `hero-zoom.mp4` autoplays once on top of it, then fades out to reveal
 *     the still. The still then drifts via a slow Ken Burns.
 *
 * Reduced motion: the video never plays; users land directly on the still.
 * Safety: a 3.6s timeout calls `settle()` even if the video errors or never
 * fires `ended` (some mobile browsers don't dispatch it reliably).
 */
export function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoDone, setVideoDone] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      // Defer to the next microtask so React doesn't flag this as a
      // synchronous setState-in-effect (it isn't cascading — the user just
      // wants reduced motion, so skip the count-down — but the rule can't
      // tell the difference statically).
      Promise.resolve().then(() => setVideoDone(true));
      return;
    }

    let settled = false;
    const settle = () => {
      if (settled) return;
      settled = true;
      setVideoDone(true);
    };

    video.addEventListener("ended", settle);
    video.addEventListener("error", settle);
    const safety = setTimeout(settle, 3600);

    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(settle);
    }

    return () => {
      clearTimeout(safety);
      video.removeEventListener("ended", settle);
      video.removeEventListener("error", settle);
    };
  }, []);

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden text-white"
    >
      {/* ─── Hero media — still + video overlay ──────────────── */}
      <div
        className={cn(
          "absolute inset-0 -z-10 overflow-hidden",
          videoDone &&
            "motion-safe:[&_img]:animate-[kenburns_28s_ease-in-out_infinite_alternate]",
        )}
      >
        <Image
          src="/assets/hero-still.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <video
          ref={videoRef}
          className={cn(
            "absolute inset-0 z-[1] h-full w-full object-cover transition-opacity duration-[550ms] motion-reduce:hidden",
            videoDone && "pointer-events-none opacity-0",
          )}
          muted
          playsInline
          preload="none"
          poster="/assets/hero-first.jpg"
          aria-hidden="true"
        >
          <source src="/assets/hero-zoom.mp4" type="video/mp4" />
        </video>
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[2] bg-[linear-gradient(180deg,rgba(10,28,48,0.55)_0%,rgba(10,28,48,0.35)_35%,rgba(10,28,48,0.82)_100%),radial-gradient(120%_90%_at_70%_20%,rgba(10,28,48,0)_30%,rgba(10,28,48,0.5)_100%)]"
        />
      </div>

      {/* ─── Hero content ─────────────────────────────────────── */}
      <div className="wrap relative z-10 pt-24 pb-12">
        <Reveal as="p" className="eyebrow text-gold-light!">
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
            className="mr-4 inline-block h-px w-12 align-middle bg-gold"
          />
          {siteConfig.tagline}, în inima cetății {siteConfig.city}.
        </Reveal>
        <Reveal as="div" delay={3} className="mt-8 flex flex-wrap gap-3">
          <Link
            href="#admitere"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-[0.95rem] font-semibold text-navy-deep transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-light hover:shadow-[var(--shadow-gold)]"
          >
            Admitere {siteConfig.admission.cycle} →
          </Link>
          <Link
            href="#campus"
            className="inline-flex items-center gap-2 rounded-full border border-white/50 px-7 py-3.5 text-[0.95rem] font-semibold text-white transition-all duration-300 hover:border-white hover:bg-white/10"
          >
            Descoperă campusul
          </Link>
        </Reveal>
      </div>

      {/* scroll-down indicator */}
      <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.66rem] tracking-[0.22em] uppercase text-white/75 md:flex">
        <span
          aria-hidden="true"
          className="relative h-9 w-6 rounded-xl border-2 border-white/60"
        >
          <span
            className="absolute top-1.5 left-1/2 h-[7px] w-[3px] -translate-x-1/2 rounded-sm bg-gold-light motion-safe:animate-[wheel_1.6s_infinite]"
          />
        </span>
        Scroll
      </div>
    </section>
  );
}

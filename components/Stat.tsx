"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

type StatProps = {
  value: number;
  suffix?: string;
  label: string;
  /**
   * Pre-rendered icon node. Pass JSX, not a component reference — Lucide
   * icons are functions and can't cross the server→client boundary as
   * raw props.
   */
  icon?: React.ReactNode;
};

export function Stat({ value, suffix, label, icon }: StatProps) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    // For prefers-reduced-motion, we still observe the element but skip
    // the count-up animation and jump straight to the final value when
    // it enters the viewport. setN never fires synchronously inside the
    // effect body — only inside callbacks — which keeps React's
    // set-state-in-effect rule happy.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !animated.current) {
            animated.current = true;
            if (prefersReducedMotion) {
              setN(value);
              observer.unobserve(entry.target);
              continue;
            }
            const duration = 1400;
            const start = performance.now();
            const tick = (now: number) => {
              const p = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              setN(Math.round(value * eased));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <Card
      ref={ref}
      className="relative overflow-hidden border-navy/10 bg-parchment"
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-1 bg-gold"
      />
      <CardContent className="p-6 sm:p-7">
        {icon && (
          <span className="mb-3 inline-flex size-9 items-center justify-center rounded-xl bg-gold/15">
            {icon}
          </span>
        )}
        <div className="font-serif text-5xl font-bold leading-none text-navy">
          {n}
          {suffix && <span className="text-gold-deep">{suffix}</span>}
        </div>
        <div className="mt-2 text-sm text-muted">{label}</div>
      </CardContent>
    </Card>
  );
}

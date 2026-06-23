"use client";

import { useEffect, useRef, useState } from "react";

type StatProps = {
  value: number;
  suffix?: string;
  label: string;
};

export function Stat({ value, suffix, label }: StatProps) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setN(value);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !animated.current) {
            animated.current = true;
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
    <div
      ref={ref}
      className="relative overflow-hidden rounded-2xl border border-navy/10 bg-parchment p-6 sm:p-7"
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-1 bg-gold"
      />
      <div className="font-serif text-5xl font-bold leading-none text-navy">
        {n}
        {suffix && <span className="text-gold-deep">{suffix}</span>}
      </div>
      <div className="mt-2 text-sm text-muted">{label}</div>
    </div>
  );
}

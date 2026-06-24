"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Sticky left-rail TOC for the /tutorial page. Highlights the section
 * currently in view via IntersectionObserver. On mobile it collapses to
 * a flat list above the body.
 */

export type Section = {
  id: string;
  title: string;
  /** Short subtitle / progress hint. */
  subtitle?: string;
};

export function TutorialNav({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState<string>(sections[0]?.id ?? "");

  useEffect(() => {
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav
      aria-label="Cuprins tutorial"
      className="lg:sticky lg:top-32 lg:self-start"
    >
      <p className="text-xs uppercase tracking-[0.14em] text-gold-deep">
        Cuprins
      </p>
      <ol className="mt-4 space-y-1">
        {sections.map((s, i) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              aria-current={active === s.id ? "true" : undefined}
              className={cn(
                "flex items-start gap-3 rounded-xl px-3 py-2 text-sm transition-colors",
                active === s.id
                  ? "bg-navy text-white"
                  : "text-ink/70 hover:bg-paper hover:text-navy",
              )}
            >
              <span
                className={cn(
                  "inline-flex size-6 shrink-0 items-center justify-center rounded-full font-serif text-xs font-semibold",
                  active === s.id
                    ? "bg-gold text-navy-deep"
                    : "bg-navy/8 text-navy",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0">
                <span className="block font-semibold leading-tight">
                  {s.title}
                </span>
                {s.subtitle && (
                  <span
                    className={cn(
                      "mt-0.5 block text-xs",
                      active === s.id ? "text-white/65" : "text-muted",
                    )}
                  >
                    {s.subtitle}
                  </span>
                )}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

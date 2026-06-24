"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Desktop mega-menu — flat links + dropdowns with rich item lists. Built
 * without Radix to keep the bundle small and stay in sync with the brand
 * (gold underline accent on hover, parchment dropdown surface).
 *
 * A11y notes:
 * - Each top-level dropdown trigger is a button with aria-expanded and
 *   aria-controls pointing at its panel.
 * - Panels close on outside click, Escape, or pathname change.
 * - Focus is kept on the trigger; Tab moves through panel items naturally.
 */

export type MegaItem = {
  href: string;
  label: string;
  /** Optional one-line description under the label inside the dropdown. */
  description?: string;
};

export type MegaEntry =
  | { kind: "link"; href: string; label: string }
  | { kind: "menu"; label: string; items: MegaItem[] };

export function MegaMenu({
  entries,
  solid,
}: {
  entries: MegaEntry[];
  solid: boolean;
}) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  // Close on outside click
  useEffect(() => {
    if (openIdx === null) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpenIdx(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIdx(null);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [openIdx]);

  // Close when navigating
  useEffect(() => {
    setOpenIdx(null);
  }, [pathname]);

  return (
    <nav
      ref={rootRef}
      className="hidden lg:flex items-center gap-4 xl:gap-6"
      aria-label="Meniu principal"
    >
      {entries.map((entry, i) =>
        entry.kind === "link" ? (
          <FlatLink key={entry.href} href={entry.href} label={entry.label} solid={solid} />
        ) : (
          <MenuItem
            key={entry.label}
            label={entry.label}
            items={entry.items}
            isOpen={openIdx === i}
            onOpen={() => setOpenIdx(i)}
            onClose={() => setOpenIdx((cur) => (cur === i ? null : cur))}
            solid={solid}
          />
        ),
      )}
    </nav>
  );
}

function FlatLink({
  href,
  label,
  solid,
}: {
  href: string;
  label: string;
  solid: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "relative whitespace-nowrap text-[0.85rem] font-medium tracking-wide py-1 transition-colors duration-300",
        "after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-0 after:bg-gold after:transition-[width] after:duration-300 hover:after:w-full",
        solid ? "text-navy hover:text-navy-deep" : "text-white/90 hover:text-white",
      )}
    >
      {label}
    </Link>
  );
}

function MenuItem({
  label,
  items,
  isOpen,
  onOpen,
  onClose,
  solid,
}: {
  label: string;
  items: MegaItem[];
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  solid: boolean;
}) {
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeTimer = useRef<number | null>(null);

  // Hover open/close with a short grace period so moving the cursor from the
  // trigger to the panel doesn't flicker.
  const cancelClose = useCallback(() => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);
  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = window.setTimeout(onClose, 140);
  }, [cancelClose, onClose]);

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        onOpen();
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => (isOpen ? onClose() : onOpen())}
        className={cn(
          "relative inline-flex items-center gap-1 whitespace-nowrap text-[0.85rem] font-medium tracking-wide py-1 transition-colors duration-300",
          "after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:bg-gold after:transition-[width] after:duration-300",
          isOpen ? "after:w-full" : "after:w-0 hover:after:w-full",
          solid ? "text-navy hover:text-navy-deep" : "text-white/90 hover:text-white",
        )}
      >
        {label}
        <ChevronDown
          className={cn(
            "size-3.5 transition-transform duration-300",
            isOpen && "rotate-180",
          )}
          strokeWidth={2}
          aria-hidden="true"
        />
      </button>

      <div
        id={panelId}
        role="menu"
        aria-label={label}
        className={cn(
          "absolute left-1/2 top-full mt-3 -translate-x-1/2 transition-[opacity,transform,visibility] duration-200",
          isOpen ? "visible opacity-100 translate-y-0" : "invisible opacity-0 -translate-y-1",
        )}
      >
        <div
          className={cn(
            "rounded-2xl border border-navy/10 bg-paper shadow-[0_20px_50px_-20px_rgba(11,31,51,0.35)]",
            "p-3 min-w-[280px]",
            items.length > 4 && "min-w-[440px] sm:min-w-[480px]",
          )}
        >
          <ul
            className={cn(
              "grid gap-0.5",
              items.length > 4 && "grid-cols-2 gap-x-2",
            )}
          >
            {items.map((it) => (
              <li key={it.href} role="none">
                <Link
                  href={it.href}
                  role="menuitem"
                  className={cn(
                    "block rounded-xl px-3 py-2.5 transition-colors duration-200",
                    "hover:bg-gold/15 focus:bg-gold/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                  )}
                >
                  <p className="text-[0.92rem] font-semibold leading-tight text-navy">
                    {it.label}
                  </p>
                  {it.description && (
                    <p className="mt-0.5 text-xs text-muted text-pretty">
                      {it.description}
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

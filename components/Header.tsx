"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { MegaMenu, type MegaEntry } from "@/components/MegaMenu";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

/**
 * Top-level nav structure. Mix of flat links + dropdown groups.
 * `link` entries render as simple anchors; `menu` entries render a hover/click
 * dropdown panel. Mobile drawer reuses the same data with collapsible groups.
 */
const NAV: MegaEntry[] = [
  // "Acasă" is dropped from the top nav — the logo/wordmark on the left
  // already routes home. Drops noise + makes room for the dropdown groups.
  {
    kind: "menu",
    label: "Despre școală",
    items: [
      { href: "/istoric", label: "Istoric", description: "De la 1992 până astăzi" },
      { href: "/misiune-si-viziune", label: "Misiune și viziune", description: "Ce facem și încotro mergem" },
      { href: "/director", label: "Mesajul directorului", description: "Cuvânt de bun-venit" },
      { href: "/regulamente", label: "Regulamente", description: "Protocol + ROFUÎP" },
      { href: "/managementul-cazurilor-de-violenta", label: "Anti-bullying", description: "Mecanismul de sesizare" },
    ],
  },
  { kind: "link", href: "/admitere", label: "Admitere" },
  { kind: "link", href: "/activitati", label: "Activități" },
  { kind: "link", href: "/anunturi", label: "Anunțuri" },
  {
    kind: "menu",
    label: "Pentru elevi",
    items: [
      { href: "/orar", label: "Orar", description: "Programul zilei de seminar" },
      { href: "/burse", label: "Burse", description: "Tipuri și criterii" },
      { href: "/evaluarea-nationala", label: "Evaluarea Națională", description: "EN VIII · admiterea la liceu" },
      { href: "/bacalaureat", label: "Bacalaureat", description: "Structura examenului" },
      { href: "/atestat-profesional", label: "Atestat profesional", description: "Examen vocațional" },
      { href: "/coruri", label: "Coruri", description: "Cor liturgic + cor reprezentativ" },
      { href: "/consiliul-elevilor", label: "Consiliul elevilor", description: "Cum te alături" },
    ],
  },
  {
    kind: "menu",
    label: "Conducere",
    items: [
      { href: "/profesori", label: "Profesori", description: "Corpul didactic" },
      { href: "/consiliul-de-administratie", label: "Consiliul de Administrație", description: "Arhivă hotărâri" },
      { href: "/mobilitate-cadre-didactice", label: "Mobilitatea personalului didactic", description: "Concurs național ocupare posturi" },
      { href: "/erasmus", label: "Erasmus+", description: "Acreditare KA120" },
    ],
  },
  { kind: "link", href: "/campus", label: "Campus" },
  { kind: "link", href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);
  const wasOpen = useRef(false);

  // The transparent / white-text styling only makes sense over the home page's
  // dark hero. On every other route the page background is parchment, so the
  // header must always render in its "solid" state to stay legible.
  const isHome = pathname === "/";
  const solid = scrolled || !isHome;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  // Mobile drawer focus management — trap Tab inside, close on Escape, and
  // restore focus to the hamburger trigger when the drawer closes. We don't
  // run this on initial mount: wasOpen tracks the previous value so we only
  // restore focus when the drawer actually transitions open → closed.
  useEffect(() => {
    if (open) {
      const drawer = drawerRef.current;
      if (!drawer) return;
      // Focus first focusable element so the keyboard user lands inside the dialog.
      const focusables = drawer.querySelectorAll<HTMLElement>(
        'a, button, [tabindex]:not([tabindex="-1"])',
      );
      focusables[0]?.focus();

      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setOpen(false);
          return;
        }
        if (e.key !== "Tab") return;
        const items = Array.from(
          drawer.querySelectorAll<HTMLElement>(
            'a, button, [tabindex]:not([tabindex="-1"])',
          ),
        ).filter((el) => !el.hasAttribute("disabled"));
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      };
      document.addEventListener("keydown", onKey);
      wasOpen.current = true;
      return () => document.removeEventListener("keydown", onKey);
    }
    if (wasOpen.current) {
      hamburgerRef.current?.focus();
      wasOpen.current = false;
    }
  }, [open]);

  return (
    <>
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background,box-shadow] duration-500",
        solid
          ? "bg-parchment/92 backdrop-blur-md shadow-[0_4px_24px_-16px_rgba(10,28,48,0.5)]"
          : "bg-transparent",
      )}
    >
      {/* announcement bar — collapses on scroll */}
      <div
        className={cn(
          "overflow-hidden bg-navy-deep text-parchment text-[0.78rem] tracking-wide text-center transition-[max-height,padding,opacity] duration-500",
          scrolled
            ? "max-h-0 py-0 opacity-0"
            : "max-h-14 py-2 px-3 opacity-100",
        )}
      >
        <strong className="font-semibold">
          Admitere {siteConfig.admission.cycle}
        </strong>
        <span className="hidden sm:inline">
          <span className="mx-2 text-gold">·</span>
          {siteConfig.admission.spots} de locuri ·{" "}
          {siteConfig.admission.program}
        </span>
        <span className="mx-2 text-gold">·</span>
        <Link
          href="/admitere"
          className="text-gold-light font-semibold hover:underline underline-offset-4"
        >
          Vezi detalii →
        </Link>
      </div>

      {/* nav row */}
      <div className="wrap flex items-center justify-between gap-6 py-2">
        <Link
          href="/"
          className="flex items-center gap-2.5 z-[62] group"
        >
          <Image
            src="/assets/noBgLogo.png"
            alt=""
            width={521}
            height={479}
            priority
            className="h-[54px] w-auto drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)]"
          />
          {/*
            The wordmark is the link's accessible name on both desktop and
            mobile. On mobile (<sm) it's visually hidden via sr-only so the
            logo can stand alone, but screen readers still announce it —
            which means the visible text and the accessible name match
            (WCAG 2.5.3 label-content-name-mismatch).
          */}
          <span
            className={cn(
              "font-serif font-semibold leading-tight transition-colors duration-500 sr-only sm:not-sr-only sm:block sm:text-center",
              solid ? "text-navy" : "text-white",
            )}
            style={{ fontSize: "1rem" }}
          >
            Seminarul Teologic Ortodox
            <span className="block font-sans font-medium text-[0.62rem] tracking-[0.18em] uppercase opacity-75">
              {siteConfig.patron} · {siteConfig.city}
            </span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-6">
          <MegaMenu entries={NAV} solid={solid} />
          <Link
            href="/admitere"
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-gold px-4 py-2 text-[0.85rem] font-semibold text-navy-deep transition-all duration-300 hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-[var(--shadow-gold)] xl:px-5 xl:py-2.5 xl:text-[0.92rem]"
          >
            Înscrie-te
          </Link>
        </div>

        <button
          ref={hamburgerRef}
          type="button"
          aria-label={open ? "Închide meniul" : "Deschide meniul"}
          aria-expanded={open}
          aria-controls="mobile-drawer"
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "lg:hidden p-2 z-[62] transition-colors",
            solid ? "text-navy" : "text-white",
          )}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

    </header>

    {/*
      Mobile menu overlay — rendered as a SIBLING of <header>, not a child.
      The header carries `backdrop-blur-md` in its solid state, which creates
      a new containing block for fixed-position descendants. If this overlay
      lived inside <header>, `fixed inset-0` would be relative to the header
      (only 105px tall) instead of the viewport, and the menu would clip.
    */}
    <div
      id="mobile-drawer"
      ref={drawerRef}
      role="dialog"
      aria-modal="true"
      aria-label="Meniu de navigare"
      // When closed, `inert` removes the dialog from the tab order so users
      // can't tab into invisible content. When open, the Tab handler in the
      // effect above traps focus inside.
      inert={!open || undefined}
      className={cn(
        "fixed inset-0 z-[61] bg-navy-deep transition-[opacity,visibility] duration-500 lg:hidden",
        open ? "opacity-100 visible" : "opacity-0 invisible",
      )}
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-label="Închide meniul"
        onClick={() => setOpen(false)}
        className="absolute right-5 top-5 p-2 text-parchment transition-colors hover:text-gold-light"
      >
        <X size={26} />
      </button>

      <div className="h-full overflow-y-auto px-6 pt-20 pb-12">
        <nav aria-label="Meniu mobil" className="mx-auto max-w-md space-y-1">
          {NAV.map((entry) =>
            entry.kind === "link" ? (
              <Link
                key={entry.href}
                href={entry.href}
                onClick={() => setOpen(false)}
                className="block font-serif text-2xl text-parchment py-3 px-2 transition-colors hover:text-gold-light"
              >
                {entry.label}
              </Link>
            ) : (
              <MobileGroup
                key={entry.label}
                label={entry.label}
                items={entry.items}
                onItemClick={() => setOpen(false)}
              />
            ),
          )}
          <Link
            href="/admitere"
            onClick={() => setOpen(false)}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-[0.95rem] font-semibold text-navy-deep"
          >
            Înscrie-te →
          </Link>
        </nav>
      </div>
    </div>
    </>
  );
}

function MobileGroup({
  label,
  items,
  onItemClick,
}: {
  label: string;
  items: { href: string; label: string }[];
  onItemClick: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="border-b border-white/5">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="flex w-full items-center justify-between font-serif text-2xl text-parchment py-3 px-2 transition-colors hover:text-gold-light"
      >
        {label}
        <ChevronDown
          className={cn(
            "size-5 transition-transform duration-300 text-gold-light",
            expanded && "rotate-180",
          )}
          strokeWidth={2}
          aria-hidden="true"
        />
      </button>
      <div
        // `inert` + `aria-hidden` keeps the collapsed submenu out of the
        // accessibility tree AND out of the tab order — the grid-rows
        // animation only hides it visually, so without these, screen
        // readers + keyboard users could still reach the links.
        aria-hidden={!expanded}
        inert={!expanded || undefined}
        className={cn(
          "grid transition-[grid-template-rows] duration-300",
          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <ul className="overflow-hidden">
          {items.map((it) => (
            <li key={it.href}>
              <Link
                href={it.href}
                onClick={onItemClick}
                tabIndex={expanded ? undefined : -1}
                className="block pl-4 pr-2 py-2.5 text-base text-parchment/85 transition-colors hover:text-gold-light"
              >
                {it.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

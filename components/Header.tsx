"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

/**
 * Nav targets. Hash-only hrefs (e.g. `#admitere`) only work on the home page;
 * from any other route (/activitati, /admitere) the browser would resolve
 * them against the current path. Prefix with "/" so they always land at the
 * home page's anchor, and use real routes where those exist.
 */
const nav = [
  { href: "/", label: "Acasă" },
  { href: "/#admitere", label: "Admitere" },
  { href: "/activitati", label: "Activități" },
  { href: "/#campus", label: "Campus" },
  { href: "/profesori", label: "Profesori" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
          <span
            className={cn(
              "font-serif font-semibold leading-tight transition-colors duration-500 hidden sm:block",
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

        <nav className="hidden lg:flex items-center gap-7">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative text-[0.85rem] font-medium tracking-wide py-1 transition-colors duration-300 after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-0 after:bg-gold after:transition-[width] after:duration-300 hover:after:w-full",
                solid
                  ? "text-navy hover:text-navy-deep"
                  : "text-white/90 hover:text-white",
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/admitere"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-[0.92rem] font-semibold text-navy-deep transition-all duration-300 hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-[var(--shadow-gold)]"
          >
            Înscrie-te
          </Link>
        </nav>

        <button
          type="button"
          aria-label={open ? "Închide meniul" : "Deschide meniul"}
          aria-expanded={open}
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
      className={cn(
        "fixed inset-0 z-[61] bg-navy-deep flex flex-col items-center justify-center gap-6 transition-[opacity,transform,visibility] duration-500 lg:hidden",
        open
          ? "opacity-100 scale-100 visible"
          : "opacity-0 scale-105 invisible",
      )}
      onClick={(e) => {
        // Tap on the dark backdrop closes the menu; tap on a link or button
        // doesn't bubble here (Link's onClick already closes, and the close
        // button stops propagation).
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      {/*
        Dedicated close button inside the overlay. The hamburger in the
        header lives in a separate stacking context (header has z-50, so
        its button's z-[62] only beats siblings INSIDE the header). The
        menu sits at z-61 in body's stacking context, so it covers the
        hamburger entirely — we need our own close affordance here.
      */}
      <button
        type="button"
        aria-label="Închide meniul"
        onClick={() => setOpen(false)}
        className="absolute right-5 top-5 p-2 text-parchment transition-colors hover:text-gold-light"
      >
        <X size={26} />
      </button>

      {nav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={() => setOpen(false)}
          className="font-serif text-3xl text-parchment hover:text-gold-light transition-colors"
        >
          {item.label}
        </Link>
      ))}
      <Link
        href="/admitere"
        onClick={() => setOpen(false)}
        className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-[0.95rem] font-semibold text-navy-deep"
      >
        Înscrie-te →
      </Link>
    </div>
    </>
  );
}

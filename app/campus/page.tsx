import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, MapPin } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { Card, CardContent } from "@/components/ui/card";
import { CAMPUS_ZONES } from "@/lib/campus";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Campus",
  description: `Descoperă campusul Seminarului Teologic Ortodox „${siteConfig.patron}” din ${siteConfig.city} — paraclis, săli de clasă, internat, bibliotecă, sala de festivități.`,
  alternates: { canonical: "/campus" },
};

export default function CampusPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-parchment pb-[clamp(4rem,9vw,8rem)]">
        <Hero />
        <ZonesGrid />
        <VisitCta />
      </main>
      <Footer />
    </>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-navy-deep via-navy to-navy-soft pt-36 pb-24 text-white">
      <Image
        src="/campus/intrare-arc.jpg"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-30"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-navy/60 to-navy-deep/95"
      />
      <div className="wrap relative mx-auto max-w-3xl text-center">
        <Reveal as="p" className="eyebrow !text-gold-light">
          Campus
        </Reveal>
        <Reveal
          as="h1"
          delay={1}
          className="mt-3 !text-white text-[clamp(2.4rem,5.5vw,4.4rem)] font-semibold leading-[1.05]"
        >
          Locul în care ne-am așezat
        </Reveal>
        <svg
          aria-hidden="true"
          viewBox="0 0 240 12"
          className="mx-auto mt-6 h-3 w-60 text-gold/60"
        >
          <line x1="0" y1="6" x2="100" y2="6" stroke="currentColor" strokeWidth="0.6" />
          <path d="M120 1 L125 6 L120 11 L115 6 Z" fill="currentColor" />
          <line x1="140" y1="6" x2="240" y2="6" stroke="currentColor" strokeWidth="0.6" />
        </svg>
        <Reveal
          as="p"
          delay={2}
          className="mx-auto mt-6 max-w-xl text-white/85 text-pretty sm:text-lg"
        >
          Șase spații, fiecare cu rolul lui în viața seminarului —
          paraclis, săli de clasă, internat, secretariat, bibliotecă și
          sala de festivități. Apasă pe oricare pentru a afla mai multe.
        </Reveal>
      </div>
    </section>
  );
}

function ZonesGrid() {
  return (
    <section className="wrap mt-16">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CAMPUS_ZONES.map((zone, i) => (
          <Reveal
            key={zone.slug}
            delay={((i % 3) + 1) as 1 | 2 | 3}
          >
            <Link
              href={`/campus/${zone.slug}`}
              className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 rounded-2xl"
            >
              <Card className="relative h-full overflow-hidden border-navy/10 bg-paper transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[var(--shadow-elevated)]">
                <div className="relative h-44 overflow-hidden bg-gradient-to-br from-navy-deep via-navy to-navy-soft">
                  {zone.image ? (
                    <Image
                      src={zone.image.src}
                      alt={zone.image.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-6 -top-6 text-gold/15"
                    >
                      <zone.Icon className="size-44" strokeWidth={1} />
                    </span>
                  )}
                  {zone.image ? (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-navy-deep/30 to-transparent"
                    />
                  ) : null}
                  <div className="absolute bottom-0 left-0 p-5 text-white">
                    <span className="inline-flex size-11 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15 backdrop-blur-sm">
                      <zone.Icon className="size-5 text-gold-light" strokeWidth={1.75} />
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h2 className="font-serif text-2xl font-semibold leading-tight text-navy text-balance">
                    {zone.name}
                  </h2>
                  <p className="mt-2 text-sm text-muted text-pretty">
                    {zone.tagline}
                  </p>
                  <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-deep transition-[gap] duration-300 group-hover:gap-3">
                    Află mai multe
                    <ArrowRight className="size-4" strokeWidth={1.75} />
                  </p>
                </CardContent>
              </Card>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function VisitCta() {
  return (
    <section className="wrap mt-24">
      <Reveal>
        <Card className="overflow-hidden border-navy/10 bg-gradient-to-br from-navy-deep to-navy-soft text-white shadow-[var(--shadow-elevated)]">
          <CardContent className="grid gap-8 p-10 md:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="eyebrow !text-gold-light">Vino la noi</p>
              <h2 className="mt-3 !text-white font-serif text-[clamp(1.8rem,3.5vw,2.6rem)] font-semibold leading-tight">
                Programează un tur al seminarului
              </h2>
              <p className="mt-4 max-w-md text-pretty text-white/80">
                Vrei să vezi sălile, paraclisul, internatul cu ochii tăi?
                Sună la secretariat — organizăm vizite pentru părinți și
                candidați la admitere, în programul de funcționare.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={siteConfig.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy-deep transition-all hover:-translate-y-0.5 hover:bg-gold-light"
                >
                  <MapPin className="size-4" strokeWidth={1.75} />
                  Vezi pe Google Maps
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-white hover:bg-white/10"
                >
                  <Compass className="size-4" strokeWidth={1.75} />
                  Programează vizita
                </Link>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <p className="text-xs uppercase tracking-[0.14em] text-white/55">
                Adresă
              </p>
              <p className="font-semibold text-white text-pretty">
                {siteConfig.address.street}
                <br />
                {siteConfig.address.city} {siteConfig.address.postalCode}
              </p>
              <p className="mt-4 text-xs uppercase tracking-[0.14em] text-white/55">
                Program secretariat
              </p>
              <p className="font-semibold text-white">
                {siteConfig.contact.hours}
              </p>
            </div>
          </CardContent>
        </Card>
      </Reveal>
    </section>
  );
}

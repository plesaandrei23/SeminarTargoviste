import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Church,
  Compass,
  Music2,
  Users,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Corurile seminarului",
  description: `Corurile Seminarului Teologic Ortodox „${siteConfig.patron}” din ${siteConfig.city} — repertoriu, dirijori și cum te alături.`,
  alternates: { canonical: "/coruri" },
};

type Chorus = {
  name: string;
  patron: string;
  Icon: typeof Music2;
  conductor: string;
  detail: string;
  repertoire: string[];
};

const CHORUSES: Chorus[] = [
  {
    name: "Corul „Sf. Voievod Neagoe Basarab”",
    patron: "cor de tineret · voci mixte",
    Icon: Award,
    conductor: "Prof. Dr. Florinel Ciprian Cazan",
    detail:
      "Corul reprezentativ al seminarului, format din elevi și absolvenți. Participă la concertele majore ale școlii, la evenimente arhiepiscopale și la festivaluri corale.",
    repertoire: [
      "Repertoriu bizantin — Anastasimatarul lui Petru Peloponesianul",
      "Compoziții românești clasice — Ioan D. Chirescu, Sabin Drăgoi, Paul Constantinescu",
      "Colinde și cântece de sărbători",
    ],
  },
  {
    name: "Corul bărbătesc al seminarului",
    patron: "cor liturgic · seminariști",
    Icon: Church,
    conductor: "Îndrumat săptămânal de duhovnicul seminarului",
    detail:
      "Corul de bărbați care susține slujbele zilnice din paraclisul seminarului. Sunt seminariștii înșiși — participarea la repetiții este parte din formarea liturgică.",
    repertoire: [
      "Rânduiala Sfintei Liturghii — cele opt glasuri bizantine",
      "Vecernia și utrenia zilnică",
      "Slujbele de sărbători mari — Nașterea Domnului, Învierea, Rusaliile",
    ],
  },
];

export default function CoruriPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-parchment pb-[clamp(4rem,9vw,8rem)]">
        <Hero />
        <ChorusesList />
        <HowToJoin />
      </main>
      <Footer />
    </>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-navy-deep via-navy to-navy-soft pt-32 pb-20 text-white">
      <Image
        src="/campus/sala-de-festivitati.jpg"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-25"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-navy/60 to-navy-deep/95"
      />
      <div className="wrap relative">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] text-white/65 transition-colors hover:text-gold-light"
        >
          <ArrowLeft className="size-3" strokeWidth={2} />
          Înapoi la pagina principală
        </Link>
        <div className="mt-8 max-w-3xl">
          <Badge variant="outline" className="border-gold/40 text-gold-light">
            Pentru elevi
          </Badge>
          <h1 className="mt-5 text-balance text-white! text-[clamp(2.4rem,5.5vw,4.4rem)] font-semibold leading-[1.05]">
            Corurile seminarului
          </h1>
          <svg
            aria-hidden="true"
            viewBox="0 0 240 12"
            className="mt-6 h-3 w-60 text-gold/60"
          >
            <line x1="0" y1="6" x2="100" y2="6" stroke="currentColor" strokeWidth="0.6" />
            <path d="M120 1 L125 6 L120 11 L115 6 Z" fill="currentColor" />
            <line x1="140" y1="6" x2="240" y2="6" stroke="currentColor" strokeWidth="0.6" />
          </svg>
          <p className="mt-6 text-pretty text-white/85 sm:text-lg">
            Muzica psaltică și repertoriul coral fac parte din identitatea
            seminarului — două ansambluri active, unul liturgic zilnic și
            unul reprezentativ la scenă.
          </p>
        </div>
      </div>
    </section>
  );
}

function ChorusesList() {
  return (
    <section className="wrap mt-16 space-y-8">
      {CHORUSES.map((c, i) => (
        <Reveal key={c.name} delay={((i % 2) + 1) as 1 | 2}>
          <Card className="overflow-hidden border-navy/10 bg-paper transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]">
            <CardContent className="grid gap-8 p-8 lg:grid-cols-[0.4fr_1fr] lg:gap-14 lg:p-10">
              <div>
                <span
                  aria-hidden="true"
                  className="inline-flex size-14 items-center justify-center rounded-2xl bg-gold/15"
                >
                  <c.Icon className="size-7 text-gold-deep" strokeWidth={1.5} />
                </span>
                <p className="mt-5 text-xs uppercase tracking-[0.14em] text-gold-deep">
                  {c.patron}
                </p>
                <h2 className="mt-2 font-serif text-2xl font-semibold leading-tight text-navy text-balance">
                  {c.name}
                </h2>
                <p className="mt-3 text-sm text-muted">
                  <span className="text-xs uppercase tracking-[0.12em] text-ink/70">
                    Dirijor
                  </span>
                  <br />
                  <span className="font-semibold text-navy">{c.conductor}</span>
                </p>
              </div>
              <div>
                <p className="text-pretty text-[1.05rem] leading-relaxed text-ink/85">
                  {c.detail}
                </p>
                <p className="mt-6 text-xs uppercase tracking-[0.14em] text-gold-deep">
                  Repertoriu
                </p>
                <ul className="mt-3 space-y-2 text-pretty text-sm text-ink/80">
                  {c.repertoire.map((r) => (
                    <li key={r} className="flex items-start gap-2">
                      <span aria-hidden="true" className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-gold" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </Reveal>
      ))}
    </section>
  );
}

function HowToJoin() {
  return (
    <section className="wrap mt-24">
      <Reveal>
        <Card className="overflow-hidden border-navy/10 bg-gradient-to-br from-navy-deep to-navy-soft text-white shadow-[var(--shadow-elevated)]">
          <CardContent className="grid gap-8 p-10 md:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="eyebrow text-gold-light!">Cum te alături</p>
              <h2 className="mt-3 text-white! font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-tight">
                Pentru elevi și candidați la admitere
              </h2>
              <p className="mt-4 max-w-md text-pretty text-white/80">
                Corul bărbătesc liturgic este deschis tuturor seminariștilor
                — nu se cere audiție. Pentru corul „Sf. Voievod Neagoe
                Basarab” se face o scurtă audiție la începutul anului școlar,
                cu dirijorul Prof. Cazan. Ambele coruri repetă săptămânal, în
                sala de festivități și în paraclis.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/admitere"
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy-deep transition-all hover:-translate-y-0.5 hover:bg-gold-light"
                >
                  <Compass className="size-4" strokeWidth={1.75} />
                  Admitere la seminar
                </Link>
                <Link
                  href="/campus/paraclis"
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-white hover:bg-white/10"
                >
                  Vezi paraclisul
                  <ArrowRight className="size-4" strokeWidth={1.75} />
                </Link>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <p className="text-xs uppercase tracking-[0.14em] text-white/55">
                Repetiții
              </p>
              <p className="font-semibold text-white">
                Săptămânal, seara · sala de festivități
              </p>
              <p className="mt-3 text-xs uppercase tracking-[0.14em] text-white/55">
                Contact secretariat
              </p>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="font-semibold text-white hover:text-gold-light"
              >
                {siteConfig.contact.email}
              </a>
              <p className="mt-3 flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-white/55">
                <Users className="size-3.5" strokeWidth={2} />
                Membri activi
              </p>
              <p className="font-semibold text-white">~ 60 seminariști</p>
            </div>
          </CardContent>
        </Card>
      </Reveal>
    </section>
  );
}

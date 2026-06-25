import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Bell,
  CalendarRange,
  Clock,
  Compass,
  GraduationCap,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Orarul seminarului",
  description: `Programul zilei, structura orelor de curs și a slujbelor la Seminarul Teologic Ortodox „${siteConfig.patron}” din ${siteConfig.city}.`,
  alternates: { canonical: "/orar" },
};

type Slot = {
  time: string;
  label: string;
  detail: string;
  Icon: typeof Bell;
};

const DAILY: Slot[] = [
  { time: "07:30", label: "Slujbă de dimineață", detail: "Utrenia în paraclis — obligatorie pentru elevii interni", Icon: Bell },
  { time: "08:00", label: "Ora 1", detail: "Începutul orelor de curs", Icon: GraduationCap },
  { time: "08:50", label: "Pauză · 10 min", detail: "", Icon: Clock },
  { time: "09:00", label: "Ora 2", detail: "", Icon: GraduationCap },
  { time: "09:50", label: "Pauză · 10 min", detail: "", Icon: Clock },
  { time: "10:00", label: "Ora 3", detail: "", Icon: GraduationCap },
  { time: "10:50", label: "Pauza mare · 20 min", detail: "Catina e deschisă pentru gustare", Icon: Clock },
  { time: "11:10", label: "Ora 4", detail: "", Icon: GraduationCap },
  { time: "12:00", label: "Pauză · 10 min", detail: "", Icon: Clock },
  { time: "12:10", label: "Ora 5", detail: "", Icon: GraduationCap },
  { time: "13:00", label: "Pauză · 10 min", detail: "", Icon: Clock },
  { time: "13:10", label: "Ora 6", detail: "", Icon: GraduationCap },
  { time: "14:00", label: "Sfârșitul orelor de curs", detail: "Masa de prânz în cantină pentru elevii interni", Icon: Bell },
  { time: "19:00", label: "Vecernia", detail: "Slujbă de seară în paraclis", Icon: Bell },
  { time: "20:00", label: "Meditație · studiu", detail: "Ore de studiu individual în săli, sub supraveghere", Icon: Compass },
];

export default function OrarPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-parchment pb-[clamp(4rem,9vw,8rem)]">
        <Hero />
        <Schedule />
        <Notes />
      </main>
      <Footer />
    </>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-navy-deep via-navy to-navy-soft pt-32 pb-20 text-white">
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
            Orar
          </h1>
          <p className="mt-2 text-sm uppercase tracking-[0.16em] text-gold-light">
            Anul școlar 2025–2026 · Semestrul II
          </p>
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
            O zi de seminar începe la 07:30 cu utrenia în paraclis și se
            încheie la 21:30 cu rugăciunea de seară. Mai jos găsești structura
            standard a unei zile de cursuri.
          </p>
        </div>
      </div>
    </section>
  );
}

function Schedule() {
  return (
    <section className="wrap mt-16 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
      <Reveal>
        <p className="eyebrow">Programul zilei</p>
        <h2 className="mt-3 font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-tight text-navy text-balance">
          Cum arată o zi de seminar
        </h2>
        <ol className="mt-8 relative space-y-3">
          {DAILY.map((s) => (
            <li
              key={`${s.time}-${s.label}`}
              className="grid grid-cols-[80px_28px_1fr] gap-3 sm:gap-5"
            >
              <span className="pt-1 font-serif text-sm font-semibold text-gold-deep tabular-nums">
                {s.time}
              </span>
              <span
                aria-hidden="true"
                className="relative flex justify-center"
              >
                <span className="absolute left-1/2 top-1.5 bottom-0 w-px -translate-x-1/2 bg-navy/10" />
                <span className="relative inline-flex size-7 items-center justify-center rounded-full border-2 border-gold bg-paper shadow-sm">
                  <s.Icon className="size-3.5 text-gold-deep" strokeWidth={2} />
                </span>
              </span>
              <div className="pb-3">
                <p className="font-sans text-[0.95rem] font-semibold text-navy">
                  {s.label}
                </p>
                {s.detail && (
                  <p className="mt-0.5 text-xs text-pretty text-muted">
                    {s.detail}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </Reveal>

      <Reveal delay={1} className="space-y-4 lg:sticky lg:top-32 lg:self-start">
        <Card className="border-navy/10 bg-paper">
          <CardContent className="space-y-4 p-7">
            <span
              aria-hidden="true"
              className="inline-flex size-12 items-center justify-center rounded-2xl bg-gold/15"
            >
              <CalendarRange className="size-6 text-gold-deep" strokeWidth={1.5} />
            </span>
            <p className="font-serif text-lg font-semibold leading-tight text-navy">
              Orarul detaliat al clasei tale
            </p>
            <p className="text-pretty text-sm leading-relaxed text-ink/80">
              Orarul pe materii și pe profesori este afișat la{" "}
              <strong className="text-navy">avizierul fiecărei clase</strong>{" "}
              și se distribuie de către diriginte în prima săptămână de școală.
              Modificările apar zilnic la avizierul din holul principal.
            </p>
          </CardContent>
        </Card>
        <Card className="border-navy/10 bg-paper">
          <CardContent className="space-y-4 p-7">
            <span
              aria-hidden="true"
              className="inline-flex size-12 items-center justify-center rounded-2xl bg-gold/15"
            >
              <Bell className="size-6 text-gold-deep" strokeWidth={1.5} />
            </span>
            <p className="font-serif text-lg font-semibold leading-tight text-navy">
              Slujbele
            </p>
            <p className="text-pretty text-sm leading-relaxed text-ink/80">
              Slujbele de dimineață (utrenia, 07:30) și de seară (vecernia,
              19:00) sunt parte din formarea vocațională. La sărbătorile mari
              se săvârșește Sfânta Liturghie, începând cu 08:00.
            </p>
            <Link
              href="/campus/paraclis"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-deep transition-all hover:gap-2.5"
            >
              Vezi paraclisul →
            </Link>
          </CardContent>
        </Card>
      </Reveal>
    </section>
  );
}

function Notes() {
  return (
    <section className="wrap mt-24">
      <Reveal>
        <Card className="overflow-hidden border-navy/10 bg-gradient-to-br from-navy-deep to-navy-soft text-white shadow-[var(--shadow-elevated)]">
          <CardContent className="grid gap-8 p-10 md:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="eyebrow text-gold-light!">Întrebări frecvente</p>
              <h2 className="mt-3 text-white! font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-tight">
                Pentru părinți și elevi noi
              </h2>
              <p className="mt-4 max-w-md text-pretty text-white/80">
                Programul de zi se respectă strict. Învoirile se cer
                dirigintelui clasei; pentru cele de mai mult de o zi, cererea
                se depune la secretariat și se aprobă de directorul școlii.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy-deep transition-all hover:-translate-y-0.5 hover:bg-gold-light"
                >
                  Contactează secretariatul
                </Link>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <p className="text-xs uppercase tracking-[0.14em] text-white/55">
                Pauza mare
              </p>
              <p className="font-semibold text-white">10:50 — 11:10</p>
              <p className="mt-3 text-xs uppercase tracking-[0.14em] text-white/55">
                Cantina
              </p>
              <p className="font-semibold text-white">11:00 — 14:30</p>
              <p className="mt-3 text-xs uppercase tracking-[0.14em] text-white/55">
                Studiu individual
              </p>
              <p className="font-semibold text-white">20:00 — 21:00</p>
            </div>
          </CardContent>
        </Card>
      </Reveal>
    </section>
  );
}

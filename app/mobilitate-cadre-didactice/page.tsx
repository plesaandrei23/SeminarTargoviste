import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarClock,
  ClipboardList,
  ExternalLink,
  GraduationCap,
  Info,
  Megaphone,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { DownloadCard } from "@/components/DownloadCard";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Mobilitatea personalului didactic",
  description: `Concursul național de ocupare a posturilor didactice, sesiunea 2026 — la Seminarul Teologic Ortodox „${siteConfig.patron}” din ${siteConfig.city}. Calendar, condiții, documente.`,
  alternates: { canonical: "/mobilitate-cadre-didactice" },
};

type Doc = {
  title: string;
  byline: string;
  href: string;
  /** When true, the link opens in a new tab instead of triggering download. */
  external?: boolean;
};

/**
 * Documents re-hosted to /public/docs/mobilitate from the original
 * assets.zyrosite.com URLs. The legacy CDN survives only until the
 * Hostinger sub is cancelled — these are the canonical copies now.
 */
const DOCS: Doc[] = [
  {
    title: "Procedura Operațională · Mobilitatea personalului didactic 2026–2027",
    byline: "Aviz Seminar 2026 · PDF",
    href: "/docs/mobilitate/procedura-mobilitate-2026-2027.pdf",
  },
  {
    title: "Condiții specifice de mobilitate 2026–2027",
    byline: "Seminarul Teologic Ortodox · PDF",
    href: "/docs/mobilitate/conditii-specifice-mobilitate-2026-2027.pdf",
  },
  {
    title: "Metodologie mobilitate 2026–2027",
    byline: "Ministerul Educației · portal oficial",
    href: "https://www.edu.ro/mobilitatea_personalului_didactic_2026_2027",
    external: true,
  },
  {
    title: "Grafic inspecții la clasă",
    byline: "Religie · PDF",
    href: "/docs/mobilitate/religie-inspectii.pdf",
  },
  {
    title: "Programare inspecții",
    byline: "Inspecții la clasă · PDF",
    href: "/docs/mobilitate/programarea-inspectiilor.pdf",
  },
  {
    title: "Teme inspecție",
    byline: "Susținere inspecții la clasă · PDF",
    href: "/docs/mobilitate/teme-inspectii.pdf",
  },
  {
    title: "Grilă interviu",
    byline: "Interviu candidați · PDF",
    href: "/docs/mobilitate/grila-interviu.pdf",
  },
  {
    title: "Rezultate inspecții — obținere aviz",
    byline: "Rezultate probe aviz · PDF",
    href: "/docs/mobilitate/rezultate-probe-aviz.pdf",
  },
];

export default function MobilitatePage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-parchment pb-[clamp(4rem,9vw,8rem)]">
        <Hero />
        <Announcement />
        <Documents />
        <Cta />
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
          href="/profesori"
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] text-white/65 transition-colors hover:text-gold-light"
        >
          <ArrowLeft className="size-3" strokeWidth={2} />
          Înapoi la profesori
        </Link>
        <div className="mt-8 max-w-3xl">
          <Badge variant="outline" className="border-gold/40 text-gold-light">
            Personal didactic
          </Badge>
          <h1 className="mt-5 text-balance text-white! text-[clamp(2.4rem,5.5vw,4.4rem)] font-semibold leading-[1.05]">
            Mobilitatea personalului didactic
          </h1>
          <p className="mt-2 text-sm uppercase tracking-[0.16em] text-gold-light">
            Sesiunea 2026 · Aviz Seminarul Teologic
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
            Concursul național de ocupare a posturilor didactice — calendar,
            condiții specifice, metodologie și rezultate, pentru candidații
            din sesiunea curentă.
          </p>
        </div>
      </div>
    </section>
  );
}

function Announcement() {
  return (
    <section className="wrap mt-16 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
      <Reveal>
        <Badge variant="outline" className="border-gold/40 text-gold-deep">
          Anunț
        </Badge>
        <h2 className="mt-4 font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-tight text-navy text-balance">
          Tragerea la sorți pentru inspecțiile la clasă
        </h2>
        <p className="mt-5 text-pretty text-[1.05rem] leading-relaxed text-ink/85">
          Tragerea la sorți pentru <strong className="text-navy">inspecțiile
          la clasă / probele practice</strong> din cadrul Concursului
          național de ocupare a posturilor (sesiunea 2026) va avea loc{" "}
          <strong className="text-navy">vineri, 29.05.2026, la ora 14:00</strong>.
        </p>
        <p className="mt-4 text-pretty text-[1.05rem] leading-relaxed text-ink/85">
          Candidații au obligația de a se prezenta la unitatea de învățământ
          la care au fost repartizați. În prezența directorului / directorului
          adjunct va avea loc tragerea la sorți a claselor, a temei, a datei
          și a orei de desfășurare.
        </p>
        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-navy/10 bg-paper p-5">
          <Info className="mt-0.5 size-5 shrink-0 text-gold-deep" strokeWidth={1.75} />
          <p className="text-pretty text-sm text-ink/80">
            <strong className="text-navy">Candidații care nu se prezintă</strong>{" "}
            la tragerea la sorți — extragerea se face de către director, iar
            tabelul centralizat se afișează la avizier în aceeași zi.
          </p>
        </div>
      </Reveal>

      <Reveal delay={1}>
        <Card className="overflow-hidden border-navy/10 bg-navy text-white shadow-[var(--shadow-elevated)]">
          <CardContent className="space-y-6 p-7">
            <div>
              <p className="eyebrow text-gold-light!">Reper</p>
              <h3 className="mt-2 text-white! font-serif text-2xl font-semibold leading-tight">
                Vineri · 29 mai 2026
              </h3>
              <p className="mt-1 text-sm text-white/70">ora 14:00</p>
            </div>

            <div className="space-y-3 border-t border-white/10 pt-5 text-sm">
              <div className="flex items-start gap-3">
                <CalendarClock className="mt-0.5 size-4 text-gold-light" strokeWidth={1.75} />
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-white/55">Eveniment</p>
                  <p className="font-semibold text-white">Tragere la sorți · inspecții la clasă</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <GraduationCap className="mt-0.5 size-4 text-gold-light" strokeWidth={1.75} />
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-white/55">Locație</p>
                  <p className="font-semibold text-white">
                    Seminarul Teologic Ortodox „Sf. Ioan Gură de Aur”
                  </p>
                  <p className="text-white/75">
                    {siteConfig.address.street}, {siteConfig.address.city}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ClipboardList className="mt-0.5 size-4 text-gold-light" strokeWidth={1.75} />
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-white/55">Comisie</p>
                  <p className="font-semibold text-white">
                    Director · Director adjunct
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Reveal>
    </section>
  );
}

function Documents() {
  return (
    <section className="wrap mt-20">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal as="p" className="eyebrow">
          Documente
        </Reveal>
        <Reveal as="h2" delay={1} className="mt-3 text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight">
          Toate documentele dosarului
        </Reveal>
        <Reveal as="p" delay={2} className="mt-4 text-pretty text-muted">
          Procedura, condițiile, calendarul de inspecții, temele, grila de
          interviu și rezultatele probelor — toate într-un singur loc.
        </Reveal>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {DOCS.map((doc, i) => (
          <Reveal key={doc.href} delay={((i % 3) + 1) as 1 | 2 | 3}>
            <DownloadCard
              href={doc.href}
              title={doc.title}
              byline={doc.byline}
              external={doc.external}
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section className="wrap mt-24">
      <Reveal>
        <Card className="overflow-hidden border-navy/10 bg-gradient-to-br from-navy-deep to-navy-soft text-white shadow-[var(--shadow-elevated)]">
          <CardContent className="grid gap-8 p-10 md:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="eyebrow text-gold-light!">Întrebări</p>
              <h2 className="mt-3 text-white! font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-tight">
                Contactează secretariatul
              </h2>
              <p className="mt-4 max-w-md text-pretty text-white/80">
                Pentru orice clarificare legată de procedura de mobilitate
                sau de programul inspecțiilor, secretariatul seminarului
                răspunde în programul de funcționare.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy-deep transition-all hover:-translate-y-0.5 hover:bg-gold-light"
                >
                  <Megaphone className="size-4" strokeWidth={1.75} />
                  Contactează-ne
                </Link>
                <a
                  href="https://seminarortodoxtargoviste.ro/mobilitate-cadre-didactice"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-white hover:bg-white/10"
                >
                  Pagina originală
                  <ExternalLink className="size-4" strokeWidth={1.75} />
                </a>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <p className="text-xs uppercase tracking-[0.14em] text-white/55">
                Telefon
              </p>
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="font-semibold text-white hover:text-gold-light"
              >
                {siteConfig.contact.phoneDisplay}
              </a>
              <p className="text-xs uppercase tracking-[0.14em] text-white/55">
                Email
              </p>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="font-semibold text-white hover:text-gold-light"
              >
                {siteConfig.contact.email}
              </a>
              <p className="text-xs uppercase tracking-[0.14em] text-white/55">
                Program
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

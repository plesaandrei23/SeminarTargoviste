import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  HeartHandshake,
  Megaphone,
  Speech,
  Users,
  Vote,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Consiliul elevilor",
  description: `Consiliul elevilor de la Seminarul Teologic Ortodox „${siteConfig.patron}” din ${siteConfig.city} — rol, structură, cum te alături.`,
  alternates: { canonical: "/consiliul-elevilor" },
};

type Role = {
  Icon: typeof Speech;
  name: string;
  detail: string;
};

const ROLES: Role[] = [
  {
    Icon: Vote,
    name: "Vocea elevilor în C.A.",
    detail:
      "Doi reprezentanți ai Consiliului participă cu drept de vot la ședințele Consiliului de Administrație, conform Legii 198/2023.",
  },
  {
    Icon: Megaphone,
    name: "Inițiative și propuneri",
    detail:
      "Inițiază proiecte educaționale, culturale și caritabile; aduce propuneri către conducere pe teme care țin de viața de elev.",
  },
  {
    Icon: HeartHandshake,
    name: "Mediere și sprijin",
    detail:
      "Sprijină elevii care semnalează nereguli, intermediază comunicarea cu profesorii și cu directorul, contribuie la cultura școlii.",
  },
  {
    Icon: Speech,
    name: "Reprezentare externă",
    detail:
      "Participă la întâlnirile Consiliului Județean al Elevilor (CJE) și la activitățile Consiliului Național al Elevilor (CNE).",
  },
];

export default function ConsiliulElevilorPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-parchment pb-[clamp(4rem,9vw,8rem)]">
        <Hero />
        <Mission />
        <Roles />
        <HowToJoin />
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
            Consiliul elevilor
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
            Forumul prin care elevii seminarului contribuie activ la viața
            școlii — propuneri, inițiative, mediere, reprezentare. Locul în
            care înveți cum se exercită un mandat în practică.
          </p>
        </div>
      </div>
    </section>
  );
}

function Mission() {
  return (
    <section className="wrap mt-16 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
      <Reveal>
        <p className="eyebrow">Ce este Consiliul</p>
        <h2 className="mt-3 font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-tight text-navy text-balance">
          O școală mică de democrație, în interiorul unei școli mari
        </h2>
        <p className="mt-5 text-pretty text-[1.05rem] leading-relaxed text-ink/85">
          Consiliul elevilor este forul de reprezentare a tuturor elevilor
          seminarului. Este alcătuit din câte <strong className="text-navy">doi
          reprezentanți pentru fiecare clasă</strong> (un titular și un
          supleant), aleși democratic la începutul fiecărui an școlar.
        </p>
        <p className="mt-4 text-pretty text-[1.05rem] leading-relaxed text-ink/85">
          Consiliul se întrunește lunar, în prezența consilierului
          educativ, și are propriile organe de conducere — un{" "}
          <strong className="text-navy">președinte</strong>, un{" "}
          <strong className="text-navy">vicepreședinte</strong> și un{" "}
          <strong className="text-navy">secretar</strong> — aleși tot prin vot.
        </p>
        <p className="mt-4 text-pretty text-[1.05rem] leading-relaxed text-ink/85">
          Există o singură condiție: cei aleși trebuie să aibă, pe lângă
          competențele necesare, comportamentul demn al unui seminarist.
          Reprezentarea celorlalți presupune întâi reprezentarea valorilor
          școlii.
        </p>
      </Reveal>

      <Reveal delay={1}>
        <Card className="overflow-hidden border-navy/10 bg-paper">
          <CardContent className="space-y-5 p-7">
            <span
              aria-hidden="true"
              className="inline-flex size-12 items-center justify-center rounded-2xl bg-gold/15"
            >
              <Users className="size-6 text-gold-deep" strokeWidth={1.5} />
            </span>
            <h3 className="font-serif text-lg font-semibold leading-tight text-navy">
              Cadrul legal
            </h3>
            <p className="text-pretty text-sm leading-relaxed text-ink/80">
              Consiliul elevilor funcționează în baza articolelor 80-82 din{" "}
              <strong className="text-navy">Legea învățământului
              preuniversitar nr. 198/2023</strong> și a Regulamentului-cadru
              ROFUÎP (Ordin 4183/2022) — fiind un organism cu drept de
              propunere și de vot în Consiliul de Administrație.
            </p>
            <p className="border-t border-navy/10 pt-5 text-pretty text-sm leading-relaxed text-ink/80">
              La nivel județean și național, Consiliul nostru face parte din{" "}
              <strong className="text-navy">CJE Dâmbovița</strong> și
              participă la activitățile{" "}
              <strong className="text-navy">CNE — Consiliul Național al
              Elevilor</strong>.
            </p>
          </CardContent>
        </Card>
      </Reveal>
    </section>
  );
}

function Roles() {
  return (
    <section className="wrap mt-24">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal as="p" className="eyebrow">
          Ce face
        </Reveal>
        <Reveal as="h2" delay={1} className="mt-3 text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight">
          Patru roluri pentru o școală vie
        </Reveal>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {ROLES.map((r, i) => (
          <Reveal key={r.name} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
            <Card className="h-full border-navy/10 bg-paper transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]">
              <CardContent className="space-y-4 p-7">
                <span
                  aria-hidden="true"
                  className="inline-flex size-12 items-center justify-center rounded-2xl bg-gold/15"
                >
                  <r.Icon className="size-6 text-gold-deep" strokeWidth={1.5} />
                </span>
                <h3 className="font-serif text-xl font-semibold leading-tight text-navy text-balance">
                  {r.name}
                </h3>
                <p className="text-pretty text-sm leading-relaxed text-ink/85">
                  {r.detail}
                </p>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
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
                Trei pași — clasă, vot, mandat
              </h2>
              <ol className="mt-6 space-y-4 text-sm text-white/85">
                <li className="flex items-start gap-3">
                  <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-gold text-xs font-bold text-navy-deep">1</span>
                  <span><strong className="text-white">Anunță-ți candidatura</strong> în prima săptămână de școală, în fața clasei tale.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-gold text-xs font-bold text-navy-deep">2</span>
                  <span><strong className="text-white">Vot secret</strong> al colegilor de clasă — titularul și supleantul cu cele mai multe voturi reprezintă clasa în Consiliu.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-gold text-xs font-bold text-navy-deep">3</span>
                  <span><strong className="text-white">Mandat de un an școlar</strong> · participi la ședințele lunare, propui inițiative, votezi.</span>
                </li>
              </ol>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/profesori"
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy-deep transition-all hover:-translate-y-0.5 hover:bg-gold-light"
                >
                  Consilierul educativ
                  <ArrowRight className="size-4" strokeWidth={1.75} />
                </Link>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <p className="text-xs uppercase tracking-[0.14em] text-white/55">
                Activități recurente
              </p>
              <p className="font-semibold text-white">
                Ziua porților deschise · Bal de absolvire · Acțiuni caritabile
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
            </div>
          </CardContent>
        </Card>
      </Reveal>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarClock,
  CheckCircle2,
  Church,
  ExternalLink,
  Languages,
  Mail,
  Phone,
  Users,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Admitere Filologia — clasa a IX-a",
  description: `Admitere în clasa a IX-a la specializarea Filologia (profil uman) la Seminarul Teologic Ortodox „${siteConfig.patron}” din ${siteConfig.city} — repartiție computerizată națională.`,
  alternates: { canonical: "/admitere/filologia" },
};

const DOCS = [
  "Fișa de înscriere completată la școala generală, cu opțiunile ordonate",
  "Certificat de naștere · original + copie",
  "Foaia matricolă clasele V–VIII",
  "Adeverință medicală cu mențiunea „apt de școlarizare”",
  "Carte de identitate a candidatului · original + copie",
  "Copie carte de identitate părinte / tutore",
];

const SUBJECTS = [
  {
    title: "Limba și literatura română",
    detail: "Studiu aprofundat: 5–6 ore pe săptămână. Textul literar, retorica, redactarea de eseuri.",
  },
  {
    title: "Două limbi moderne",
    detail: "Engleză (limba 1) + o a doua limbă la alegere: franceză, italiană sau germană — 3-4 ore/săpt.",
  },
  {
    title: "Limbi clasice",
    detail: "Latină în ciclul inferior; opțional Greacă veche în ciclul superior — fundamente pentru filologie și teologie.",
  },
  {
    title: "Istorie · Filosofie · Sociologie",
    detail: "Discipline umaniste solide, orientate spre bacalaureat și admitere la facultăți de litere, drept, jurnalism.",
  },
];

export default function AdmitereFilologiaPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-parchment pb-[clamp(4rem,9vw,8rem)]">
        <Hero />
        <Overview />
        <SubjectsSection />
        <DocsSection />
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
          href="/admitere"
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] text-white/65 transition-colors hover:text-gold-light"
        >
          <ArrowLeft className="size-3" strokeWidth={2} />
          Toate programele de admitere
        </Link>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div>
            <Badge variant="outline" className="border-gold/40 text-gold-light">
              Admitere · Filologia
            </Badge>
            <h1 className="mt-5 text-balance text-white! text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.05]">
              Clasa a IX-a · Filologia
            </h1>
            <p className="mt-2 text-sm uppercase tracking-[0.16em] text-gold-light">
              Profil uman · liceu · 4 ani
            </p>
            <p className="mt-6 max-w-2xl text-pretty text-white/85 sm:text-lg">
              Alegerea pentru elevii pasionați de literatură, limbi moderne
              și științe umaniste. Admiterea urmează metodologia națională —
              repartiție computerizată pe baza mediei de admitere.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:max-w-xs lg:max-w-none">
            <Stat value="Uman" label="profil" />
            <Stat value="EN VIII" label="admitere pe" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-4 text-center">
      <p className="font-serif text-xl font-semibold text-white sm:text-2xl">{value}</p>
      <p className="mt-1 text-[0.65rem] uppercase tracking-[0.14em] text-white/65">
        {label}
      </p>
    </div>
  );
}

function Overview() {
  return (
    <section className="wrap mt-16 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
      <Reveal>
        <p className="eyebrow">Cum se admite</p>
        <h2 className="mt-3 font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-tight text-navy text-balance">
          Repartiție computerizată națională
        </h2>
        <p className="mt-5 text-pretty text-[1.05rem] leading-relaxed text-ink/85">
          Filologia este profil <strong className="text-navy">real-uman
          nevocațional</strong>, așa că admiterea urmează metodologia
          națională a Ministerului Educației: repartiție computerizată pe
          baza <strong className="text-navy">mediei de admitere</strong>.
        </p>
        <p className="mt-4 text-pretty text-[1.05rem] leading-relaxed text-ink/85">
          Media de admitere se calculează astfel:
        </p>
        <ul className="mt-4 space-y-3 text-pretty text-[0.98rem] text-ink/85">
          <li className="flex items-start gap-3 rounded-xl border border-navy/10 bg-paper p-4">
            <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-gold/15 text-xs font-bold text-gold-deep">
              80%
            </span>
            <span>
              <strong className="text-navy">Media EN VIII</strong> — media
              aritmetică a celor două probe (română + matematică)
            </span>
          </li>
          <li className="flex items-start gap-3 rounded-xl border border-navy/10 bg-paper p-4">
            <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-gold/15 text-xs font-bold text-gold-deep">
              20%
            </span>
            <span>
              <strong className="text-navy">Media generală V–VIII</strong> —
              din foaia matricolă a gimnaziului
            </span>
          </li>
        </ul>
        <p className="mt-5 text-pretty text-[1.05rem] leading-relaxed text-ink/85">
          Opțiunea pentru Filologia la Seminar se completează în fișa de
          admitere, la același rând cu orice alt liceu din județ. Pentru
          detalii despre codul specializării, consultă avizul ISJ Dâmbovița.
        </p>
      </Reveal>
      <Reveal delay={1}>
        <Card className="overflow-hidden border-navy/10 bg-navy text-white shadow-[var(--shadow-elevated)]">
          <CardContent className="space-y-5 p-7">
            <span
              aria-hidden="true"
              className="inline-flex size-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15"
            >
              <Languages className="size-6 text-gold-light" strokeWidth={1.75} />
            </span>
            <div>
              <p className="eyebrow text-gold-light!">Când se face</p>
              <h3 className="mt-2 text-white! font-serif text-xl font-semibold leading-tight">
                Iulie · după EN VIII
              </h3>
            </div>
            <div className="space-y-3 border-t border-white/10 pt-5 text-sm">
              <div className="flex items-start gap-3">
                <CalendarClock className="mt-0.5 size-4 text-gold-light" strokeWidth={1.75} />
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-white/55">Depunere fișă</p>
                  <p className="font-semibold text-white">iulie · școala generală</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CalendarClock className="mt-0.5 size-4 text-gold-light" strokeWidth={1.75} />
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-white/55">Repartiție</p>
                  <p className="font-semibold text-white">
                    ~ 15 iulie (după procesarea națională)
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CalendarClock className="mt-0.5 size-4 text-gold-light" strokeWidth={1.75} />
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-white/55">Depunere dosar la seminar</p>
                  <p className="font-semibold text-white">
                    ~ 20 iulie (după afișarea rezultatelor)
                  </p>
                </div>
              </div>
            </div>
            <a
              href="https://edu.ro/admitere_liceu_2026"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-gold-light hover:underline"
            >
              Calendar oficial admitere
              <ExternalLink className="size-3.5" strokeWidth={2} />
            </a>
          </CardContent>
        </Card>
      </Reveal>
    </section>
  );
}

function SubjectsSection() {
  return (
    <section className="wrap mt-24">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal as="p" className="eyebrow">
          Ce studiezi
        </Reveal>
        <Reveal
          as="h2"
          delay={1}
          className="mt-3 text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight"
        >
          Disciplinele profilului
        </Reveal>
        <Reveal as="p" delay={2} className="mt-4 text-pretty text-muted">
          Ore în plus la limbă, literatură și limbi moderne — restul
          curriculum-ului național este la fel ca la orice liceu.
        </Reveal>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {SUBJECTS.map((s, i) => (
          <Reveal key={s.title} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
            <Card className="h-full border-navy/10 bg-paper">
              <CardContent className="space-y-3 p-6">
                <h3 className="font-serif text-lg font-semibold leading-tight text-navy text-balance">
                  {s.title}
                </h3>
                <p className="text-pretty text-sm leading-relaxed text-ink/80">
                  {s.detail}
                </p>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function DocsSection() {
  return (
    <section className="wrap mt-24 max-w-3xl">
      <Reveal as="p" className="eyebrow">
        La dosar
      </Reveal>
      <Reveal
        as="h2"
        delay={1}
        className="mt-3 font-serif text-[clamp(1.8rem,3vw,2.4rem)] font-semibold leading-tight text-navy"
      >
        Acte necesare după repartiție
      </Reveal>
      <p className="mt-4 max-w-2xl text-pretty text-muted">
        După ce ai fost repartizat la Seminar prin fișa națională de
        admitere, aduci la secretariat următorul dosar (în intervalul
        stabilit prin Ordin de Ministru, de obicei 20-25 iulie):
      </p>
      <ul className="mt-8 space-y-3">
        {DOCS.map((d, i) => (
          <Reveal
            as="li"
            key={d}
            delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
            className="flex items-start gap-3 rounded-xl border border-navy/10 bg-paper p-4"
          >
            <CheckCircle2
              aria-hidden="true"
              className="mt-0.5 size-5 shrink-0 text-gold-deep"
              strokeWidth={1.75}
            />
            <span className="text-[0.96rem] text-pretty text-ink/85">{d}</span>
          </Reveal>
        ))}
      </ul>
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
              <p className="eyebrow text-gold-light!">Următorul pas</p>
              <h2 className="mt-3 text-white! font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-tight">
                Întrebări despre profil?
              </h2>
              <p className="mt-4 max-w-md text-pretty text-white/80">
                Filologia la Seminar are ceva ce nu găsești la alte licee
                de profil uman — mediul liturgic zilnic, contactul cu
                textul patristic, deschiderea către teologie. Vino la o
                discuție cu diriginta profilului.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy-deep transition-all hover:-translate-y-0.5 hover:bg-gold-light"
                >
                  <Phone className="size-4" strokeWidth={1.75} />
                  Contactează-ne
                </Link>
                <Link
                  href="/admitere/teologie"
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-white hover:bg-white/10"
                >
                  <Church className="size-4" strokeWidth={1.75} />
                  Sau Teologie Pastorală
                </Link>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <p className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-white/55">
                <Users className="size-3.5" strokeWidth={2} />
                Filologie la clasa a IX-a
              </p>
              <p className="font-semibold text-white">
                O clasă, aproximativ 25 elevi
              </p>
              <p className="text-xs uppercase tracking-[0.14em] text-white/55">
                Contact
              </p>
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="font-semibold text-white hover:text-gold-light"
              >
                {siteConfig.contact.phoneDisplay}
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-1.5 font-semibold text-white hover:text-gold-light"
              >
                <Mail className="size-3.5 text-gold-light" strokeWidth={1.75} />
                {siteConfig.contact.email}
              </a>
            </div>
          </CardContent>
        </Card>
      </Reveal>
    </section>
  );
}

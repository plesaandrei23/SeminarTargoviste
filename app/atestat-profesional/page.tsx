import type { Metadata } from "next";
import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Award,
  BookMarked,
  ClipboardList,
  Mic,
  Music2,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Atestat profesional",
  description: `Examenul de atestat profesional la Seminarul Teologic Ortodox „${siteConfig.patron}” din ${siteConfig.city} — disciplinele evaluate și lucrarea de atestat.`,
  alternates: { canonical: "/atestat-profesional" },
};

type Discipline = {
  Icon: typeof Mic;
  name: string;
  detail: string;
};

const DISCIPLINES: Discipline[] = [
  {
    Icon: BookMarked,
    name: "Tipic și Liturgică",
    detail:
      "Cunoștințe despre rânduiala slujbelor, calendarul liturgic, semnificația sărbătorilor — fundamentul slujirii preoțești.",
  },
  {
    Icon: Music2,
    name: "Muzică bisericească",
    detail:
      "Cunoașterea celor opt glasuri ale muzicii bizantine, citirea notației psaltice și interpretarea repertoriului liturgic.",
  },
  {
    Icon: Mic,
    name: "Catehetică și Omiletică",
    detail:
      "Metode de transmitere a învățăturii creștine — predica, conducerea catehezei, comunicarea pastorală.",
  },
];

export default function AtestatPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-parchment pb-[clamp(4rem,9vw,8rem)]">
        <Hero />
        <Overview />
        <Disciplines />
        <Article />
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
            Atestat profesional
          </h1>
          <p className="mt-2 text-sm uppercase tracking-[0.16em] text-gold-light">
            Specializarea Teologie Pastorală · Clasa a XII-a
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
            Examenul vocațional al seminarului — confirmă pregătirea
            absolvenților pentru slujirea în Biserică și pentru continuarea
            studiilor teologice universitare.
          </p>
        </div>
      </div>
    </section>
  );
}

function Overview() {
  return (
    <section className="wrap mt-16 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
      <Reveal>
        <p className="eyebrow">Ce înseamnă</p>
        <h2 className="mt-3 font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-tight text-navy text-balance">
          Două probe pentru atestarea vocațională
        </h2>
        <p className="mt-5 text-pretty text-[1.05rem] leading-relaxed text-ink/85">
          La finalul clasei a XII-a, elevii de la specializarea{" "}
          <strong className="text-navy">Teologie Pastorală</strong> susțin un{" "}
          <strong className="text-navy">examen de atestat</strong> alcătuit din
          două probe: una orală la trei discipline de specialitate și o
          lucrare scrisă pregătită pe parcursul anului.
        </p>
        <p className="mt-4 text-pretty text-[1.05rem] leading-relaxed text-ink/85">
          Examenul se desfășoară cu binecuvântarea Înaltpreasfințitului
          Părinte Arhiepiscop și Mitropolit Nifon și este coordonat de
          comisii mixte din care fac parte cadre didactice ale seminarului
          și delegați ai Arhiepiscopiei.
        </p>
      </Reveal>
      <Reveal delay={1}>
        <Card className="overflow-hidden border-navy/10 bg-navy text-white shadow-[var(--shadow-elevated)]">
          <CardContent className="space-y-6 p-7">
            <span
              aria-hidden="true"
              className="inline-flex size-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15"
            >
              <Award className="size-6 text-gold-light" strokeWidth={1.75} />
            </span>
            <div>
              <p className="eyebrow text-gold-light!">Atestatul</p>
              <h3 className="mt-2 text-white! font-serif text-xl font-semibold leading-tight">
                Diplomă oficială de absolvire vocațională
              </h3>
            </div>
            <p className="text-pretty text-sm leading-relaxed text-white/80">
              Atestatul de absolvire a specializării <strong className="text-white">Teologie
              Pastorală</strong> este emis de Ministerul Educației și recunoscut
              ca dovadă a pregătirii teologice necesare pentru admiterea la
              facultățile de teologie din țară și pentru hirotonirea
              ulterioară, conform rânduielilor canonice.
            </p>
            <div className="space-y-3 border-t border-white/10 pt-5 text-sm">
              <div className="flex items-start gap-3">
                <ClipboardList className="mt-0.5 size-4 text-gold-light" strokeWidth={1.75} />
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-white/55">Componența</p>
                  <p className="font-semibold text-white">Probă orală + lucrare scrisă</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Activity className="mt-0.5 size-4 text-gold-light" strokeWidth={1.75} />
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-white/55">Promovare</p>
                  <p className="font-semibold text-white">Minimum nota 6 la fiecare probă</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Reveal>
    </section>
  );
}

function Disciplines() {
  return (
    <section className="wrap mt-24">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal as="p" className="eyebrow">
          Disciplinele probei orale
        </Reveal>
        <Reveal as="h2" delay={1} className="mt-3 text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight">
          Trei discipline de specialitate
        </Reveal>
        <Reveal as="p" delay={2} className="mt-4 text-pretty text-muted">
          Toate au fost predate sistematic la seminar pe parcursul celor
          patru ani de liceu — la atestat se verifică integrarea lor.
        </Reveal>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {DISCIPLINES.map((d, i) => (
          <Reveal key={d.name} delay={((i % 3) + 1) as 1 | 2 | 3}>
            <Card className="h-full border-navy/10 bg-paper transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]">
              <CardContent className="space-y-5 p-7">
                <span
                  aria-hidden="true"
                  className="inline-flex size-12 items-center justify-center rounded-2xl bg-gold/15"
                >
                  <d.Icon className="size-6 text-gold-deep" strokeWidth={1.5} />
                </span>
                <h3 className="font-serif text-xl font-semibold leading-tight text-navy text-balance">
                  {d.name}
                </h3>
                <p className="text-pretty text-sm leading-relaxed text-ink/85">
                  {d.detail}
                </p>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>

      <Reveal delay={2}>
        <div className="mt-10 flex items-start gap-4 rounded-2xl border border-navy/10 bg-paper p-5">
          <BookMarked className="mt-0.5 size-5 shrink-0 text-gold-deep" strokeWidth={1.75} />
          <p className="text-pretty text-sm text-ink/80">
            <strong className="text-navy">Lucrarea de atestat</strong> este o
            cercetare individuală pregătită pe parcursul anului, sub
            îndrumarea unui profesor coordonator. Temele se aleg la
            începutul clasei a XII-a, din lista propusă de comisie sau prin
            discuție cu profesorul.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

function Article() {
  return (
    <section className="wrap mt-24">
      <Reveal>
        <Card className="overflow-hidden border-navy/10 bg-paper shadow-sm">
          <CardContent className="grid gap-8 p-10 lg:grid-cols-[1.4fr_0.6fr]">
            <div>
              <p className="eyebrow">Din arhivă</p>
              <h2 className="mt-3 font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-tight text-navy">
                Examenul de atestat 2025 la Seminarul Teologic
              </h2>
              <div className="mt-5 space-y-4 text-pretty text-ink/85 leading-relaxed">
                <p>
                  Cu binecuvântarea Înaltpreasfințitului Părinte Arhiepiscop
                  și Mitropolit Nifon, la Seminarul Teologic Ortodox „Sf.
                  Ioan Gură de Aur” din Târgoviște s-a desfășurat examenul de
                  atestat la specializarea Teologie Pastorală.
                </p>
                <p>
                  Elevii au fost evaluați la disciplinele{" "}
                  <strong className="text-navy">Tipic și Liturgică</strong>,{" "}
                  <strong className="text-navy">Muzică bisericească</strong> și{" "}
                  <strong className="text-navy">Catehetică și Omiletică</strong>
                  , iar apoi au susținut câte o lucrare de atestat la una
                  dintre aceste discipline, pregătită pe parcursul anului
                  școlar.
                </p>
                <p>
                  Precizăm că Seminarul Teologic Ortodox „Sf. Ioan Gură de
                  Aur” din Târgoviște are în prezent <strong className="text-navy">350 de
                  elevi</strong>, la gimnaziu, filologie și profilul teologic.
                </p>
              </div>
              <div className="mt-7">
                <Link
                  href="/activitati"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-deep transition-all hover:gap-2.5"
                >
                  Toate activitățile <ArrowRight className="size-4" strokeWidth={1.75} />
                </Link>
              </div>
            </div>
            <aside className="space-y-3 rounded-2xl border border-navy/10 bg-parchment p-6 text-sm">
              <p className="text-xs uppercase tracking-[0.14em] text-gold-deep">
                Elevi în prezent
              </p>
              <p className="font-serif text-3xl font-semibold text-navy">350</p>
              <p className="text-muted">la gimnaziu, filologie și teologie</p>

              <p className="mt-4 text-xs uppercase tracking-[0.14em] text-gold-deep">
                Pentru întrebări
              </p>
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="font-semibold text-navy hover:text-gold-deep"
              >
                {siteConfig.contact.phoneDisplay}
              </a>
            </aside>
          </CardContent>
        </Card>
      </Reveal>
    </section>
  );
}

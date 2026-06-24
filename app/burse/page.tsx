import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Award,
  ClipboardCheck,
  HandHeart,
  Sparkles,
  Trophy,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Burse",
  description: `Tipuri de burse disponibile pentru elevii Seminarului Teologic Ortodox „${siteConfig.patron}” din ${siteConfig.city} — bursa de merit, socială și de performanță.`,
  alternates: { canonical: "/burse" },
};

type Scholarship = {
  Icon: typeof Trophy;
  name: string;
  who: string;
  amount: string;
  detail: string;
};

const SCHOLARSHIPS: Scholarship[] = [
  {
    Icon: Trophy,
    name: "Bursa de merit",
    who: "Elevi cu media generală minimum 9,50",
    amount: "Stabilită anual prin H.G.",
    detail:
      "Pentru elevii care obțin rezultate academice de excelență — medie generală minimum 9,50 și media 10 la purtare. Se acordă anual, în două tranșe.",
  },
  {
    Icon: Award,
    name: "Bursa de performanță",
    who: "Olimpici și premianți la concursuri naționale",
    amount: "Tarif fix · plata lunară",
    detail:
      "Pentru elevii premiați la olimpiade naționale, faza națională, sau la concursuri sportive / culturale recunoscute oficial.",
  },
  {
    Icon: HandHeart,
    name: "Bursa socială",
    who: "Elevi din familii cu venituri reduse",
    amount: "Conform pragului socio-economic",
    detail:
      "Pentru elevii din familii cu venituri sub pragul stabilit de Ministerul Educației, elevii orfani, cei din plasament familial sau cu probleme medicale.",
  },
  {
    Icon: Sparkles,
    name: "Bursa „Bani de liceu”",
    who: "Elevi de liceu cu venit lunar < pragul stabilit",
    amount: "250 lei / lună",
    detail:
      "Program social-național pentru elevii de liceu (clasele IX–XII) ai căror părinți au venit net pe membru de familie sub pragul stabilit prin lege.",
  },
];

export default function BursePage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-parchment pb-[clamp(4rem,9vw,8rem)]">
        <Hero />
        <Types />
        <HowToApply />
        <Calendar />
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
          <h1 className="mt-5 text-balance !text-white text-[clamp(2.4rem,5.5vw,4.4rem)] font-semibold leading-[1.05]">
            Burse
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
            Patru tipuri de burse disponibile pentru elevii seminarului —
            de merit, de performanță, socială și „Bani de liceu”. Cuantumurile
            și criteriile se stabilesc anual prin Hotărâre de Guvern.
          </p>
        </div>
      </div>
    </section>
  );
}

function Types() {
  return (
    <section className="wrap mt-16">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal as="p" className="eyebrow">
          Tipuri de burse
        </Reveal>
        <Reveal as="h2" delay={1} className="mt-3 text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight">
          Patru categorii, criterii distincte
        </Reveal>
        <Reveal as="p" delay={2} className="mt-4 text-pretty text-muted">
          Un elev poate beneficia, în condițiile legii, de mai multe burse
          simultan dacă îndeplinește criteriile pentru fiecare.
        </Reveal>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {SCHOLARSHIPS.map((s, i) => (
          <Reveal key={s.name} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
            <Card className="h-full border-navy/10 bg-paper transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]">
              <CardContent className="space-y-5 p-7">
                <div className="flex items-start justify-between gap-3">
                  <span
                    aria-hidden="true"
                    className="inline-flex size-12 items-center justify-center rounded-2xl bg-gold/15"
                  >
                    <s.Icon className="size-6 text-gold-deep" strokeWidth={1.5} />
                  </span>
                  <span className="rounded-full bg-navy/5 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-navy">
                    {s.amount}
                  </span>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold leading-tight text-navy text-balance">
                    {s.name}
                  </h3>
                  <p className="mt-1.5 text-xs uppercase tracking-[0.14em] text-gold-deep">
                    {s.who}
                  </p>
                </div>
                <p className="text-pretty text-sm leading-relaxed text-ink/85">
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

function HowToApply() {
  const steps = [
    { title: "Cerere tip", body: "Completezi cererea-tip primită de la diriginte sau descărcată de la secretariat." },
    { title: "Acte doveditoare", body: "Adaugi documentele necesare (foaie matricolă, adeverințe de venit, diplome de la olimpiade etc.)." },
    { title: "Depunere la secretariat", body: "Predai dosarul complet la secretariat, în termenul anunțat pentru fiecare tip de bursă." },
    { title: "Aprobare C.A.", body: "Lista bursierilor este aprobată de Consiliul de Administrație și afișată la avizier." },
  ];
  return (
    <section className="wrap mt-24">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal as="p" className="eyebrow">
          Cum se obține
        </Reveal>
        <Reveal as="h2" delay={1} className="mt-3 text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight">
          Patru pași de la cerere la încasare
        </Reveal>
      </div>
      <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <Reveal as="li" key={s.title} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
            <Card className="h-full border-navy/10 bg-paper">
              <CardContent className="space-y-3 p-6">
                <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gold/15 font-serif text-base font-semibold text-gold-deep">
                  {i + 1}
                </span>
                <h3 className="font-serif text-lg font-semibold leading-tight text-navy text-balance">
                  {s.title}
                </h3>
                <p className="text-pretty text-sm leading-relaxed text-ink/80">
                  {s.body}
                </p>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

function Calendar() {
  return (
    <section className="wrap mt-24">
      <Reveal>
        <Card className="overflow-hidden border-navy/10 bg-gradient-to-br from-navy-deep to-navy-soft text-white shadow-[var(--shadow-elevated)]">
          <CardContent className="grid gap-8 p-10 md:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="eyebrow !text-gold-light">Calendar</p>
              <h2 className="mt-3 !text-white font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-tight">
                Termene de depunere
              </h2>
              <p className="mt-4 max-w-md text-pretty text-white/80">
                Termenele exacte se anunță la avizier și pe pagina de
                avizier electronic, în primele 30 de zile de la începutul
                fiecărui semestru. Burse se depun, în general, în primele 2
                săptămâni de școală.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy-deep transition-all hover:-translate-y-0.5 hover:bg-gold-light"
                >
                  <ClipboardCheck className="size-4" strokeWidth={1.75} />
                  Cere informații
                </Link>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <p className="text-xs uppercase tracking-[0.14em] text-white/55">
                Secretariat · burse
              </p>
              <p className="font-semibold text-white">
                {siteConfig.contact.hours}
              </p>
              <p className="mt-3 text-xs uppercase tracking-[0.14em] text-white/55">
                Telefon
              </p>
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="font-semibold text-white hover:text-gold-light"
              >
                {siteConfig.contact.phoneDisplay}
              </a>
            </div>
          </CardContent>
        </Card>
      </Reveal>
    </section>
  );
}

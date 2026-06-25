import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Church,
  Compass,
  Heart,
  Target,
  Users,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Misiune și viziune",
  description: `Misiunea, viziunea și valorile Seminarului Teologic Ortodox „${siteConfig.patron}” din ${siteConfig.city} — formare teologică, academică și morală.`,
  alternates: { canonical: "/misiune-si-viziune" },
};

type Value = {
  Icon: typeof Heart;
  title: string;
  body: string;
};

const VALUES: Value[] = [
  {
    Icon: Church,
    title: "Vocație",
    body:
      "Slujirea Bisericii nu se învață doar din cărți — se trăiește. Programul liturgic zilnic, spovedania săptămânală și viața în comunitate sunt parte din formare, nu activități în plus.",
  },
  {
    Icon: BookOpen,
    title: "Rigoare academică",
    body:
      "Teologia, limbile clasice, științele exacte, literatura — fiecare disciplină predată la nivel de exigență universitară, cu profesori care țin la programa lor.",
  },
  {
    Icon: Heart,
    title: "Caracter",
    body:
      "Educăm tineri care își asumă responsabilitatea pentru gândurile, vorbele și faptele lor — în școală, în Biserică și în lume.",
  },
  {
    Icon: Users,
    title: "Comunitate",
    body:
      "O școală mică în care fiecare elev este cunoscut pe nume — de duhovnici, de profesori, de colegi. Internatul devine, pentru mulți, a doua casă.",
  },
];

export default function MisiuneViziunePage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-parchment pb-[clamp(4rem,9vw,8rem)]">
        <Hero />
        <Mission />
        <Vision />
        <Values />
        <Bridge />
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
            Despre școală
          </Badge>
          <h1 className="mt-5 text-balance text-white! text-[clamp(2.4rem,5.5vw,4.4rem)] font-semibold leading-[1.05]">
            Misiune și viziune
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
            Ce ne propunem să facem, încotro mergem, și pe ce ne sprijinim în
            drum — într-o frază pentru fiecare, și în detaliu mai jos.
          </p>
        </div>
      </div>
    </section>
  );
}

function Mission() {
  return (
    <section className="wrap mt-16 grid gap-10 lg:grid-cols-[0.45fr_1fr] lg:gap-14">
      <Reveal>
        <div className="lg:sticky lg:top-32 lg:self-start">
          <span
            aria-hidden="true"
            className="inline-flex size-14 items-center justify-center rounded-2xl bg-gold/15"
          >
            <Target className="size-7 text-gold-deep" strokeWidth={1.5} />
          </span>
          <p className="mt-5 text-xs uppercase tracking-[0.14em] text-gold-deep">
            Misiune
          </p>
          <h2 className="mt-2 font-serif text-[clamp(1.8rem,3vw,2.4rem)] font-semibold leading-tight text-navy text-balance">
            Ce facem aici
          </h2>
        </div>
      </Reveal>
      <Reveal delay={1} className="space-y-5">
        <p className="text-pretty text-[1.08rem] leading-relaxed text-ink/85">
          Suntem o școală a misiunii creștine în societatea timpului nostru,
          care formează oameni pregătiți să transmită și să păstreze valorile
          axiologice ce generează și aprofundează{" "}
          <strong className="text-navy">binele, adevărul și frumosul</strong>.
        </p>
        <p className="text-pretty text-[1.05rem] leading-relaxed text-ink/85">
          Pregătim viitori slujitori ai Bisericii Ortodoxe Române — preoți,
          cântăreți, profesori de religie — într-un mediu vocațional care
          îmbină disciplina liturgică zilnică cu o programă academică riguroasă.
          În același timp, pentru elevii care nu aleg cariera bisericească,
          seminarul rămâne un mediu de creștere intelectuală și morală solid,
          care îi pregătește pentru orice traseu universitar.
        </p>
        <p className="text-pretty text-[1.05rem] leading-relaxed text-ink/85">
          De peste 30 de ani, sub oblăduirea Arhiepiscopiei Târgoviștei,
          ținem deschis acest spațiu de formare la întâlnirea dintre Biserică,
          școală și familie.
        </p>
      </Reveal>
    </section>
  );
}

function Vision() {
  return (
    <section className="wrap mt-20 grid gap-10 lg:grid-cols-[0.45fr_1fr] lg:gap-14">
      <Reveal>
        <div className="lg:sticky lg:top-32 lg:self-start">
          <span
            aria-hidden="true"
            className="inline-flex size-14 items-center justify-center rounded-2xl bg-gold/15"
          >
            <Compass className="size-7 text-gold-deep" strokeWidth={1.5} />
          </span>
          <p className="mt-5 text-xs uppercase tracking-[0.14em] text-gold-deep">
            Viziune
          </p>
          <h2 className="mt-2 font-serif text-[clamp(1.8rem,3vw,2.4rem)] font-semibold leading-tight text-navy text-balance">
            Încotro mergem
          </h2>
        </div>
      </Reveal>
      <Reveal delay={1} className="space-y-5">
        <p className="text-pretty text-[1.08rem] leading-relaxed text-ink/85">
          Ne dorim să fim, pentru fiecare generație, o școală care
          <strong className="text-navy"> formează caractere și nu doar
          carnete de note</strong>. Tineri care, după patru ani la seminar,
          gândesc limpede, se exprimă corect, citesc o slujbă și o pagină de
          literatură universală cu aceeași seriozitate.
        </p>
        <p className="text-pretty text-[1.05rem] leading-relaxed text-ink/85">
          Vrem ca absolvenții noștri să fie căutați și apreciați — în
          facultățile de teologie, dar și în universitățile laice; în
          parohii, dar și în societate. Să poarte cu ei, oriunde ajung,
          mărturia că un seminar serios formează oameni serioși.
        </p>
        <p className="text-pretty text-[1.05rem] leading-relaxed text-ink/85">
          Pentru asta, investim continuu în corpul profesoral, în spațiile
          școlii și în relația deschisă cu părinții, parohiile și comunitatea
          academică.
        </p>
      </Reveal>
    </section>
  );
}

function Values() {
  return (
    <section className="wrap mt-24">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal as="p" className="eyebrow">
          Valori
        </Reveal>
        <Reveal as="h2" delay={1} className="mt-3 text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight">
          Pe ce ne sprijinim în drum
        </Reveal>
        <Reveal as="p" delay={2} className="mt-4 text-pretty text-muted">
          Patru repere care ne țin direcția, indiferent de generația care
          intră pe poartă în septembrie.
        </Reveal>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {VALUES.map((v, i) => (
          <Reveal key={v.title} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
            <Card className="h-full border-navy/10 bg-paper transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]">
              <CardContent className="flex h-full flex-col gap-5 p-7">
                <span
                  aria-hidden="true"
                  className="inline-flex size-12 items-center justify-center rounded-2xl bg-gold/15"
                >
                  <v.Icon className="size-6 text-gold-deep" strokeWidth={1.5} />
                </span>
                <h3 className="font-serif text-xl font-semibold leading-tight text-navy text-balance">
                  {v.title}
                </h3>
                <p className="text-pretty text-[0.96rem] leading-relaxed text-ink/85">
                  {v.body}
                </p>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Bridge() {
  return (
    <section className="wrap mt-24">
      <Reveal>
        <Card className="overflow-hidden border-navy/10 bg-gradient-to-br from-navy-deep to-navy-soft text-white shadow-[var(--shadow-elevated)]">
          <CardContent className="grid gap-8 p-10 md:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="eyebrow text-gold-light!">Cum se traduce în viața de zi cu zi</p>
              <h2 className="mt-3 text-white! font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-tight">
                Vezi cum arată o zi de seminar
              </h2>
              <p className="mt-4 max-w-md text-pretty text-white/80">
                Misiunea și valorile prind formă prin lucruri concrete —
                slujba de dimineață, ora de Liturgică, repetiția de cor,
                pauza de prânz la cantină, ora de meditație de seară.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/campus"
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy-deep transition-all hover:-translate-y-0.5 hover:bg-gold-light"
                >
                  Explorează campusul
                  <ArrowRight className="size-4" strokeWidth={1.75} />
                </Link>
                <Link
                  href="/istoric"
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-white hover:bg-white/10"
                >
                  Istoricul școlii
                </Link>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <p className="text-xs uppercase tracking-[0.14em] text-white/55">
                Hramul școlii
              </p>
              <p className="font-serif text-xl font-semibold text-white">
                Sf. Ioan Gură de Aur
              </p>
              <p className="text-xs uppercase tracking-[0.14em] text-white/55">
                Sub oblăduirea
              </p>
              <p className="font-semibold text-white">
                Arhiepiscopiei Târgoviștei
              </p>
              <p className="text-xs uppercase tracking-[0.14em] text-white/55">
                Avem
              </p>
              <p className="font-semibold text-white">
                Gimnaziu · Teologie pastorală · Filologie
              </p>
            </div>
          </CardContent>
        </Card>
      </Reveal>
    </section>
  );
}

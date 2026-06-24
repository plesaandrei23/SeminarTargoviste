import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Crown, Sparkles } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Istoric",
  description: `Povestea Seminarului Teologic Ortodox „${siteConfig.patron}” din ${siteConfig.city}, de la reînființare în 1992 până astăzi.`,
  alternates: { canonical: "/istoric" },
};

type Section = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
};

const SECTIONS: Section[] = [
  {
    eyebrow: "1991 — 1992",
    title: "O nouă școală a misiunii și vocației",
    paragraphs: [
      "După evenimentele din 1989, când regimul comunist a fost înlăturat, pentru Biserica Ortodoxă Română a început o perioadă de revigorare. Au fost înființate noi eparhii și instituții teologice, iar la Târgoviște, vechea Capitală a Țării Românești, acest pas era firesc și necesar.",
      "La 3 septembrie 1991 a fost reînființată Arhiepiscopia Târgoviștei, iar episcopul vicar patriarhal dr. Vasile Costin a fost ales și înscăunat ca Arhiepiscop. După mai bine de trei secole, din 1668, când Mitropolia fusese mutată la București, Târgoviștea avea din nou ierarh.",
      "În anul școlar 1992–1993, Seminarul Teologic „Sfântul Ioan Gură de Aur” și-a deschis porțile cu patru clase: două clase a IX-a, prin examen de admitere, și două clase a X-a, prin transferul unor elevi de la seminariile din București, Turnu Măgurele și Pitești.",
    ],
  },
  {
    eyebrow: "1999 — astăzi",
    title: "Înnoire, identitate și progres",
    paragraphs: [
      "Un moment important în evoluția școlii a fost anul 1999, când Înaltpreasfințitul Părinte Nifon a fost instalat ca Arhiepiscop al Târgoviștei. Sub îndrumarea sa, activitatea educațională și misionară a Seminarului a cunoscut o dezvoltare susținută ce continuă și astăzi într-un mod alert și competent.",
      "În perioada 1999–2011, director al Seminarului a fost pr. prof. Gheorghe Safta. În acești ani, instituția a trecut printr-un amplu proces de reorganizare și modernizare.",
      "În 2003 a fost renovat parterul internatului. În 2004 a fost reamenajată cantina. În 2007 a fost realizată izolarea termică a clădirii și a început construirea unui nou corp de școală. În 2009 au fost finalizate lucrările de reabilitare și extindere — noua clădire a permis amenajarea spațiilor pentru clasele cu profil filologic, a cancelariei, a birourilor administrative și a unui nou paraclis. Sfințirea lucrărilor a avut loc la 13 noiembrie 2009, de sărbătoarea Sfântului Ioan Gură de Aur, ocrotitorul spiritual al școlii.",
    ],
  },
  {
    eyebrow: "2006 — 2010",
    title: "Diversitate și unitate",
    paragraphs: [
      "În anul școlar 2006–2007, oferta educațională a fost diversificată prin introducerea profilului filologic, răspunzând astfel nevoilor unei formări culturale mai ample.",
      "Începând cu anul școlar 2009–2010, au fost înființate clasele de gimnaziu (V–VIII), acreditate ulterior de Ministerul Educației, fapt care a asigurat continuitatea formării elevilor într-un cadru unitar.",
      "Participarea la olimpiade și concursuri școlare, activitatea apreciată a Corului Seminarului, precum și numărul absolvenților care au continuat studiile în instituții de învățământ superior din țară și din străinătate confirmă seriozitatea și nivelul academic al școlii.",
    ],
  },
];

type Director = { years: string; name: string; note?: string };

const DIRECTORS: Director[] = [
  { years: "1992 – 1993", name: "Pr. prof. Ioan Stan", note: "Primul director — a pus bazele organizării instituționale." },
  { years: "1993 – 1996", name: "Pr. prof. Ioan Ștefănescu", note: "În 1994 înființează Școala de Cântăreți bisericești (228 absolvenți), tot atunci amenajează paraclisul școlii." },
  { years: "1996 – 1999", name: "Pr. prof. Alexandru Moțoc" },
  { years: "1999 – 2011", name: "Pr. prof. Gheorghe Safta", note: "Amplu proces de reorganizare și modernizare a clădirilor." },
  { years: "2011 – 2015", name: "Pr. prof. dr. Mihail Iulian Stan" },
  { years: "2015 – 2018", name: "Arhid. dr. prof. Bogdan-Petru Hrestic" },
  { years: "2018 – 2025", name: "Pr. prof. dr. Marin Bugiulescu" },
  {
    years: "februarie 2025 →",
    name: "Pr. prof. Alin-Marian Pleșa",
    note: "Cu Înalta binecuvântare a IPS Nifon — consolidarea identității teologice, întărirea disciplinei academice și formarea integrală a elevului.",
  },
];

export default function IstoricPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-parchment pb-[clamp(4rem,9vw,8rem)]">
        <Hero />
        <Intro />
        <Sections />
        <DirectorsTimeline />
        <ClosingNote />
      </main>
      <Footer />
    </>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-navy-deep via-navy to-navy-soft pt-32 pb-24 text-white">
      <Image
        src="/campus/intrare-arc.jpg"
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
        <div className="mt-10 max-w-3xl">
          <Badge variant="outline" className="border-gold/40 text-gold-light">
            Despre școală
          </Badge>
          <h1 className="mt-5 text-balance !text-white text-[clamp(2.4rem,5.5vw,4.4rem)] font-semibold leading-[1.05]">
            Istoric
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
            De la reînființarea Arhiepiscopiei Târgoviștei în 1991 până astăzi
            — povestea unei școli a vocației și a misiunii, fidelă moștenirii
            sale și deschisă timpului prezent.
          </p>
        </div>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section className="wrap mt-16 max-w-3xl">
      <Reveal as="p" className="eyebrow">
        Începuturile
      </Reveal>
      <Reveal as="h2" delay={1} className="mt-3 text-[clamp(1.6rem,2.6vw,2.1rem)] font-serif font-semibold leading-tight text-navy">
        O școală care a luat naștere odată cu eparhia
      </Reveal>
      <Reveal as="p" delay={2} className="mt-4 text-pretty text-ink/85 sm:text-lg leading-relaxed">
        Seminarul Teologic Ortodox „Sfântul Ioan Gură de Aur” din Târgoviște
        a luat naștere în 1992, la doar un an după reînființarea Arhiepiscopiei
        Târgoviștei. În urma demersurilor făcute de mai mulți preoți și
        profesori, cu aprobarea Sfântului Sinod, școala și-a deschis porțile
        cu patru clase.
      </Reveal>
    </section>
  );
}

function Sections() {
  return (
    <section className="wrap mt-20 space-y-16">
      {SECTIONS.map((sec, i) => (
        <article key={sec.title} className="grid gap-8 lg:grid-cols-[0.35fr_1fr] lg:gap-14">
          <Reveal>
            <div className="lg:sticky lg:top-32 lg:self-start">
              <p className="text-xs uppercase tracking-[0.14em] text-gold-deep">
                {sec.eyebrow}
              </p>
              <h2 className="mt-3 font-serif text-[clamp(1.6rem,2.6vw,2.1rem)] font-semibold leading-tight text-navy text-balance">
                {sec.title}
              </h2>
              <div className="mt-5 flex items-center gap-3 text-xs text-muted">
                <Calendar className="size-4 text-gold-deep" strokeWidth={1.75} />
                <span>Capitolul {String(i + 1).padStart(2, "0")}</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={1} className="space-y-5">
            {sec.paragraphs.map((p, idx) => (
              <p key={idx} className="text-pretty text-[1.05rem] leading-relaxed text-ink/85">
                {p}
              </p>
            ))}
          </Reveal>
        </article>
      ))}
    </section>
  );
}

function DirectorsTimeline() {
  return (
    <section className="wrap mt-24">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal as="p" className="eyebrow">
          Organizare și management
        </Reveal>
        <Reveal as="h2" delay={1} className="mt-3 text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight">
          Cei care au condus seminarul
        </Reveal>
        <Reveal as="p" delay={2} className="mt-4 text-pretty text-muted">
          De-a lungul timpului, Seminarul a fost coordonat de mai mulți
          directori care au contribuit la consolidarea identității sale.
        </Reveal>
      </div>

      <ol className="mt-14 relative mx-auto max-w-3xl">
        {/* timeline rail */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-2 bottom-2 w-px bg-navy/15 sm:left-1/2"
        />
        {DIRECTORS.map((d, i) => (
          <Reveal as="li" key={d.name} delay={((i % 4) + 1) as 1 | 2 | 3 | 4} className="relative pl-12 pb-10 last:pb-0 sm:pl-0">
            <div className={`sm:grid sm:grid-cols-2 sm:gap-10 ${i % 2 === 1 ? "sm:[direction:rtl]" : ""}`}>
              <div className={`${i % 2 === 1 ? "sm:text-left sm:[direction:ltr]" : ""}`}>
                {/* node */}
                <span
                  aria-hidden="true"
                  className="absolute left-2.5 top-1.5 inline-flex size-4 items-center justify-center rounded-full border-2 border-gold bg-paper shadow-sm sm:left-1/2 sm:-ml-2"
                />
                <Card className="border-navy/10 bg-paper">
                  <CardContent className="space-y-2 p-5">
                    <p className="text-xs uppercase tracking-[0.14em] text-gold-deep">
                      {d.years}
                    </p>
                    <p className="font-serif text-lg font-semibold leading-tight text-navy text-balance">
                      {d.name}
                    </p>
                    {d.note && (
                      <p className="text-pretty text-sm text-ink/80">
                        {d.note}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>
              <div className="hidden sm:block" />
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

function ClosingNote() {
  return (
    <section className="wrap mt-24">
      <Reveal>
        <Card className="overflow-hidden border-navy/10 bg-gradient-to-br from-navy-deep to-navy-soft text-white shadow-[var(--shadow-elevated)]">
          <CardContent className="grid gap-8 p-10 md:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="eyebrow !text-gold-light">Misiune și responsabilitate</p>
              <h2 className="mt-3 !text-white font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-tight">
                O școală a vocației și a misiunii
              </h2>
              <p className="mt-4 max-w-md text-pretty text-white/80">
                „Sfântul Ioan Gură de Aur” din Târgoviște continuă să fie o
                școală a vocației și a misiunii, fidelă moștenirii sale
                istorice și deschisă provocărilor prezentului. Teologia
                înseamnă adevăr, speranță și viață — în acest spirit, Seminarul
                pregătește nu doar viitori slujitori ai Bisericii, ci și
                tineri responsabili, capabili să contribuie activ la viața
                societății.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/misiune-si-viziune"
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy-deep transition-all hover:-translate-y-0.5 hover:bg-gold-light"
                >
                  <Sparkles className="size-4" strokeWidth={1.75} />
                  Misiune și viziune
                </Link>
                <Link
                  href="/director"
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-white hover:bg-white/10"
                >
                  <Crown className="size-4" strokeWidth={1.75} />
                  Mesajul directorului
                </Link>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <p className="text-xs uppercase tracking-[0.14em] text-white/55">
                Patron
              </p>
              <p className="font-serif text-xl font-semibold text-white">
                Sf. Ioan Gură de Aur
              </p>
              <p className="text-xs uppercase tracking-[0.14em] text-white/55">
                Hram
              </p>
              <p className="font-semibold text-white">13 noiembrie</p>
              <p className="text-xs uppercase tracking-[0.14em] text-white/55">
                Sub oblăduirea
              </p>
              <p className="font-semibold text-white">
                Arhiepiscopiei Târgoviștei
              </p>
            </div>
          </CardContent>
        </Card>
      </Reveal>
    </section>
  );
}

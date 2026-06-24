import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpenCheck,
  CalendarClock,
  ExternalLink,
  GraduationCap,
  ScrollText,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Bacalaureat",
  description: `Examenul național de bacalaureat la Seminarul Teologic Ortodox „${siteConfig.patron}” din ${siteConfig.city} — structură, calendar, probe.`,
  alternates: { canonical: "/bacalaureat" },
};

const PROBES = [
  {
    code: "A",
    title: "Evaluarea competențelor lingvistice (Limba și literatura română)",
    detail: "Probă scrisă · 180 min · cunoștințe din toate domeniile literaturii române.",
  },
  {
    code: "B",
    title: "Evaluarea competențelor lingvistice (limba modernă)",
    detail: "Probă orală + scrisă · una din limbile studiate (engleză, franceză, italiană, spaniolă, germană).",
  },
  {
    code: "C",
    title: "Evaluarea competențelor digitale",
    detail: "Probă practică pe calculator · operare Office, internet, comunicare digitală.",
  },
  {
    code: "Ea",
    title: "Limba și literatura română",
    detail: "Probă scrisă · 180 min · 3 subiecte, fiecare cu mai multe cerințe.",
  },
  {
    code: "Eb",
    title: "Probă obligatorie a profilului",
    detail: "Matematică (real / mate-info) sau Istorie (uman / filologie).",
  },
  {
    code: "Ec",
    title: "Probă la alegere a profilului",
    detail: "O disciplină din lista MEC, în funcție de profilul și specializarea de la liceu.",
  },
];

export default function BacalaureatPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-parchment pb-[clamp(4rem,9vw,8rem)]">
        <Hero />
        <Overview />
        <Probe />
        <Sources />
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
            Bacalaureat
          </h1>
          <p className="mt-2 text-sm uppercase tracking-[0.16em] text-gold-light">
            Examen național · Sesiunea iunie-iulie
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
            Examenul național de bacalaureat — structura probelor, calendarul
            sesiunii și resursele oficiale ale Ministerului Educației.
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
        <p className="eyebrow">Despre examen</p>
        <h2 className="mt-3 font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-tight text-navy text-balance">
          Două blocuri de probe — A/B/C și E
        </h2>
        <p className="mt-5 text-pretty text-[1.05rem] leading-relaxed text-ink/85">
          Bacalaureatul are <strong className="text-navy">șase probe</strong>{" "}
          împărțite în două blocuri. Probele A, B și C evaluează competențele
          (limba română, limbă modernă, competențe digitale) — se susțin în
          perioada școlară, fără note sub formă de calificative. Probele E
          (a, b, c) sunt cele scrise, cu notă, care contează la admitere la
          facultate.
        </p>
        <p className="mt-4 text-pretty text-[1.05rem] leading-relaxed text-ink/85">
          Pentru promovarea bacalaureatului, candidatul trebuie să obțină
          <strong className="text-navy"> minimum 5 la fiecare probă scrisă</strong>{" "}
          (Ea, Eb, Ec) și o <strong className="text-navy">medie minimă de 6</strong>{" "}
          între cele trei.
        </p>
      </Reveal>
      <Reveal delay={1}>
        <Card className="overflow-hidden border-navy/10 bg-navy text-white shadow-[var(--shadow-elevated)]">
          <CardContent className="space-y-6 p-7">
            <div>
              <p className="eyebrow !text-gold-light">Calendar standard</p>
              <h3 className="mt-2 !text-white font-serif text-xl font-semibold leading-tight">
                Sesiunea de vară
              </h3>
            </div>
            <div className="space-y-3 border-t border-white/10 pt-5 text-sm">
              <Row label="Probele A, B, C" value="iunie · perioada școlară" Icon={CalendarClock} />
              <Row label="Probele E scrise" value="iunie-iulie · după încheierea cursurilor" Icon={ScrollText} />
              <Row label="Rezultate inițiale" value="prima decadă a lunii iulie" Icon={GraduationCap} />
              <Row label="Sesiunea de toamnă" value="august-septembrie · pentru cei care nu au promovat" Icon={BookOpenCheck} />
            </div>
            <p className="border-t border-white/10 pt-5 text-xs text-white/65">
              Calendarul exact se publică în fiecare an de Ministerul Educației,
              prin Ordin de Ministru, până la 1 octombrie.
            </p>
          </CardContent>
        </Card>
      </Reveal>
    </section>
  );
}

function Row({
  label,
  value,
  Icon,
}: {
  label: string;
  value: string;
  Icon: typeof CalendarClock;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 size-4 shrink-0 text-gold-light" strokeWidth={1.75} />
      <div>
        <p className="text-xs uppercase tracking-[0.14em] text-white/55">{label}</p>
        <p className="font-semibold text-white">{value}</p>
      </div>
    </div>
  );
}

function Probe() {
  return (
    <section className="wrap mt-24">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal as="p" className="eyebrow">
          Probe
        </Reveal>
        <Reveal as="h2" delay={1} className="mt-3 text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight">
          Cele șase probe ale bacalaureatului
        </Reveal>
      </div>
      <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PROBES.map((p, i) => (
          <Reveal as="li" key={p.code} delay={((i % 3) + 1) as 1 | 2 | 3}>
            <Card className="h-full border-navy/10 bg-paper transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)]">
              <CardContent className="space-y-3 p-6">
                <span className="inline-flex h-10 min-w-10 items-center justify-center rounded-xl bg-gold/15 px-3 font-serif text-sm font-semibold text-gold-deep">
                  Proba {p.code}
                </span>
                <h3 className="font-serif text-lg font-semibold leading-tight text-navy text-balance">
                  {p.title}
                </h3>
                <p className="text-pretty text-sm leading-relaxed text-ink/80">
                  {p.detail}
                </p>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

function Sources() {
  return (
    <section className="wrap mt-24">
      <Reveal>
        <Card className="overflow-hidden border-navy/10 bg-gradient-to-br from-navy-deep to-navy-soft text-white shadow-[var(--shadow-elevated)]">
          <CardContent className="grid gap-8 p-10 md:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="eyebrow !text-gold-light">Resurse oficiale</p>
              <h2 className="mt-3 !text-white font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-tight">
                Programa, modele, subiecte
              </h2>
              <p className="mt-4 max-w-md text-pretty text-white/80">
                Programa de examen, modelele de subiecte și subiectele din
                anii anteriori sunt publicate pe portalul Ministerului
                Educației — subiecte.edu.ro.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://subiecte.edu.ro/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy-deep transition-all hover:-translate-y-0.5 hover:bg-gold-light"
                >
                  subiecte.edu.ro
                  <ExternalLink className="size-4" strokeWidth={1.75} />
                </a>
                <a
                  href="https://bacalaureat.edu.ro/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-white hover:bg-white/10"
                >
                  Centru BAC
                  <ExternalLink className="size-4" strokeWidth={1.75} />
                </a>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <p className="text-xs uppercase tracking-[0.14em] text-white/55">
                Secretariat
              </p>
              <p className="font-semibold text-white">
                {siteConfig.contact.hours}
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

import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Award,
  Compass,
  ExternalLink,
  Globe2,
  Languages,
  MapPin,
  Sparkles,
  Users,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { DownloadCard } from "@/components/DownloadCard";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Erasmus+",
  description: `Acreditarea Erasmus+ a Seminarului Teologic Ortodox „${siteConfig.patron}” din ${siteConfig.city} — proiecte, mobilități, rezultate.`,
  alternates: { canonical: "/erasmus" },
};

type Mobility = {
  city: string;
  country: string;
  dates: string;
  reportUrl: string;
};

const MOBILITIES: Mobility[] = [
  {
    city: "Roma",
    country: "Italia",
    dates: "19 – 24 februarie 2024",
    reportUrl: "/docs/erasmus/raport-roma-2024.pdf",
  },
  {
    city: "Florența",
    country: "Italia",
    dates: "19 – 24 februarie 2024",
    reportUrl: "/docs/erasmus/raport-florenta-2024.pdf",
  },
  {
    city: "Barcelos",
    country: "Portugalia",
    dates: "21 – 27 aprilie 2024",
    reportUrl: "/docs/erasmus/raport-barcelos-2024.pdf",
  },
];

type DocGroup = {
  title: string;
  description: string;
  docs: { title: string; byline: string; href: string }[];
};

const APPLY_DOCS: DocGroup = {
  title: "Dosar candidatură elevi",
  description:
    "Documentele necesare pentru depunerea candidaturii la mobilitățile Erasmus+, pentru elevi.",
  docs: [
    {
      title: "Metodologie de selecție",
      byline: "Procedura completă · PDF",
      href: "/docs/erasmus/metodologie-selectie.pdf",
    },
    {
      title: "Anexa 8 · Cerere de înscriere",
      byline: "Pentru elevi · PDF",
      href: "/docs/erasmus/anexa-8-cerere-inscriere-elevi.pdf",
    },
    {
      title: "Anexa 9 · Acord de participare",
      byline: "Elevi minori · PDF",
      href: "/docs/erasmus/anexa-9-acord-participare-elevi.pdf",
    },
    {
      title: "Anexa 9.1 · Acord elev major",
      byline: "PDF",
      href: "/docs/erasmus/anexa-9_1-acord-elev-major.pdf",
    },
    {
      title: "Anexa 10 · Consimțământ GDPR",
      byline: "Date personale elevi · PDF",
      href: "/docs/erasmus/anexa-10-gdpr-elevi.pdf",
    },
    {
      title: "Anexa 11 · Acord prelucrare imagine",
      byline: "PDF",
      href: "/docs/erasmus/anexa-11-imagine-elevi.pdf",
    },
    {
      title: "Anexa 12 · Oportunități reduse",
      byline: "Chestionar · PDF",
      href: "/docs/erasmus/anexa-12-oportunitati-elevi.pdf",
    },
    {
      title: "Anexa 13 · Angajament de disponibilitate",
      byline: "Elevi · PDF",
      href: "/docs/erasmus/anexa-13-disponibilitate-elevi.pdf",
    },
  ],
};

const TEACHER_DOCS: DocGroup = {
  title: "Dosar candidatură profesori",
  description:
    "Documentele necesare pentru cadrele didactice care candidează la mobilitățile Erasmus+.",
  docs: [
    {
      title: "Anexa 1 · Cerere de înscriere",
      byline: "PDF",
      href: "/docs/erasmus/anexa-1-cerere-inscriere.pdf",
    },
    {
      title: "Anexa 2 · Fișă autoevaluare",
      byline: "PDF",
      href: "/docs/erasmus/anexa-2-fisa-autoevaluare.pdf",
    },
    {
      title: "Anexa 3 · Declarație finanțare multiplă",
      byline: "PDF",
      href: "/docs/erasmus/anexa-3-declaratie-finantare.pdf",
    },
    {
      title: "Anexa 4 · Responsabilități și activități",
      byline: "PDF",
      href: "/docs/erasmus/anexa-4-responsabilitati.pdf",
    },
    {
      title: "Anexa 5 · GDPR",
      byline: "PDF",
      href: "/docs/erasmus/anexa-5-gdpr.pdf",
    },
    {
      title: "Anexa 6 · Declarație rambursare",
      byline: "PDF",
      href: "/docs/erasmus/anexa-6-rambursare.pdf",
    },
    {
      title: "Anexa 7 · Acord imagine personală",
      byline: "PDF",
      href: "/docs/erasmus/anexa-7-imagine.pdf",
    },
  ],
};

const RESULTS_DOCS: DocGroup = {
  title: "Rezultate selecție · Sesiuni anterioare",
  description: "Listele cu candidații selectați la mobilitățile Erasmus+.",
  docs: [
    {
      title: "Rezultate finale selecție elevi",
      byline: "Selecție · PDF",
      href: "/docs/erasmus/rezultate-elevi-finale.pdf",
    },
    {
      title: "Rezultate finale selecție profesori",
      byline: "Selecție · PDF",
      href: "/docs/erasmus/rezultate-profesori-finale.pdf",
    },
    {
      title: "Rezultate interviu limba engleză",
      byline: "PDF",
      href: "/docs/erasmus/rezultate-interviu-engleza.pdf",
    },
    {
      title: "Rezultate analiză dosare elevi",
      byline: "PDF",
      href: "/docs/erasmus/rezultate-analiza-dosar-elevi.pdf",
    },
    {
      title: "Rezultate selecție dosare elevi",
      byline: "PDF",
      href: "/docs/erasmus/rezultate-selectie-dosare-elevi.pdf",
    },
    {
      title: "Rezultate finale AES III",
      byline: "PDF",
      href: "/docs/erasmus/rezultate-finale-aes-iii.pdf",
    },
  ],
};

export default function ErasmusPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-parchment pb-[clamp(4rem,9vw,8rem)]">
        <Hero />
        <Accreditation />
        <Mobilities />
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
          href="/"
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] text-white/65 transition-colors hover:text-gold-light"
        >
          <ArrowLeft className="size-3" strokeWidth={2} />
          Înapoi la pagina principală
        </Link>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div>
            <Badge variant="outline" className="border-gold/40 text-gold-light">
              Internațional
            </Badge>
            <h1 className="mt-5 text-balance !text-white text-[clamp(2.4rem,5.5vw,4.4rem)] font-semibold leading-[1.05]">
              Erasmus+
            </h1>
            <p className="mt-2 font-mono text-sm text-gold-light">
              2021-1-RO01-KA120-SCH-000042802
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
            <p className="mt-6 max-w-2xl text-pretty text-white/85 sm:text-lg">
              Acreditare Erasmus+ Acțiunea KA120 — Educație școlară. Proiect
              finanțat prin programul Erasmus+ al Uniunii Europene, care ne
              permite să trimitem anual elevi și profesori la mobilități în
              alte state membre.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 sm:max-w-sm lg:max-w-none">
            <Stat value="KA120" label="acțiune" />
            <Stat value="2021" label="acreditare" />
            <Stat value="EU 27" label="state" />
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

function Accreditation() {
  return (
    <section className="wrap mt-16 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
      <Reveal>
        <p className="eyebrow">Despre acreditare</p>
        <h2 className="mt-3 font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-tight text-navy text-balance">
          Educație școlară · KA120-SCH
        </h2>
        <p className="mt-5 text-pretty text-[1.05rem] leading-relaxed text-ink/85">
          Acreditarea Erasmus+ ne dă acces pe termen lung la finanțări din
          programul Uniunii Europene pentru mobilități educaționale.
          Înseamnă că, an de an, elevii noștri pot participa la stagii de
          formare în alte școli din Europa, iar cadrele didactice — la
          cursuri de specializare și job shadowing.
        </p>
        <p className="mt-4 text-pretty text-[1.05rem] leading-relaxed text-ink/85">
          Scopurile noastre prioritare: deschiderea elevilor către{" "}
          <strong className="text-navy">diversitate culturală</strong>,
          consolidarea competențelor de <strong className="text-navy">limbă
          modernă</strong> (în special engleză), <strong className="text-navy">
          formarea continuă</strong> a profesorilor și integrarea bunelor
          practici europene în pedagogia teologică.
        </p>
      </Reveal>

      <Reveal delay={1} className="space-y-4">
        <Card className="border-navy/10 bg-paper">
          <CardContent className="flex gap-4 p-6">
            <span className="inline-flex size-11 items-center justify-center rounded-xl bg-gold/15">
              <Users className="size-5 text-gold-deep" strokeWidth={1.75} />
            </span>
            <div>
              <p className="font-serif text-base font-semibold leading-tight text-navy">
                Pentru elevi
              </p>
              <p className="mt-1 text-sm text-pretty text-ink/80">
                Mobilități de învățare (5–14 zile), stagii lingvistice,
                experiențe interculturale în grupuri de 10–15 elevi.
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-navy/10 bg-paper">
          <CardContent className="flex gap-4 p-6">
            <span className="inline-flex size-11 items-center justify-center rounded-xl bg-gold/15">
              <Languages className="size-5 text-gold-deep" strokeWidth={1.75} />
            </span>
            <div>
              <p className="font-serif text-base font-semibold leading-tight text-navy">
                Pentru profesori
              </p>
              <p className="mt-1 text-sm text-pretty text-ink/80">
                Cursuri de formare structurată, job shadowing, ateliere
                tematice pe Inteligența Artificială în educație și pe
                pedagogii moderne.
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-navy/10 bg-paper">
          <CardContent className="flex gap-4 p-6">
            <span className="inline-flex size-11 items-center justify-center rounded-xl bg-gold/15">
              <Globe2 className="size-5 text-gold-deep" strokeWidth={1.75} />
            </span>
            <div>
              <p className="font-serif text-base font-semibold leading-tight text-navy">
                Parteneri europeni
              </p>
              <p className="mt-1 text-sm text-pretty text-ink/80">
                Italia (Roma, Florența), Portugalia (Barcelos), Turcia
                (Antalya) — și parteneri noi pentru sesiunile următoare.
              </p>
            </div>
          </CardContent>
        </Card>
      </Reveal>
    </section>
  );
}

function Mobilities() {
  return (
    <section className="wrap mt-24">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal as="p" className="eyebrow">
          Mobilități realizate
        </Reveal>
        <Reveal as="h2" delay={1} className="mt-3 text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight">
          Unde am fost
        </Reveal>
        <Reveal as="p" delay={2} className="mt-4 text-pretty text-muted">
          Rapoartele detaliate ale mobilităților realizate până în prezent —
          fiecare cu activitățile zilnice, partenerii vizitați și rezultatele
          obținute.
        </Reveal>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {MOBILITIES.map((m, i) => (
          <Reveal key={`${m.city}-${m.dates}`} delay={((i % 3) + 1) as 1 | 2 | 3}>
            <Card className="h-full overflow-hidden border-navy/10 bg-paper transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]">
              <div className="bg-gradient-to-br from-navy-deep via-navy to-navy-soft p-7 text-white">
                <span
                  aria-hidden="true"
                  className="inline-flex size-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15"
                >
                  <MapPin className="size-6 text-gold-light" strokeWidth={1.75} />
                </span>
                <h3 className="mt-4 font-serif text-2xl font-semibold leading-tight !text-white">
                  {m.city}
                </h3>
                <p className="mt-1 text-sm text-gold-light">{m.country}</p>
              </div>
              <CardContent className="space-y-4 p-7">
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-gold-deep">
                    Perioada
                  </p>
                  <p className="mt-1 font-semibold text-navy">{m.dates}</p>
                </div>
                <a
                  href={m.reportUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-navy-soft"
                >
                  Citește raportul
                  <ExternalLink className="size-4" strokeWidth={1.75} />
                </a>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Documents() {
  return (
    <section className="wrap mt-24 space-y-16">
      {[APPLY_DOCS, TEACHER_DOCS, RESULTS_DOCS].map((group, gi) => (
        <div key={group.title}>
          <Reveal as="p" className="eyebrow">
            {gi === 0 ? "Candidatură" : gi === 1 ? "Candidatură" : "Rezultate"}
          </Reveal>
          <Reveal as="h2" delay={1} className="mt-3 max-w-2xl text-[clamp(1.6rem,3vw,2.2rem)] font-serif font-semibold leading-tight text-navy">
            {group.title}
          </Reveal>
          <Reveal as="p" delay={2} className="mt-3 max-w-2xl text-pretty text-muted">
            {group.description}
          </Reveal>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {group.docs.map((doc, i) => (
              <Reveal key={doc.href} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <DownloadCard
                  href={doc.href}
                  title={doc.title}
                  byline={doc.byline}
                />
              </Reveal>
            ))}
          </div>
        </div>
      ))}
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
              <p className="eyebrow !text-gold-light">Întrebări</p>
              <h2 className="mt-3 !text-white font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-tight">
                Vrei să afli mai multe?
              </h2>
              <p className="mt-4 max-w-md text-pretty text-white/80">
                Selecțiile se anunță cu cel puțin 30 de zile înainte la
                avizier și pe pagina de Facebook a seminarului. Pentru
                informații suplimentare despre proiectele Erasmus+, contactează
                coordonatorul de proiect.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy-deep transition-all hover:-translate-y-0.5 hover:bg-gold-light"
                >
                  <Compass className="size-4" strokeWidth={1.75} />
                  Contact
                </Link>
                <a
                  href="https://seminarortodoxtargoviste.ro/erasmus"
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
                Cofinanțat de
              </p>
              <p className="flex items-center gap-2 font-serif text-lg font-semibold text-white">
                <Sparkles className="size-4 text-gold-light" strokeWidth={1.75} />
                Uniunea Europeană
              </p>
              <p className="text-xs uppercase tracking-[0.14em] text-white/55">
                Calitate cofinanțată cu
              </p>
              <p className="font-semibold text-white">Acțiunea KA120-SCH</p>
              <p className="text-xs uppercase tracking-[0.14em] text-white/55">
                Recunoaștere
              </p>
              <p className="flex items-center gap-2 font-semibold text-white">
                <Award className="size-4 text-gold-light" strokeWidth={1.75} />
                Certificat de mobilitate europeană
              </p>
            </div>
          </CardContent>
        </Card>
      </Reveal>
    </section>
  );
}

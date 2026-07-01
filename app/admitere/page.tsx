import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  Church,
  GraduationCap,
  Languages,
  Mail,
  Phone,
  Sparkles,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Admitere — Gimnaziu · Teologie Pastorală · Filologia",
  description: `Cele trei programe de admitere la Seminarul Teologic Ortodox „${siteConfig.patron}” din ${siteConfig.city} — clasa a V-a (Gimnaziu), clasa a IX-a Teologie Pastorală (vocațional) și Filologia (real-uman).`,
  alternates: { canonical: "/admitere" },
};

type Track = {
  slug: string;
  Icon: typeof Church;
  eyebrow: string;
  name: string;
  tagline: string;
  duration: string;
  bullets: string[];
  admissionStyle: string;
  ctaLabel: string;
};

const TRACKS: Track[] = [
  {
    slug: "gimnaziu",
    Icon: BookOpen,
    eyebrow: "Clasele V–VIII",
    name: "Gimnaziu",
    tagline: "Începe formarea de la clasa a V-a",
    duration: "Ciclul gimnazial · 4 ani",
    bullets: [
      "Curriculum național complet + o oră suplimentară de Religie pe săptămână",
      "Clase de aproximativ 20 de elevi — atenție individuală",
      "Cor de gimnaziu + participare la slujbele din paraclis",
    ],
    admissionStyle:
      "Fără examen · Pe baza mediei claselor a III-a și a IV-a și a unei scurte discuții cu părinții",
    ctaLabel: "Vezi admiterea Gimnaziu",
  },
  {
    slug: "teologie",
    Icon: Church,
    eyebrow: "Clasa a IX-a · vocațional",
    name: "Teologie Pastorală",
    tagline: "Programul principal al seminarului",
    duration: "Liceu vocațional · 4 ani",
    bullets: [
      `${siteConfig.admission.spots} de locuri pentru sesiunea ${siteConfig.admission.session}`,
      "Probă scrisă de Religie + probă orală de aptitudini muzicale",
      "Pregătire gratuită oferită de seminar în lunile aprilie-mai",
    ],
    admissionStyle:
      "Examen vocațional · Religie (probă scrisă) + Aptitudini muzicale (probă orală)",
    ctaLabel: "Vezi admiterea Teologie Pastorală",
  },
  {
    slug: "filologia",
    Icon: Languages,
    eyebrow: "Clasa a IX-a · uman",
    name: "Filologia",
    tagline: "Liceu cultural pentru bacalaureat și facultate",
    duration: "Liceu · 4 ani",
    bullets: [
      "Studii aprofundate de limbă și literatură română + două limbi moderne",
      "Aceleași facilități ca profilul teologic — internat, cantină, activități",
      "Deschidere spre facultăți de litere, jurnalism, drept, teologie",
    ],
    admissionStyle:
      "Fără examen vocațional · Repartizare computerizată națională pe baza mediei EN VIII",
    ctaLabel: "Vezi admiterea Filologia",
  },
];

export default function AdmiterePage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-parchment pb-[clamp(4rem,9vw,8rem)]">
        <Hero />
        <TracksSection />
        <SharedFacilitiesSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-navy-deep via-navy to-navy-soft pt-32 pb-24 text-white">
      <div className="wrap relative mx-auto max-w-3xl text-center">
        <Reveal as="p" className="eyebrow text-gold-light!">
          Admitere {siteConfig.admission.cycle}
        </Reveal>
        <Reveal
          as="h1"
          delay={1}
          className="mt-3 text-white! text-[clamp(2.4rem,5.5vw,4.4rem)] font-semibold leading-[1.05]"
        >
          Trei căi, aceeași școală
        </Reveal>
        <svg
          aria-hidden="true"
          viewBox="0 0 240 12"
          className="mx-auto mt-6 h-3 w-60 text-gold/60"
        >
          <line x1="0" y1="6" x2="100" y2="6" stroke="currentColor" strokeWidth="0.6" />
          <path d="M120 1 L125 6 L120 11 L115 6 Z" fill="currentColor" />
          <line x1="140" y1="6" x2="240" y2="6" stroke="currentColor" strokeWidth="0.6" />
        </svg>
        <Reveal
          as="p"
          delay={2}
          className="mx-auto mt-6 max-w-xl text-white/85 text-pretty sm:text-lg"
        >
          Seminarul oferă trei programe distincte — gimnaziu, teologie
          pastorală și filologie. Toate împart același campus, aceiași
          duhovnici și același spirit vocațional, dar fiecare are propriile
          criterii de admitere.
        </Reveal>
      </div>
    </section>
  );
}

function TracksSection() {
  return (
    <section className="wrap mt-16">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal as="p" className="eyebrow">
          Alege programul
        </Reveal>
        <Reveal
          as="h2"
          delay={1}
          className="mt-3 text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight"
        >
          Cele trei programe de admitere
        </Reveal>
      </div>
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {TRACKS.map((t, i) => (
          <Reveal key={t.slug} delay={((i % 3) + 1) as 1 | 2 | 3}>
            <Link
              href={`/admitere/${t.slug}`}
              className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:rounded-2xl"
            >
              <Card className="h-full overflow-hidden border-navy/10 bg-paper transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[var(--shadow-elevated)]">
                <div className="relative border-b border-navy/10 bg-gradient-to-br from-navy-deep via-navy to-navy-soft p-7 text-white">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-4 -top-4 text-gold/15"
                  >
                    <t.Icon className="size-32" strokeWidth={1} />
                  </span>
                  <span
                    aria-hidden="true"
                    className="inline-flex size-11 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15"
                  >
                    <t.Icon className="size-5 text-gold-light" strokeWidth={1.75} />
                  </span>
                  <p className="mt-4 text-xs uppercase tracking-[0.14em] text-gold-light">
                    {t.eyebrow}
                  </p>
                  <h3 className="mt-1 font-serif text-2xl font-semibold leading-tight text-white!">
                    {t.name}
                  </h3>
                  <p className="mt-2 text-sm text-white/75 text-pretty">
                    {t.tagline}
                  </p>
                </div>
                <CardContent className="space-y-5 p-6">
                  <p className="text-xs uppercase tracking-[0.14em] text-gold-deep">
                    {t.duration}
                  </p>
                  <ul className="space-y-2 text-sm text-ink/85">
                    {t.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <span
                          aria-hidden="true"
                          className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-gold"
                        />
                        <span className="text-pretty">{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="rounded-xl border border-navy/10 bg-parchment p-3">
                    <p className="text-[0.7rem] uppercase tracking-[0.14em] text-gold-deep">
                      Admitere
                    </p>
                    <p className="mt-1 text-xs text-ink/85 text-pretty">
                      {t.admissionStyle}
                    </p>
                  </div>
                  <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-deep transition-[gap] duration-300 group-hover:gap-3">
                    {t.ctaLabel}
                    <ArrowRight className="size-4" strokeWidth={1.75} />
                  </p>
                </CardContent>
              </Card>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function SharedFacilitiesSection() {
  const items = [
    {
      Icon: GraduationCap,
      title: "Cadre didactice comune",
      body: "Aceiași profesori predau la toate cele trei programe — corp didactic dedicat, unele materii chiar cu preoți profesori.",
    },
    {
      Icon: Award,
      title: "Aceleași facilități",
      body: "Internat, cantină, sală de festivități, bibliotecă, laboratoare TIC, teren de sport — toate se folosesc de toți elevii.",
    },
    {
      Icon: Sparkles,
      title: "Aceeași viață de comunitate",
      body: "Concerte, olimpiade, Erasmus+, hramul școlii, festivități — activitățile sunt deschise oricărui elev, indiferent de program.",
    },
  ];
  return (
    <section className="wrap mt-24">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal as="p" className="eyebrow">
          Ce împart
        </Reveal>
        <Reveal
          as="h2"
          delay={1}
          className="mt-3 text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight"
        >
          O singură școală, trei programe
        </Reveal>
        <Reveal as="p" delay={2} className="mt-4 text-pretty text-muted">
          Programele diferă la nivelul admiterii și al specializării, dar
          viața de zi cu zi este comună.
        </Reveal>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {items.map((it, i) => (
          <Reveal key={it.title} delay={((i % 3) + 1) as 1 | 2 | 3}>
            <Card className="h-full border-navy/10 bg-paper">
              <CardContent className="space-y-4 p-6">
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-gold/15">
                  <it.Icon className="size-5 text-gold-deep" strokeWidth={1.75} />
                </span>
                <h3 className="font-serif text-lg font-semibold leading-tight text-navy">
                  {it.title}
                </h3>
                <p className="text-pretty text-sm text-ink/85">{it.body}</p>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="wrap mt-24">
      <Reveal>
        <Card className="overflow-hidden border-navy/10 bg-gradient-to-br from-navy-deep to-navy-soft text-white shadow-[var(--shadow-elevated)]">
          <CardContent className="grid gap-8 p-10 md:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="eyebrow text-gold-light!">Întrebări</p>
              <h2 className="mt-3 text-white! font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-tight">
                Nu ești sigur ce program alegi?
              </h2>
              <p className="mt-4 max-w-md text-pretty text-white/80">
                Sună la secretariat pentru o programare — părintele director
                sau un profesor de admiteri îți poate răspunde la întrebări
                despre orice program, îți poate arăta școala și îți poate
                explica pe îndelete diferențele.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Badge
                  variant="outline"
                  className="border-gold/40 bg-gold/10 text-gold-light"
                >
                  Director · 0724 507 790
                </Badge>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy-deep transition-all hover:-translate-y-0.5 hover:bg-gold-light"
                >
                  Contactează-ne
                  <ArrowRight className="size-4" strokeWidth={1.75} />
                </Link>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <p className="text-xs uppercase tracking-[0.14em] text-white/55">
                Secretariat
              </p>
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="flex items-center gap-2 font-semibold text-white hover:text-gold-light"
              >
                <Phone className="size-4 text-gold-light" strokeWidth={1.75} />
                {siteConfig.contact.phoneDisplay}
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-2 font-semibold text-white hover:text-gold-light"
              >
                <Mail className="size-4 text-gold-light" strokeWidth={1.75} />
                {siteConfig.contact.email}
              </a>
              <p className="text-white/70">{siteConfig.contact.hours}</p>
            </div>
          </CardContent>
        </Card>
      </Reveal>
    </section>
  );
}

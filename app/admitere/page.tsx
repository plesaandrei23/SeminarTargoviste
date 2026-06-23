import type { Metadata } from "next";
import Link from "next/link";
import {
  Award,
  BookOpen,
  Calendar as CalendarIcon,
  CheckCircle2,
  Church,
  Clock,
  Compass,
  GraduationCap,
  HelpCircle,
  Mail,
  MapPin,
  Music2,
  Phone,
  Users,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { sanityClient } from "@/sanity/lib/client";
import { admissionCyclesQuery } from "@/sanity/lib/queries";
import type { AdmissionCycle, CalendarItem } from "@/sanity/lib/types";
import { siteConfig } from "@/lib/site-config";
import { formatRoDate } from "@/lib/format";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Admitere — clasa a IX-a, Teologie Pastorală",
  description: `Admitere ${siteConfig.admission.cycle} la Seminarul Teologic Ortodox „${siteConfig.patron}” din ${siteConfig.city} — ${siteConfig.admission.spots} de locuri, specializarea ${siteConfig.admission.program}. Calendar, acte necesare, probe, pregătire gratuită.`,
  alternates: { canonical: "/admitere" },
};

/** Used when no `calendar` array is set on the active cycle in Sanity. */
const DEFAULT_CALENDAR: CalendarItem[] = [
  { date: "2026-04-27", label: "Începe pregătirea gratuită", note: "Cursuri săptămânale de Religie și Muzică" },
  { date: "2026-05-15", label: "Termen pregătire · înscrieri deschise", note: "Dosarele se depun la secretariat" },
  { date: "2026-05-22", label: "Probele de admitere", note: "Proba scrisă de Religie + proba orală de aptitudini muzicale" },
  { date: "2026-05-30", label: "Afișarea rezultatelor", note: "Lista candidaților admiși apare pe avizier și pe site" },
  { date: "2026-06-05", label: "Confirmarea locului", note: "Termen limită pentru depunerea dosarului complet" },
];

const REQUIRED_DOCS = [
  "Cerere-tip de înscriere (eliberată de secretariat)",
  "Copie certificat de naștere",
  "Foaia matricolă pentru clasele V–VIII",
  "Adeverință medicală cu mențiunea „apt pentru efort fizic”",
  "Recomandare de la preotul paroh",
  "Copie carte de identitate părinte / tutore",
];

/**
 * Pregătirea gratuită — distilled from the Sanity body of the
 * "pregatire-pentru-admitere-la-seminar" record. Hand-curated table here
 * because the raw markdown was emoji-heavy and visually messy when rendered
 * inline. Staff can update names + hours via Sanity Studio when the schedule
 * changes; we'll wire that to a structured field in a follow-up.
 */
const PREP_SCHEDULE = [
  {
    teacher: "Pr. Prof. Dr. Nuică Ștefan",
    subject: "Religie Ortodoxă",
    hours: "Luni 10:00–11:00 · Marți 11:00–12:00 & 13:00–14:00 · Joi 10:00–11:00",
  },
  {
    teacher: "Pr. Prof. Dr. Bugiulescu Constantin",
    subject: "Religie Ortodoxă",
    hours: "Luni 12:00–13:00 · Marți 11:00–12:00 · Joi 11:00–12:00",
  },
  {
    teacher: "Prof. Dr. Cazan Florinel Ciprian",
    subject: "Aptitudini muzicale",
    hours: "Miercuri 14:00–15:00 · Vineri 14:00–15:00",
  },
];

const REASONS = [
  {
    Icon: Compass,
    title: "Educație integrală",
    body: "Pregătire academică solidă, formare duhovnicească și cultură generală — toate sub același acoperiș, timp de patru ani.",
  },
  {
    Icon: Users,
    title: "Comunitate dăruită",
    body: "Profesori dedicați și o comunitate de elevi cu vocație și pasiune pentru teologie, muzică și disciplinele umaniste.",
  },
  {
    Icon: GraduationCap,
    title: "Drum deschis",
    body: "Bacalaureat, atestat profesional, deschidere către studiile teologice și mobilități Erasmus+ pe parcursul liceului.",
  },
];

const EXAMS = [
  {
    Icon: BookOpen,
    title: "Proba scrisă",
    subject: "Religie Ortodoxă",
    body: "Testează cunoștințele dogmatice și liturgice din programa de gimnaziu — Vechiul și Noul Testament, Crezul, Sfintele Taine, sărbătorile principale.",
  },
  {
    Icon: Music2,
    title: "Proba orală",
    subject: "Aptitudini muzicale",
    body: "Verifică auzul muzical, simțul ritmic și intonația — pregătire indispensabilă pentru cântarea liturgică bisericească.",
  },
];

const FAQS = [
  {
    q: "Cine se poate înscrie?",
    a: "Băieții absolvenți de gimnaziu, cu media minimă 9 la purtare pentru fiecare clasă din învățământul gimnazial. Specializarea este Teologie Pastorală, în regim de liceu — 4 ani.",
  },
  {
    q: "Există etapă a doua de admitere?",
    a: "Da, dacă rămân locuri neocupate după sesiunea principală din mai. În august se organizează o sesiune suplimentară pe locurile rămase libere.",
  },
  {
    q: "Cum mă pot pregăti pentru admitere?",
    a: "Seminarul organizează ședințe gratuite de pregătire în perioada 27 aprilie – 15 mai, atât pentru proba scrisă de Religie cât și pentru proba orală de aptitudini muzicale. Programul detaliat este afișat mai jos pe această pagină.",
  },
  {
    q: "Care sunt probele de admitere?",
    a: "O probă scrisă la Religie Ortodoxă (subiectele acoperă programa de gimnaziu) și o probă orală de aptitudini muzicale (auz, ritm, intonație). Mediile de admitere se calculează în baza ambelor probe.",
  },
  {
    q: "Există posibilitatea de cazare?",
    a: "Da, internatul seminarului oferă cazare și masă pentru elevii din afara localității, într-un mediu sigur, supravegheat de un duhovnic și de pedagogi.",
  },
  {
    q: "Pe cine pot contacta pentru detalii suplimentare?",
    a: `Pr. Prof. Pleşa Alin-Marian, Directorul Seminarului Teologic Ortodox — telefon 0724 507 790. Secretariatul poate fi contactat la ${siteConfig.contact.phoneDisplay} sau la ${siteConfig.contact.email}, Luni–Vineri 08:00–16:00.`,
  },
];

async function fetchCycles(): Promise<AdmissionCycle[]> {
  try {
    return await sanityClient.fetch<AdmissionCycle[]>(
      admissionCyclesQuery,
      {},
      { next: { revalidate: 60, tags: ["admitere"] } },
    );
  } catch (e) {
    console.error("Admission cycles fetch failed:", e);
    return [];
  }
}

export default async function AdmiterePage() {
  const cycles = await fetchCycles();
  const current = cycles.find((c) => c.isCurrent) ?? cycles[0];
  const calendar =
    current?.calendar && current.calendar.length > 0
      ? current.calendar
      : DEFAULT_CALENDAR;

  return (
    <>
      <Header />
      <main className="flex-1 bg-parchment pb-[clamp(4rem,9vw,8rem)]">
        <Hero />
        <FactsStrip />
        <CalendarSection items={calendar} />
        <ReasonsSection />
        <ExamsSection />
        <PrepProgramSection />
        <DocumentsSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

/* ── Sections ────────────────────────────────────────────────── */

function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-navy-deep via-navy to-navy-soft pt-36 pb-28 text-white">
      <div className="wrap relative mx-auto max-w-3xl text-center">
        <Reveal as="p" className="eyebrow !text-gold-light">
          Admitere {siteConfig.admission.cycle}
        </Reveal>
        <Reveal
          as="h1"
          delay={1}
          className="mt-3 !text-white text-[clamp(2.4rem,5.5vw,4.4rem)] font-semibold leading-[1.05]"
        >
          Devino seminarist
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
          {siteConfig.admission.spots} de locuri în clasa a IX-a, specializarea{" "}
          {siteConfig.admission.program}. Pregătire gratuită pentru probe,
          internat propriu și o comunitate dăruită studiului — totul sub
          oblăduirea {siteConfig.diocese}.
        </Reveal>
        <Reveal delay={3} className="mt-9 flex flex-wrap justify-center gap-3">
          <Link
            href="#calendar"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy-deep transition-all hover:-translate-y-0.5 hover:bg-gold-light"
          >
            Calendar înscriere
          </Link>
          <Link
            href="#pregatire"
            className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-white hover:bg-white/10"
          >
            Pregătire gratuită
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function FactsStrip() {
  const facts = [
    { Icon: Users, label: "Locuri disponibile", value: siteConfig.admission.spots.toString() },
    { Icon: Church, label: "Specializare", value: siteConfig.admission.program },
    { Icon: GraduationCap, label: "Durată studii", value: "Liceu · 4 ani" },
    { Icon: CalendarIcon, label: "Sesiune principală", value: siteConfig.admission.session },
  ];
  return (
    <section className="wrap relative z-10 -mt-14">
      <Card className="border-navy/10 shadow-[var(--shadow-elevated)]">
        <CardContent className="grid gap-4 p-6 sm:grid-cols-2 sm:p-8 lg:grid-cols-4 lg:divide-x lg:divide-navy/10">
          {facts.map((f, i) => (
            <Reveal
              key={f.label}
              delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
              className="lg:px-6 lg:first:pl-0 lg:last:pr-0"
            >
              <div className="flex items-start gap-3">
                <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-gold/15">
                  <f.Icon className="size-4 text-gold-deep" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-muted">
                    {f.label}
                  </p>
                  <p className="mt-1 font-serif text-2xl font-semibold leading-tight text-navy">
                    {f.value}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}

function CalendarSection({ items }: { items: CalendarItem[] }) {
  return (
    <section id="calendar" className="wrap mt-24 scroll-mt-32">
      <SectionHeader
        eyebrow="Etapele înscrierii"
        title="Calendar de admitere"
        intro="Datele oficiale ale sesiunii din mai. Confirmă termenele exacte la secretariatul seminarului — pot apărea actualizări de la ISJ Dâmbovița."
      />
      <ol className="relative mx-auto mt-12 max-w-3xl space-y-8 border-l-2 border-gold/40 pl-10">
        {items.map((item, i) => (
          <Reveal
            as="li"
            key={`${item.date}-${item.label}`}
            delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
            className="relative"
          >
            <span
              aria-hidden="true"
              className="absolute -left-[2.95rem] top-1 inline-flex size-5 items-center justify-center rounded-full border-2 border-gold bg-paper"
            >
              <span className="block size-2 rounded-full bg-gold" />
            </span>
            <p className="text-xs uppercase tracking-[0.14em] text-gold-deep">
              {formatRoDate(item.date) || item.date}
            </p>
            <p className="mt-1 font-serif text-xl font-semibold text-navy">
              {item.label}
            </p>
            {item.note && (
              <p className="mt-1 text-sm text-muted text-pretty">{item.note}</p>
            )}
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

function ReasonsSection() {
  return (
    <section className="wrap mt-24">
      <SectionHeader
        eyebrow="De ce Seminarul nostru"
        title="O școală în care educația integrală este prioritară"
        intro="Trei argumente pentru a alege Seminarul Teologic Ortodox din Târgoviște — repetate de fiecare promoție care a trecut pe aici."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {REASONS.map((r, i) => (
          <Reveal
            key={r.title}
            delay={((i % 3) + 1) as 1 | 2 | 3}
          >
            <Card className="h-full border-navy/10 bg-paper transition-shadow hover:shadow-[var(--shadow-elevated)]">
              <CardHeader>
                <span className="mb-2 inline-flex size-12 items-center justify-center rounded-2xl bg-gold/15">
                  <r.Icon className="size-6 text-gold-deep" strokeWidth={1.5} />
                </span>
                <CardTitle className="font-serif text-2xl font-semibold text-navy">
                  {r.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-pretty text-ink/80">{r.body}</p>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ExamsSection() {
  return (
    <section className="wrap mt-24">
      <SectionHeader
        eyebrow="Ce se testează"
        title="Probele de admitere"
        intro="Admiterea are două probe — una scrisă, una orală. Pregătirea gratuită oferită de seminar acoperă ambele."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {EXAMS.map((e, i) => (
          <Reveal
            key={e.title}
            delay={((i % 2) + 1) as 1 | 2}
          >
            <Card className="h-full border-navy/10 bg-paper">
              <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-navy text-gold-light">
                  <e.Icon className="size-6" strokeWidth={1.5} />
                </span>
                <div className="flex-1">
                  <Badge variant="outline" className="border-gold/40 text-gold-deep">
                    {e.title}
                  </Badge>
                  <CardTitle className="mt-2 font-serif text-2xl font-semibold text-navy">
                    {e.subject}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-pretty text-base text-ink/80">
                  {e.body}
                </CardDescription>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function PrepProgramSection() {
  return (
    <section
      id="pregatire"
      className="relative mt-24 scroll-mt-32 bg-gradient-to-b from-parchment to-parchment-2 py-20"
    >
      <div className="wrap">
        <div className="mx-auto mb-12 flex max-w-3xl flex-col items-center gap-4 text-center">
          <Reveal>
            <Badge variant="secondary" className="bg-gold text-navy-deep hover:bg-gold-light">
              Gratuit
            </Badge>
          </Reveal>
          <Reveal as="p" delay={1} className="eyebrow">
            27 aprilie – 15 mai 2026
          </Reveal>
          <Reveal
            as="h2"
            delay={2}
            className="text-[clamp(2rem,4.4vw,3.2rem)] font-semibold leading-tight"
          >
            Pregătire pentru admitere
          </Reveal>
          <Reveal as="p" delay={3} className="text-pretty text-muted">
            Trei cadre didactice de specialitate susțin săptămânal ședințe de
            pregătire la sediul seminarului, deschise oricărui candidat. Acoperă
            integral programa probelor de Religie și Muzică.
          </Reveal>
        </div>

        <Reveal delay={2}>
          <Card className="overflow-hidden border-navy/10">
            <Table>
              <TableHeader>
                <TableRow className="bg-navy hover:bg-navy">
                  <TableHead className="text-gold-light">Profesor</TableHead>
                  <TableHead className="text-gold-light">Disciplină</TableHead>
                  <TableHead className="text-gold-light">Program</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {PREP_SCHEDULE.map((row) => (
                  <TableRow key={row.teacher} className="hover:bg-parchment/60">
                    <TableCell className="font-serif text-base font-semibold text-navy">
                      {row.teacher}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-gold/40 text-gold-deep">
                        {row.subject}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-ink/85">
                      {row.hours}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </Reveal>

        <Reveal delay={3} className="mx-auto mt-8 max-w-2xl">
          <p className="rounded-2xl border border-navy/10 bg-paper p-6 text-center text-sm text-ink/80 text-pretty">
            Participarea este gratuită. Pentru detalii și înscrierea la
            ședințele de pregătire — <strong className="font-semibold text-navy">Pr. Prof. Pleşa Alin-Marian</strong>,
            Directorul Seminarului, la{" "}
            <a
              href="tel:+40724507790"
              className="font-semibold text-gold-deep underline-offset-4 hover:underline"
            >
              0724 507 790
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function DocumentsSection() {
  return (
    <section id="acte" className="wrap mt-24 scroll-mt-32">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start lg:gap-16">
        <Reveal>
          <p className="eyebrow">La dosar</p>
          <h2 className="mt-2 text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight">
            Acte necesare pentru înscriere
          </h2>
          <p className="mt-4 text-pretty text-muted">
            Dosarul se depune la secretariatul seminarului, în intervalul de
            înscriere. Dosarul se preia numai dacă toate piesele de mai jos
            sunt complete.
          </p>
          <ul className="mt-8 space-y-3">
            {REQUIRED_DOCS.map((d, i) => (
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
        </Reveal>

        <Reveal as="aside" delay={1} className="lg:sticky lg:top-32">
          <Card className="border-navy/10 bg-navy text-white">
            <CardHeader>
              <p className="eyebrow !text-gold-light">Secretariat</p>
              <CardTitle className="!text-white font-serif text-2xl font-semibold">
                Pentru întrebări despre dosar
              </CardTitle>
              <CardDescription className="!text-white/75 text-pretty">
                Răspundem la întrebări legate de înscrieri, calendar, probele
                de aptitudini și piese de dosar incomplete.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <ContactRow
                Icon={Phone}
                label="Telefon"
                value={siteConfig.contact.phoneDisplay}
                href={`tel:${siteConfig.contact.phone}`}
              />
              <ContactRow
                Icon={Mail}
                label="Email"
                value={siteConfig.contact.email}
                href={`mailto:${siteConfig.contact.email}`}
              />
              <ContactRow
                Icon={Clock}
                label="Program"
                value={siteConfig.contact.hours}
              />
              <Separator className="bg-white/15" />
              <ContactRow
                Icon={MapPin}
                label="Adresă"
                value={`${siteConfig.address.street}, ${siteConfig.address.city} ${siteConfig.address.postalCode}`}
              />
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="wrap mt-24">
      <SectionHeader
        eyebrow={<><HelpCircle className="inline size-4" strokeWidth={1.75} /> Întrebări frecvente</>}
        title="Răspunsuri pentru părinți și candidați"
        intro="Cele șase întrebări cele mai des primite la secretariat. Dacă nu găsești răspunsul aici, sună-ne sau scrie un email."
      />
      <Reveal as="div" delay={1} className="mx-auto mt-10 max-w-3xl">
        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((item, i) => (
            <AccordionItem key={item.q} value={`faq-${i}`}>
              <AccordionTrigger className="text-left font-serif text-lg font-semibold text-navy hover:text-navy-deep">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-base leading-relaxed text-ink/80 text-pretty">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="wrap mt-24">
      <Reveal>
        <Card className="overflow-hidden border-navy/10 bg-gradient-to-br from-navy-deep to-navy-soft text-white shadow-[var(--shadow-elevated)]">
          <CardContent className="grid gap-10 p-10 md:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="eyebrow !text-gold-light">Te așteptăm</p>
              <h2 className="mt-3 !text-white font-serif text-[clamp(1.8rem,3.5vw,2.6rem)] font-semibold leading-tight">
                Vrei să fii seminarist?
              </h2>
              <p className="mt-4 max-w-md text-pretty text-white/80">
                Vino la o ședință de pregătire săptămânală sau sună la
                secretariat pentru un tur al școlii. Ușa este deschisă,
                rugăciunea zilnică la fel.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={`tel:${siteConfig.contact.phone}`}
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy-deep transition-all hover:-translate-y-0.5 hover:bg-gold-light"
                >
                  <Phone className="size-4" strokeWidth={1.75} />
                  Sună la secretariat
                </Link>
                <Link
                  href="#pregatire"
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-white hover:bg-white/10"
                >
                  <Award className="size-4" strokeWidth={1.75} />
                  Vezi pregătirea gratuită
                </Link>
              </div>
            </div>
            <div className="space-y-4 text-sm">
              <ContactRow
                Icon={Phone}
                label="Director"
                value="0724 507 790"
                href="tel:+40724507790"
                hint="Pr. Prof. Pleşa Alin-Marian"
              />
              <ContactRow
                Icon={Phone}
                label="Secretariat"
                value={siteConfig.contact.phoneDisplay}
                href={`tel:${siteConfig.contact.phone}`}
              />
              <ContactRow
                Icon={Mail}
                label="Email"
                value={siteConfig.contact.email}
                href={`mailto:${siteConfig.contact.email}`}
              />
              <ContactRow
                Icon={MapPin}
                label="Adresă"
                value={`${siteConfig.address.street}, ${siteConfig.address.city}`}
              />
            </div>
          </CardContent>
        </Card>
      </Reveal>
    </section>
  );
}

/* ── Helpers ─────────────────────────────────────────────────── */

function SectionHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: React.ReactNode;
  title: string;
  intro?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <Reveal as="p" className="eyebrow">
        {eyebrow}
      </Reveal>
      <Reveal as="h2" delay={1} className="mt-3 text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight">
        {title}
      </Reveal>
      {intro && (
        <Reveal as="p" delay={2} className="mt-4 text-pretty text-muted">
          {intro}
        </Reveal>
      )}
    </div>
  );
}

function ContactRow({
  Icon,
  label,
  value,
  href,
  hint,
}: {
  Icon: typeof Phone;
  label: string;
  value: string;
  href?: string;
  hint?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/10">
        <Icon className="size-4 text-gold-light" strokeWidth={1.75} />
      </span>
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-[0.14em] text-white/55">
          {label}
        </p>
        {href ? (
          <a
            href={href}
            className="block truncate font-semibold text-white transition-colors hover:text-gold-light"
          >
            {value}
          </a>
        ) : (
          <p className="truncate font-semibold text-white">{value}</p>
        )}
        {hint && <p className="text-xs text-white/55">{hint}</p>}
      </div>
    </div>
  );
}

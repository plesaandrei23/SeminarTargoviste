import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CalendarClock,
  CheckCircle2,
  Church,
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
  title: "Admitere Gimnaziu — clasele V–VIII",
  description: `Admitere în clasa a V-a la Seminarul Teologic Ortodox „${siteConfig.patron}” din ${siteConfig.city} — pe baza mediei claselor a III-a și a IV-a, fără examen vocațional.`,
  alternates: { canonical: "/admitere/gimnaziu" },
};

const DOCS = [
  "Cerere-tip de înscriere (de la secretariat sau de descărcat aici)",
  "Copie certificat de naștere al copilului",
  "Copie carte de identitate părinte / tutore legal",
  "Adeverință medicală cu mențiunea „apt de școlarizare”",
  "Foaia matricolă a claselor a III-a și a IV-a",
  "Copia certificatului de botez (facultativ, pentru încurajarea vieții liturgice)",
];

const CALENDAR = [
  { date: "iunie · anul curent", label: "Deschiderea înscrierilor", note: "Dosarele se depun la secretariat, în programul zilnic." },
  { date: "iunie – iulie", label: "Prima etapă", note: "Se ocupă majoritatea locurilor pe baza mediilor din ciclul primar." },
  { date: "septembrie", label: "Sesiune suplimentară", note: "Doar dacă rămân locuri libere după prima etapă." },
];

export default function AdmitereGimnaziuPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-parchment pb-[clamp(4rem,9vw,8rem)]">
        <Hero />
        <Overview />
        <CalendarSection />
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
              Admitere · Gimnaziu
            </Badge>
            <h1 className="mt-5 text-balance text-white! text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.05]">
              Clasa a V-a
            </h1>
            <p className="mt-2 text-sm uppercase tracking-[0.16em] text-gold-light">
              Ciclul gimnazial · 4 ani
            </p>
            <p className="mt-6 max-w-2xl text-pretty text-white/85 sm:text-lg">
              Cel mai bun moment pentru a intra la seminar — de la clasa a
              V-a. Fără examen vocațional, dar cu o formare care îmbină
              programa națională cu viața liturgică din paraclisul școlii.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:max-w-xs lg:max-w-none">
            <Stat value="~25" label="locuri clasă" />
            <Stat value="Fără" label="examen vocațional" small />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label, small }: { value: string; label: string; small?: boolean }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-4 text-center">
      <p className={`font-serif font-semibold text-white ${small ? "text-lg" : "text-2xl sm:text-3xl"}`}>
        {value}
      </p>
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
        <p className="eyebrow">Ce înseamnă</p>
        <h2 className="mt-3 font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-tight text-navy text-balance">
          Curriculum național + o oră de Religie în plus
        </h2>
        <p className="mt-5 text-pretty text-[1.05rem] leading-relaxed text-ink/85">
          Elevii de gimnaziu urmează programa națională standard — aceleași
          discipline ca la orice altă școală (Limba română, Matematică,
          Istorie, Geografie, Fizică, Biologie, limbi moderne). Suplimentar,
          la seminar se studiază o oră de Religie Ortodoxă pe săptămână, mai
          detaliată decât în școlile normale.
        </p>
        <p className="mt-4 text-pretty text-[1.05rem] leading-relaxed text-ink/85">
          Clasele au aproximativ <strong className="text-navy">20 de
          elevi</strong>, ceea ce permite o atenție individuală mai bună. La
          finalul clasei a VIII-a, elevii dau Evaluarea Națională — cei mai
          buni continuă în mod natural la clasa a IX-a la seminar (fie
          Teologie Pastorală, fie Filologia).
        </p>
      </Reveal>
      <Reveal delay={1}>
        <Card className="overflow-hidden border-navy/10 bg-paper">
          <CardContent className="space-y-5 p-7">
            <span
              aria-hidden="true"
              className="inline-flex size-12 items-center justify-center rounded-2xl bg-gold/15"
            >
              <BookOpen className="size-6 text-gold-deep" strokeWidth={1.5} />
            </span>
            <h3 className="font-serif text-lg font-semibold leading-tight text-navy">
              Cum se face admiterea
            </h3>
            <p className="text-pretty text-sm leading-relaxed text-ink/80">
              <strong className="text-navy">Fără examen vocațional.</strong>{" "}
              Admiterea la clasa a V-a se face pe baza <strong className="text-navy">
              mediilor generale din clasele a III-a și a IV-a</strong>, la care
              se adaugă o scurtă discuție a părinților cu directorul școlii
              (pentru clarificarea așteptărilor reciproce, nu ca test).
            </p>
            <p className="border-t border-navy/10 pt-5 text-pretty text-sm leading-relaxed text-ink/80">
              În caz de număr mai mare de candidați decât locuri, se aplică
              ordinea descrescătoare a mediilor. Metodologia detaliată se
              anunță anual la avizier, până în iunie.
            </p>
          </CardContent>
        </Card>
      </Reveal>
    </section>
  );
}

function CalendarSection() {
  return (
    <section className="wrap mt-24">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal as="p" className="eyebrow">
          Calendar
        </Reveal>
        <Reveal
          as="h2"
          delay={1}
          className="mt-3 text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight"
        >
          Când te înscrii
        </Reveal>
      </div>
      <ol className="relative mx-auto mt-12 max-w-3xl space-y-8 border-l-2 border-gold/40 pl-10">
        {CALENDAR.map((item, i) => (
          <Reveal
            as="li"
            key={item.label}
            delay={((i % 3) + 1) as 1 | 2 | 3}
            className="relative"
          >
            <span
              aria-hidden="true"
              className="absolute -left-[2.95rem] top-1 inline-flex size-5 items-center justify-center rounded-full border-2 border-gold bg-paper"
            >
              <CalendarClock className="size-2.5 text-gold-deep" strokeWidth={2.5} />
            </span>
            <p className="text-xs uppercase tracking-[0.14em] text-gold-deep">
              {item.date}
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
        Ce trebuie să conțină dosarul
      </Reveal>
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
                Vino la o vizită
              </h2>
              <p className="mt-4 max-w-md text-pretty text-white/80">
                Pentru părinții care iau în considerare gimnaziul la seminar
                — cel mai bun mod de a decide este să veniți la o vizită.
                Vedeți sălile, cunoașteți profesorii, întâlniți alți părinți.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy-deep transition-all hover:-translate-y-0.5 hover:bg-gold-light"
                >
                  <Phone className="size-4" strokeWidth={1.75} />
                  Programează o vizită
                </Link>
                <Link
                  href="/admitere/teologie"
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-white hover:bg-white/10"
                >
                  <Church className="size-4" strokeWidth={1.75} />
                  Sau vezi admiterea Teologie
                </Link>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <p className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-white/55">
                <Users className="size-3.5" strokeWidth={2} />
                Elevi în ciclul gimnazial
              </p>
              <p className="font-semibold text-white">Aproximativ 80</p>
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

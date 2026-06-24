import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  FileText,
  Inbox,
  ShieldCheck,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/lib/site-config";

const REPORT_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSezaaQ4pTEIkllDEt8SrzRWIBYAIwoMSDTj2PlbgEARcdr1pw/viewform";
const EDU_RO_GUIDE_URL = "https://edu.ro/management_cazuri_violenta";

export const metadata: Metadata = {
  title: "Anti-bullying · Managementul cazurilor de violență",
  description: `Mecanismul de sesizare anonimă a faptelor de violență, bullying și cyberbullying la Seminarul Teologic Ortodox „${siteConfig.patron}” din ${siteConfig.city}.`,
  alternates: { canonical: "/managementul-cazurilor-de-violenta" },
};

export default function ViolentaPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-parchment pb-[clamp(4rem,9vw,8rem)]">
        <Hero />
        <Promise />
        <ReportChannels />
        <WhatHappens />
        <LegalFramework />
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
            Siguranță
          </Badge>
          <h1 className="mt-5 text-balance !text-white text-[clamp(2.4rem,5.5vw,4.4rem)] font-semibold leading-[1.05]">
            Anti-bullying
          </h1>
          <p className="mt-2 text-sm uppercase tracking-[0.16em] text-gold-light">
            Managementul cazurilor de violență · PO 6235/2023
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
            Mecanismul de sesizare anonimă a suspiciunilor și a faptelor de
            violență, bullying și cyberbullying, în conformitate cu{" "}
            <strong className="text-white">
              art. 65 alin. (4) din Legea învățământului preuniversitar nr.
              198/2023
            </strong>
            .
          </p>
        </div>
      </div>
    </section>
  );
}

function Promise() {
  return (
    <section className="wrap mt-16 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
      <Reveal>
        <p className="eyebrow">Angajamentul seminarului</p>
        <h2 className="mt-3 font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-tight text-navy text-balance">
          Niciun elev nu trebuie să sufere în tăcere
        </h2>
        <p className="mt-5 text-pretty text-[1.05rem] leading-relaxed text-ink/85">
          Violența, bullying-ul și cyberbullying-ul nu au loc la seminar.
          Avem obligația — legală, dar înainte de toate morală — să prevenim
          aceste situații, să le identificăm la timp și să intervenim ferm
          atunci când se întâmplă.
        </p>
        <p className="mt-4 text-pretty text-[1.05rem] leading-relaxed text-ink/85">
          Dacă ești elev și ești victima sau martorul unei situații de
          violență, bullying sau cyberbullying — sau dacă ești părinte și
          vrei să semnalezi o situație — folosește unul din canalele de mai
          jos. Sesizarea poate fi <strong className="text-navy">complet
          anonimă</strong>.
        </p>
      </Reveal>
      <Reveal delay={1}>
        <Card className="border-navy/10 bg-paper">
          <CardContent className="space-y-4 p-7">
            <span
              aria-hidden="true"
              className="inline-flex size-12 items-center justify-center rounded-2xl bg-gold/15"
            >
              <ShieldCheck className="size-6 text-gold-deep" strokeWidth={1.5} />
            </span>
            <p className="font-serif text-lg font-semibold leading-tight text-navy">
              Ce înseamnă „bullying” sau „cyberbullying”?
            </p>
            <p className="text-pretty text-sm leading-relaxed text-ink/80">
              Orice comportament repetat și intenționat de intimidare,
              umilire, izolare sau agresiune îndreptat împotriva unei
              persoane. Poate fi verbal (porecle, glume tăioase, jigniri),
              fizic (împingeri, lovituri), social (excludere din grup,
              răspândire de zvonuri) sau online (mesaje, postări, imagini
              ridiculizante).
            </p>
            <p className="text-pretty text-sm leading-relaxed text-ink/80">
              Pentru identificare există o fișă specială — <em>Anexa 3</em>{" "}
              la procedura PO 6235/2023.
            </p>
          </CardContent>
        </Card>
      </Reveal>
    </section>
  );
}

function ReportChannels() {
  return (
    <section className="wrap mt-20">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal as="p" className="eyebrow">
          Cum sesizezi
        </Reveal>
        <Reveal as="h2" delay={1} className="mt-3 text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight">
          Două canale, ambele anonime
        </Reveal>
        <Reveal as="p" delay={2} className="mt-4 text-pretty text-muted">
          Alege canalul cu care te simți mai confortabil. Sesizarea va fi
          tratată cu confidențialitate, indiferent de canalul ales.
        </Reveal>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <Reveal>
          <Card className="h-full overflow-hidden border-navy/10 bg-paper transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]">
            <div className="border-b border-navy/10 bg-gradient-to-br from-navy via-navy-soft to-navy-deep p-7 text-white">
              <span
                aria-hidden="true"
                className="inline-flex size-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15"
              >
                <ExternalLink className="size-6 text-gold-light" strokeWidth={1.75} />
              </span>
              <p className="mt-4 text-xs uppercase tracking-[0.14em] text-gold-light">
                Canal 1
              </p>
              <p className="mt-2 font-serif text-2xl font-semibold leading-tight !text-white">
                Formular online
              </p>
            </div>
            <CardContent className="space-y-5 p-7">
              <p className="text-pretty text-sm leading-relaxed text-ink/85">
                Completează formularul Microsoft Forms / Google Forms.
                Datele tale personale nu sunt cerute — poți rămâne complet
                anonim. Descrie cât mai detaliat faptele, demersurile pe
                care le-ai întreprins și, dacă ai, anexează dovezi.
              </p>
              <a
                href={REPORT_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy-deep transition-all hover:-translate-y-0.5 hover:bg-gold-light"
              >
                Deschide formularul
                <ExternalLink className="size-4" strokeWidth={1.75} />
              </a>
            </CardContent>
          </Card>
        </Reveal>

        <Reveal delay={1}>
          <Card className="h-full overflow-hidden border-navy/10 bg-paper transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]">
            <div className="border-b border-navy/10 bg-gradient-to-br from-navy via-navy-soft to-navy-deep p-7 text-white">
              <span
                aria-hidden="true"
                className="inline-flex size-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15"
              >
                <Inbox className="size-6 text-gold-light" strokeWidth={1.75} />
              </span>
              <p className="mt-4 text-xs uppercase tracking-[0.14em] text-gold-light">
                Canal 2
              </p>
              <p className="mt-2 font-serif text-2xl font-semibold leading-tight !text-white">
                Cutia poștală
              </p>
            </div>
            <CardContent className="space-y-5 p-7">
              <p className="text-pretty text-sm leading-relaxed text-ink/85">
                În holul principal al liceului se află o cutie poștală
                dedicată sesizărilor anonime. Poți depune o scrisoare oricând
                — cutia este verificată periodic de echipa responsabilă.
              </p>
              <p className="text-pretty text-xs text-muted">
                Locație: holul principal al seminarului · adresa școlii este
                pe pagina de{" "}
                <Link
                  href="/contact"
                  className="font-semibold text-gold-deep hover:underline"
                >
                  contact
                </Link>
                .
              </p>
            </CardContent>
          </Card>
        </Reveal>
      </div>

      <Reveal delay={2}>
        <div className="mt-10 flex items-start gap-4 rounded-2xl border border-navy/10 bg-paper p-5">
          <AlertTriangle
            aria-hidden="true"
            className="mt-0.5 size-5 shrink-0 text-gold-deep"
            strokeWidth={1.75}
          />
          <p className="text-pretty text-sm text-ink/80">
            <strong className="text-navy">La depunerea sesizării</strong> este
            obligatorie precizarea detaliată a obiectului acesteia, a
            demersurilor întreprinse, a informațiilor disponibile pentru
            susținerea afirmațiilor și — în măsura în care le deții — anexarea
            de dovezi concludente.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

function WhatHappens() {
  const steps = [
    {
      title: "Primire și verificare",
      body:
        "Sesizarea ajunge la consilierul școlar și la conducerea seminarului. Se verifică datele și se evaluează urgența situației.",
    },
    {
      title: "Investigație confidențială",
      body:
        "Se aud părțile implicate, în mod separat și cu păstrarea anonimatului sesizării. Se folosește Fișa de identificare (Anexa 3 la PO 6235/2023).",
    },
    {
      title: "Măsuri și sprijin",
      body:
        "În funcție de gravitate: discuții cu părinții, măsuri disciplinare conform ROFUI, sprijin psihologic pentru victimă, iar — dacă este cazul — sesizarea autorităților competente.",
    },
    {
      title: "Monitorizare",
      body:
        "Situația este urmărită activ pe parcursul a cel puțin 30 de zile, cu intervenții suplimentare dacă este nevoie.",
    },
  ];
  return (
    <section className="wrap mt-24">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal as="p" className="eyebrow">
          Ce se întâmplă după ce sesizezi
        </Reveal>
        <Reveal as="h2" delay={1} className="mt-3 text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight">
          Patru pași clari
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

function LegalFramework() {
  return (
    <section className="wrap mt-24">
      <Reveal>
        <Card className="overflow-hidden border-navy/10 bg-gradient-to-br from-navy-deep to-navy-soft text-white shadow-[var(--shadow-elevated)]">
          <CardContent className="grid gap-8 p-10 md:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="eyebrow !text-gold-light">Cadrul legal</p>
              <h2 className="mt-3 !text-white font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-tight">
                Pe ce ne bazăm
              </h2>
              <ul className="mt-5 space-y-3 text-sm text-white/85">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-gold-light" strokeWidth={1.75} />
                  <span>
                    <strong className="text-white">
                      Legea învățământului preuniversitar nr. 198/2023
                    </strong>
                    , art. 65 alin. (4)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-gold-light" strokeWidth={1.75} />
                  <span>
                    <strong className="text-white">
                      Ordinul Ministrului Educației nr. 6235/2023
                    </strong>{" "}
                    — procedura operațională „Managementul cazurilor de
                    violență”
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-gold-light" strokeWidth={1.75} />
                  <span>
                    Regulamentul de organizare și funcționare a unităților
                    de învățământ preuniversitar (ROFUÎP — Ordin 4183/2022)
                  </span>
                </li>
              </ul>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={EDU_RO_GUIDE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy-deep transition-all hover:-translate-y-0.5 hover:bg-gold-light"
                >
                  <FileText className="size-4" strokeWidth={1.75} />
                  Ghidul de pe edu.ro
                </a>
                <Link
                  href="/regulamente"
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-white hover:bg-white/10"
                >
                  Regulamente
                </Link>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <p className="text-xs uppercase tracking-[0.14em] text-white/55">
                Telverde · 0 800 070 401
              </p>
              <p className="font-semibold text-white">
                Telefonul Copilului
              </p>
              <p className="text-xs uppercase tracking-[0.14em] text-white/55">
                Sau sună la
              </p>
              <p className="font-semibold text-white">119</p>
              <p className="text-[0.7rem] uppercase tracking-[0.16em] text-white/45">
                Linie de urgență — abuz asupra copilului
              </p>
            </div>
          </CardContent>
        </Card>
      </Reveal>
    </section>
  );
}

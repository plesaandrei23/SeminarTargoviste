import type { Metadata } from "next";
import Link from "next/link";
import {
  Accessibility,
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Mail,
  Scale,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Declarație de accesibilitate",
  description: `Declarație de accesibilitate pentru website-ul Seminarului Teologic Ortodox „${siteConfig.patron}” din ${siteConfig.city}, conform Legii 590/2021.`,
  alternates: { canonical: "/declaratie-accesibilitate" },
};

export default function AccesibilitatePage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-parchment pb-[clamp(4rem,9vw,8rem)]">
        <Hero />
        <Statement />
        <Conformity />
        <Feedback />
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
            Legal
          </Badge>
          <h1 className="mt-5 text-balance text-white! text-[clamp(2.2rem,4.8vw,3.8rem)] font-semibold leading-[1.05]">
            Declarație de accesibilitate
          </h1>
          <p className="mt-6 text-pretty text-white/85 sm:text-lg">
            Conform Legii nr. 590/2021 privind accesibilitatea site-urilor web
            și aplicațiilor mobile ale organismelor sectorului public, în
            transpunerea Directivei (UE) 2016/2102.
          </p>
        </div>
      </div>
    </section>
  );
}

function Statement() {
  return (
    <section className="wrap mt-16 max-w-3xl space-y-8">
      <Reveal>
        <Card className="border-navy/10 bg-paper">
          <CardContent className="space-y-5 p-7">
            <p className="text-pretty text-[1.05rem] leading-relaxed text-ink/85">
              <strong className="text-navy">
                Seminarul Teologic Ortodox „{siteConfig.patron}” din{" "}
                {siteConfig.city}
              </strong>{" "}
              se angajează să facă site-ul său web accesibil, în conformitate cu
              Legea nr. 590/2021. Această declarație de accesibilitate se aplică
              site-ului{" "}
              <a
                href={siteConfig.url}
                className="font-semibold text-gold-deep hover:underline"
              >
                {siteConfig.url}
              </a>
              .
            </p>
          </CardContent>
        </Card>
      </Reveal>

      <Reveal delay={1}>
        <h2 className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-tight text-navy">
          Stadiul de conformitate
        </h2>
        <p className="mt-4 text-pretty text-[1.05rem] leading-relaxed text-ink/85">
          Acest site este{" "}
          <strong className="text-navy">parțial conform</strong> cu Ghidul WCAG
          2.1 nivelul AA, din cauza neconformităților listate mai jos.
        </p>
      </Reveal>

      <Reveal delay={2}>
        <h3 className="font-serif text-xl font-semibold text-navy">
          Conținut neaccesibil
        </h3>
        <p className="mt-3 text-pretty text-ink/85">
          Conținutul de mai jos nu este pe deplin accesibil din motivele
          enumerate:
        </p>
        <ul className="mt-4 space-y-3">
          <li className="flex items-start gap-3 rounded-2xl border border-navy/10 bg-paper p-4">
            <AlertCircle
              aria-hidden="true"
              className="mt-0.5 size-5 shrink-0 text-amber-600"
              strokeWidth={1.75}
            />
            <div>
              <p className="font-semibold text-navy">
                Documente PDF preluate din arhiva istorică
              </p>
              <p className="mt-1 text-sm text-pretty text-ink/80">
                Unele documente PDF (hotărâri ale C.A., proceduri, formulare)
                provin din arhiva legacy a site-ului anterior și pot fi
                scanări care nu au strat de text accesibil pentru cititoare de
                ecran. Lucrăm la înlocuirea lor cu versiuni accesibile.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3 rounded-2xl border border-navy/10 bg-paper p-4">
            <AlertCircle
              aria-hidden="true"
              className="mt-0.5 size-5 shrink-0 text-amber-600"
              strokeWidth={1.75}
            />
            <div>
              <p className="font-semibold text-navy">
                Galerii foto din articolele de eveniment
              </p>
              <p className="mt-1 text-sm text-pretty text-ink/80">
                O parte din fotografiile articolelor mai vechi nu au descriere
                alternativă completă. Lucrăm la adăugarea atributelor alt
                pentru întregul fond foto preluat din arhiva legacy.
              </p>
            </div>
          </li>
        </ul>
      </Reveal>
    </section>
  );
}

function Conformity() {
  const items = [
    "Structură semantică HTML5 cu landmark-uri (header, main, footer, nav)",
    "Contrast de minimum 4.5:1 pentru text normal și 3:1 pentru text mare",
    "Focus vizibil pentru toate elementele interactive (inel auriu pe focus)",
    "Imagini cu descriere alternativă (alt) pentru tot conținutul ridicat post-2026",
    "Navigare completă cu tastatura (Tab, Shift+Tab, Enter, Space)",
    "Suport pentru utilizatorii care preferă reducerea mișcării (prefers-reduced-motion)",
    "Formularul de contact cu etichete clare (label), mesaje de eroare per câmp și autocompletare",
    "Heading hierarchy strictă (un singur h1 per pagină)",
    "Limbă declarată la nivel de pagină (lang=ro) pentru cititoare de ecran",
  ];

  return (
    <section className="wrap mt-20 max-w-3xl">
      <Reveal>
        <p className="eyebrow">Ce am implementat</p>
        <h2 className="mt-3 font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-tight text-navy">
          Măsuri active de accesibilitate
        </h2>
      </Reveal>
      <Reveal delay={1}>
        <ul className="mt-8 space-y-3">
          {items.map((t) => (
            <li
              key={t}
              className="flex items-start gap-3 rounded-2xl border border-navy/10 bg-paper p-4"
            >
              <CheckCircle2
                aria-hidden="true"
                className="mt-0.5 size-5 shrink-0 text-emerald-600"
                strokeWidth={1.75}
              />
              <span className="text-pretty text-[0.96rem] text-ink/85">{t}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

function Feedback() {
  return (
    <section className="wrap mt-20 max-w-3xl">
      <Reveal>
        <Card className="overflow-hidden border-navy/10 bg-gradient-to-br from-navy-deep to-navy-soft text-white shadow-[var(--shadow-elevated)]">
          <CardContent className="space-y-6 p-10">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="inline-flex size-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15"
              >
                <Accessibility className="size-6 text-gold-light" strokeWidth={1.5} />
              </span>
              <div>
                <p className="eyebrow text-gold-light!">Feedback și sesizări</p>
                <h2 className="mt-1 text-white! font-serif text-xl font-semibold leading-tight">
                  Ai întâmpinat o barieră?
                </h2>
              </div>
            </div>
            <p className="text-pretty text-white/80">
              Dacă întâlnești probleme de accesibilitate pe acest site, te rugăm
              să ne semnalezi. Vom răspunde în maximum <strong className="text-white">15 zile lucrătoare</strong>{" "}
              și vom propune un termen de remediere.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href={`mailto:${siteConfig.contact.email}?subject=Accesibilitate%20site`}
                className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy-deep transition-all hover:-translate-y-0.5 hover:bg-gold-light"
              >
                <Mail className="size-4" strokeWidth={1.75} />
                Trimite un mesaj
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-white hover:bg-white/10"
              >
                <Scale className="size-4" strokeWidth={1.75} />
                Formularul de contact
              </Link>
            </div>
            <div className="border-t border-white/10 pt-6 text-sm text-white/70">
              <p>
                Mecanism de aplicare:{" "}
                <strong className="text-white">Autoritatea pentru Digitalizarea României (ADR)</strong>,
                în cazul în care nu primești un răspuns satisfăcător în termenul
                indicat.
              </p>
              <p className="mt-3 text-xs text-white/55">
                Această declarație a fost actualizată la 25 iunie 2026, pe baza
                unui audit intern al site-ului.
              </p>
            </div>
          </CardContent>
        </Card>
      </Reveal>
    </section>
  );
}

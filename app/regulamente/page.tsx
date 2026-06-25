import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpenCheck, ExternalLink, Scale } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { DownloadCard } from "@/components/DownloadCard";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Regulamente",
  description: `Regulamente de organizare și funcționare la Seminarul Teologic Ortodox „${siteConfig.patron}” din ${siteConfig.city} — Protocol seminarii teologice + ROFUÎP (Ordinul 4183/2022).`,
  alternates: { canonical: "/regulamente" },
};

type Document = {
  title: string;
  byline: string;
  href: string;
  icon: typeof Scale;
  description: string;
};

const DOCUMENTS: Document[] = [
  {
    title: "Protocol de organizare și funcționare a seminariilor teologice",
    byline: "Patriarhia Română · Sfântul Sinod",
    href: "/docs/protocol-organizare-seminarii.pdf",
    icon: BookOpenCheck,
    description:
      "Documentul-cadru al Sfântului Sinod, care reglementează specificul vocațional al școlilor teologice ortodoxe — admiterea, programul liturgic, disciplinele teologice și obligațiile pastorale ale elevilor și cadrelor didactice.",
  },
  {
    title:
      "Ordinul nr. 4183/2022 — Regulamentul-cadru de organizare și funcționare a unităților de învățământ preuniversitar (ROFUÎP)",
    byline: "Ministerul Educației · 4 iulie 2022",
    href: "/docs/ordin-regulament-cadru-4183-2022.pdf",
    icon: Scale,
    description:
      "Regulamentul-cadru al Ministerului Educației aplicabil tuturor unităților de învățământ preuniversitar din România. Reglementează drepturile și obligațiile elevilor, evaluarea, frecvența, disciplina, precum și raporturile dintre școală, familie și autorități.",
  },
];

export default function RegulamentePage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-parchment pb-[clamp(4rem,9vw,8rem)]">
        <Hero />
        <DocumentsSection />
        <InternalRulesNote />
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
            Regulamente
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
            Documentele oficiale după care funcționează seminarul — protocolul
            Sfântului Sinod pentru școlile teologice și regulamentul-cadru al
            Ministerului Educației pentru învățământul preuniversitar.
          </p>
        </div>
      </div>
    </section>
  );
}

function DocumentsSection() {
  return (
    <section className="wrap mt-16">
      <Reveal as="p" className="eyebrow">
        Documente oficiale
      </Reveal>
      <Reveal as="h2" delay={1} className="mt-3 max-w-2xl text-[clamp(1.8rem,3.5vw,2.6rem)] font-semibold leading-tight">
        Două documente, două niveluri de reglementare
      </Reveal>
      <Reveal as="p" delay={2} className="mt-4 max-w-2xl text-pretty text-muted">
        Pentru aspectele vocaționale — programul liturgic, disciplinele de
        specialitate, formarea pastorală — se aplică Protocolul Sfântului
        Sinod. Pentru toate celelalte aspecte ale vieții școlare se aplică
        Regulamentul Ministerului Educației.
      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {DOCUMENTS.map((doc, i) => (
          <Reveal key={doc.href} delay={((i % 3) + 1) as 1 | 2 | 3}>
            <Card className="h-full border-navy/10 bg-paper transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]">
              <CardContent className="space-y-5 p-7">
                <span
                  aria-hidden="true"
                  className="inline-flex size-12 items-center justify-center rounded-2xl bg-gold/15"
                >
                  <doc.icon className="size-6 text-gold-deep" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-gold-deep">
                    {doc.byline}
                  </p>
                  <h3 className="mt-2 font-serif text-xl font-semibold leading-tight text-navy text-balance">
                    {doc.title}
                  </h3>
                </div>
                <p className="text-pretty text-sm leading-relaxed text-ink/85">
                  {doc.description}
                </p>
                <DownloadCard
                  href={doc.href}
                  title="Descarcă PDF"
                  byline={doc.byline}
                />
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function InternalRulesNote() {
  return (
    <section className="wrap mt-24">
      <Reveal>
        <Card className="overflow-hidden border-navy/10 bg-gradient-to-br from-navy-deep to-navy-soft text-white shadow-[var(--shadow-elevated)]">
          <CardContent className="grid gap-8 p-10 md:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="eyebrow text-gold-light!">Reglementări interne</p>
              <h2 className="mt-3 text-white! font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-tight">
                ROI și ROFUI — disponibile la secretariat
              </h2>
              <p className="mt-4 max-w-md text-pretty text-white/80">
                Pe lângă documentele de mai sus, seminarul își are propriul
                Regulament de Ordine Interioară și Regulament de Organizare
                și Funcționare, aprobate anual de Consiliul de Administrație.
                Sunt afișate la avizier și pot fi consultate la cerere.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy-deep transition-all hover:-translate-y-0.5 hover:bg-gold-light"
                >
                  <ExternalLink className="size-4" strokeWidth={1.75} />
                  Cere la secretariat
                </Link>
                <Link
                  href="https://seminarortodoxtargoviste.ro/regulamente"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-white hover:bg-white/10"
                >
                  Pagina originală
                  <ArrowLeft className="size-4 rotate-180" strokeWidth={1.75} />
                </Link>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <p className="text-xs uppercase tracking-[0.14em] text-white/55">
                Program secretariat
              </p>
              <p className="font-semibold text-white">
                {siteConfig.contact.hours}
              </p>
              <p className="mt-4 text-xs uppercase tracking-[0.14em] text-white/55">
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

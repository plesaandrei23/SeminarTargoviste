import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookText, ExternalLink, Scale, Shield } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { HotarariArchive } from "@/components/HotarariArchive";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { sanityClient } from "@/sanity/lib/client";
import { allHotarariCAQuery } from "@/sanity/lib/queries";
import type { HotarareCA } from "@/sanity/lib/types";
import { siteConfig } from "@/lib/site-config";

// Rebuild every 5 minutes — this page displays the CA archive coming from
// Sanity, so we want editor updates (new summaries, new PDFs) live on the
// site without waiting for a redeploy.
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Consiliul de Administrație",
  description: `Hotărârile Consiliului de Administrație al Seminarului Teologic Ortodox „${siteConfig.patron}” din ${siteConfig.city} — arhivă completă.`,
  alternates: { canonical: "/consiliul-de-administratie" },
};

async function fetchHotarari(): Promise<HotarareCA[]> {
  try {
    return await sanityClient.fetch<HotarareCA[]>(
      allHotarariCAQuery,
      {},
      { next: { revalidate: 300, tags: ["hotarareCA"] } },
    );
  } catch (e) {
    console.error("hotarari fetch failed:", e);
    return [];
  }
}

export default async function ConsiliuPage() {
  const items = await fetchHotarari();
  const total = items.length;
  const years = Array.from(
    new Set(items.map((h) => h.year).filter((y): y is number => y != null)),
  ).sort((a, b) => b - a);
  const yearsCovered = years.length;
  const oldest = years.at(-1) ?? new Date().getFullYear();
  const newest = years.at(0) ?? new Date().getFullYear();

  return (
    <>
      <Header />
      <main className="flex-1 bg-parchment pb-[clamp(4rem,9vw,8rem)]">
        <Hero total={total} yearsCovered={yearsCovered} oldest={oldest} newest={newest} />
        <Context />
        <HotarariArchive items={items} />
        <Note />
      </main>
      <Footer />
    </>
  );
}

function Hero({
  total,
  yearsCovered,
  oldest,
  newest,
}: {
  total: number;
  yearsCovered: number;
  oldest: number;
  newest: number;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-navy-deep via-navy to-navy-soft pt-32 pb-20 text-white">
      <div className="wrap relative">
        <Link
          href="/profesori"
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] text-white/65 transition-colors hover:text-gold-light"
        >
          <ArrowLeft className="size-3" strokeWidth={2} />
          Înapoi la profesori
        </Link>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div>
            <Badge variant="outline" className="border-gold/40 text-gold-light">
              Conducerea școlii
            </Badge>
            <h1 className="mt-5 text-balance text-white! text-[clamp(2.4rem,5.5vw,4.4rem)] font-semibold leading-[1.05]">
              Consiliul de Administrație
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
              Arhiva completă a hotărârilor Consiliului de Administrație al
              Seminarului. Toate documentele sunt publice — vezi-le pe an,
              caută după număr sau dată, deschide direct PDF-ul.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 sm:max-w-sm lg:max-w-none">
            <Stat value={total} label="hotărâri" />
            <Stat value={yearsCovered} label="ani arhivă" />
            <Stat value={`${oldest}-${String(newest).slice(2)}`} label="acoperire" small />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  value,
  label,
  small = false,
}: {
  value: number | string;
  label: string;
  small?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-4 text-center">
      <p
        className={`font-serif font-semibold text-white ${small ? "text-lg" : "text-2xl sm:text-3xl"}`}
      >
        {value}
      </p>
      <p className="mt-1 text-[0.65rem] uppercase tracking-[0.14em] text-white/65">
        {label}
      </p>
    </div>
  );
}

function Context() {
  return (
    <section className="wrap mt-16 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
      <Reveal>
        <p className="eyebrow">Despre Consiliul de Administrație</p>
        <h2 className="mt-3 font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-tight text-navy text-balance">
          Cine ia deciziile și după ce reguli
        </h2>
        <p className="mt-5 text-pretty text-[1.05rem] leading-relaxed text-ink/85">
          Consiliul de Administrație (C.A.) este organul de conducere
          administrativă al seminarului. Este alcătuit din directorul școlii
          (președinte), reprezentanți ai cadrelor didactice, ai părinților,
          ai elevilor și — fiind o școală vocațională ortodoxă — ai
          Arhiepiscopiei Târgoviștei și ai Inspectoratului Școlar.
        </p>
        <p className="mt-4 text-pretty text-[1.05rem] leading-relaxed text-ink/85">
          C.A. se întrunește lunar (sau ori de câte ori este nevoie) și
          deliberează asupra <strong className="text-navy">bugetului</strong>,{" "}
          <strong className="text-navy">cifrei de școlarizare</strong>,{" "}
          <strong className="text-navy">structurii anului școlar</strong>,{" "}
          <strong className="text-navy">resursei umane</strong> (angajări,
          mobilități), <strong className="text-navy">organizării
          examenelor</strong> și a oricăror probleme administrative ale
          școlii.
        </p>
        <p className="mt-4 text-pretty text-[1.05rem] leading-relaxed text-ink/85">
          Toate hotărârile sunt publice. Le găsești mai jos, grupate pe ani,
          cu motorul de căutare după număr sau dată.
        </p>
      </Reveal>

      <Reveal delay={1} className="space-y-4">
        <Card className="border-navy/10 bg-paper">
          <CardContent className="flex gap-4 p-6">
            <span className="inline-flex size-11 items-center justify-center rounded-xl bg-gold/15">
              <BookText className="size-5 text-gold-deep" strokeWidth={1.75} />
            </span>
            <div>
              <p className="font-serif text-base font-semibold leading-tight text-navy">
                Frecvență
              </p>
              <p className="mt-1 text-sm text-pretty text-ink/80">
                Ședință ordinară lunar; ședințe extraordinare convocate ad-hoc
                pentru urgențe (admiteri, mobilități, evenimente).
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-navy/10 bg-paper">
          <CardContent className="flex gap-4 p-6">
            <span className="inline-flex size-11 items-center justify-center rounded-xl bg-gold/15">
              <Scale className="size-5 text-gold-deep" strokeWidth={1.75} />
            </span>
            <div>
              <p className="font-serif text-base font-semibold leading-tight text-navy">
                Cadrul legal
              </p>
              <p className="mt-1 text-sm text-pretty text-ink/80">
                Legea învățământului preuniversitar nr. 198/2023 și
                Regulamentul-cadru de organizare ROFUÎP — Ordin 4183/2022.
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-navy/10 bg-paper">
          <CardContent className="flex gap-4 p-6">
            <span className="inline-flex size-11 items-center justify-center rounded-xl bg-gold/15">
              <Shield className="size-5 text-gold-deep" strokeWidth={1.75} />
            </span>
            <div>
              <p className="font-serif text-base font-semibold leading-tight text-navy">
                Transparență
              </p>
              <p className="mt-1 text-sm text-pretty text-ink/80">
                Toate hotărârile sunt afișate la avizier și publicate online
                în maximum 5 zile lucrătoare de la ședință.
              </p>
            </div>
          </CardContent>
        </Card>
      </Reveal>
    </section>
  );
}

function Note() {
  return (
    <section className="wrap mt-20">
      <Reveal>
        <Card className="overflow-hidden border-navy/10 bg-gradient-to-br from-navy-deep to-navy-soft text-white shadow-[var(--shadow-elevated)]">
          <CardContent className="grid gap-8 p-10 md:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="eyebrow text-gold-light!">Întrebări sau cereri</p>
              <h2 className="mt-3 text-white! font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-tight">
                Cere o copie certificată
              </h2>
              <p className="mt-4 max-w-md text-pretty text-white/80">
                Hotărârile pot fi descărcate liber. Pentru o copie semnată și
                ștampilată, depune o cerere la secretariat — termenul de
                eliberare este de maximum 5 zile lucrătoare.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy-deep transition-all hover:-translate-y-0.5 hover:bg-gold-light"
                >
                  Contactează secretariatul
                </Link>
                <a
                  href="https://seminarortodoxtargoviste.ro/consiliul-de-administratie"
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
                Program secretariat
              </p>
              <p className="font-semibold text-white">
                {siteConfig.contact.hours}
              </p>
              <p className="mt-3 text-xs uppercase tracking-[0.14em] text-white/55">
                Adresa
              </p>
              <p className="font-semibold text-white">
                {siteConfig.address.street}, {siteConfig.address.city}
              </p>
            </div>
          </CardContent>
        </Card>
      </Reveal>
    </section>
  );
}

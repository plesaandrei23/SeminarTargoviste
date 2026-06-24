import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { GraduationCap, Mail, Phone, Users } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { ProfessorGrid } from "@/components/ProfessorGrid";
import { Card, CardContent } from "@/components/ui/card";
import { sanityClient } from "@/sanity/lib/client";
import { allPersonalQuery } from "@/sanity/lib/queries";
import type { Personal } from "@/sanity/lib/types";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Profesori — corpul didactic",
  description: `Profesorii, preoții profesori și personalul Seminarului Teologic Ortodox „${siteConfig.patron}” din ${siteConfig.city}.`,
  alternates: { canonical: "/profesori" },
};

async function fetchPersonnel(): Promise<Personal[]> {
  try {
    return await sanityClient.fetch<Personal[]>(
      allPersonalQuery,
      {},
      { next: { revalidate: 300, tags: ["personal"] } },
    );
  } catch (e) {
    console.error("Personnel fetch failed:", e);
    return [];
  }
}

export default async function ProfesoriPage() {
  const people = await fetchPersonnel();

  const didactic = people.filter((p) => p.category === "didactic");
  // Auxiliar strip covers BOTH didactic-auxiliar (secretar, contabil) and
  // nedidactic (cleaning, maintenance, etc.) — anyone whose role isn't
  // teaching or running the school lands here.
  const auxiliar = people.filter(
    (p) =>
      p.category === "didactic-auxiliar" || p.category === "nedidactic",
  );

  return (
    <>
      <Header />
      <main className="flex-1 bg-parchment pb-[clamp(4rem,9vw,8rem)]">
        <Hero
          total={people.length}
          subjectsCount={new Set(didactic.map((p) => p.subject).filter(Boolean)).size}
        />

        {/*
          Director + duhovnici + teachers all live in the same grid now.
          The query already orders conducere first, so the director shows up
          as the lead card without needing a dedicated row above.
        */}
        <ProfessorGrid people={people} />

        {auxiliar.length > 0 && (
          <section className="wrap mt-24">
            <SectionHeader
              eyebrow="În spatele scenei"
              title="Personal administrativ"
              intro="Echipa care ține seminarul în mișcare în fiecare zi — de la secretariat la contabilitate."
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {auxiliar.map((p, i) => (
                <CompactPersonCard key={p._id} person={p} delay={((i % 3) + 1) as 1 | 2 | 3} />
              ))}
            </div>
          </section>
        )}

        <ContactCta />
      </main>
      <Footer />
    </>
  );
}

/* ── Hero ────────────────────────────────────────────────────── */

function Hero({ total, subjectsCount }: { total: number; subjectsCount: number }) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-navy-deep via-navy to-navy-soft pt-36 pb-24 text-white">
      <div className="wrap relative mx-auto max-w-3xl text-center">
        <Reveal as="p" className="eyebrow !text-gold-light">
          Corpul profesoral
        </Reveal>
        <Reveal
          as="h1"
          delay={1}
          className="mt-3 !text-white text-[clamp(2.4rem,5.5vw,4.4rem)] font-semibold leading-[1.05]"
        >
          Dascăli, modele, mentori
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
          Preoți profesori, cadre didactice și personal administrativ —
          formează tinerii noștri în spiritul Bisericii și al exigenței academice.
        </Reveal>
        <Reveal delay={3} className="mt-9 flex flex-wrap justify-center gap-6 text-sm text-white/80">
          <HeroStat Icon={Users} value={total} label="cadre" />
          <HeroStat Icon={GraduationCap} value={subjectsCount} label="discipline" />
        </Reveal>
      </div>
    </section>
  );
}

function HeroStat({
  Icon,
  value,
  label,
}: {
  Icon: typeof Users;
  value: number;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-4 py-2">
      <Icon className="size-4 text-gold-light" strokeWidth={1.75} />
      <span className="font-serif text-lg font-semibold text-white">{value}</span>
      <span className="text-white/65">{label}</span>
    </span>
  );
}

/* ── Compact card — used for the auxiliary staff strip ───────── */

function CompactPersonCard({
  person,
  delay,
}: {
  person: Personal;
  delay: 1 | 2 | 3;
}) {
  return (
    <Reveal delay={delay}>
      <Card className="h-full border-navy/10 bg-paper">
        <CardContent className="flex items-center gap-4 p-5">
          <PortraitFrame person={person} />
          <div className="min-w-0">
            <p className="font-serif text-lg font-semibold leading-tight text-navy text-balance">
              {person.name}
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.12em] text-gold-deep">
              {person.role}
            </p>
          </div>
        </CardContent>
      </Card>
    </Reveal>
  );
}

/* ── Portrait frame — gold accent + image fallback ───────────── */

function PortraitFrame({
  person,
  large = false,
}: {
  person: Personal;
  large?: boolean;
}) {
  const photo = person.photo;
  if (large) {
    return (
      <div className="relative aspect-[4/5] overflow-hidden border-b border-navy/10 bg-gradient-to-br from-navy via-navy-soft to-gold-deep">
        {photo?.asset && (
          <Image
            src={photo.asset.url}
            alt={photo.alt || person.name}
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-top"
          />
        )}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-navy-deep/70 to-transparent"
        />
      </div>
    );
  }
  return (
    <div className="relative size-16 shrink-0 overflow-hidden rounded-full border-2 border-gold bg-gradient-to-br from-navy to-gold-deep">
      {photo?.asset ? (
        <Image
          src={photo.asset.url}
          alt={photo.alt || person.name}
          fill
          sizes="64px"
          className="object-cover object-top"
        />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center font-serif text-xl font-semibold text-gold-light">
          {person.name
            .split(" ")
            .filter((s) => /^[A-ZȘȚĂÎÂ]/.test(s))
            .slice(0, 2)
            .map((s) => s[0])
            .join("")}
        </span>
      )}
    </div>
  );
}

/* ── Contact CTA ─────────────────────────────────────────────── */

function ContactCta() {
  return (
    <section className="wrap mt-24">
      <Reveal>
        <Card className="overflow-hidden border-navy/10 bg-gradient-to-br from-navy-deep to-navy-soft text-white">
          <CardContent className="grid gap-8 p-10 md:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="eyebrow !text-gold-light">Vrei să afli mai multe?</p>
              <h2 className="mt-3 !text-white font-serif text-[clamp(1.8rem,3.5vw,2.6rem)] font-semibold leading-tight">
                Întâlnește profesorii la o ședință de pregătire
              </h2>
              <p className="mt-4 max-w-md text-pretty text-white/80">
                Cei care predau pentru admitere susțin ședințe gratuite în
                aprilie–mai. Vino, urmărește un curs, pune întrebări.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/admitere#pregatire"
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy-deep transition-all hover:-translate-y-0.5 hover:bg-gold-light"
                >
                  <GraduationCap className="size-4" strokeWidth={1.75} />
                  Vezi programul de pregătire
                </Link>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <p className="text-xs uppercase tracking-[0.14em] text-white/55">
                Secretariat
              </p>
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="flex items-center gap-3 transition-colors hover:text-gold-light"
              >
                <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/10">
                  <Phone className="size-4 text-gold-light" strokeWidth={1.75} />
                </span>
                <span className="font-semibold text-white">
                  {siteConfig.contact.phoneDisplay}
                </span>
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-3 transition-colors hover:text-gold-light"
              >
                <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/10">
                  <Mail className="size-4 text-gold-light" strokeWidth={1.75} />
                </span>
                <span className="font-semibold text-white">
                  {siteConfig.contact.email}
                </span>
              </a>
            </div>
          </CardContent>
        </Card>
      </Reveal>
    </section>
  );
}

/* ── Shared helpers ──────────────────────────────────────────── */

function SectionHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
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

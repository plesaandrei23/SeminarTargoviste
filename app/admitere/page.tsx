import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PortableArticleBody } from "@/components/PortableArticleBody";
import { Reveal } from "@/components/Reveal";
import { sanityClient } from "@/sanity/lib/client";
import { admissionCyclesQuery } from "@/sanity/lib/queries";
import type { AdmissionCycle, CalendarItem } from "@/sanity/lib/types";
import { siteConfig } from "@/lib/site-config";
import { formatRoDate } from "@/lib/format";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Admitere — clasa a IX-a, Teologie Pastorală",
  description: `Admitere ${siteConfig.admission.cycle} la Seminarul Teologic Ortodox „${siteConfig.patron}” din ${siteConfig.city} — ${siteConfig.admission.spots} de locuri, specializarea ${siteConfig.admission.program}.`,
  alternates: { canonical: "/admitere" },
  openGraph: {
    title: `Admitere ${siteConfig.admission.cycle} · ${siteConfig.shortName}`,
    description: `${siteConfig.admission.spots} de locuri · ${siteConfig.admission.program} · Sesiunea ${siteConfig.admission.session}`,
    type: "website",
  },
};

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

/**
 * Default calendar for the current cycle when no entries exist in Sanity.
 * Staff can override by filling the `calendar` array on the cycle record;
 * the page reads that first and falls back here.
 */
const DEFAULT_CALENDAR: CalendarItem[] = [
  { date: "2026-05-15", label: "Începerea înscrierilor online", note: "Dosarul se depune la secretariat" },
  { date: "2026-05-22", label: "Proba de aptitudini", note: "Cunoștințe muzicale și de religie" },
  { date: "2026-05-30", label: "Afișarea rezultatelor", note: "Listele apar pe avizier și pe site" },
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

export default async function AdmiterePage() {
  const cycles = await fetchCycles();
  const current = cycles.find((c) => c.isCurrent) ?? cycles[0];
  const archive = cycles.filter((c) => c !== current);
  const calendar =
    current?.calendar && current.calendar.length > 0
      ? current.calendar
      : DEFAULT_CALENDAR;

  return (
    <>
      <Header />
      <main className="flex-1 bg-parchment pb-[clamp(4rem,9vw,8rem)]">
        <Hero year={current?.year ?? siteConfig.admission.cycle} />

        <FactsStrip />

        <section id="calendar" className="wrap mt-20 scroll-mt-32">
          <Reveal as="h2" className="mb-10 text-center text-[clamp(2rem,4vw,3rem)]">
            Calendar de admitere
          </Reveal>
          <Timeline items={calendar} />
        </section>

        <section
          id="acte"
          className="wrap mt-20 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16 scroll-mt-32"
        >
          <Reveal as="div">
            <h2 className="mb-6 text-[clamp(1.8rem,3.4vw,2.4rem)]">
              Acte necesare
            </h2>
            <p className="mb-6 text-muted text-pretty">
              Toate documentele se depun la secretariatul seminarului,
              Bd. Unirii 28, în intervalul de înscriere. Dosarul se preia
              numai dacă toate piesele sunt complete.
            </p>
            <ul className="space-y-3">
              {REQUIRED_DOCS.map((d) => (
                <li
                  key={d}
                  className="flex items-start gap-3 rounded-xl border border-navy/10 bg-paper p-4"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-navy-deep text-xs font-bold"
                  >
                    ✓
                  </span>
                  <span className="text-[0.96rem] text-ink/85 text-pretty">{d}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal as="aside" delay={1} className="self-start lg:sticky lg:top-32">
            <div className="rounded-2xl border border-navy/10 bg-navy text-white p-7 shadow-[var(--shadow-elevated)]">
              <p className="eyebrow !text-gold-light">Întreabă-ne</p>
              <h3 className="mt-2 !text-white text-2xl">
                Secretariatul seminarului
              </h3>
              <p className="mt-3 text-white/80 text-pretty">
                Răspundem la întrebări legate de înscrieri, calendar, probele
                de aptitudini și dosare incomplete.
              </p>
              <dl className="mt-6 space-y-3 text-sm">
                <ContactRow
                  label="Telefon"
                  value={siteConfig.contact.phoneDisplay}
                  href={`tel:${siteConfig.contact.phone}`}
                />
                <ContactRow
                  label="Email"
                  value={siteConfig.contact.email}
                  href={`mailto:${siteConfig.contact.email}`}
                />
                <ContactRow label="Program" value={siteConfig.contact.hours} />
                <ContactRow
                  label="Adresă"
                  value={`${siteConfig.address.street}, ${siteConfig.address.city} ${siteConfig.address.postalCode}`}
                />
              </dl>
            </div>
          </Reveal>
        </section>

        {current && current.body.length > 0 && (
          <section className="wrap mt-20 max-w-3xl">
            <Reveal as="h2" className="mb-6 text-[clamp(1.8rem,3.4vw,2.4rem)]">
              Detalii sesiune
            </Reveal>
            <PortableArticleBody value={current.body} />
          </section>
        )}

        {archive.length > 0 && (
          <section className="wrap mt-20 max-w-3xl">
            <Reveal as="h2" className="mb-6 text-[clamp(1.6rem,3vw,2.1rem)]">
              Sesiuni anterioare
            </Reveal>
            <p className="mb-6 text-sm text-muted">
              Informații despre sesiunile de admitere din anii precedenți —
              pentru istoric și pentru cei interesați de modul de organizare.
            </p>
            <div className="space-y-10">
              {archive.map((c) => (
                <details
                  key={c._id}
                  className="rounded-2xl border border-navy/10 bg-paper p-6"
                >
                  <summary className="cursor-pointer font-serif text-xl font-semibold text-navy">
                    {c.year ?? "Sesiune anterioară"}
                    {c.session && (
                      <span className="ml-2 text-sm font-normal text-muted">
                        · {c.session}
                      </span>
                    )}
                  </summary>
                  <div className="mt-4">
                    <PortableArticleBody value={c.body} />
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}

function Hero({ year }: { year: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-navy-deep via-navy to-navy-soft pt-40 pb-24 text-white">
      <span
        aria-hidden="true"
        className="absolute -top-6 left-[4%] font-serif text-[10rem] leading-none text-gold/15 select-none"
      >
        ✶
      </span>
      <span
        aria-hidden="true"
        className="absolute -bottom-12 right-[5%] font-serif text-[10rem] leading-none text-gold/15 select-none"
      >
        ✶
      </span>
      <div className="wrap relative mx-auto max-w-3xl text-center">
        <Reveal as="p" className="eyebrow !text-gold-light">
          Admitere {year}
        </Reveal>
        <Reveal
          as="h1"
          delay={1}
          className="mt-3 !text-white text-[clamp(2.4rem,5.5vw,4.4rem)] font-semibold leading-tight"
        >
          Devino seminarist
        </Reveal>
        <Reveal
          as="p"
          delay={2}
          className="mx-auto mt-5 max-w-xl text-white/85 text-pretty sm:text-lg"
        >
          Înscrierile pentru clasa a IX-a, specializarea{" "}
          {siteConfig.admission.program}, sunt deschise. Mai jos găsești
          calendarul, actele necesare și datele de contact.
        </Reveal>
        <Reveal delay={3} className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href="#calendar"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy-deep transition-all hover:-translate-y-0.5 hover:bg-gold-light"
          >
            Calendar înscriere
          </a>
          <Link
            href="#acte"
            className="inline-flex items-center gap-2 rounded-full border border-white/50 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-white hover:bg-white/10"
          >
            Acte necesare
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function FactsStrip() {
  const facts = [
    { label: "Locuri", value: siteConfig.admission.spots.toString() },
    { label: "Specializare", value: siteConfig.admission.program },
    { label: "Durată", value: "Liceu · 4 ani" },
    { label: "Sesiune", value: siteConfig.admission.session },
  ];
  return (
    <section className="wrap -mt-12 relative z-10">
      <div className="grid gap-4 rounded-2xl border border-navy/10 bg-paper p-6 shadow-[var(--shadow-elevated)] sm:grid-cols-2 sm:p-8 lg:grid-cols-4">
        {facts.map((f, i) => (
          <Reveal
            key={f.label}
            delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
            className="border-b border-navy/10 pb-4 last:border-b-0 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-4 sm:last:border-r-0"
          >
            <p className="text-xs uppercase tracking-[0.16em] text-gold-deep">
              {f.label}
            </p>
            <p className="mt-2 font-serif text-2xl font-semibold text-navy leading-tight">
              {f.value}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Timeline({ items }: { items: CalendarItem[] }) {
  return (
    <ol className="relative mx-auto max-w-3xl border-l-2 border-gold/40 pl-8 space-y-10">
      {items.map((item, i) => {
        const date = formatRoDate(item.date);
        return (
          <Reveal
            as="li"
            key={`${item.date}-${item.label}`}
            delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
            className="relative"
          >
            <span
              aria-hidden="true"
              className="absolute -left-[2.55rem] top-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full border-2 border-gold bg-paper"
            >
              <span className="block h-2 w-2 rounded-full bg-gold" />
            </span>
            <p className="text-xs uppercase tracking-[0.16em] text-gold-deep">
              {date || item.date}
            </p>
            <p className="mt-1 font-serif text-xl font-semibold text-navy">
              {item.label}
            </p>
            {item.note && (
              <p className="mt-1 text-sm text-muted text-pretty">{item.note}</p>
            )}
          </Reveal>
        );
      })}
    </ol>
  );
}

function ContactRow({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="grid grid-cols-[5rem_1fr] items-baseline gap-3">
      <dt className="text-white/55 text-xs uppercase tracking-wide">{label}</dt>
      <dd>
        {href ? (
          <a
            href={href}
            className="text-white hover:text-gold-light transition-colors"
          >
            {value}
          </a>
        ) : (
          <span className="text-white/90">{value}</span>
        )}
      </dd>
    </div>
  );
}

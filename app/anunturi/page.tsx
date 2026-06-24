import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Megaphone, Pin } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { sanityClient } from "@/sanity/lib/client";
import { activeAnunturiQuery } from "@/sanity/lib/queries";
import type { AnuntCard } from "@/sanity/lib/types";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Anunțuri & avizier",
  description: `Anunțurile și avizele oficiale ale Seminarului Teologic Ortodox „${siteConfig.patron}” din ${siteConfig.city} — calendar, înscrieri, rezultate.`,
  alternates: { canonical: "/anunturi" },
};

const ROMANIAN_MONTHS = [
  "ian.", "feb.", "mar.", "apr.", "mai", "iun.",
  "iul.", "aug.", "sept.", "oct.", "nov.", "dec.",
];

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${d} ${ROMANIAN_MONTHS[m - 1] ?? ""} ${y}`;
}

async function fetchAnunturi(): Promise<AnuntCard[]> {
  const today = new Date().toISOString().slice(0, 10);
  try {
    return await sanityClient.fetch<AnuntCard[]>(
      activeAnunturiQuery,
      { today },
      { next: { revalidate: 60, tags: ["anunt"] } },
    );
  } catch (e) {
    console.error("anunturi fetch failed:", e);
    return [];
  }
}

export default async function AnunturiPage() {
  const items = await fetchAnunturi();
  const pinned = items.filter((a) => a.pinned);
  const regular = items.filter((a) => !a.pinned);

  return (
    <>
      <Header />
      <main className="flex-1 bg-parchment pb-[clamp(4rem,9vw,8rem)]">
        <Hero count={items.length} />
        {items.length === 0 ? (
          <EmptyState />
        ) : (
          <section className="wrap mt-16 space-y-12">
            {pinned.length > 0 && (
              <Group
                eyebrow="Fixate"
                title="Anunțuri importante"
                items={pinned}
                accent
              />
            )}
            {regular.length > 0 && (
              <Group
                eyebrow={pinned.length > 0 ? "Restul" : "Toate anunțurile"}
                title={pinned.length > 0 ? "Anunțuri recente" : "Anunțuri"}
                items={regular}
              />
            )}
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}

function Hero({ count }: { count: number }) {
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
              Informații
            </Badge>
            <h1 className="mt-5 text-balance !text-white text-[clamp(2.4rem,5.5vw,4.4rem)] font-semibold leading-[1.05]">
              Anunțuri & avizier
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
              Anunțurile oficiale ale seminarului — calendar, înscrieri,
              rezultate examene, întâlniri cu părinții. Cele fixate apar
              întâi; restul sunt cronologice.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:max-w-xs lg:max-w-none">
            <Stat value={count} label="anunțuri active" />
            <Stat value="zilnic" label="actualizare" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: number | string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-4 text-center">
      <p className="font-serif text-2xl font-semibold text-white sm:text-3xl">{value}</p>
      <p className="mt-1 text-[0.65rem] uppercase tracking-[0.14em] text-white/65">
        {label}
      </p>
    </div>
  );
}

function Group({
  eyebrow,
  title,
  items,
  accent = false,
}: {
  eyebrow: string;
  title: string;
  items: AnuntCard[];
  accent?: boolean;
}) {
  return (
    <section>
      <div className="flex items-end justify-between gap-4 border-b border-navy/10 pb-4">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-gold-deep">
            {eyebrow}
          </p>
          <h2 className="mt-1 font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-tight text-navy">
            {title}
          </h2>
        </div>
        <p className="text-xs uppercase tracking-[0.14em] text-muted">
          {items.length} {items.length === 1 ? "anunț" : "anunțuri"}
        </p>
      </div>
      <ul className="mt-6 grid gap-3">
        {items.map((a, i) => (
          <Reveal as="li" key={a._id} delay={((i % 3) + 1) as 1 | 2 | 3}>
            <AnuntItem item={a} accent={accent} />
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

function AnuntItem({ item, accent }: { item: AnuntCard; accent: boolean }) {
  const card = (
    <Card
      className={`relative h-full border bg-paper transition-all duration-300 ${
        accent
          ? "border-gold/40 shadow-[0_8px_30px_-15px_rgba(200,160,78,0.35)]"
          : "border-navy/10"
      } hover:-translate-y-0.5 hover:border-gold hover:shadow-[var(--shadow-elevated)]`}
    >
      <CardContent className="flex items-start gap-4 p-5 sm:p-6">
        <span
          aria-hidden="true"
          className={`inline-flex size-11 shrink-0 items-center justify-center rounded-xl ${
            item.pinned ? "bg-gold text-navy-deep" : "bg-gold/15 text-gold-deep"
          }`}
        >
          {item.pinned ? (
            <Pin className="size-5" strokeWidth={2} />
          ) : (
            <Megaphone className="size-5" strokeWidth={1.75} />
          )}
        </span>
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-gold-deep">
            <Calendar className="size-3.5" strokeWidth={1.75} />
            {formatDate(item.date)}
          </p>
          <h3 className="mt-1 font-serif text-lg font-semibold leading-tight text-navy text-balance sm:text-xl">
            {item.title}
          </h3>
          {item.excerpt && (
            <p className="mt-2 line-clamp-2 text-pretty text-sm text-ink/80">
              {item.excerpt}
            </p>
          )}
          {item.hasBody && (
            <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-gold-deep">
              Citește mai mult
              <ArrowRight className="size-3.5" strokeWidth={1.75} />
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );

  if (item.hasBody && item.slug) {
    return (
      <Link
        href={`/anunturi/${item.slug}`}
        aria-label={`Vezi anunțul · ${item.title}`}
        className="group block focus:outline-none focus-visible:rounded-2xl focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
      >
        {card}
      </Link>
    );
  }
  return card;
}

function EmptyState() {
  return (
    <section className="wrap mt-16">
      <Reveal className="mx-auto max-w-xl rounded-2xl border border-navy/10 bg-paper p-12 text-center">
        <Megaphone
          aria-hidden="true"
          className="mx-auto mb-4 size-12 text-gold-deep/60"
          strokeWidth={1.5}
        />
        <p className="font-serif text-2xl text-navy">
          Nu sunt anunțuri active momentan
        </p>
        <p className="mt-3 text-pretty text-muted">
          Anunțurile recente apar aici imediat ce sunt publicate de
          secretariat. Revino curând sau urmărește-ne pe Facebook.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-navy px-5 py-2.5 text-sm font-semibold text-navy transition-all hover:bg-navy hover:text-white"
          >
            Contactează secretariatul
          </Link>
          <Link
            href="/activitati"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-navy-deep transition-all hover:bg-gold-light"
          >
            Vezi activitățile recente
            <ArrowRight className="size-4" strokeWidth={1.75} />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

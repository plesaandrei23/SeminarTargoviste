import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CAMPUS_ZONES, CAMPUS_ZONES_BY_SLUG } from "@/lib/campus";
import { siteConfig } from "@/lib/site-config";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return CAMPUS_ZONES.map((z) => ({ slug: z.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const zone = CAMPUS_ZONES_BY_SLUG[slug];
  if (!zone) return { title: "Zonă negăsită" };
  return {
    title: zone.name,
    description: `${zone.tagline} — ${zone.intro.slice(0, 120)}…`,
    alternates: { canonical: `/campus/${slug}` },
  };
}

export default async function CampusZonePage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const zone = CAMPUS_ZONES_BY_SLUG[slug];
  if (!zone) notFound();

  const others = CAMPUS_ZONES.filter((z) => z.slug !== slug);

  return (
    <>
      <Header />
      <main className="flex-1 bg-parchment pb-[clamp(4rem,9vw,8rem)]">
        <Hero zone={zone} />
        <Body zone={zone} />
        <RelatedZones others={others} />
      </main>
      <Footer />
    </>
  );
}

/* ── Hero ────────────────────────────────────────────────────── */

function Hero({ zone }: { zone: (typeof CAMPUS_ZONES)[number] }) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-navy-deep via-navy to-navy-soft pt-32 pb-20 text-white">
      {/* outsized icon as a watermark on the side */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 top-10 text-gold/10 select-none"
      >
        <zone.Icon className="size-[28rem]" strokeWidth={0.8} />
      </span>
      <div className="wrap relative">
        <Link
          href="/campus"
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] text-white/65 transition-colors hover:text-gold-light"
        >
          <ArrowLeft className="size-3" strokeWidth={2} />
          Înapoi la campus
        </Link>
        <div className="mt-6 flex items-center gap-4">
          <span
            aria-hidden="true"
            className="inline-flex size-14 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20"
          >
            <zone.Icon className="size-7 text-gold-light" strokeWidth={1.5} />
          </span>
          <Badge variant="outline" className="border-gold/40 text-gold-light">
            Campus
          </Badge>
        </div>
        <h1 className="mt-6 max-w-3xl text-balance !text-white text-[clamp(2.4rem,5.5vw,4.4rem)] font-semibold leading-[1.05]">
          {zone.name}
        </h1>
        <p className="mt-4 max-w-2xl text-pretty text-white/85 sm:text-lg">
          {zone.tagline}
        </p>
      </div>
    </section>
  );
}

/* ── Body — intro + features + practical sidebar ──────────────── */

function Body({ zone }: { zone: (typeof CAMPUS_ZONES)[number] }) {
  return (
    <section className="wrap mt-16 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
      <article className="space-y-10">
        <Reveal>
          <p className="text-lg leading-relaxed text-ink/85 text-pretty">
            {zone.intro}
          </p>
        </Reveal>

        <Reveal delay={1}>
          <div>
            <h2 className="font-serif text-[clamp(1.6rem,2.8vw,2.1rem)] font-semibold leading-tight text-navy">
              Ce găsești aici
            </h2>
            <ul className="mt-6 space-y-3">
              {zone.features.map((feature, i) => (
                <Reveal
                  as="li"
                  key={feature}
                  delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
                  className="flex items-start gap-3 rounded-xl border border-navy/10 bg-paper p-4"
                >
                  <CheckCircle2
                    aria-hidden="true"
                    className="mt-0.5 size-5 shrink-0 text-gold-deep"
                    strokeWidth={1.75}
                  />
                  <span className="text-[0.96rem] text-pretty text-ink/85">
                    {feature}
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>
        </Reveal>
      </article>

      <Reveal as="aside" delay={2} className="lg:sticky lg:top-32 lg:self-start">
        <Card className="border-navy/10 bg-navy text-white shadow-[var(--shadow-elevated)]">
          <CardContent className="space-y-5 p-7">
            <div>
              <p className="eyebrow !text-gold-light">Informații practice</p>
              <h3 className="mt-2 !text-white font-serif text-xl font-semibold leading-tight">
                Detalii utile
              </h3>
            </div>
            <Separator className="bg-white/15" />
            <dl className="space-y-4">
              {zone.practical.map((row) => (
                <div key={row.label}>
                  <dt className="text-xs uppercase tracking-[0.14em] text-white/55">
                    {row.label}
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-white text-pretty">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
            <Separator className="bg-white/15" />
            <p className="text-xs text-white/65 text-pretty">
              Pentru un tur la pas al spațiului — sună la secretariat,{" "}
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="font-semibold text-gold-light hover:underline"
              >
                {siteConfig.contact.phoneDisplay}
              </a>
              .
            </p>
          </CardContent>
        </Card>
      </Reveal>
    </section>
  );
}

/* ── Related zones strip ─────────────────────────────────────── */

function RelatedZones({
  others,
}: {
  others: (typeof CAMPUS_ZONES)[number][];
}) {
  return (
    <section className="wrap mt-24">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <Reveal as="p" className="eyebrow">
          Explorează mai departe
        </Reveal>
        <Reveal as="h2" delay={1} className="mt-3 text-[clamp(1.8rem,3.6vw,2.6rem)] font-semibold leading-tight">
          Alte zone ale campusului
        </Reveal>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {others.map((z, i) => (
          <Reveal
            key={z.slug}
            delay={((i % 5) + 1) as 1 | 2 | 3 | 4 | 5}
          >
            <Link
              href={`/campus/${z.slug}`}
              className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 rounded-2xl"
            >
              <Card className="h-full border-navy/10 bg-paper transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[var(--shadow-elevated)]">
                <CardContent className="flex items-start gap-3 p-5">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-gold/15">
                    <z.Icon className="size-5 text-gold-deep" strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0">
                    <p className="font-serif text-base font-semibold leading-tight text-navy">
                      {z.name}
                    </p>
                    <p className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-gold-deep transition-[gap] group-hover:gap-2">
                      Vezi
                      <ArrowRight className="size-3" strokeWidth={1.75} />
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, Quote, Sparkles } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { sanityClient } from "@/sanity/lib/client";
import { directorQuery } from "@/sanity/lib/queries";
import type { Personal } from "@/sanity/lib/types";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 300;

const DIRECTOR_FALLBACK = {
  name: "Pr. Prof. Pleșa Alin-Marian",
  role: "Director",
};

export const metadata: Metadata = {
  title: "Mesajul Directorului",
  description: `Cuvânt de bun-venit al directorului Seminarului Teologic Ortodox „${siteConfig.patron}” din ${siteConfig.city}.`,
  alternates: { canonical: "/director" },
};

async function fetchDirector(): Promise<Personal | null> {
  try {
    return await sanityClient.fetch<Personal | null>(
      directorQuery,
      {},
      { next: { revalidate: 300, tags: ["personal"] } },
    );
  } catch (e) {
    console.error("director fetch failed:", e);
    return null;
  }
}

export default async function DirectorPage() {
  const director = await fetchDirector();
  const name = director?.name ?? DIRECTOR_FALLBACK.name;
  const role = director?.role ?? DIRECTOR_FALLBACK.role;

  return (
    <>
      <Header />
      <main className="flex-1 bg-parchment pb-[clamp(4rem,9vw,8rem)]">
        <Hero director={director} name={name} role={role} />
        <Body name={name} role={role} />
      </main>
      <Footer />
    </>
  );
}

function Hero({
  director,
  name,
  role,
}: {
  director: Personal | null;
  name: string;
  role: string;
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

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-end">
          <Reveal>
            <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-navy via-navy-soft to-gold-deep shadow-[var(--shadow-elevated)]">
              <div className="aspect-[4/5]">
                {director?.photo?.asset ? (
                  <Image
                    src={director.photo.asset.url}
                    alt={director.photo.alt || name}
                    fill
                    priority
                    sizes="(min-width: 1024px) 400px, 100vw"
                    className="object-cover object-top"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center font-serif text-7xl text-gold-light/60">
                    {name
                      .split(" ")
                      .filter((s) => /^[A-ZȘȚĂÎÂ]/.test(s))
                      .slice(0, 2)
                      .map((s) => s[0])
                      .join("")}
                  </div>
                )}
              </div>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <Badge variant="outline" className="border-gold/40 text-gold-light">
              Conducere
            </Badge>
            <h1 className="mt-4 max-w-2xl text-balance !text-white text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.05]">
              Mesajul directorului
            </h1>
            <p className="mt-5 text-pretty text-white/85 sm:text-lg">
              Cuvânt de bun-venit pentru elevi, părinți și pentru toți cei care
              caută o școală cu valori clare.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/85">
              <span className="font-serif text-xl font-semibold text-white">
                {name}
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-gold/60 sm:block" />
              <span className="text-xs uppercase tracking-[0.14em] text-gold-light">
                {role}
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Body({ name, role }: { name: string; role: string }) {
  return (
    <section className="wrap mt-16 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
      <article className="space-y-8">
        <Reveal as="figure" className="overflow-hidden rounded-3xl border border-navy/10 bg-paper shadow-sm">
          <blockquote className="relative space-y-6 p-8 sm:p-10">
            <Quote
              aria-hidden="true"
              className="absolute left-6 top-6 size-10 text-gold/35"
              strokeWidth={1}
            />
            <p className="font-serif text-[clamp(1.3rem,2.2vw,1.6rem)] leading-relaxed text-navy text-pretty">
              Seminarul Teologic Ortodox „Sfântul Ioan Gură de Aur” din
              Târgoviște este o școală a misiunii creștine în societatea
              timpului nostru, spre a oferi oameni pregătiți să transmită și să
              păstreze valorile axiologice care generează și aprofundează
              binele, adevărul și frumosul.
            </p>
            <p className="text-pretty text-lg leading-relaxed text-ink/85">
              Veți descoperi, cu siguranță, prieteni adevărați, un loc frumos,
              veți fi motivați de a însuși moral starea de bine, pentru a deveni{" "}
              <em className="text-navy">„lumina lumii și sarea pământului”</em>,
              așa cum ne îndeamnă Mântuitorul Hristos.
            </p>
            <footer className="border-t border-navy/10 pt-5">
              <p className="text-xs uppercase tracking-[0.14em] text-gold-deep">
                {role}
              </p>
              <p className="mt-1 font-serif text-lg font-semibold text-navy">
                {name}
              </p>
            </footer>
          </blockquote>
        </Reveal>

        <Reveal delay={1}>
          <Card className="border-navy/10 bg-paper">
            <CardContent className="space-y-3 p-7">
              <p className="eyebrow">Bun-venit</p>
              <p className="font-serif text-[clamp(1.3rem,2vw,1.7rem)] font-semibold leading-tight text-navy">
                Bine ați venit în comunitatea noastră educațională!
              </p>
              <p className="text-pretty text-ink/85">
                Aici se învață, se discută, se gândește — într-o școală cu
                rădăcini adânci în Biserică și o privire deschisă spre lume.
                Vino să vezi cu ochii tăi: programează o vizită la secretariat
                sau ne găsești pe pagina de admitere.
              </p>
            </CardContent>
          </Card>
        </Reveal>
      </article>

      <Reveal as="aside" delay={2} className="lg:sticky lg:top-32 lg:self-start">
        <Card className="overflow-hidden border-navy/10 bg-navy text-white shadow-[var(--shadow-elevated)]">
          <CardContent className="space-y-6 p-7">
            <div>
              <p className="eyebrow !text-gold-light">Pași următori</p>
              <h2 className="mt-2 !text-white font-serif text-xl font-semibold leading-tight">
                Cum poți afla mai multe
              </h2>
            </div>

            <div className="space-y-3">
              <Link
                href="/admitere"
                className="flex items-center justify-between gap-3 rounded-2xl bg-white/[0.05] p-4 ring-1 ring-white/10 transition-all hover:bg-white/[0.10] hover:ring-gold/40"
              >
                <span className="inline-flex items-center gap-3">
                  <Sparkles className="size-5 text-gold-light" strokeWidth={1.75} />
                  <span className="font-semibold text-white">Admitere</span>
                </span>
                <span className="text-xs text-white/55">cifră de școlarizare, calendar</span>
              </Link>
              <Link
                href="/profesori"
                className="flex items-center justify-between gap-3 rounded-2xl bg-white/[0.05] p-4 ring-1 ring-white/10 transition-all hover:bg-white/[0.10] hover:ring-gold/40"
              >
                <span className="inline-flex items-center gap-3">
                  <Sparkles className="size-5 text-gold-light" strokeWidth={1.75} />
                  <span className="font-semibold text-white">Corpul didactic</span>
                </span>
                <span className="text-xs text-white/55">cine predă la seminar</span>
              </Link>
              <Link
                href="/campus"
                className="flex items-center justify-between gap-3 rounded-2xl bg-white/[0.05] p-4 ring-1 ring-white/10 transition-all hover:bg-white/[0.10] hover:ring-gold/40"
              >
                <span className="inline-flex items-center gap-3">
                  <Sparkles className="size-5 text-gold-light" strokeWidth={1.75} />
                  <span className="font-semibold text-white">Campus</span>
                </span>
                <span className="text-xs text-white/55">paraclis, săli, internat</span>
              </Link>
            </div>

            <div className="border-t border-white/10 pt-5">
              <p className="eyebrow !text-gold-light">Secretariat</p>
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="mt-3 flex items-center gap-3 text-sm transition-colors hover:text-gold-light"
              >
                <span className="inline-flex size-9 items-center justify-center rounded-xl bg-white/10">
                  <Phone className="size-4 text-gold-light" strokeWidth={1.75} />
                </span>
                <span className="font-semibold text-white">
                  {siteConfig.contact.phoneDisplay}
                </span>
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="mt-2 flex items-center gap-3 text-sm transition-colors hover:text-gold-light"
              >
                <span className="inline-flex size-9 items-center justify-center rounded-xl bg-white/10">
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

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Megaphone, Pin } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PortableArticleBody } from "@/components/PortableArticleBody";
import { Reveal } from "@/components/Reveal";
import { DownloadCard } from "@/components/DownloadCard";
import { Badge } from "@/components/ui/badge";
import { sanityClient } from "@/sanity/lib/client";
import {
  anuntBySlugQuery,
  anuntSlugsQuery,
} from "@/sanity/lib/queries";
import type { AnuntDetail } from "@/sanity/lib/types";

export const revalidate = 60;

type Params = Promise<{ slug: string }>;

const ROMANIAN_MONTHS = [
  "ianuarie", "februarie", "martie", "aprilie", "mai", "iunie",
  "iulie", "august", "septembrie", "octombrie", "noiembrie", "decembrie",
];

function formatDateLong(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${d} ${ROMANIAN_MONTHS[m - 1] ?? ""} ${y}`;
}

export async function generateStaticParams() {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const slugs = await sanityClient.fetch<string[]>(anuntSlugsQuery, { today });
    return (slugs ?? []).map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

async function fetchAnunt(slug: string): Promise<AnuntDetail | null> {
  try {
    return await sanityClient.fetch<AnuntDetail | null>(
      anuntBySlugQuery,
      { slug },
      { next: { revalidate: 60, tags: ["anunt", `anunt:${slug}`] } },
    );
  } catch (e) {
    console.error(`fetchAnunt(${slug}) failed:`, e);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = await fetchAnunt(slug);
  if (!a) return { title: "Anunț negăsit" };
  return {
    title: a.seo?.title ?? a.title,
    description: a.seo?.description,
    alternates: { canonical: `/anunturi/${slug}` },
  };
}

export default async function AnuntPage({ params }: { params: Params }) {
  const { slug } = await params;
  const a = await fetchAnunt(slug);
  if (!a) notFound();

  return (
    <>
      <Header />
      <main className="flex-1 bg-parchment pb-[clamp(4rem,9vw,8rem)]">
        <Hero anunt={a} />
        <Body anunt={a} />
      </main>
      <Footer />
    </>
  );
}

function Hero({ anunt }: { anunt: AnuntDetail }) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-navy-deep via-navy to-navy-soft pt-32 pb-20 text-white">
      <div className="wrap relative">
        <Link
          href="/anunturi"
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] text-white/65 transition-colors hover:text-gold-light"
        >
          <ArrowLeft className="size-3" strokeWidth={2} />
          Toate anunțurile
        </Link>
        <div className="mt-8 max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="outline" className="border-gold/40 text-gold-light">
              Anunț
            </Badge>
            {anunt.pinned && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gold px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-navy-deep">
                <Pin className="size-3" strokeWidth={2.5} />
                Fixat
              </span>
            )}
          </div>
          <h1 className="mt-5 text-balance !text-white text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-[1.1]">
            {anunt.title}
          </h1>
          <p className="mt-5 inline-flex items-center gap-2 text-sm text-gold-light">
            <Calendar className="size-4" strokeWidth={1.75} />
            {formatDateLong(anunt.date)}
          </p>
        </div>
      </div>
    </section>
  );
}

function Body({ anunt }: { anunt: AnuntDetail }) {
  const hasBody = anunt.body && anunt.body.length > 0;
  const hasAttachments = anunt.attachments && anunt.attachments.length > 0;
  return (
    <section className="wrap mt-16 max-w-3xl">
      {hasBody ? (
        <Reveal>
          <PortableArticleBody value={anunt.body} />
        </Reveal>
      ) : (
        <Reveal className="rounded-2xl border border-navy/10 bg-paper p-10 text-center">
          <Megaphone
            aria-hidden="true"
            className="mx-auto mb-4 size-10 text-gold-deep/60"
            strokeWidth={1.5}
          />
          <p className="font-serif text-xl text-navy">
            Acest anunț nu are detalii suplimentare.
          </p>
          <p className="mt-2 text-muted">
            Pentru clarificări, contactează secretariatul.
          </p>
        </Reveal>
      )}

      {hasAttachments && (
        <Reveal delay={1} className="mt-12">
          <p className="eyebrow">Documente atașate</p>
          <h2 className="mt-2 font-serif text-2xl font-semibold text-navy">
            Atașamente
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {anunt.attachments!.map((att, i) => {
              const url = att.asset?.url;
              if (!url) return null;
              const filename =
                att.asset?.originalFilename ?? `Atașament ${i + 1}`;
              return (
                <DownloadCard
                  key={url}
                  href={url}
                  title={filename}
                  byline="PDF"
                  external
                />
              );
            })}
          </div>
        </Reveal>
      )}
    </section>
  );
}

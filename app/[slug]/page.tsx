import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PortableArticleBody } from "@/components/PortableArticleBody";
import { Reveal } from "@/components/Reveal";
import { sanityClient } from "@/sanity/lib/client";
import {
  paginaBySlugQuery,
  paginaSlugsQuery,
} from "@/sanity/lib/queries";
import type { Pagina } from "@/sanity/lib/types";

export const revalidate = 60;

/**
 * Slugs that have their own dedicated route. The catch-all never receives
 * these — Next.js routes specific paths first — but listing them here keeps
 * generateStaticParams honest (we don't pre-render duplicate routes).
 */
// Slugs handled by a dedicated route OR by a permanent redirect in
// next.config.ts. Excluding them from generateStaticParams avoids
// pre-rendering pages that will never actually be served — the
// redirect intercepts the request first.
const RESERVED_SLUGS = new Set([
  // Dedicated routes
  "activitati",
  "admitere",
  "anunturi",
  "atestat-profesional",
  "bacalaureat",
  "burse",
  "campus",
  "consiliul-de-administratie",
  "consiliul-elevilor",
  "contact",
  "declaratie-accesibilitate",
  "director",
  "erasmus",
  "istoric",
  "managementul-cazurilor-de-violenta",
  "misiune-si-viziune",
  "mobilitate-cadre-didactice",
  "orar",
  "politica-confidentialitate",
  "profesori",
  "regulamente",
  "studio",
  // Redirected in next.config.ts → /profesori
  "didactic",
  "didactic-auxiliar",
  "nedidactic",
  "conducerea-scolii",
  "consiliul-profesoral",
  // Redirected → home or other targets
  "elevi",
  "informatii",
  "scoala-noastra",
  "tur-virtual",
]);

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  try {
    const slugs = await sanityClient.fetch<string[]>(paginaSlugsQuery);
    return (slugs ?? [])
      .filter((s) => !RESERVED_SLUGS.has(s))
      .map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

async function fetchPage(slug: string): Promise<Pagina | null> {
  try {
    return await sanityClient.fetch<Pagina | null>(
      paginaBySlugQuery,
      { slug },
      { next: { revalidate: 60, tags: ["pagina", `pagina:${slug}`] } },
    );
  } catch (e) {
    console.error(`fetchPage(${slug}) failed:`, e);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  if (RESERVED_SLUGS.has(slug)) return {};
  const page = await fetchPage(slug);
  if (!page) return { title: "Pagină negăsită" };
  const title = page.seo?.title?.replace(/&quot;/g, '"').split("|")[0]?.trim() || page.title;
  return {
    title,
    description: page.seo?.description ?? undefined,
    alternates: { canonical: `/${slug}` },
  };
}

const SECTION_LABELS: Record<string, string> = {
  "scoala-noastra": "Școala noastră",
  elevi: "Pentru elevi",
  informatii: "Informații",
  erasmus: "Erasmus+",
};

export default async function StaticPaginaPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  if (RESERVED_SLUGS.has(slug)) notFound();

  const page = await fetchPage(slug);
  if (!page) notFound();

  const title = page.seo?.title?.replace(/&quot;/g, '"').split("|")[0]?.trim() || page.title;
  const sectionLabel = page.section ? SECTION_LABELS[page.section] : undefined;

  return (
    <>
      <Header />
      <main className="flex-1 bg-parchment pb-[clamp(4rem,9vw,8rem)]">
        <Hero title={title} sectionLabel={sectionLabel} />
        <article className="wrap mx-auto mt-16 max-w-3xl">
          {page.body && page.body.length > 0 ? (
            <PortableArticleBody value={page.body} />
          ) : (
            <EmptyState />
          )}

          <div className="mt-16 flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-navy px-6 py-3 text-sm font-semibold text-navy transition-all hover:-translate-y-0.5 hover:bg-navy hover:text-white"
            >
              <ArrowLeft className="size-4" strokeWidth={1.75} />
              Înapoi la pagina principală
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

function Hero({
  title,
  sectionLabel,
}: {
  title: string;
  sectionLabel?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-navy-deep via-navy to-navy-soft pt-36 pb-20 text-white">
      <div className="wrap relative mx-auto max-w-3xl text-center">
        {sectionLabel && (
          <Reveal as="p" className="eyebrow !text-gold-light">
            {sectionLabel}
          </Reveal>
        )}
        <Reveal
          as="h1"
          delay={1}
          className="mt-3 !text-white text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.05] text-balance"
        >
          {title}
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
      </div>
    </section>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-navy/10 bg-paper p-10 text-center">
      <p className="font-serif text-xl text-navy">
        Conținut în pregătire
      </p>
      <p className="mt-3 text-pretty text-muted">
        Informațiile pentru această secțiune urmează să fie adăugate de
        echipa redacțională a seminarului. Revino în câteva zile sau sună
        la secretariat pentru întrebări urgente.
      </p>
    </div>
  );
}

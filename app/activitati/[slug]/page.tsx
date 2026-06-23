import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PortableArticleBody } from "@/components/PortableArticleBody";
import { Reveal } from "@/components/Reveal";
import { sanityClient } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import {
  activityBySlugQuery,
  activitySlugsQuery,
} from "@/sanity/lib/queries";
import type { ActivityDetail, SanityImageRef } from "@/sanity/lib/types";
import { categoryLabel, formatRoDate } from "@/lib/format";

export const revalidate = 60;

type Params = Promise<{ slug: string }>;

/** Pre-render every existing slug at build time; new slugs ISR in on demand. */
export async function generateStaticParams() {
  try {
    const slugs = await sanityClient.fetch<string[]>(activitySlugsQuery);
    return (slugs ?? []).map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

async function fetchActivity(slug: string): Promise<ActivityDetail | null> {
  try {
    return await sanityClient.fetch<ActivityDetail | null>(
      activityBySlugQuery,
      { slug },
      { next: { revalidate: 60, tags: ["activitate", `activitate:${slug}`] } },
    );
  } catch (e) {
    console.error(`fetchActivity(${slug}) failed:`, e);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await fetchActivity(slug);
  if (!article) return { title: "Activitate negăsită" };

  const description =
    article.seo?.description ||
    article.excerpt ||
    `${article.title} — activitate la Seminarul Teologic Ortodox din Târgoviște.`;

  const ogImage = article.coverImage?.asset
    ? urlFor(article.coverImage).width(1200).height(630).fit("crop").url()
    : undefined;

  return {
    title: article.seo?.title || article.title,
    description,
    alternates: { canonical: `/activitati/${slug}` },
    openGraph: {
      title: article.title,
      description,
      type: "article",
      publishedTime: article.date,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
    },
  };
}

export default async function ActivityArticlePage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const article = await fetchActivity(slug);
  if (!article) notFound();

  const tag = categoryLabel(article.category);
  const date = formatRoDate(article.date);

  return (
    <>
      <Header />
      <main className="flex-1 bg-parchment pb-[clamp(4rem,9vw,8rem)]">
        <ArticleHero article={article} tag={tag} date={date} />

        <article className="wrap mt-16 max-w-3xl">
          <PortableArticleBody value={article.body ?? []} />

          {/*
            Only render the dedicated Gallery section if the body itself
            doesn't already inline images. Otherwise we'd duplicate the
            same set of photos under "Galerie foto" — the import script
            currently writes images to both fields.
          */}
          {(() => {
            const bodyHasImages = (article.body ?? []).some(
              (b: any) => b?._type === "localizedImage",
            );
            if (bodyHasImages) return null;
            return (
              article.gallery &&
              article.gallery.length > 0 && (
                <Gallery items={article.gallery} title={article.title} />
              )
            );
          })()}

          <div className="mt-16 flex justify-center">
            <Link
              href="/activitati"
              className="inline-flex items-center gap-2 rounded-full border border-navy px-6 py-3 text-sm font-semibold text-navy transition-all hover:bg-navy hover:text-white"
            >
              ← Înapoi la toate activitățile
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

function ArticleHero({
  article,
  tag,
  date,
}: {
  article: ActivityDetail;
  tag: string;
  date: string;
}) {
  return (
    <section className="relative isolate min-h-[60svh] overflow-hidden bg-navy text-white">
      {article.coverImage?.asset ? (
        <>
          <Image
            src={urlFor(article.coverImage).width(1920).auto("format").url()}
            alt={article.coverImage.alt || ""}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-70"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,28,48,0.55)_0%,rgba(10,28,48,0.4)_45%,rgba(10,28,48,0.92)_100%)]"
          />
        </>
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-navy via-navy-soft to-gold-deep"
        />
      )}

      <div className="wrap relative z-10 flex min-h-[60svh] flex-col justify-end pt-32 pb-12">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-gold px-3 py-1 text-[0.66rem] font-semibold tracking-[0.12em] uppercase text-navy-deep">
            {tag}
          </span>
          {date && (
            <span className="text-sm text-white/80 tracking-wide">{date}</span>
          )}
          {article.schoolYear && (
            <span className="text-sm text-white/60">· {article.schoolYear}</span>
          )}
        </div>
        <h1 className="max-w-4xl text-balance text-[clamp(2rem,5vw,3.8rem)] font-semibold leading-[1.1] text-white [text-shadow:0_2px_30px_rgba(0,0,0,0.4)]">
          {article.title}
        </h1>
        {article.excerpt && (
          <p className="mt-4 max-w-2xl text-base text-white/85 text-pretty sm:text-lg">
            {article.excerpt}
          </p>
        )}
      </div>
    </section>
  );
}

function Gallery({
  items,
  title,
}: {
  items: SanityImageRef[];
  title: string;
}) {
  const real = items.filter((i) => i.asset);
  if (real.length === 0) return null;
  return (
    <section className="mt-20">
      <h2 className="mb-8 text-center text-[clamp(1.6rem,3vw,2.2rem)]">
        Galerie foto
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {real.map((img, i) => {
          const w = img.asset?.metadata?.dimensions?.width ?? 1200;
          const h = img.asset?.metadata?.dimensions?.height ?? 800;
          return (
            <figure
              key={img.asset?._id ?? i}
              className="overflow-hidden rounded-xl border border-navy/10 bg-paper"
            >
              <Image
                src={urlFor(img).width(600).auto("format").url()}
                alt={img.alt || title}
                width={w}
                height={h}
                sizes="(min-width: 768px) 25vw, 50vw"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.05]"
              />
            </figure>
          );
        })}
      </div>
    </section>
  );
}

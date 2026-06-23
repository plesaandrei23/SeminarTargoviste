import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { sanityClient } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { latestActivitiesQuery } from "@/sanity/lib/queries";
import type { ActivityCard } from "@/sanity/lib/types";
import { categoryLabel, formatRoDate } from "@/lib/format";

/**
 * Latest activities feed. Server-rendered from Sanity at build time; ISR
 * keeps it fresh via the `next.revalidate` window below — staff posts
 * appear within ~1 min without a redeploy. The CMS webhook can call
 * /api/revalidate to invalidate on demand once that route exists.
 */
async function fetchActivities(): Promise<ActivityCard[]> {
  try {
    return await sanityClient.fetch<ActivityCard[]>(
      latestActivitiesQuery,
      {},
      { next: { revalidate: 60, tags: ["activitate"] } },
    );
  } catch (e) {
    // Don't bring the whole page down if Sanity is briefly unreachable —
    // the rest of the home page should still render.
    console.error("News fetch failed:", e);
    return [];
  }
}

export async function News() {
  const items = await fetchActivities();

  return (
    <section
      id="news"
      className="py-[clamp(4rem,9vw,8rem)] bg-gradient-to-b from-parchment to-parchment-2"
    >
      <div className="wrap">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Reveal as="p" className="eyebrow">
              Din viața seminarului
            </Reveal>
            <Reveal as="h2" delay={1} className="mt-2 text-[clamp(2rem,4.4vw,3.3rem)]">
              Activități & evenimente
            </Reveal>
          </div>
          <Reveal delay={2}>
            <Link
              href="/activitati"
              className="inline-flex items-center gap-2 rounded-full border border-navy px-5 py-2.5 text-sm font-semibold text-navy transition-all hover:bg-navy hover:text-white"
            >
              Toate activitățile →
            </Link>
          </Reveal>
        </div>

        {items.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, i) => (
              <ActivityCardArticle key={item._id} item={item} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ActivityCardArticle({
  item,
  index,
}: {
  item: ActivityCard;
  index: number;
}) {
  const href = `/activitati/${item.slug}`;
  const tag = categoryLabel(item.category);
  const date = formatRoDate(item.date);

  return (
    <Reveal
      as="article"
      delay={((index % 3) + 1) as 1 | 2 | 3}
      className="group flex flex-col overflow-hidden rounded-2xl border border-navy/10 bg-paper transition-all duration-500 hover:-translate-y-2 hover:shadow-[var(--shadow-elevated)]"
    >
      <Link
        href={href}
        className="relative block aspect-[16/10] overflow-hidden"
        aria-label={item.title}
      >
        {item.coverImage?.asset ? (
          <Image
            src={urlFor(item.coverImage).width(800).auto("format").url()}
            alt={item.coverImage.alt || ""}
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.08]"
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-br from-navy via-navy-soft to-gold-deep"
          />
        )}
        <span className="absolute left-3 top-3 rounded-full bg-navy/90 px-3 py-1 text-[0.66rem] font-semibold tracking-[0.12em] uppercase text-gold-light backdrop-blur">
          {tag}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-6">
        {date && (
          <p className="text-xs text-muted tracking-wide mb-2">{date}</p>
        )}
        <h3 className="text-xl leading-tight mb-4 text-balance">
          <Link
            href={href}
            className="transition-colors hover:text-gold-deep"
          >
            {item.title}
          </Link>
        </h3>
        <Link
          href={href}
          className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-gold-deep transition-[gap] duration-300 group-hover:gap-3"
        >
          Citește mai mult →
        </Link>
      </div>
    </Reveal>
  );
}

function EmptyState() {
  return (
    <Reveal className="rounded-2xl border border-navy/10 bg-paper p-12 text-center">
      <p className="font-serif text-2xl text-navy">
        Activitățile vor fi publicate aici în curând.
      </p>
      <p className="mt-3 text-muted">
        Echipa redacțională adaugă conținut din panoul de administrare al
        seminarului.
      </p>
    </Reveal>
  );
}

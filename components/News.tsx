import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { ActivityCard } from "@/components/ActivityCard";
import { sanityClient } from "@/sanity/lib/client";
import { latestActivitiesQuery } from "@/sanity/lib/queries";
import type { ActivityCard as ActivityCardType } from "@/sanity/lib/types";

/**
 * Latest activities feed on the home page. Server-rendered from Sanity at
 * build time; ISR keeps it fresh via `next.revalidate` — staff posts appear
 * within ~1 min without a redeploy.
 */
async function fetchActivities(): Promise<ActivityCardType[]> {
  try {
    return await sanityClient.fetch<ActivityCardType[]>(
      latestActivitiesQuery,
      {},
      { next: { revalidate: 60, tags: ["activitate"] } },
    );
  } catch (e) {
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
              <ActivityCard
                key={item._id}
                item={item}
                delay={((i % 3) + 1) as 1 | 2 | 3}
                // Home page's News grid is above the fold on desktop and
                // the first card's cover is the LCP element — eager-load
                // it so we hit CWV's LCP < 2.5s target.
                priority={i === 0}
              />
            ))}
          </div>
        )}
      </div>
    </section>
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

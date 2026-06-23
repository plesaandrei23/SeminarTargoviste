import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ActivityCard } from "@/components/ActivityCard";
import { Reveal } from "@/components/Reveal";
import { sanityClient } from "@/sanity/lib/client";
import {
  activityYearsQuery,
  allActivitiesQuery,
} from "@/sanity/lib/queries";
import type { ActivityCard as ActivityCardType } from "@/sanity/lib/types";
import { cn } from "@/lib/utils";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Activități & evenimente",
  description:
    "Din viața Seminarului Teologic Ortodox „Sfântul Ioan Gură de Aur” din Târgoviște — activități, evenimente, performanțe, mobilități Erasmus+.",
  alternates: { canonical: "/activitati" },
};

type SearchParams = Promise<{ an?: string | string[] }>;

export default async function ActivitatiPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const schoolYearParam = Array.isArray(sp.an) ? sp.an[0] : sp.an;

  const [yearsRaw, activities] = await Promise.all([
    sanityClient.fetch<string[]>(
      activityYearsQuery,
      {},
      { next: { revalidate: 300, tags: ["activitate"] } },
    ),
    sanityClient.fetch<ActivityCardType[]>(
      allActivitiesQuery,
      { schoolYear: schoolYearParam ?? null },
      { next: { revalidate: 60, tags: ["activitate"] } },
    ),
  ]);

  const years = (yearsRaw ?? []).filter(Boolean);

  return (
    <>
      <Header />
      <main className="flex-1 bg-parchment pt-32 pb-[clamp(4rem,9vw,8rem)]">
        <div className="wrap">
          <header className="mx-auto mb-12 max-w-3xl text-center">
            <Reveal as="p" className="eyebrow">
              Din viața seminarului
            </Reveal>
            <Reveal
              as="h1"
              delay={1}
              className="mt-3 text-[clamp(2.4rem,5vw,3.8rem)] font-semibold leading-tight"
            >
              Activități & evenimente
            </Reveal>
            <Reveal
              as="p"
              delay={2}
              className="mt-4 text-base text-muted text-pretty"
            >
              Festivități, concerte, mobilități Erasmus+, olimpiade și
              proiecte educative organizate de elevii și profesorii noștri.
            </Reveal>
          </header>

          {years.length > 1 && (
            <Reveal delay={2} className="mb-10 flex flex-wrap justify-center gap-2">
              <YearChip label="Toți anii" active={!schoolYearParam} href="/activitati" />
              {years.map((y) => (
                <YearChip
                  key={y}
                  label={y}
                  active={schoolYearParam === y}
                  href={`/activitati?an=${encodeURIComponent(y)}`}
                />
              ))}
            </Reveal>
          )}

          {activities.length === 0 ? (
            <Reveal className="mx-auto max-w-xl rounded-2xl border border-navy/10 bg-paper p-12 text-center">
              <p className="font-serif text-2xl text-navy">
                Nu sunt activități publicate{" "}
                {schoolYearParam ? `pentru anul ${schoolYearParam}` : "încă"}.
              </p>
              <p className="mt-3 text-muted">
                Revino curând — adăugăm conținut nou săptămânal.
              </p>
              {schoolYearParam && (
                <Link
                  href="/activitati"
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-navy px-5 py-2.5 text-sm font-semibold text-navy transition-all hover:bg-navy hover:text-white"
                >
                  ← Vezi toți anii
                </Link>
              )}
            </Reveal>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {activities.map((item, i) => (
                <ActivityCard
                  key={item._id}
                  item={item}
                  delay={((i % 3) + 1) as 1 | 2 | 3}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

function YearChip({
  label,
  active,
  href,
}: {
  label: string;
  active: boolean;
  href: string;
}) {
  return (
    <Link
      href={href}
      scroll={false}
      aria-current={active ? "page" : undefined}
      className={cn(
        "rounded-full border px-4 py-2 text-sm font-medium transition-all",
        active
          ? "border-navy bg-navy text-white"
          : "border-navy/10 bg-white text-navy hover:border-gold",
      )}
    >
      {label}
    </Link>
  );
}

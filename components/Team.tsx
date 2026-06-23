import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Card, CardContent } from "@/components/ui/card";
import { sanityClient } from "@/sanity/lib/client";
import { featuredPersonalQuery } from "@/sanity/lib/queries";
import type { Personal } from "@/sanity/lib/types";

/**
 * Home page team teaser — first 8 staff by category + order (director and
 * duhovnici first, then teachers). For the full list with discipline
 * filters, /profesori is one click away via the CTA below the grid.
 */
async function fetchFeatured(): Promise<Personal[]> {
  try {
    return await sanityClient.fetch<Personal[]>(
      featuredPersonalQuery,
      {},
      { next: { revalidate: 300, tags: ["personal"] } },
    );
  } catch (e) {
    console.error("Featured staff fetch failed:", e);
    return [];
  }
}

export async function Team() {
  const people = await fetchFeatured();

  return (
    <section id="team" className="bg-paper py-[clamp(4rem,9vw,8rem)]">
      <div className="wrap">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Reveal as="p" className="eyebrow">
            Corpul profesoral
          </Reveal>
          <Reveal
            as="h2"
            delay={1}
            className="mt-2 text-[clamp(2rem,4.4vw,3.3rem)]"
          >
            Dascăli dedicați, modele de urmat
          </Reveal>
          <Reveal as="p" delay={2} className="mt-3 text-muted">
            Preoți profesori și cadre didactice care îmbină competența
            academică cu îndrumarea duhovnicească.
          </Reveal>
        </div>

        {people.length > 0 && (
          <>
            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {people.map((p, i) => (
                <TeamCard
                  key={p._id}
                  person={p}
                  delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
                />
              ))}
            </div>

            <Reveal as="div" delay={4} className="mt-12 flex justify-center">
              <Link
                href="/profesori"
                className="inline-flex items-center gap-2 rounded-full border border-navy px-6 py-3 text-sm font-semibold text-navy transition-all hover:-translate-y-0.5 hover:bg-navy hover:text-white"
              >
                Vezi toți profesorii →
              </Link>
            </Reveal>
          </>
        )}
      </div>
    </section>
  );
}

function TeamCard({
  person,
  delay,
}: {
  person: Personal;
  delay: 1 | 2 | 3 | 4;
}) {
  const initials = person.name
    .split(" ")
    .filter((s) => /^[A-ZȘȚĂÎÂ]/.test(s))
    .slice(0, 2)
    .map((s) => s[0])
    .join("");

  return (
    <Reveal delay={delay}>
      <Card className="group h-full overflow-hidden border-navy/10 bg-parchment transition-all duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-[var(--shadow-elevated)]">
        <div className="relative aspect-square overflow-hidden border-b border-navy/10 bg-gradient-to-br from-navy via-navy-soft to-gold-deep">
          {person.photo?.asset ? (
            <Image
              src={person.photo.asset.url}
              alt={person.photo.alt || person.name}
              fill
              sizes="(min-width: 1024px) 280px, (min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
          ) : (
            <span className="absolute inset-0 flex items-center justify-center font-serif text-5xl font-semibold text-gold-light">
              {initials}
            </span>
          )}
        </div>
        <CardContent className="p-5 text-center">
          {person.subject && (
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-gold-deep">
              {person.subject}
            </p>
          )}
          <p className="mt-1 font-serif text-base font-semibold leading-tight text-navy text-balance">
            {person.name}
          </p>
          <p className="mt-2 text-xs text-muted">{person.role}</p>
        </CardContent>
      </Card>
    </Reveal>
  );
}

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { sanityClient } from "@/sanity/lib/client";
import { featuredPersonalQuery } from "@/sanity/lib/queries";
import type { Personal } from "@/sanity/lib/types";

/**
 * Home page team teaser — the four most-featured staff (director first,
 * then duhovnici, then teachers by source-page order). Compact card
 * design matches the original placeholder layout (circular avatar +
 * name + role + subject) but now with real portraits from Sanity. The
 * full filterable list lives at /profesori.
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
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {people.map((p, i) => (
                <TeamAvatarCard
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

function TeamAvatarCard({
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
    <Reveal
      delay={delay}
      className="group rounded-2xl border border-navy/10 bg-parchment p-7 text-center transition-all duration-500 hover:-translate-y-1.5 hover:bg-white hover:shadow-[var(--shadow-elevated)]"
    >
      {/*
        Circular avatar — `object-top` keeps the face above the crop line
        because legacy portraits often frame the subject from the chest up,
        and a centered square crop slices the head.
      */}
      <div className="relative mx-auto mb-4 size-24 overflow-hidden rounded-full border-2 border-gold bg-gradient-to-br from-navy via-navy-soft to-gold-deep">
        {person.photo?.asset ? (
          <Image
            src={person.photo.asset.url}
            alt={person.photo.alt || person.name}
            fill
            sizes="96px"
            className="object-cover object-top"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center font-serif text-3xl font-semibold text-gold-light">
            {initials}
          </span>
        )}
        <span
          aria-hidden="true"
          className="absolute -inset-2 rounded-full border border-gold/35 transition-all duration-500 group-hover:-inset-3"
        />
      </div>
      <div className="font-serif text-xl font-semibold leading-tight text-navy text-balance">
        {person.name}
      </div>
      <div className="mt-1 text-[0.78rem] font-semibold tracking-wide text-gold-deep">
        {person.role}
      </div>
      {person.subject && (
        <div className="mt-2 text-sm text-muted text-pretty">
          {person.subject}
        </div>
      )}
    </Reveal>
  );
}

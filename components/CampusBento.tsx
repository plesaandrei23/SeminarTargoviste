import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { CAMPUS_ZONES, type CampusZone } from "@/lib/campus";

/**
 * Landing-page campus section. Replaces the older SVG schematic with a
 * photo-led bento mosaic: one anchor tile (the entrance arch) plus a tile
 * per zone, each linking to its /campus/[slug] page. Zones with real
 * photos render full-bleed; the ones without (săli, bibliotecă) fall
 * back to the navy/gold icon treatment that the /campus cards already use.
 */

const ENTRANCE = {
  src: "/campus/intrare-arc.jpg",
  alt: "Aleea de intrare a Seminarului Teologic Ortodox „Sf. Ioan Gură de Aur”, văzută de sub arcadă",
};

/** Each row controls grid placement on lg+ — on mobile everything stacks. */
const TILE_LAYOUT: Record<string, string> = {
  paraclis: "lg:col-span-5 lg:row-span-1",
  internat: "lg:col-span-5 lg:row-span-1",
  "sali-de-clasa": "lg:col-span-4 lg:row-span-1",
  biblioteca: "lg:col-span-4 lg:row-span-1",
  "sala-de-festivitati": "lg:col-span-4 lg:row-span-1",
  secretariat: "lg:col-span-4 lg:row-span-1",
};

// Order matters — controls visual reading order in the grid.
const ZONE_ORDER = [
  "paraclis",
  "internat",
  "sali-de-clasa",
  "biblioteca",
  "sala-de-festivitati",
] as const;

export function CampusBento() {
  const zones = ZONE_ORDER.map(
    (slug) => CAMPUS_ZONES.find((z) => z.slug === slug)!,
  );

  return (
    <section
      id="campus"
      className="relative overflow-hidden bg-navy py-[clamp(4rem,9vw,8rem)] text-white"
    >
      <div className="wrap relative">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <Reveal as="p" className="eyebrow text-gold-light!">
            Explorează
          </Reveal>
          <Reveal
            as="h2"
            delay={1}
            className="mt-2 text-white! text-[clamp(2rem,4.4vw,3.3rem)]"
          >
            Campusul, la un pas de tine
          </Reveal>
          <Reveal as="p" delay={2} className="mt-3 text-white/70 text-pretty">
            Șase locuri în care viața de seminar prinde formă. Apasă pe oricare
            pentru a-l descoperi în detaliu.
          </Reveal>
        </div>

        <Reveal>
          <div
            className={cn(
              "grid gap-3 sm:gap-4",
              // 1 column on mobile, two on sm, twelve on lg
              "grid-cols-1 sm:grid-cols-2 lg:grid-cols-12",
              // Mobile/sm rows size to content so the hero (with its own
              // min-height) doesn't overflow into the next tile. The bento
              // grid only takes effect at lg+, where row-span needs equal
              // tracks — there we lock rows to a fixed clamp.
              "auto-rows-min lg:auto-rows-[clamp(180px,22vw,260px)]",
            )}
          >
            {/* Anchor tile — the entrance arch. Spans 2 rows, 7 cols on lg. */}
            <Link
              href="/campus"
              className={cn(
                "group relative overflow-hidden rounded-3xl",
                "ring-1 ring-white/10 transition-all duration-500",
                "hover:ring-gold-light/60 hover:ring-2",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy-deep",
                "sm:col-span-2 lg:col-span-7 lg:row-span-2",
                // Give the anchor enough vertical weight on smaller screens — the
                // headline + body + CTA need ~480px to breathe without crowding.
                "min-h-[480px] sm:min-h-[520px] lg:min-h-0",
              )}
            >
              <Image
                src={ENTRANCE.src}
                alt={ENTRANCE.alt}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                priority={false}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-tr from-navy-deep/85 via-navy-deep/35 to-transparent"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 lg:p-10">
                <p className="text-xs uppercase tracking-[0.18em] text-gold-light">
                  Vino la noi
                </p>
                <h3 className="mt-3 max-w-md font-serif text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-tight text-white! text-balance">
                  Începe turul de pe alee
                </h3>
                <p className="mt-3 max-w-md text-pretty text-sm leading-relaxed text-white/85 sm:text-base">
                  Sub arcada de la intrare începe campusul. Paraclis, săli,
                  internat, bibliotecă — toate la câțiva pași unul de altul.
                </p>
                <span className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-navy-deep transition-all duration-300 group-hover:gap-3 group-hover:bg-gold-light">
                  Vezi tot campusul
                  <ArrowRight className="size-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {zones.map((zone) => (
              <ZoneTile
                key={zone.slug}
                zone={zone}
                className={TILE_LAYOUT[zone.slug]}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ZoneTile({
  zone,
  className,
}: {
  zone: CampusZone;
  className?: string;
}) {
  const hasPhoto = !!zone.image;

  return (
    <Link
      href={`/campus/${zone.slug}`}
      aria-label={`Vezi pagina · ${zone.name}`}
      className={cn(
        "group relative overflow-hidden rounded-3xl",
        "ring-1 ring-white/10 transition-all duration-500",
        "hover:ring-gold-light/60 hover:ring-2 hover:-translate-y-0.5",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy-deep",
        "min-h-[180px]",
        className,
      )}
    >
      {hasPhoto ? (
        <>
          <Image
            src={zone.image!.src}
            alt={zone.image!.alt}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/35 to-navy-deep/5"
          />
        </>
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-navy-deep via-navy to-navy-soft"
        >
          <zone.Icon
            className="absolute -right-6 -top-6 size-48 text-gold/15"
            strokeWidth={1}
            aria-hidden="true"
          />
        </div>
      )}

      {/* Foreground content */}
      <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6">
        <span
          aria-hidden="true"
          className="inline-flex size-10 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15 backdrop-blur-sm"
        >
          <zone.Icon className="size-5 text-gold-light" strokeWidth={1.75} />
        </span>

        <div>
          <h3 className="font-serif text-[clamp(1.2rem,2vw,1.6rem)] font-semibold leading-tight text-white! text-balance">
            {zone.name}
          </h3>
          <p className="mt-1 line-clamp-2 max-w-[18rem] text-pretty text-xs text-white/75 sm:text-sm">
            {zone.tagline}
          </p>
        </div>
      </div>

      {/* Top-right corner arrow that animates on hover */}
      <span
        aria-hidden="true"
        className="absolute right-5 top-5 inline-flex size-9 items-center justify-center rounded-full bg-navy-deep/40 backdrop-blur-sm ring-1 ring-white/20 transition-all duration-300 group-hover:bg-gold group-hover:text-navy-deep group-hover:ring-gold-light/0"
      >
        <ArrowUpRight className="size-4 text-white transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-navy-deep" strokeWidth={2} />
      </span>
    </Link>
  );
}

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { urlFor } from "@/sanity/lib/image";
import type { ActivityCard as ActivityCardType } from "@/sanity/lib/types";
import { categoryLabel, formatRoDate } from "@/lib/format";

type Props = {
  item: ActivityCardType;
  /** 1–6, fed straight into `<Reveal delay>` for the cascade effect. */
  delay?: 1 | 2 | 3 | 4 | 5 | 6;
};

/**
 * Card used on the home page News grid AND on the /activitati listing.
 * Kept in one place so the two pages can't drift visually.
 */
export function ActivityCard({ item, delay }: Props) {
  const href = `/activitati/${item.slug}`;
  const tag = categoryLabel(item.category);
  const date = formatRoDate(item.date);

  return (
    <Reveal
      as="article"
      delay={delay}
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
        {item.excerpt && (
          <p className="text-sm text-muted mb-4 line-clamp-3 text-pretty">
            {item.excerpt}
          </p>
        )}
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

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";

type NewsItem = {
  date: string;
  title: string;
  tag: string;
  image: string;
  alt: string;
  href: string;
};

const items: NewsItem[] = [
  {
    date: "12 iunie 2026",
    title: "Festivitatea de încheiere a anului școlar",
    tag: "Eveniment",
    image:
      "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=800/d95MN2J9V3cXzoxX/img_9774-c5maBmN6wDMCya6l.jpeg",
    alt: "Festivitatea de încheiere a anului școlar",
    href: "#",
  },
  {
    date: "7 iunie 2026",
    title: "Prezenți pe scena Concertului „Coralia”",
    tag: "Cultural",
    image:
      "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=800/d95MN2J9V3cXzoxX/img_9226-rJwKKbIZYoRIMbKX.jpeg",
    alt: "Elevi seminariști în concertul Coralia",
    href: "#",
  },
  {
    date: "mai 2026",
    title: "Educație și deschidere europeană — Mobilități Erasmus",
    tag: "Erasmus+",
    image:
      "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=800/d95MN2J9V3cXzoxX/652900604_122236612226139762_4139687152801506898_n-d5KrRj30972CdqBi.jpg",
    alt: "Mobilitate Erasmus a elevilor seminariști",
    href: "#",
  },
  {
    date: "aprilie 2026",
    title: "Olimpiada Națională de Religie — Seminarii Teologice",
    tag: "Performanță",
    image:
      "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=800/d95MN2J9V3cXzoxX/650053899_122236240862139762_1256219287313679433_n-5rclVuvplEM0xwhW.jpg",
    alt: "Elevi premiați la Olimpiada Națională de Religie",
    href: "#",
  },
  {
    date: "martie 2026",
    title: "Educație pentru siguranța în mediul online",
    tag: "Educație",
    image:
      "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=800/d95MN2J9V3cXzoxX/img_4322-p6QQDlS4utPSYz2F.jpeg",
    alt: "Activitate de educație digitală cu elevii",
    href: "#",
  },
  {
    date: "martie 2026",
    title: "Premii la sesiunea de comunicări științifice",
    tag: "Concurs",
    image:
      "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=800/d95MN2J9V3cXzoxX/whatsapp-image-2026-03-25-at-20.30.30-7mp5JZ4FUTbCLmDw.jpeg",
    alt: "Premii la sesiunea de comunicări științifice",
    href: "#",
  },
];

export function News() {
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
              href="#"
              className="inline-flex items-center gap-2 rounded-full border border-navy px-5 py-2.5 text-sm font-semibold text-navy transition-all hover:bg-navy hover:text-white"
            >
              Toate activitățile →
            </Link>
          </Reveal>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal
              key={item.title}
              as="article"
              delay={((i % 3) + 1) as 1 | 2 | 3}
              className="group flex flex-col overflow-hidden rounded-2xl border border-navy/10 bg-paper transition-all duration-500 hover:-translate-y-2 hover:shadow-[var(--shadow-elevated)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                />
                <span className="absolute left-3 top-3 rounded-full bg-navy/90 px-3 py-1 text-[0.66rem] font-semibold tracking-[0.12em] uppercase text-gold-light backdrop-blur">
                  {item.tag}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs text-muted tracking-wide mb-2">
                  {item.date}
                </p>
                <h3 className="text-xl leading-tight mb-4 text-balance">
                  {item.title}
                </h3>
                <Link
                  href={item.href}
                  className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-gold-deep transition-[gap] duration-300 group-hover:gap-3"
                >
                  Citește mai mult →
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

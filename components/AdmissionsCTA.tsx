import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { siteConfig } from "@/lib/site-config";

const pills = [
  `${siteConfig.admission.spots} de locuri`,
  siteConfig.admission.program,
  "Liceu · 4 ani",
  `Sesiunea ${siteConfig.admission.session}`,
];

export function AdmissionsCTA() {
  return (
    <section
      id="admitere"
      className="relative overflow-hidden bg-gradient-to-br from-navy-deep to-navy-soft py-[clamp(4rem,9vw,8rem)] text-center text-white"
    >
      <span
        aria-hidden="true"
        className="absolute -top-2 left-[4%] font-serif text-[9rem] leading-none text-gold/15"
      >
        ✶
      </span>
      <span
        aria-hidden="true"
        className="absolute -bottom-8 right-[5%] font-serif text-[9rem] leading-none text-gold/15"
      >
        ✶
      </span>

      <div className="wrap relative">
        <Reveal as="p" className="eyebrow !text-gold-light">
          Admitere {siteConfig.admission.cycle}
        </Reveal>
        <Reveal
          as="h2"
          delay={1}
          className="mt-3 !text-white text-[clamp(2.1rem,5vw,3.6rem)]"
        >
          Devino seminarist
        </Reveal>
        <Reveal
          as="p"
          delay={2}
          className="mx-auto mt-4 mb-8 max-w-xl text-white/80 text-pretty"
        >
          Înscrierile pentru clasa a IX-a, specializarea Teologie Pastorală,
          sunt deschise. Descoperă criteriile, calendarul și actele necesare.
        </Reveal>
        <Reveal delay={2} className="mb-9 flex flex-wrap justify-center gap-2">
          {pills.map((pill) => (
            <span
              key={pill}
              className="rounded-full border border-gold/40 px-4 py-1.5 text-sm text-gold-light"
            >
              {pill}
            </span>
          ))}
        </Reveal>
        <Reveal delay={3}>
          <Link
            href="/admitere"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-base font-semibold text-navy-deep transition-all hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-[var(--shadow-gold)]"
          >
            Vezi detalii admitere →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

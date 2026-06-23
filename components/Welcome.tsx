import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Stat } from "@/components/Stat";

export function Welcome() {
  return (
    <section className="bg-paper py-[clamp(4rem,9vw,8rem)]">
      <div className="wrap grid items-center gap-12 lg:gap-20 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Reveal as="p" className="eyebrow">
            Bine ați venit
          </Reveal>
          <Reveal as="h2" delay={1} className="mt-2 mb-5 text-balance">
            <span className="block text-[clamp(1.9rem,4vw,3rem)]">
              O comunitate a credinței,
            </span>
            <span className="block text-[clamp(1.9rem,4vw,3rem)]">
              culturii și caracterului.
            </span>
          </Reveal>
          <Reveal
            as="p"
            delay={2}
            className="mb-4 text-base text-[#3a4250] text-pretty"
          >
            Seminarul Teologic Ortodox „Sfântul Ioan Gură de Aur” formează
            tineri în specializarea Teologie Pastorală, îmbinând rigoarea
            academică cu viața duhovnicească și deschiderea europeană prin
            programul Erasmus+.
          </Reveal>
          <Reveal as="p" delay={3} className="mb-6">
            <em className="serif-i text-navy text-lg">
              „Dacă-ți iubești copilul, arat-o prin educația pe care i-o
              dai!”
            </em>
          </Reveal>
          <Reveal delay={4}>
            <Link
              href="#news"
              className="inline-flex items-center gap-2 rounded-full border border-navy px-6 py-3 text-sm font-semibold text-navy transition-all hover:bg-navy hover:text-white hover:-translate-y-0.5"
            >
              Viața seminarului →
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Reveal delay={1}>
            <Stat value={30} suffix="+" label="ani de tradiție" />
          </Reveal>
          <Reveal delay={2}>
            <Stat value={338} label="elevi seminariști" />
          </Reveal>
          <Reveal delay={3}>
            <Stat value={68} label="cadre & personal" />
          </Reveal>
          <Reveal delay={4}>
            <div className="relative overflow-hidden rounded-2xl border border-navy/10 bg-parchment p-6 sm:p-7">
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-1 bg-gold"
              />
              <div className="font-serif text-2xl font-bold leading-tight text-navy mt-1">
                Erasmus+
                <span className="block text-sm font-semibold text-gold-deep mt-0.5">
                  acreditat
                </span>
              </div>
              <div className="mt-2 text-sm text-muted">
                mobilități europene
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

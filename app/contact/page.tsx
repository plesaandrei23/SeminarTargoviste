import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contactează Seminarul Teologic Ortodox „${siteConfig.patron}” din ${siteConfig.city}. Telefon, email, adresă, program de funcționare și formular online.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-parchment pb-[clamp(4rem,9vw,8rem)]">
        <Hero />

        <section className="wrap mt-16 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <ContactForm />
          <div className="space-y-6">
            <PrimaryContactCard />
            <DirectorCard />
            <MapCard />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-navy-deep via-navy to-navy-soft pt-36 pb-24 text-white">
      <div className="wrap relative mx-auto max-w-3xl text-center">
        <Reveal as="p" className="eyebrow !text-gold-light">
          Contact
        </Reveal>
        <Reveal
          as="h1"
          delay={1}
          className="mt-3 !text-white text-[clamp(2.4rem,5.5vw,4.4rem)] font-semibold leading-[1.05]"
        >
          Întreabă-ne orice
        </Reveal>
        <svg
          aria-hidden="true"
          viewBox="0 0 240 12"
          className="mx-auto mt-6 h-3 w-60 text-gold/60"
        >
          <line x1="0" y1="6" x2="100" y2="6" stroke="currentColor" strokeWidth="0.6" />
          <path d="M120 1 L125 6 L120 11 L115 6 Z" fill="currentColor" />
          <line x1="140" y1="6" x2="240" y2="6" stroke="currentColor" strokeWidth="0.6" />
        </svg>
        <Reveal
          as="p"
          delay={2}
          className="mx-auto mt-6 max-w-xl text-white/85 text-pretty sm:text-lg"
        >
          Trimite-ne un mesaj prin formularul de mai jos sau sună la
          secretariat. Răspundem cel târziu în 1–2 zile lucrătoare.
        </Reveal>
      </div>
    </section>
  );
}

function PrimaryContactCard() {
  return (
    <Reveal>
      <Card className="border-navy/10 bg-paper">
        <CardContent className="space-y-5 p-7">
          <div>
            <p className="eyebrow">Secretariat</p>
            <h2 className="mt-2 font-serif text-2xl font-semibold leading-tight text-navy">
              Întâi de toate, sună-ne
            </h2>
            <p className="mt-2 text-sm text-muted text-pretty">
              Pentru întrebări urgente despre admitere sau înscrieri,
              telefonul ajunge la o persoană reală mai rapid decât emailul.
            </p>
          </div>
          <Separator className="bg-navy/10" />
          <ContactRow
            Icon={Phone}
            label="Telefon"
            value={siteConfig.contact.phoneDisplay}
            href={`tel:${siteConfig.contact.phone}`}
          />
          <ContactRow
            Icon={Mail}
            label="Email"
            value={siteConfig.contact.email}
            href={`mailto:${siteConfig.contact.email}`}
          />
          <ContactRow
            Icon={Clock}
            label="Program"
            value={siteConfig.contact.hours}
          />
        </CardContent>
      </Card>
    </Reveal>
  );
}

function DirectorCard() {
  return (
    <Reveal delay={1}>
      <Card className="overflow-hidden border-navy/10 bg-gradient-to-br from-navy-deep to-navy-soft text-white">
        <CardContent className="space-y-4 p-7">
          <p className="eyebrow !text-gold-light">Director</p>
          <h2 className="font-serif text-xl font-semibold leading-tight !text-white">
            Pr. Prof. Pleşa Alin–Marian
          </h2>
          <p className="text-sm text-white/80 text-pretty">
            Pentru solicitări care țin de admitere, pregătirea gratuită sau
            întâlniri cu părinții — telefonul direct al Părintelui Director.
          </p>
          <Separator className="bg-white/15" />
          <a
            href="tel:+40724507790"
            className="flex items-center gap-3 transition-colors hover:text-gold-light"
          >
            <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
              <Phone className="size-4 text-gold-light" strokeWidth={1.75} />
            </span>
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-[0.14em] text-white/55">
                Telefon direct
              </p>
              <p className="font-semibold">0724 507 790</p>
            </div>
          </a>
        </CardContent>
      </Card>
    </Reveal>
  );
}

function MapCard() {
  return (
    <Reveal delay={2}>
      <Card className="overflow-hidden border-navy/10 bg-paper">
        <CardContent className="space-y-4 p-7">
          <p className="eyebrow">Pe hartă</p>
          <h2 className="font-serif text-2xl font-semibold leading-tight text-navy">
            {siteConfig.address.street}
          </h2>
          <p className="text-sm text-muted">
            {siteConfig.address.city} {siteConfig.address.postalCode},{" "}
            {siteConfig.address.country}
          </p>
          <a
            href={siteConfig.address.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-navy px-5 py-2.5 text-sm font-semibold text-navy transition-all hover:-translate-y-0.5 hover:bg-navy hover:text-white"
          >
            <MapPin className="size-4" strokeWidth={1.75} />
            Deschide în Google Maps
          </a>
          <div className="overflow-hidden rounded-xl border border-navy/10">
            <iframe
              title="Locația seminarului pe hartă"
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                `${siteConfig.address.street}, ${siteConfig.address.city} ${siteConfig.address.postalCode}`,
              )}&output=embed`}
              loading="lazy"
              className="aspect-[16/10] w-full"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </CardContent>
      </Card>
    </Reveal>
  );
}

function ContactRow({
  Icon,
  label,
  value,
  href,
}: {
  Icon: typeof Phone;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-gold/15">
        <Icon className="size-4 text-gold-deep" strokeWidth={1.75} />
      </span>
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-[0.14em] text-muted">
          {label}
        </p>
        {href ? (
          <a
            href={href}
            className="block font-semibold text-navy transition-colors hover:text-gold-deep"
          >
            {value}
          </a>
        ) : (
          <p className="font-semibold text-navy">{value}</p>
        )}
      </div>
    </div>
  );
}

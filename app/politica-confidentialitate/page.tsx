import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Lock, Mail, Shield, ShieldCheck, UserCheck } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Politică de confidențialitate",
  description: `Politica de confidențialitate a Seminarului Teologic Ortodox „${siteConfig.patron}” din ${siteConfig.city} — prelucrarea datelor cu caracter personal conform GDPR.`,
  alternates: { canonical: "/politica-confidentialitate" },
};

type Section = {
  Icon: typeof Shield;
  title: string;
  body: string;
};

const SECTIONS: Section[] = [
  {
    Icon: UserCheck,
    title: "Ce date colectăm",
    body:
      "Doar datele pe care ni le furnizezi voluntar prin formularul de contact: nume, adresă de email, subiect și conținutul mesajului tău. Nu colectăm date sensibile (etnie, religie ca dată separată, sănătate etc.) prin acest site.",
  },
  {
    Icon: Shield,
    title: "Cum le folosim",
    body:
      "Datele introduse în formularul de contact sunt folosite exclusiv pentru a-ți răspunde la întrebare sau cerere. Mesajele ajung pe email-ul secretariatului prin serviciul de transmitere Resend.com. Nu le partajăm cu terți pentru marketing și nu le vindem.",
  },
  {
    Icon: Lock,
    title: "Cât timp le păstrăm",
    body:
      "Mesajele primite prin formular sunt păstrate maximum 12 luni de la primire, după care sunt șterse din cutia poștală a secretariatului — cu excepția cazurilor în care comunicarea este necesară pentru un dosar de admitere sau pentru o cerere oficială.",
  },
  {
    Icon: ShieldCheck,
    title: "Drepturile tale GDPR",
    body:
      'Conform Regulamentului UE 2016/679 (GDPR), ai dreptul să soliciți accesul la datele tale, rectificarea lor, ștergerea lor („dreptul de a fi uitat”), restricționarea prelucrării, portabilitatea datelor și să te opui prelucrării. Pentru exercitarea acestor drepturi, contactează responsabilul cu protecția datelor (DPO) al școlii.',
  },
];

export default function PoliticaConfidentialitatePage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-parchment pb-[clamp(4rem,9vw,8rem)]">
        <Hero />
        <Body />
        <Cookies />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-navy-deep via-navy to-navy-soft pt-32 pb-20 text-white">
      <div className="wrap relative">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] text-white/65 transition-colors hover:text-gold-light"
        >
          <ArrowLeft className="size-3" strokeWidth={2} />
          Înapoi la pagina principală
        </Link>
        <div className="mt-8 max-w-3xl">
          <Badge variant="outline" className="border-gold/40 text-gold-light">
            Legal
          </Badge>
          <h1 className="mt-5 text-balance !text-white text-[clamp(2.2rem,4.8vw,3.8rem)] font-semibold leading-[1.05]">
            Politică de confidențialitate
          </h1>
          <p className="mt-6 text-pretty text-white/85 sm:text-lg">
            Cum protejăm datele tale personale când folosești site-ul nostru,
            în conformitate cu Regulamentul UE 2016/679 (GDPR) și Legea
            190/2018.
          </p>
        </div>
      </div>
    </section>
  );
}

function Body() {
  return (
    <section className="wrap mt-16 max-w-3xl space-y-8">
      <Reveal>
        <Card className="border-navy/10 bg-paper">
          <CardContent className="space-y-4 p-7">
            <h2 className="font-serif text-xl font-semibold text-navy">
              Operator de date
            </h2>
            <p className="text-pretty text-ink/85">
              Operatorul datelor cu caracter personal colectate prin acest
              site este <strong className="text-navy">{siteConfig.name}</strong>,
              cu sediul în {siteConfig.address.street}, {siteConfig.address.city}{" "}
              {siteConfig.address.postalCode}, România.
            </p>
            <div className="border-t border-navy/10 pt-4 text-sm text-muted">
              <p>
                Email contact pentru cereri GDPR:{" "}
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="font-semibold text-gold-deep hover:underline"
                >
                  {siteConfig.contact.email}
                </a>
              </p>
              <p className="mt-1">
                Telefon: {siteConfig.contact.phoneDisplay} ·{" "}
                {siteConfig.contact.hours}
              </p>
            </div>
          </CardContent>
        </Card>
      </Reveal>

      <div className="grid gap-4">
        {SECTIONS.map((s, i) => (
          <Reveal key={s.title} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
            <Card className="border-navy/10 bg-paper">
              <CardContent className="space-y-4 p-7">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="inline-flex size-11 items-center justify-center rounded-xl bg-gold/15"
                  >
                    <s.Icon className="size-5 text-gold-deep" strokeWidth={1.5} />
                  </span>
                  <h2 className="font-serif text-xl font-semibold text-navy">
                    {s.title}
                  </h2>
                </div>
                <p className="text-pretty text-ink/85 leading-relaxed">
                  {s.body}
                </p>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Cookies() {
  return (
    <section className="wrap mt-20 max-w-3xl">
      <Reveal>
        <h2 className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-tight text-navy">
          Cookie-uri și analytics
        </h2>
        <div className="mt-5 space-y-4 text-pretty text-ink/85 leading-relaxed">
          <p>
            Site-ul nostru folosește cookie-uri strict necesare pentru
            funcționarea de bază (sesiunea, preferințele de tematică) și
            scripturi de analytics agregate de la{" "}
            <strong className="text-navy">Vercel Analytics</strong> și{" "}
            <strong className="text-navy">Vercel Speed Insights</strong>{" "}
            pentru a măsura performanța site-ului.
          </p>
          <p>
            Aceste servicii sunt configurate să respecte confidențialitatea —
            nu folosesc cookie-uri de identificare cross-site și colectează doar
            date agregate, anonimizate. Nu se utilizează cookie-uri pentru
            publicitate sau pentru profilare comportamentală.
          </p>
          <p>
            Poți restricționa cookie-urile direct din setările browserului tău.
            Atenție: blocarea cookie-urilor poate afecta unele funcționalități
            ale site-ului.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

function Contact() {
  return (
    <section className="wrap mt-20 max-w-3xl">
      <Reveal>
        <Card className="overflow-hidden border-navy/10 bg-gradient-to-br from-navy-deep to-navy-soft text-white shadow-[var(--shadow-elevated)]">
          <CardContent className="space-y-6 p-10">
            <p className="eyebrow !text-gold-light">Cereri GDPR</p>
            <h2 className="!text-white font-serif text-[clamp(1.4rem,2.6vw,1.9rem)] font-semibold leading-tight">
              Contactează responsabilul cu protecția datelor
            </h2>
            <p className="text-pretty text-white/80">
              Pentru orice cerere legată de datele tale personale — acces,
              rectificare, ștergere, opoziție — contactează responsabilul cu
              protecția datelor al școlii. Răspundem în maximum{" "}
              <strong className="text-white">30 de zile calendaristice</strong>{" "}
              de la primirea cererii, conform GDPR.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${siteConfig.contact.email}?subject=GDPR%20-%20Cerere%20de%20acces`}
                className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy-deep transition-all hover:-translate-y-0.5 hover:bg-gold-light"
              >
                <Mail className="size-4" strokeWidth={1.75} />
                Trimite o cerere GDPR
              </a>
              <Link
                href="/declaratie-accesibilitate"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-white hover:bg-white/10"
              >
                Declarație de accesibilitate
              </Link>
            </div>
            <p className="border-t border-white/10 pt-4 text-xs text-white/55">
              Această politică a fost actualizată la 25 iunie 2026.
            </p>
          </CardContent>
        </Card>
      </Reveal>
    </section>
  );
}

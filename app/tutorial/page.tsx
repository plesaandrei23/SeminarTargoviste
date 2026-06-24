import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Eye,
  FileText,
  GraduationCap,
  Image as ImageIcon,
  KeyRound,
  Lightbulb,
  LifeBuoy,
  ListChecks,
  Pencil,
  ShieldCheck,
  Sparkles,
  XCircle,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { TutorialNav, type Section } from "@/components/TutorialNav";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Tutorial · Cum se actualizează site-ul",
  description: `Ghid practic pentru echipa Seminarului Teologic Ortodox „${siteConfig.patron}” din ${siteConfig.city} — cum se folosește Sanity Studio pentru a publica anunțuri, activități, fotografii.`,
  alternates: { canonical: "/tutorial" },
  // We don't want this page indexed by search engines — it's an internal guide.
  robots: { index: false, follow: true },
};

const SECTIONS: Section[] = [
  { id: "intro", title: "Bun-venit", subtitle: "Ce este Sanity Studio" },
  { id: "login", title: "Cum te conectezi", subtitle: "/studio + e-mail" },
  { id: "interfata", title: "Interfața Studio", subtitle: "Bara stângă, panoul de editare" },
  { id: "ce-poti-edita", title: "Ce poți edita", subtitle: "9 tipuri de conținut" },
  { id: "activitati", title: "Activități și evenimente", subtitle: "Cel mai folosit" },
  { id: "anunturi", title: "Anunțuri", subtitle: "Pe scurt, la avizier" },
  { id: "admitere", title: "Admitere", subtitle: "Sesiunea curentă" },
  { id: "rezultate", title: "Rezultate examene", subtitle: "BAC, Atestat, EN" },
  { id: "personal", title: "Profesori și personal", subtitle: "Adăugare cadru didactic" },
  { id: "pagini", title: "Pagini statice", subtitle: "/[slug] flexibil" },
  { id: "documente", title: "Documente PDF", subtitle: "Upload + reutilizare" },
  { id: "imagini", title: "Imagini", subtitle: "Mereu cu alt text" },
  { id: "publicare", title: "Publicare", subtitle: "Draft → Publish → Live" },
  { id: "ce-nu-poti", title: "Ce NU se editează în Studio", subtitle: "Paginile fixe" },
  { id: "greseli", title: "Greșeli frecvente", subtitle: "Ce să eviți" },
  { id: "ajutor", title: "Ajutor", subtitle: "Când nu mai înțelegi" },
];

export default function TutorialPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-parchment pb-[clamp(4rem,9vw,8rem)]">
        <Hero />
        <section className="wrap mt-12 grid gap-10 lg:grid-cols-[280px_1fr] lg:gap-14">
          <TutorialNav sections={SECTIONS} />
          <article className="prose-tutorial space-y-16 max-w-3xl">
            <Intro />
            <Login />
            <UI />
            <WhatYouEdit />
            <Activitati />
            <Anunturi />
            <Admitere />
            <Rezultate />
            <Personal />
            <Pagini />
            <Documente />
            <Imagini />
            <Publicare />
            <CeNuPoti />
            <Greseli />
            <Ajutor />
          </article>
        </section>
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
            Tutorial intern
          </Badge>
          <h1 className="mt-5 text-balance !text-white text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.05]">
            Cum actualizezi site-ul
          </h1>
          <p className="mt-2 text-sm uppercase tracking-[0.16em] text-gold-light">
            Sanity Studio · pas cu pas
          </p>
          <svg
            aria-hidden="true"
            viewBox="0 0 240 12"
            className="mt-6 h-3 w-60 text-gold/60"
          >
            <line x1="0" y1="6" x2="100" y2="6" stroke="currentColor" strokeWidth="0.6" />
            <path d="M120 1 L125 6 L120 11 L115 6 Z" fill="currentColor" />
            <line x1="140" y1="6" x2="240" y2="6" stroke="currentColor" strokeWidth="0.6" />
          </svg>
          <p className="mt-6 text-pretty text-white/85 sm:text-lg">
            Un ghid pas-cu-pas pentru personalul școlii: cum se publică
            anunțuri, activități, hotărâri, fotografii și schimbări de text,
            fără să fie nevoie de cunoștințe de programare.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────────────── */
/*  Reusable section + callout primitives                        */
/* ───────────────────────────────────────────────────────────── */

function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  Icon,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  Icon: typeof BookOpen;
}) {
  return (
    <header id={id} className="scroll-mt-32">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-2 flex items-start gap-3 font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-tight text-navy">
        <span aria-hidden="true" className="mt-1 inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-gold/15">
          <Icon className="size-5 text-gold-deep" strokeWidth={1.75} />
        </span>
        <span className="text-balance">{title}</span>
      </h2>
      <p className="mt-4 text-pretty text-[1.05rem] leading-relaxed text-ink/85">
        {intro}
      </p>
    </header>
  );
}

function Tip({ children, kind = "tip" }: { children: React.ReactNode; kind?: "tip" | "warn" | "ok" }) {
  const cfg = {
    tip: { Icon: Lightbulb, color: "text-gold-deep", border: "border-gold/30", bg: "bg-gold/5" },
    warn: { Icon: AlertTriangle, color: "text-amber-600", border: "border-amber-200", bg: "bg-amber-50" },
    ok: { Icon: CheckCircle2, color: "text-emerald-600", border: "border-emerald-200", bg: "bg-emerald-50" },
  }[kind];
  return (
    <div className={`my-5 flex items-start gap-3 rounded-2xl border ${cfg.border} ${cfg.bg} p-4`}>
      <cfg.Icon aria-hidden="true" className={`mt-0.5 size-5 shrink-0 ${cfg.color}`} strokeWidth={1.75} />
      <div className="text-pretty text-sm text-ink/85">{children}</div>
    </div>
  );
}

function Steps({ items }: { items: string[] }) {
  return (
    <ol className="my-5 space-y-3">
      {items.map((s, i) => (
        <li key={i} className="flex items-start gap-3 rounded-2xl border border-navy/10 bg-paper p-4">
          <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-gold text-xs font-bold text-navy-deep">
            {i + 1}
          </span>
          <p className="text-pretty text-[0.95rem] text-ink/85 leading-relaxed">{s}</p>
        </li>
      ))}
    </ol>
  );
}

function FieldTable({ fields }: { fields: { name: string; note: string; required?: boolean }[] }) {
  return (
    <div className="my-5 overflow-hidden rounded-2xl border border-navy/10">
      <table className="w-full text-left text-sm">
        <thead className="bg-navy text-white">
          <tr>
            <th className="px-4 py-3 font-semibold">Câmp</th>
            <th className="px-4 py-3 font-semibold">La ce folosește</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-navy/10 bg-paper">
          {fields.map((f) => (
            <tr key={f.name}>
              <td className="px-4 py-3 align-top">
                <span className="font-mono text-[0.85rem] text-navy">{f.name}</span>
                {f.required && (
                  <span className="ml-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-red-600">
                    obligatoriu
                  </span>
                )}
              </td>
              <td className="px-4 py-3 align-top text-pretty text-ink/85">{f.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-block rounded-md border border-navy/15 bg-paper px-1.5 py-0.5 font-mono text-[0.78rem] text-navy shadow-sm">
      {children}
    </kbd>
  );
}

/* ───────────────────────────────────────────────────────────── */
/*  Sections                                                     */
/* ───────────────────────────────────────────────────────────── */

function Intro() {
  return (
    <section className="space-y-4">
      <SectionHeading
        id="intro"
        eyebrow="Bun-venit"
        title="Ce este Sanity Studio și de ce îl folosim"
        intro="Sanity Studio este o aplicație web în care editezi conținutul site-ului fără să intri în cod. Funcționează ca o foaie Excel cu câmpuri prestabilite — completezi titlu, dată, text, atașezi o poză și apeși „Publish”. Câteva secunde mai târziu, modificarea apare pe site."
        Icon={BookOpen}
      />
      <Tip>
        Pe scurt: <strong className="text-navy">Sanity = unde scrii conținutul</strong>,{" "}
        <strong className="text-navy">site-ul = unde se afișează</strong>. Sunt
        separate intenționat — așa poți schimba un anunț fără să strici design-ul.
      </Tip>
    </section>
  );
}

function Login() {
  return (
    <section>
      <SectionHeading
        id="login"
        eyebrow="Pas 1"
        title="Cum te conectezi"
        intro="Sanity Studio este accesat la /studio. Te loghezi cu adresa de e-mail (Google sau e-mail/parolă), fără cont separat."
        Icon={KeyRound}
      />
      <Steps
        items={[
          "Deschide în browser adresa: seminarortodoxtargoviste.ro/studio (sau, dacă nu a fost încă pus în producție, link-ul preview pe care l-ai primit).",
          "Apasă „Log in with Google” și folosește adresa de e-mail pe care ai primit invitația. Dacă ai un cont @scolidb.ro, alege „Continue with Google”.",
          "Prima dată, Sanity îți va cere permisiune să acceseze profilul tău Google — accept-o. Datele tale rămân la Google, Sanity doar verifică identitatea.",
          "Te vei trezi într-o interfață cu un meniu pe stânga. Felicitări — ești înăuntru.",
        ]}
      />
      <Tip kind="warn">
        Dacă nu ai fost invitat la proiectul Sanity și nu vezi nimic, scrie-i
        administratorului ({siteConfig.contact.email}) pentru o invitație. Doar
        utilizatorii invitați pot edita.
      </Tip>
    </section>
  );
}

function UI() {
  return (
    <section>
      <SectionHeading
        id="interfata"
        eyebrow="Pas 2"
        title="Interfața Studio: ce vezi pe ecran"
        intro="Studio are trei zone principale. Înțelegerea lor te scapă de 90% din confuziile inițiale."
        Icon={Eye}
      />
      <ul className="my-5 space-y-3">
        <li className="rounded-2xl border border-navy/10 bg-paper p-5">
          <p className="font-serif text-base font-semibold text-navy">
            Bara stângă · Tipuri de conținut
          </p>
          <p className="mt-1 text-pretty text-sm text-ink/85">
            O listă cu „Setări site”, „Activități”, „Anunțuri”, „Admitere”,
            „Personal”, „Pagini statice”, „Documente”. Aici alegi ce vrei să
            editezi.
          </p>
        </li>
        <li className="rounded-2xl border border-navy/10 bg-paper p-5">
          <p className="font-serif text-base font-semibold text-navy">
            Coloana din mijloc · Lista documentelor
          </p>
          <p className="mt-1 text-pretty text-sm text-ink/85">
            După ce alegi un tip (de ex. „Activități”), vezi toate
            documentele existente. Click pe unul ca să-l editezi sau{" "}
            <Kbd>+ Create</Kbd> sus pentru a crea unul nou.
          </p>
        </li>
        <li className="rounded-2xl border border-navy/10 bg-paper p-5">
          <p className="font-serif text-base font-semibold text-navy">
            Coloana din dreapta · Editorul
          </p>
          <p className="mt-1 text-pretty text-sm text-ink/85">
            Aici completezi câmpurile. Jos vezi două butoane:{" "}
            <Kbd>Publish</Kbd> (face modificările live) și{" "}
            <Kbd>Save</Kbd> (păstrează draft).
          </p>
        </li>
      </ul>
    </section>
  );
}

function WhatYouEdit() {
  const items: { Icon: typeof Sparkles; title: string; desc: string }[] = [
    { Icon: Sparkles, title: "Activitate", desc: "Eveniment, articol cu poze, exemplu: „Concert de Crăciun”." },
    { Icon: Pencil, title: "Anunț", desc: "Anunț scurt — calendar, înscrieri, vacanțe." },
    { Icon: GraduationCap, title: "Admitere", desc: "Sesiunea curentă: locuri, calendar, metodologie, documente." },
    { Icon: ListChecks, title: "Rezultate", desc: "Rezultate examene — BAC, Evaluare Națională, Atestat." },
    { Icon: ShieldCheck, title: "Personal", desc: "Profesori, preoți, personal administrativ." },
    { Icon: BookOpen, title: "Erasmus+", desc: "Anunțuri / actualizări proiect Erasmus+." },
    { Icon: FileText, title: "Pagină statică", desc: "Pagini libere cu text + imagini — vor apărea la URL-ul slugului lor." },
    { Icon: FileText, title: "Document (PDF)", desc: "Fișiere PDF reutilizabile — încarci o dată, le folosești oriunde." },
    { Icon: Sparkles, title: "Setări site", desc: "Setări globale (telefon, email, banner activ) — un singur document." },
  ];
  return (
    <section>
      <SectionHeading
        id="ce-poti-edita"
        eyebrow="Pas 3"
        title="Ce poți edita în Studio"
        intro="Site-ul are 9 tipuri de conținut. Iată ce face fiecare — în detaliu mai jos, secțiune cu secțiune."
        Icon={ListChecks}
      />
      <div className="my-5 grid gap-3 sm:grid-cols-2">
        {items.map((it) => (
          <div key={it.title} className="flex items-start gap-3 rounded-2xl border border-navy/10 bg-paper p-4">
            <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-gold/15">
              <it.Icon className="size-5 text-gold-deep" strokeWidth={1.75} />
            </span>
            <div>
              <p className="font-serif text-sm font-semibold text-navy">{it.title}</p>
              <p className="mt-0.5 text-pretty text-xs text-ink/80">{it.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Activitati() {
  return (
    <section>
      <SectionHeading
        id="activitati"
        eyebrow="Cel mai folosit"
        title="Cum publici o activitate sau un eveniment"
        intro="Activitățile sunt articolele care apar pe pagina principală („Cele mai recente”) și pe /activitati. Exemplu: „Hramul școlii — 13 noiembrie 2026”."
        Icon={Sparkles}
      />
      <Steps
        items={[
          "În bara stângă apasă „Activități”.",
          "Sus, apasă butonul „+ Create” → „Activitate”.",
          "Completează câmpurile (vezi tabelul de mai jos).",
          "La „Cover image”, încarcă o fotografie reprezentativă (minim 1200px lățime, format JPG sau PNG).",
          "Scrie corpul articolului în câmpul „Conținut” — la fel ca într-un Word.",
          "Când ești mulțumită(ă), apasă „Publish” jos-dreapta. Articolul va apărea pe site în ~30 de secunde.",
        ]}
      />
      <FieldTable
        fields={[
          { name: "Titlu", note: "Titlu scurt, descriptiv. Apare ca antet și în meniul SEO. Ex: „Concertul Coralia 2026”.", required: true },
          { name: "Slug", note: "URL-ul articolului. Se generează automat din titlu — apasă „Generate” după ce scrii titlul.", required: true },
          { name: "Data evenimentului", note: "Data calendaristică la care a avut loc. Articolele se sortează după această dată.", required: true },
          { name: "An școlar", note: "Format 2025-2026. Filtrează articolele pe pagina /activitati.", required: false },
          { name: "Categorie", note: "Una din: Eveniment, Cultural, Erasmus+, Performanță, Educație, Spiritualitate.", required: true },
          { name: "Cover image", note: "Imagine reprezentativă. ALT TEXT-ul este obligatoriu (descrie ce e în poză).", required: true },
          { name: "Excerpt", note: "Rezumat 1-2 propoziții (160 caractere). Apare pe cărțile din pagina principală.", required: false },
          { name: "Conținut", note: "Textul articolului. Poți insera titluri, paragrafe, imagini, citate.", required: false },
          { name: "Galerie", note: "Multiple imagini afișate sub textul principal — fiecare cu ALT și legendă.", required: false },
        ]}
      />
      <Tip kind="ok">
        <strong className="text-navy">Sfat:</strong> Nu te grăbi. Apasă{" "}
        <Kbd>Save</Kbd> ca să salvezi un draft, lucrează în mai multe ședințe.
        Articolul nu se vede online până la <Kbd>Publish</Kbd>.
      </Tip>
    </section>
  );
}

function Anunturi() {
  return (
    <section>
      <SectionHeading
        id="anunturi"
        eyebrow="Pe scurt"
        title="Anunțuri (avizier electronic)"
        intro="Pentru ceva rapid și fără poze — de exemplu „Joi, cursurile încep la 09:00 din cauza inspecției ISJ”. Apar pe pagina principală în secțiunea de anunțuri."
        Icon={Pencil}
      />
      <FieldTable
        fields={[
          { name: "Titlu", note: "Anunțul în sine, scurt. Max 160 de caractere.", required: true },
          { name: "Slug", note: "Generat automat.", required: true },
          { name: "Data publicării", note: "Astăzi, în mod normal.", required: true },
          { name: "Fixat în top", note: "Bifează dacă vrei ca anunțul să rămână primul, peste altele mai noi.", required: false },
          { name: "Expiră la", note: "Data după care anunțul se ascunde automat. Util pentru anunțuri sezoniere.", required: false },
          { name: "Conținut", note: "Detaliile (opțional). Dacă scrii doar la „Titlu”, anunțul apare ca un singur rând.", required: false },
        ]}
      />
      <Tip>
        Folosește „Expiră la” — un avizier curat e mai citit decât unul plin
        de anunțuri vechi.
      </Tip>
    </section>
  );
}

function Admitere() {
  return (
    <section>
      <SectionHeading
        id="admitere"
        eyebrow="Anual"
        title="Sesiunea de admitere"
        intro="O dată pe an creezi un nou document „Admitere” pentru sesiunea care vine. Bifezi „Sesiune curentă” și site-ul afișează automat acel ciclu pe pagina /admitere."
        Icon={GraduationCap}
      />
      <Steps
        items={[
          "Studio → „Admitere” → „+ Create”.",
          "Completează „Anul școlar” (ex: 2027-2028), „Locuri disponibile”, „Specializare” (Teologie Pastorală).",
          "Bifează „Sesiune curentă”. Dacă ai mai multe documente (ex: 2026-2027 + 2027-2028), doar unul trebuie bifat.",
          "Completează „Calendar” (etape, date), „Metodologie” (text), atașează „Documente necesare” (PDF-uri).",
          "Publish. Pagina /admitere va arăta noua sesiune.",
        ]}
      />
      <Tip kind="warn">
        Sesiunile vechi nu se șterg — rămân ca arhivă. Doar debifează „Sesiune
        curentă” și creează una nouă cu „Sesiune curentă” bifat.
      </Tip>
    </section>
  );
}

function Rezultate() {
  return (
    <section>
      <SectionHeading
        id="rezultate"
        eyebrow="Periodic"
        title="Rezultate examene"
        intro="După BAC, Evaluare Națională sau Atestat, atașezi PDF-urile cu rezultatele. Documentele se afișează pe paginile corespunzătoare."
        Icon={ListChecks}
      />
      <Steps
        items={[
          "Studio → „Rezultate examene” → „+ Create”.",
          "Completează „Titlu” („Rezultate BAC 2026 — sesiunea iunie”), „Examen” (BAC / Evaluare Națională / Atestat).",
          "Atașează PDF-ul (vezi secțiunea „Documente PDF”).",
          "Completează „An școlar” și „Sesiune” (iunie / august).",
          "Publish.",
        ]}
      />
    </section>
  );
}

function Personal() {
  return (
    <section>
      <SectionHeading
        id="personal"
        eyebrow="Rar"
        title="Profesori și personal"
        intro="Pentru cadrele didactice noi, înlocuiri, plecări. Apar pe /profesori și — dacă au rol de Director — pe /director."
        Icon={ShieldCheck}
      />
      <FieldTable
        fields={[
          { name: "Nume", note: "Numele complet, cu titulatură (Pr., Prof., dr.).", required: true },
          { name: "Rol", note: "Funcția: Director, Profesor, Diacon, Secretar, etc.", required: true },
          { name: "Categorie", note: "Conducere / Didactic / Didactic-auxiliar / Nedidactic.", required: true },
          { name: "Disciplină", note: "Materia predată (pentru categoria „Didactic”). Ex: Liturgică, Latină.", required: false },
          { name: "Foto", note: "Portret 4:5 (1080×1350 ideal). Crop pe față, lumină difuză.", required: false },
          { name: "Ordine", note: "Număr — controlează ordinea pe pagină. Lasă gol și se sortează alfabetic.", required: false },
        ]}
      />
      <Tip>
        Pentru a marca un nou Director: setează „Rol” cu un text care începe
        cu „Director” (ex. „Director”, „Director adjunct”). Site-ul îl prinde
        automat pe pagina /director.
      </Tip>
    </section>
  );
}

function Pagini() {
  return (
    <section>
      <SectionHeading
        id="pagini"
        eyebrow="Flexibil"
        title="Pagini statice (URL liber)"
        intro="Când vrei o pagină nouă care nu se încadrează în categoriile de mai sus — de exemplu „Galeria foto absolvire 2026” sau „Calendar manifestări”."
        Icon={FileText}
      />
      <Steps
        items={[
          "Studio → „Pagini statice” → „+ Create”.",
          "Completează „Titlu” („Galerie absolvire 2026”).",
          "„Slug” se generează automat — sau modifică-l manual (ex: „galerie-absolvire-2026”). Pagina va fi accesibilă la /galerie-absolvire-2026.",
          "Scrie conținutul în câmpul „Conținut” (titluri, paragrafe, imagini, citate, embed-uri YouTube).",
          "Publish.",
        ]}
      />
      <Tip kind="warn">
        Nu folosi slug-uri care există deja ca rute fixe — ex. <em>contact</em>,{" "}
        <em>campus</em>, <em>admitere</em>, <em>director</em>. Site-ul le va
        ignora pentru că au paginile lor proprii.
      </Tip>
    </section>
  );
}

function Documente() {
  return (
    <section>
      <SectionHeading
        id="documente"
        eyebrow="Tehnic"
        title="Documente PDF"
        intro="Un PDF se încarcă o singură dată, apoi poate fi reutilizat oriunde (pe Admitere, Rezultate, în Activități, etc.). Asta evită încărcările duplicate."
        Icon={FileText}
      />
      <Steps
        items={[
          "Studio → „Documente (PDF)” → „+ Create”.",
          "„Titlu”: nume scurt și clar (ex. „Metodologie admitere 2026-2027”).",
          "Apasă „Choose file” și încarcă PDF-ul (max 50 MB).",
          "„Categorie”: Regulament / Metodologie / Anunț / Rezultate — ajută la filtrare.",
          "Publish. Acum poți face referință la acest PDF din alte documente (de ex. pe pagina de Admitere).",
        ]}
      />
      <Tip>
        Pentru viitor: vom face un import automat al celor 100+ Hotărâri CA în
        Studio, ca să poată fi editate / completate cu sumar. Până atunci, ele
        apar pe site direct din arhiva scrapată.
      </Tip>
    </section>
  );
}

function Imagini() {
  return (
    <section>
      <SectionHeading
        id="imagini"
        eyebrow="Foarte important"
        title="Imagini și ALT text"
        intro="Site-ul refuză imagini fără ALT — descrierea pe care o aud nevăzătorii când navigează. E o cerință legală și o regulă bună de accesibilitate."
        Icon={ImageIcon}
      />
      <Steps
        items={[
          "Click pe câmpul „Image”, apoi „Upload file”.",
          "După încărcare, apare o căsuță „Alt text” — obligatorie. Scrie ce se vede în imagine, nu cum se cheamă fișierul.",
          "Exemplu BUN: „Corul seminarului pe scena sălii de festivități, în timpul concertului de Crăciun 2025”.",
          "Exemplu RĂU: „IMG_0042.jpg” sau „cor”.",
          "Caption (legendă) e opțional — apare sub imagine. Util pentru fotografi / drepturi de autor.",
        ]}
      />
      <Tip kind="ok">
        Format ideal pentru web: <strong className="text-navy">JPEG</strong>,{" "}
        <strong className="text-navy">2400px</strong> pe latura lungă, mărime{" "}
        <strong className="text-navy">sub 2 MB</strong>. Sanity face automat
        versiunile mai mici pentru telefoane.
      </Tip>
      <Tip kind="warn">
        Nu încărca poze de la telefon nemodificate — sunt prea mari (10-20 MB).
        Folosește „Resize” pe telefon (sau Photos pe Mac) la 2400px max
        înainte să încarci.
      </Tip>
    </section>
  );
}

function Publicare() {
  return (
    <section>
      <SectionHeading
        id="publicare"
        eyebrow="Critic"
        title="Save vs. Publish: ce înseamnă fiecare"
        intro="Sanity are 2 stări pentru un document: draft (doar tu îl vezi) și published (tot mondul îl vede). Confuzia între ele e cea mai frecventă greșeală."
        Icon={CheckCircle2}
      />
      <div className="my-5 grid gap-4 sm:grid-cols-2">
        <Card className="border-navy/10 bg-paper">
          <CardContent className="space-y-3 p-6">
            <span className="inline-flex size-10 items-center justify-center rounded-xl bg-amber-50">
              <Pencil className="size-5 text-amber-700" strokeWidth={1.75} />
            </span>
            <p className="font-serif text-base font-semibold text-navy">Save (draft)</p>
            <p className="text-pretty text-sm text-ink/85">
              Modificările sunt salvate în Sanity, dar <strong className="text-navy">NU apar pe site</strong>.
              Util pentru lucru parțial — poți reveni mai târziu.
            </p>
            <p className="text-xs text-muted">
              Studio îți spune „Unpublished changes” în partea de jos.
            </p>
          </CardContent>
        </Card>
        <Card className="border-navy/10 bg-paper">
          <CardContent className="space-y-3 p-6">
            <span className="inline-flex size-10 items-center justify-center rounded-xl bg-emerald-50">
              <CheckCircle2 className="size-5 text-emerald-700" strokeWidth={1.75} />
            </span>
            <p className="font-serif text-base font-semibold text-navy">Publish</p>
            <p className="text-pretty text-sm text-ink/85">
              Modificările devin <strong className="text-navy">vizibile pe site</strong> în ~30 de secunde.
              Versiunea publicată e cea care apare la vizitatori.
            </p>
            <p className="text-xs text-muted">
              Studio confirmă cu un check verde lângă numele documentului.
            </p>
          </CardContent>
        </Card>
      </div>
      <Tip>
        Dacă ai apăsat „Save” dar uiți să apeși „Publish”, modificările tale
        nu se văd. Întotdeauna verifică „Published changes” în bara de jos
        înainte să închizi browser-ul.
      </Tip>
    </section>
  );
}

function CeNuPoti() {
  return (
    <section>
      <SectionHeading
        id="ce-nu-poti"
        eyebrow="Limită"
        title="Ce NU se editează în Studio"
        intro="Unele pagini au texte fixe (hardcoded) pentru că rar se schimbă. Dacă vrei să modifici aceste texte, contactează administratorul — o modificare durează 5 minute."
        Icon={XCircle}
      />
      <ul className="my-5 space-y-3">
        {[
          { route: "/", note: "Pagina principală — secțiunile statice (hero, „Welcome”, „Admissions CTA”)." },
          { route: "/campus, /campus/[slug]", note: "Cele 6 zone ale campusului (paraclis, săli, internat, etc.)." },
          { route: "/istoric, /misiune-si-viziune", note: "Texte instituționale care se schimbă rar." },
          { route: "/regulamente, /declaratie-accesibilitate", note: "Texte legale." },
          { route: "/tutorial (pagina asta)", note: "Documentația internă." },
        ].map((r) => (
          <li key={r.route} className="rounded-2xl border border-navy/10 bg-paper p-4">
            <span className="font-mono text-sm text-navy">{r.route}</span>
            <p className="mt-1 text-sm text-ink/80">{r.note}</p>
          </li>
        ))}
      </ul>
      <Tip>
        Modificările aici se fac de către dezvoltator. Trimite un mesaj cu ce
        vrei schimbat, primești o variantă demo pe un URL preview, după ce
        confirmi se publică pe site.
      </Tip>
    </section>
  );
}

function Greseli() {
  return (
    <section>
      <SectionHeading
        id="greseli"
        eyebrow="Atenție"
        title="Greșeli frecvente — și cum le eviți"
        intro="Toate cele de mai jos sunt erori făcute de echipa noastră în primele săptămâni. Trecere prin lista asta = 80% din probleme evitate."
        Icon={AlertTriangle}
      />
      <ul className="my-5 space-y-3">
        {[
          { error: "„Am scris articolul, dar nu apare pe site.”", fix: "Probabil ai salvat (Save), dar nu ai publicat (Publish). Întoarce-te în Studio, deschide documentul, apasă „Publish”." },
          { error: "„Imaginile mele sunt mari și încarcă greu.”", fix: "Înainte să încarci, redimensionează la 2400px lățime și salvează ca JPEG calitate 80%. Pe Mac: Preview → Tools → Adjust Size." },
          { error: "„Sanity îmi cere ALT și nu mă lasă să public.”", fix: "Toate imaginile au nevoie de ALT (descriere). Scrie ce se vede în poză — nu numele fișierului." },
          { error: "„Anunțul vechi apare în continuare.”", fix: "Setează un „Expiră la” pe anunțul vechi, sau șterge-l (Actions → Delete)." },
          { error: "„Am creat o pagină nouă la /contact, dar nu apare.”", fix: "/contact e o rută fixă în site. Folosește alt slug — sau modifică pagina fixă (vezi „Ce NU se editează”)." },
          { error: "„Mi-am pierdut documentul după ce am închis browser-ul.”", fix: "Verifică în lista „Drafts” — Sanity salvează automat draft-uri. Click pe „Drafts” în bara de sus." },
        ].map((g, i) => (
          <li key={i} className="rounded-2xl border border-navy/10 bg-paper p-5">
            <p className="font-semibold text-navy">{g.error}</p>
            <p className="mt-2 text-pretty text-sm text-ink/85">
              <strong className="text-emerald-700">Soluție:</strong> {g.fix}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Ajutor() {
  return (
    <section>
      <SectionHeading
        id="ajutor"
        eyebrow="Pas final"
        title="Când nu mai înțelegi: ce să faci"
        intro="Sanity Studio e robust și fără riscul de „a strica” site-ul — modificările tale sunt înregistrate și se pot reveni la versiuni anterioare. Dacă te-ai blocat, există o ieșire."
        Icon={LifeBuoy}
      />
      <Steps
        items={[
          "Verifică „History” în Studio — fiecare document păstrează toate versiunile sale. Poți reveni la oricare prin „Restore”.",
          "Citește din nou secțiunea relevantă din acest ghid (e accesibil oricând la /tutorial).",
          "Pune o întrebare scurtă pe e-mail: " + siteConfig.contact.email + ". Pe scurt: ce încerci să faci + ce mesaj de eroare ai primit.",
          "Pentru probleme tehnice mai mari (ex: Studio nu se încarcă deloc), contactează direct dezvoltatorul site-ului.",
        ]}
      />
      <div className="mt-8 rounded-3xl border border-navy/10 bg-gradient-to-br from-navy-deep to-navy-soft p-8 text-white">
        <p className="eyebrow !text-gold-light">Resurse oficiale Sanity</p>
        <p className="mt-2 font-serif text-xl font-semibold !text-white">
          Pentru cazuri avansate
        </p>
        <ul className="mt-5 space-y-3 text-sm text-white/85">
          <li>
            <a
              href="https://www.sanity.io/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gold-light hover:underline"
            >
              Documentația oficială Sanity
              <ArrowUpRight className="size-3.5" strokeWidth={2} />
            </a>
            <p className="text-xs text-white/65">(în engleză, dar are screenshot-uri clare)</p>
          </li>
          <li>
            <a
              href="https://www.sanity.io/help"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gold-light hover:underline"
            >
              Centrul de ajutor Sanity
              <ArrowUpRight className="size-3.5" strokeWidth={2} />
            </a>
          </li>
        </ul>
        <p className="mt-6 border-t border-white/10 pt-5 text-xs text-white/55">
          Acest tutorial a fost scris pe 25 iunie 2026 și se actualizează la
          fiecare schimbare majoră a schemei Studio.
        </p>
      </div>
    </section>
  );
}

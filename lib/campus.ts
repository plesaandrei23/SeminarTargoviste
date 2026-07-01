import {
  BookMarked,
  BedDouble,
  Church,
  GraduationCap,
  Inbox,
  Music2,
  type LucideIcon,
} from "lucide-react";

/**
 * Single source of truth for the campus zones. Powers the interactive
 * SVG map on the home page, the /campus overview grid, and the
 * /campus/[slug] detail pages. Keeping zone content here (rather than
 * Sanity) for the demo lets the seminary's team review the copy first;
 * later we can migrate to a `campusZone` schema if they want CMS edits.
 */

export type CampusZone = {
  slug: string;
  name: string;
  Icon: LucideIcon;
  /** Short tagline shown on cards and at the top of the detail page. */
  tagline: string;
  /** 2–3 sentence intro for the detail page. */
  intro: string;
  /** Bulleted highlights — each rendered as a CheckCircle-style item. */
  features: string[];
  /**
   * Optional override for the "Ce găsești aici" heading above the
   * features list. Some zones (paraclis) read better as
   * "Ce se desfășoară aici" — a program of activities rather than a
   * collection of things.
   */
  featuresHeading?: string;
  /** Practical info shown in the right rail of the detail page. */
  practical: { label: string; value: string }[];
  /**
   * Optional photo of the zone, served from /public/campus/. When present
   * it replaces the icon-only gradient header on the /campus card and
   * the detail page hero.
   */
  image?: { src: string; alt: string };
};

export const CAMPUS_ZONES: CampusZone[] = [
  {
    slug: "paraclis",
    name: "Paraclis",
    Icon: Church,
    tagline: "Inima duhovnicească a seminarului",
    intro:
      "Aici începe orice zi de seminar. Slujbele de dimineață și de seară, sărbătorile liturgice — toate au loc în paraclisul seminarului, sub îndrumarea duhovnicilor.",
    features: [
      "Slujbe zilnice — Sfânta Liturghie de dimineață și vecernia",
      "Sărbători liturgice — sfințirea anului școlar, Te Deum de Crăciun",
      "Spovedanie săptămânală cu părinții duhovnici",
      "Repetiții ale corului bărbătesc al seminarului",
    ],
    featuresHeading: "Ce se desfășoară aici",
    practical: [
      { label: "Acces", value: "Elevii și profesorii seminarului" },
      { label: "Slujbe", value: "Zilnic — 07:30 dimineața · 19:00 seara" },
      { label: "Duhovnic", value: "Pr. Ștefănel Cosmin Gheorghe" },
    ],
    image: {
      src: "/campus/paraclis.jpg",
      alt: "Slujbă în paraclisul seminarului, în fața iconostasului",
    },
  },
  {
    slug: "sali-de-clasa",
    name: "Săli de clasă",
    Icon: GraduationCap,
    tagline: "Unde se învață, se discută, se gândește",
    intro:
      "Săli moderne pentru disciplinele teologice și de cultură generală. Aici se țin orele de Religie, Limba Latină, Limbi străine, Matematică, Fizică, Istorie și Filosofie — la clase de maximum 28 de elevi.",
    features: [
      "16 săli active, configurate pentru clase de până la 28 elevi",
      "2 laboratoare TIC dotate cu calculatoare pentru orele de informatică",
      "Echipamente pentru proiecții, conferințe și ateliere practice",
      "Săli dedicate pentru cele patru ani de liceu (a IX-a – a XII-a)",
      "Mediu adaptat predării vocaționale și teoretice",
    ],
    practical: [
      { label: "Program", value: "Luni–Vineri · 08:00–14:30" },
      { label: "Discipline", value: "Religie · Latină · Limbi · Real · Uman" },
      { label: "Catedre", value: "15 discipline distincte" },
    ],
  },
  {
    slug: "internat",
    name: "Internat",
    Icon: BedDouble,
    tagline: "Cazare pentru elevii din afara orașului",
    intro:
      "Pentru elevii care vin din alte localități, internatul oferă camere supravegheate, trei mese pe zi în cantina seminarului și un program de studiu condus de pedagogi.",
    features: [
      "Camere cu 3–4 elevi, mobilate complet",
      "Trei mese pe zi în cantina proprie a seminarului",
      "Pedagogi și un duhovnic prezenți permanent în internat",
      "Ore de meditație și studiu seara, sub supraveghere",
    ],
    practical: [
      { label: "Capacitate", value: "Aproximativ 150 de locuri" },
      { label: "Tarif", value: "Stabilit anual prin hotărâre C.A." },
      { label: "Cereri", value: "Se depun odată cu dosarul de admitere" },
    ],
    image: {
      src: "/campus/internat.jpg",
      alt: "Clădirea internatului seminarului, văzută din curte",
    },
  },
  {
    slug: "secretariat",
    name: "Secretariat",
    Icon: Inbox,
    tagline: "Documente și administrație, într-un singur loc",
    intro:
      "Aici se depun dosarele de înscriere, se ridică foile matricole, se obțin adeverințele și se rezolvă orice problemă administrativă a elevilor și părinților.",
    features: [
      "Înscrieri la admitere și transferuri",
      "Adeverințe pentru burse, transport, bilete CFR",
      "Foi matricole, situații școlare, duplicate diplome",
      "Coordonare cu Inspectoratul Școlar Dâmbovița",
    ],
    practical: [
      { label: "Program", value: "Luni–Vineri · 08:00–16:00" },
      { label: "Telefon", value: "0245 614 505" },
      { label: "Email", value: "seminarul.tgv@scolidb.ro" },
    ],
    image: {
      src: "/campus/intrare.jpg",
      alt: "Intrarea principală a seminarului, cu firma „Seminarul Teologic Ortodox Sf. Ioan Gură de Aur”",
    },
  },
  {
    slug: "biblioteca",
    name: "Bibliotecă",
    Icon: BookMarked,
    tagline: "Fond de carte teologică și academică",
    intro:
      "Bibliotecă deschisă elevilor și cadrelor didactice, cu fond specializat în Teologie, Filosofie, Istorie, Literatură universală și manuale de specialitate.",
    features: [
      "Peste 10.000 de volume — fond teologic și general",
      "Spațiu de lectură și studiu individual",
      "Manuscrise și ediții vechi în colecția specială",
      "Acces gratuit pentru toți elevii seminarului",
    ],
    practical: [
      { label: "Program", value: "Luni–Vineri · 09:00–15:00" },
      { label: "Acces", value: "Elevii seminarului și cadrele didactice" },
      { label: "Împrumut", value: "Maximum 3 cărți simultan, 2 săptămâni" },
    ],
  },
  {
    slug: "sala-de-festivitati",
    name: "Sala de festivități",
    Icon: Music2,
    tagline: "Sală de festivități și sală de mese, într-un singur spațiu",
    intro:
      "Un spațiu cu dublu rol: în zilele obișnuite găzduiește mesele elevilor interni în cantina seminarului, iar la sărbători și evenimente se transformă în sală de festivități — pentru concerte de Crăciun, absolviri, sesiuni de comunicări științifice și întâlniri duhovnicești.",
    features: [
      "Capacitate de aproximativ 200 de locuri",
      "Trei mese pe zi pentru elevii interni — mic dejun, prânz, cină",
      "Scenă cu pian, sistem audio și proiector pentru evenimente",
      "Configurabilă pentru concerte, prelegeri și expoziții",
      "Găzduiește evenimentele Arhiepiscopiei Târgoviștei",
    ],
    practical: [
      { label: "Capacitate", value: "~200 de locuri" },
      { label: "Echipamente", value: "Pian · sistem audio · proiector" },
      { label: "Evenimente recente", value: "Festivitate sfârșit an · concert Coralia" },
    ],
    image: {
      src: "/campus/sala-de-festivitati.jpg",
      alt: "Corul seminarului pe scena sălii de festivități, în timpul unui concert",
    },
  },
];

export const CAMPUS_ZONES_BY_SLUG: Record<string, CampusZone> = Object.fromEntries(
  CAMPUS_ZONES.map((z) => [z.slug, z]),
);

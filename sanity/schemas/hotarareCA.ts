import { defineType, defineField } from "sanity";

/**
 * hotarareCA — a single Consiliul de Administrație decision.
 *
 * We import the 101 scraped hotărâri (2020-2026) via
 * scripts/import-hotarari-ca.mjs — that seeds every doc with `nr`, `date`,
 * `year`, `originalUrl` (the legacy zyrosite PDF). The `summary` field
 * starts empty and is filled in over time by the school's secretariat,
 * one entry at a time, so parents/staff can see what each decision was
 * about without opening the PDF.
 *
 * If a summary hasn't been added yet the front-end shows just "Hotărârea
 * nr. X · <date>" with a Download button, exactly like today.
 */
export const hotarareCA = defineType({
  name: "hotarareCA",
  title: "Hotărâre C.A.",
  type: "document",
  fields: [
    defineField({
      name: "nr",
      title: "Număr hotărâre",
      type: "number",
      description: "Numărul hotărârii, așa cum apare pe document.",
      validation: (r) => r.required().min(1).integer(),
    }),
    defineField({
      name: "date",
      title: "Data adoptării",
      type: "date",
      options: { dateFormat: "DD.MM.YYYY" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "year",
      title: "An calendaristic",
      type: "number",
      description: "Se calculează automat din data adoptării. Nu edita manual.",
      readOnly: true,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "summary",
      title: "Rezumat",
      type: "text",
      description:
        "1-2 propoziții despre ce s-a decis. Ex.: „Aprobarea graficului de vacanțe pentru semestrul II.” Poate rămâne gol dacă nu s-a completat încă.",
      rows: 3,
      validation: (r) => r.max(500),
    }),
    defineField({
      name: "originalUrl",
      title: "Link PDF (arhivă)",
      type: "url",
      description:
        "URL-ul PDF-ului pe assets.zyrosite.com (arhiva legacy). Pentru documente noi, folosește câmpul „PDF (upload nou)” de mai jos.",
    }),
    defineField({
      name: "pdf",
      title: "PDF (upload nou)",
      type: "file",
      options: { accept: ".pdf" },
      description:
        "Pentru hotărâri noi, încarcă direct PDF-ul aici. Are prioritate față de link-ul arhivei.",
    }),
  ],
  preview: {
    select: { nr: "nr", date: "date", summary: "summary" },
    prepare({ nr, date, summary }) {
      return {
        title: `Hotărârea nr. ${nr} / ${date}`,
        subtitle: summary || "— fără rezumat —",
      };
    },
  },
  orderings: [
    {
      title: "Cronologic · noi întâi",
      name: "byDateDesc",
      by: [
        { field: "date", direction: "desc" },
        { field: "nr", direction: "desc" },
      ],
    },
    {
      title: "Cronologic · vechi întâi",
      name: "byDateAsc",
      by: [
        { field: "date", direction: "asc" },
        { field: "nr", direction: "asc" },
      ],
    },
  ],
});

import { defineType, defineField } from "sanity";

/** admitere — Admission cycle (per academic year). */
export const admitere = defineType({
  name: "admitere",
  title: "Admitere — Sesiune",
  type: "document",
  fields: [
    defineField({
      name: "year",
      title: "An școlar",
      type: "string",
      description: "Format: 2026-2027",
      validation: (r) => r.required().regex(/^\d{4}-\d{4}$/, { name: "school-year" }),
    }),
    defineField({
      name: "specialization",
      title: "Specializare",
      type: "string",
      initialValue: "Teologie Pastorală",
    }),
    defineField({
      name: "availableSpots",
      title: "Locuri disponibile",
      type: "number",
      validation: (r) => r.positive().integer(),
    }),
    defineField({
      name: "session",
      title: "Sesiune",
      type: "string",
      description: "ex. mai 2026 / august 2026",
    }),
    defineField({
      name: "isCurrent",
      title: "Sesiunea curentă",
      type: "boolean",
      description: "Marchează sesiunea afișată ca primă pe /admitere.",
      initialValue: false,
    }),
    defineField({
      name: "calendar",
      title: "Calendar",
      type: "array",
      of: [
        {
          type: "object",
          name: "calendarItem",
          fields: [
            { name: "date", type: "date", title: "Data", validation: (r) => r.required() },
            { name: "label", type: "string", title: "Etapă", validation: (r) => r.required() },
            { name: "note", type: "string", title: "Observații" },
          ],
          preview: {
            select: { date: "date", label: "label" },
            prepare: ({ date, label }) => ({ title: label, subtitle: date }),
          },
        },
      ],
    }),
    defineField({
      name: "methodologyDocs",
      title: "Metodologie / acte necesare",
      type: "array",
      of: [{ type: "reference", to: [{ type: "documentFile" }] }],
    }),
    defineField({
      name: "body",
      title: "Detalii suplimentare",
      type: "array",
      of: [{ type: "block" }, { type: "localizedImage" }],
    }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: {
    select: { year: "year", spec: "specialization", current: "isCurrent" },
    prepare({ year, spec, current }) {
      return {
        title: `Admitere ${year}`,
        subtitle: `${spec ?? ""}${current ? " · curentă" : ""}`,
      };
    },
  },
});

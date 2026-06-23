import { defineType, defineField } from "sanity";

/** rezultate — Exam results (Evaluare Națională / Bacalaureat / Atestat). */
export const rezultate = defineType({
  name: "rezultate",
  title: "Rezultate examen",
  type: "document",
  fields: [
    defineField({
      name: "examType",
      title: "Tip examen",
      type: "string",
      options: {
        list: [
          { title: "Evaluare Națională", value: "evaluare-nationala" },
          { title: "Bacalaureat", value: "bacalaureat" },
          { title: "Atestat profesional", value: "atestat" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "year",
      title: "An",
      type: "number",
      validation: (r) => r.required().min(2000).max(2100),
    }),
    defineField({
      name: "session",
      title: "Sesiune",
      type: "string",
      description: "ex. iunie 2026, august 2026",
    }),
    defineField({
      name: "file",
      title: "Tabel rezultate (PDF)",
      type: "file",
      options: { accept: ".pdf" },
    }),
    defineField({
      name: "body",
      title: "Detalii / note explicative",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: {
    select: { type: "examType", year: "year", session: "session" },
    prepare: ({ type, year, session }) => ({
      title: `${type} ${year}`,
      subtitle: session,
    }),
  },
});

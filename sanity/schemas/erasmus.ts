import { defineType, defineField } from "sanity";

/** erasmus — Erasmus+ project / announcement. */
export const erasmus = defineType({
  name: "erasmus",
  title: "Erasmus+",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titlu",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "kind",
      title: "Tip",
      type: "string",
      options: {
        list: [
          { title: "Proiect", value: "project" },
          { title: "Mobilitate", value: "mobility" },
          { title: "Rezultate", value: "results" },
          { title: "Vizibilitate", value: "visibility" },
          { title: "Diseminare", value: "dissemination" },
          { title: "Anunț selecție", value: "selection" },
        ],
      },
    }),
    defineField({
      name: "projectNumber",
      title: "Număr proiect",
      type: "string",
      description: "ex. 2024-1-RO01-KA121-SCH-000203805",
    }),
    defineField({
      name: "year",
      title: "An",
      type: "number",
    }),
    defineField({
      name: "date",
      title: "Data",
      type: "date",
    }),
    defineField({
      name: "body",
      title: "Conținut",
      type: "array",
      of: [{ type: "block" }, { type: "localizedImage" }],
    }),
    defineField({
      name: "gallery",
      title: "Galerie",
      type: "array",
      of: [{ type: "localizedImage" }],
      options: { layout: "grid" },
    }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: {
    select: { title: "title", kind: "kind", year: "year" },
    prepare: ({ title, kind, year }) => ({
      title,
      subtitle: [kind, year].filter(Boolean).join(" · "),
    }),
  },
});

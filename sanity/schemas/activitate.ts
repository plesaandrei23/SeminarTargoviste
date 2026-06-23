import { defineType, defineField } from "sanity";

/**
 * activitate — Activity / news post.
 * Replaces the anchored entries on the old /activitati-YYYY-YYYY pages.
 */
export const activitate = defineType({
  name: "activitate",
  title: "Activitate",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titlu",
      type: "string",
      validation: (r) => r.required().min(5).max(160),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "date",
      title: "Data evenimentului",
      type: "date",
      options: { dateFormat: "DD.MM.YYYY" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "schoolYear",
      title: "An școlar",
      type: "string",
      description: "Format: 2025-2026",
      validation: (r) => r.regex(/^\d{4}-\d{4}$/, { name: "school-year" }),
    }),
    defineField({
      name: "category",
      title: "Categorie",
      type: "string",
      options: {
        list: [
          { title: "Eveniment", value: "eveniment" },
          { title: "Cultural", value: "cultural" },
          { title: "Erasmus+", value: "erasmus" },
          { title: "Performanță", value: "performanta" },
          { title: "Educație", value: "educatie" },
          { title: "Spiritualitate", value: "spiritualitate" },
          { title: "Concurs", value: "concurs" },
          { title: "Alta", value: "alta" },
        ],
        layout: "dropdown",
      },
    }),
    defineField({
      name: "excerpt",
      title: "Rezumat (afișat pe listing)",
      type: "text",
      rows: 3,
      validation: (r) => r.max(240),
    }),
    defineField({
      name: "coverImage",
      title: "Imagine principală",
      type: "localizedImage",
    }),
    defineField({
      name: "body",
      title: "Conținut",
      type: "array",
      of: [
        { type: "block" },
        { type: "localizedImage" },
        {
          type: "object",
          name: "callout",
          title: "Citat / evidențiere",
          fields: [
            { name: "text", type: "text", rows: 3, validation: (r) => r.required() },
            { name: "attribution", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "gallery",
      title: "Galerie foto",
      type: "array",
      of: [{ type: "localizedImage" }],
      options: { layout: "grid" },
    }),
    defineField({
      name: "legacySource",
      title: "Sursa originală (debugging)",
      type: "object",
      options: { collapsible: true, collapsed: true },
      description: "URL + anchor de pe vechiul site, pentru audit / redirects.",
      fields: [
        { name: "page", type: "string" },
        { name: "anchor", type: "string" },
      ],
    }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: {
    select: { title: "title", date: "date", media: "coverImage" },
    prepare({ title, date, media }) {
      return {
        title,
        subtitle: date,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Data, descrescător",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
    {
      title: "An școlar, descrescător",
      name: "schoolYearDesc",
      by: [{ field: "schoolYear", direction: "desc" }, { field: "date", direction: "desc" }],
    },
  ],
});

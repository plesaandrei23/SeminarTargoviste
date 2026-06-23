import { defineType, defineField } from "sanity";

/**
 * pagina — Generic static page (Istoric, Misiune, Regulamente, Tur virtual…).
 * Lets non-tech staff edit the rich-text body without us deploying code.
 */
export const pagina = defineType({
  name: "pagina",
  title: "Pagină",
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
      title: "URL slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
      description: "Ex. „istoric”, „misiune-si-viziune”, „regulamente”.",
    }),
    defineField({
      name: "section",
      title: "Secțiune",
      type: "string",
      options: {
        list: [
          { title: "Școala noastră", value: "scoala-noastra" },
          { title: "Elevi", value: "elevi" },
          { title: "Informații", value: "informatii" },
          { title: "Erasmus+", value: "erasmus" },
          { title: "Alta", value: "alta" },
        ],
      },
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
          name: "embed",
          title: "Embed (iframe)",
          fields: [
            { name: "url", type: "url", title: "URL embed (ex. tur virtual)" },
            { name: "title", type: "string", title: "Titlu (pt. accesibilitate)" },
          ],
        },
      ],
    }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: {
    select: { title: "title", slug: "slug.current" },
    prepare: ({ title, slug }) => ({ title, subtitle: `/${slug ?? ""}` }),
  },
});

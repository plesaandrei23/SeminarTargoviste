import { defineType, defineField } from "sanity";

/** document — uploaded PDF/file (regulamente, rezultate, metodologie, etc.). */
export const documentFile = defineType({
  name: "document",
  title: "Document (PDF)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titlu",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Categorie",
      type: "string",
      options: {
        list: [
          { title: "Regulamente", value: "regulamente" },
          { title: "Rezultate examene", value: "rezultate" },
          { title: "Metodologie admitere", value: "metodologie" },
          { title: "Erasmus+ documente", value: "erasmus" },
          { title: "Anunțuri", value: "anunturi" },
          { title: "Alta", value: "alta" },
        ],
      },
    }),
    defineField({
      name: "file",
      title: "Fișier",
      type: "file",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Data publicării",
      type: "date",
    }),
  ],
});

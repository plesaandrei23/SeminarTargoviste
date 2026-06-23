import { defineType, defineField } from "sanity";

/** personal — Staff member. Powers /personal + /conducerea-scolii. */
export const personal = defineType({
  name: "personal",
  title: "Personal",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nume",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "role",
      title: "Funcție",
      type: "string",
      description: "ex. Director, Profesor titular, Bibliotecar",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Categorie",
      type: "string",
      options: {
        list: [
          { title: "Conducere", value: "conducere" },
          { title: "Didactic", value: "didactic" },
          { title: "Didactic auxiliar", value: "didactic-auxiliar" },
          { title: "Nedidactic", value: "nedidactic" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "subject",
      title: "Disciplină / departament",
      type: "string",
      description: "ex. Teologie Dogmatică, Limba și literatura română",
    }),
    defineField({
      name: "photo",
      title: "Fotografie",
      type: "localizedImage",
    }),
    defineField({
      name: "email",
      title: "Email (opțional)",
      type: "string",
      validation: (r) => r.email(),
    }),
    defineField({
      name: "bio",
      title: "Biografie scurtă",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "order",
      title: "Ordine de afișare",
      type: "number",
      description: "Cifre mai mici apar primele.",
      initialValue: 100,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "photo" },
  },
  orderings: [
    {
      title: "Categorie + ordine",
      name: "categoryOrder",
      by: [
        { field: "category", direction: "asc" },
        { field: "order", direction: "asc" },
        { field: "name", direction: "asc" },
      ],
    },
  ],
});

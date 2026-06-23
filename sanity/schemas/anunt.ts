import { defineType, defineField } from "sanity";

/**
 * anunt — Announcement (merges /anunturi + /avizier from the old site).
 * Pinned items surface first; expiresAt auto-hides stale items.
 */
export const anunt = defineType({
  name: "anunt",
  title: "Anunț",
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
      title: "Data publicării",
      type: "date",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "pinned",
      title: "Fixat în top",
      type: "boolean",
      description: "Anunțurile fixate apar întotdeauna înaintea celor cronologice.",
      initialValue: false,
    }),
    defineField({
      name: "expiresAt",
      title: "Expiră la",
      type: "date",
      description: "După această dată anunțul nu mai apare pe site.",
    }),
    defineField({
      name: "body",
      title: "Conținut",
      type: "array",
      of: [{ type: "block" }, { type: "localizedImage" }],
    }),
    defineField({
      name: "attachments",
      title: "Documente atașate",
      type: "array",
      of: [{ type: "file", options: { accept: ".pdf,.doc,.docx,.xlsx" } }],
    }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: {
    select: { title: "title", date: "date", pinned: "pinned" },
    prepare({ title, date, pinned }) {
      return {
        title: pinned ? `[Fixat] ${title}` : title,
        subtitle: date,
      };
    },
  },
});

import { defineType, defineField } from "sanity";

/** Reusable SEO fields — embedded on every content type. */
export const seoFields = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "title",
      title: "Meta title",
      type: "string",
      description: "Overrides the document title in <title> + Open Graph.",
      validation: (r) => r.max(70).warning("Search engines may truncate over 70 chars."),
    }),
    defineField({
      name: "description",
      title: "Meta description",
      type: "text",
      rows: 3,
      validation: (r) =>
        r.max(160).warning("Search engines may truncate over 160 chars."),
    }),
    defineField({
      name: "ogImage",
      title: "Social share image",
      type: "image",
      options: { hotspot: true },
      description: "Recommended 1200×630, used for Facebook/Twitter previews.",
    }),
  ],
});

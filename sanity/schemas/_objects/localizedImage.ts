import { defineType, defineField } from "sanity";

/**
 * Image with required alt text. The current site's WCAG 2.1 AA gap is
 * 100% missing alt text — making it required at the schema level prevents
 * the same gap recurring.
 */
export const localizedImage = defineType({
  name: "localizedImage",
  title: "Image with alt text",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alt text (required)",
      type: "string",
      description:
        "Briefly describe what's in the image for screen readers. Required by WCAG 2.1 AA.",
      validation: (r) => r.required().error("Alt text is required."),
    }),
    defineField({
      name: "caption",
      title: "Caption (optional)",
      type: "string",
    }),
  ],
});

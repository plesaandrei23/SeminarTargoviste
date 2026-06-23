import { defineType, defineField } from "sanity";

/**
 * siteSettings — Singleton with everything that's not "page content":
 * contact, navigation labels, announcement bar, social links, footer text.
 */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Setări site",
  type: "document",
  // Singleton enforced by the structure builder in sanity.config.ts
  // (only one document with _id "siteSettings" is exposed in Studio).
  fields: [
    defineField({
      name: "schoolName",
      title: "Numele complet al școlii",
      type: "string",
      initialValue: 'Seminarul Teologic Ortodox „Sfântul Ioan Gură de Aur”',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "shortName",
      title: "Denumire scurtă",
      type: "string",
      initialValue: "Seminarul Teologic Târgoviște",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      initialValue: "De peste 30 de ani în slujba Bisericii și a Educației",
    }),
    defineField({
      name: "logo",
      title: "Siglă (color, fond transparent)",
      type: "image",
    }),
    defineField({
      name: "address",
      title: "Adresă",
      type: "object",
      fields: [
        { name: "street", type: "string", title: "Stradă" },
        { name: "city", type: "string", title: "Oraș" },
        { name: "postalCode", type: "string", title: "Cod poștal" },
      ],
    }),
    defineField({
      name: "contact",
      title: "Contact",
      type: "object",
      fields: [
        { name: "phone", type: "string" },
        { name: "email", type: "string", validation: (r) => r.email() },
        { name: "hours", type: "string", title: "Program" },
      ],
    }),
    defineField({
      name: "social",
      title: "Conturi sociale",
      type: "object",
      fields: [
        { name: "facebook", type: "url" },
        { name: "tiktok", type: "url" },
        { name: "instagram", type: "url" },
        { name: "youtube", type: "url" },
      ],
    }),
    defineField({
      name: "announcementBar",
      title: "Bandă anunț (sus, deasupra meniului)",
      type: "object",
      fields: [
        { name: "active", type: "boolean", title: "Activă?", initialValue: false },
        { name: "text", type: "string", title: "Text" },
        { name: "linkLabel", type: "string", title: "Etichetă link" },
        { name: "linkHref", type: "string", title: "URL link" },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Setări site" }),
  },
});

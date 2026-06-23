/**
 * Hand-written types for the GROQ queries in queries.ts. Until we add
 * `sanity-codegen` or `@sanity/codegen`, these stay in sync with the schemas
 * manually — keep this file the single source of truth for query shapes.
 */

export type SanityImageRef = {
  asset: {
    _id: string;
    url: string;
    metadata?: { dimensions?: { width: number; height: number } };
  } | null;
  alt: string;
  caption?: string;
};

export type Category =
  | "eveniment"
  | "cultural"
  | "erasmus"
  | "performanta"
  | "educatie"
  | "spiritualitate"
  | "concurs"
  | "alta";

export type ActivityCard = {
  _id: string;
  title: string;
  slug: string;
  date: string;
  category?: Category;
  schoolYear?: string;
  excerpt?: string;
  coverImage: SanityImageRef | null;
};

export type ActivityDetail = ActivityCard & {
  body: unknown[]; // Portable Text — typed in @portabletext/react
  gallery?: SanityImageRef[];
  seo?: { title?: string; description?: string };
  legacySource?: { page?: string; anchor?: string };
};

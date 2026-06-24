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

export type Pagina = {
  _id: string;
  title: string;
  slug: string;
  section?: string;
  body: unknown[];
  seo?: { title?: string; description?: string };
};

export type ActivityDetail = ActivityCard & {
  body: unknown[]; // Portable Text — typed in @portabletext/react
  gallery?: SanityImageRef[];
  seo?: { title?: string; description?: string };
  legacySource?: { page?: string; anchor?: string };
};

export type CalendarItem = {
  date: string;
  label: string;
  note?: string;
};

export type AdmissionCycle = {
  _id: string;
  year?: string;
  specialization?: string;
  availableSpots?: number;
  session?: string;
  isCurrent?: boolean;
  calendar?: CalendarItem[];
  body: unknown[];
  seo?: { title?: string; description?: string };
};

export type PersonalCategory =
  | "conducere"
  | "didactic"
  | "didactic-auxiliar"
  | "nedidactic";

export type Personal = {
  _id: string;
  name: string;
  role: string;
  category: PersonalCategory;
  subject?: string;
  order?: number;
  photo: SanityImageRef | null;
};

export type AnuntCard = {
  _id: string;
  title: string;
  slug: string;
  date: string;
  pinned: boolean;
  expiresAt?: string | null;
  hasBody: boolean;
  excerpt: string;
};

export type AnuntDetail = {
  _id: string;
  title: string;
  slug: string;
  date: string;
  pinned: boolean;
  expiresAt?: string | null;
  body: unknown[];
  attachments?: {
    asset?: { url: string; originalFilename?: string };
  }[];
  seo?: { title?: string; description?: string };
};

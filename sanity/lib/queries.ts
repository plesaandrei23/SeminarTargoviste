import { groq } from "next-sanity";

/**
 * Latest activities for the home page News card grid.
 * Pulls cover image with its alt text (validation requires alt on every image),
 * plus the fields the card design needs.
 */
export const latestActivitiesQuery = groq`
  *[_type == "activitate" && defined(slug.current)]
    | order(date desc, _createdAt desc) [0...6] {
      _id,
      title,
      "slug": slug.current,
      date,
      category,
      schoolYear,
      excerpt,
      coverImage {
        asset->{ _id, url, metadata { dimensions { width, height } } },
        alt
      }
    }
`;

/** Used on /activitati listing, with optional school-year filter. */
export const allActivitiesQuery = groq`
  *[_type == "activitate" && defined(slug.current)
    && (!defined($schoolYear) || schoolYear == $schoolYear)]
    | order(date desc, _createdAt desc) {
      _id,
      title,
      "slug": slug.current,
      date,
      category,
      schoolYear,
      excerpt,
      coverImage {
        asset->{ _id, url, metadata { dimensions { width, height } } },
        alt
      }
    }
`;

/** Distinct school years that have published activities — used to build filter chips. */
export const activityYearsQuery = groq`
  array::unique(*[_type == "activitate" && defined(schoolYear)].schoolYear) | order(@ desc)
`;

/** Slugs for generateStaticParams. */
export const activitySlugsQuery = groq`
  *[_type == "activitate" && defined(slug.current)].slug.current
`;

/**
 * All staff, sorted by category then by `order` (we set order = source-page
 * position during import so the seminary's own ordering is preserved).
 */
export const allPersonalQuery = groq`
  *[_type == "personal" && defined(name)] | order(
    select(
      category == "conducere"        => 0,
      category == "didactic"          => 1,
      category == "didactic-auxiliar" => 2,
      category == "nedidactic"        => 3,
      99
    ),
    order asc,
    name asc
  ) {
    _id,
    name,
    role,
    category,
    subject,
    order,
    photo {
      asset->{ _id, url, metadata { dimensions { width, height } } },
      alt
    }
  }
`;

/** The current director — the first conducere record whose role mentions Director. */
export const directorQuery = groq`
  *[_type == "personal" && category == "conducere" && role match "Director*"][0] {
    _id,
    name,
    role,
    category,
    subject,
    photo {
      asset->{ _id, url, metadata { dimensions { width, height } } },
      alt
    }
  }
`;

/** Featured staff for the home page Team section (first 4 by ordering). */
export const featuredPersonalQuery = groq`
  *[_type == "personal" && defined(name)] | order(
    select(
      category == "conducere"        => 0,
      category == "didactic"          => 1,
      category == "didactic-auxiliar" => 2,
      category == "nedidactic"        => 3,
      99
    ),
    order asc
  ) [0...4] {
    _id,
    name,
    role,
    category,
    subject,
    photo {
      asset->{ _id, url, metadata { dimensions { width, height } } },
      alt
    }
  }
`;

/**
 * Admission cycles, current first. The schema's `isCurrent` boolean lets
 * staff promote a session — if none are marked current we just sort by
 * year DESC so the most recent stays on top.
 */
export const admissionCyclesQuery = groq`
  *[_type == "admitere"] | order(isCurrent desc, year desc, _createdAt desc) {
    _id,
    year,
    specialization,
    availableSpots,
    session,
    isCurrent,
    calendar,
    "body": coalesce(body, [])[]{
      ...,
      _type == "localizedImage" => {
        asset->{ _id, url, metadata { dimensions { width, height } } },
        alt,
        caption
      }
    },
    seo
  }
`;

/**
 * Active anunturi (avizier). Pinned items first; expired ones (expiresAt < today)
 * are hidden. Used by /anunturi listing.
 */
export const activeAnunturiQuery = groq`
  *[_type == "anunt"
    && (!defined(expiresAt) || expiresAt >= $today)]
    | order(pinned desc, date desc, _createdAt desc) {
      _id,
      title,
      "slug": slug.current,
      date,
      pinned,
      expiresAt,
      "hasBody": defined(body) && length(body) > 0,
      "excerpt": coalesce(body[_type == "block"][0].children[0].text, "")
    }
`;

/** Single anunt for /anunturi/[slug]. */
export const anuntBySlugQuery = groq`
  *[_type == "anunt" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    date,
    pinned,
    expiresAt,
    "body": coalesce(body, [])[]{
      ...,
      _type == "localizedImage" => {
        asset->{ _id, url, metadata { dimensions { width, height } } },
        alt,
        caption
      }
    },
    attachments,
    seo
  }
`;

/** Slugs for /anunturi/[slug] generateStaticParams. */
export const anuntSlugsQuery = groq`
  *[_type == "anunt" && defined(slug.current)
    && (!defined(expiresAt) || expiresAt >= $today)].slug.current
`;

/**
 * Slugs of static pages we render via the catch-all /[slug] route. Used
 * by generateStaticParams + filtered against route paths that have
 * dedicated pages (those win over the catch-all anyway, but excluding
 * them here keeps the prerender list honest).
 */
export const paginaSlugsQuery = groq`
  *[_type == "pagina" && defined(slug.current)].slug.current
`;

/** Single static page rendered by /[slug]. */
export const paginaBySlugQuery = groq`
  *[_type == "pagina" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    section,
    "body": coalesce(body, [])[]{
      ...,
      _type == "localizedImage" => {
        asset->{ _id, url, metadata { dimensions { width, height } } },
        alt,
        caption
      }
    },
    seo
  }
`;

/** Single activity page. */
export const activityBySlugQuery = groq`
  *[_type == "activitate" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    date,
    category,
    schoolYear,
    excerpt,
    coverImage { asset->, alt },
    "body": coalesce(body, [])[]{
      ...,
      _type == "localizedImage" => {
        asset->{ _id, url, metadata { dimensions { width, height } } },
        alt,
        caption
      }
    },
    "gallery": coalesce(gallery, [])[]{
      asset->{ _id, url, metadata { dimensions { width, height } } },
      alt,
      caption
    },
    seo,
    legacySource
  }
`;

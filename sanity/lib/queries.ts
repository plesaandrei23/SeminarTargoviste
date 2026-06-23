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

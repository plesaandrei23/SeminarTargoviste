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

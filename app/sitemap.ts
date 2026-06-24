import type { MetadataRoute } from "next";
import { sanityClient } from "@/sanity/lib/client";
import {
  activitySlugsQuery,
  paginaSlugsQuery,
} from "@/sanity/lib/queries";
import { siteConfig } from "@/lib/site-config";

/**
 * sitemap.xml. Combines hand-built routes with whatever Sanity currently
 * serves (activities + static `pagina` records). Studio + API are
 * blocked in robots.ts so they're skipped here.
 */

const BASE = siteConfig.url;

const STATIC_ROUTES: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "", changeFrequency: "weekly", priority: 1.0 },
  { path: "/admitere", changeFrequency: "monthly", priority: 0.9 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  { path: "/campus", changeFrequency: "monthly", priority: 0.8 },
  { path: "/campus/paraclis", changeFrequency: "yearly", priority: 0.6 },
  { path: "/campus/sali-de-clasa", changeFrequency: "yearly", priority: 0.6 },
  { path: "/campus/internat", changeFrequency: "yearly", priority: 0.6 },
  { path: "/campus/secretariat", changeFrequency: "yearly", priority: 0.6 },
  { path: "/campus/biblioteca", changeFrequency: "yearly", priority: 0.6 },
  { path: "/campus/sala-de-festivitati", changeFrequency: "yearly", priority: 0.6 },
  { path: "/profesori", changeFrequency: "monthly", priority: 0.7 },
  { path: "/director", changeFrequency: "yearly", priority: 0.6 },
  { path: "/consiliul-de-administratie", changeFrequency: "monthly", priority: 0.6 },
  { path: "/activitati", changeFrequency: "weekly", priority: 0.8 },
  // Despre școală
  { path: "/istoric", changeFrequency: "yearly", priority: 0.5 },
  { path: "/misiune-si-viziune", changeFrequency: "yearly", priority: 0.5 },
  { path: "/regulamente", changeFrequency: "yearly", priority: 0.5 },
  { path: "/managementul-cazurilor-de-violenta", changeFrequency: "yearly", priority: 0.5 },
  { path: "/erasmus", changeFrequency: "monthly", priority: 0.5 },
  { path: "/mobilitate-cadre-didactice", changeFrequency: "monthly", priority: 0.4 },
  // Pentru elevi
  { path: "/orar", changeFrequency: "yearly", priority: 0.4 },
  { path: "/burse", changeFrequency: "yearly", priority: 0.5 },
  { path: "/bacalaureat", changeFrequency: "yearly", priority: 0.5 },
  { path: "/atestat-profesional", changeFrequency: "yearly", priority: 0.5 },
  { path: "/consiliul-elevilor", changeFrequency: "yearly", priority: 0.4 },
  // Legal
  { path: "/declaratie-accesibilitate", changeFrequency: "yearly", priority: 0.3 },
  { path: "/politica-confidentialitate", changeFrequency: "yearly", priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  let activitySlugs: string[] = [];
  let paginaSlugs: string[] = [];
  try {
    [activitySlugs, paginaSlugs] = await Promise.all([
      sanityClient.fetch<string[]>(activitySlugsQuery),
      sanityClient.fetch<string[]>(paginaSlugsQuery),
    ]);
  } catch (e) {
    console.error("sitemap: Sanity fetch failed, returning static-only", e);
  }

  // pagina slugs that already have dedicated routes shouldn't be listed twice
  const dedicated = new Set(STATIC_ROUTES.map((r) => r.path.replace(/^\//, "")));

  const dynamicEntries: MetadataRoute.Sitemap = [
    ...(activitySlugs ?? []).map((slug) => ({
      url: `${BASE}/activitati/${slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
    ...(paginaSlugs ?? [])
      .filter((slug) => !dedicated.has(slug))
      .map((slug) => ({
        url: `${BASE}/${slug}`,
        lastModified: now,
        changeFrequency: "yearly" as const,
        priority: 0.4,
      })),
  ];

  return [...staticEntries, ...dynamicEntries];
}

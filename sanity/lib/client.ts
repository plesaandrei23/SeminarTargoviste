import "server-only";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

/**
 * Server-only Sanity client.
 *
 * Reads `SANITY_API_TOKEN` from the environment when present (which it is in
 * .env.local and Vercel project settings). This makes the client work
 * regardless of whether the `production` dataset is public or private —
 * private is Sanity's default and easy to miss.
 *
 * Tradeoff: a token disables Sanity's edge CDN, so we rely on Next.js
 * fetch-level caching (set per-call via `next.revalidate`). For a low-traffic
 * institutional site that's plenty.
 *
 * If the dataset is ever set to public in the Sanity dashboard, dropping the
 * token here lets us re-enable `useCdn: true` for marginally faster reads.
 */
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  perspective: "published",
});

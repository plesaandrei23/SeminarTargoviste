import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  // Cache aggressively on Vercel — content updates trigger ISR via webhook.
  useCdn: true,
  perspective: "published",
});

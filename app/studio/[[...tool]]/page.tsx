/**
 * Sanity Studio mounted at /studio. Staff log in with their Sanity account
 * (invites managed in the Sanity dashboard).
 *
 * Only loads on this route — kept out of the public bundle by Next's route-
 * level code-splitting.
 */
"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

export const dynamic = "force-static";

export default function StudioPage() {
  return <NextStudio config={config} />;
}

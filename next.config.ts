import type { NextConfig } from "next";

/**
 * Old slugs from the legacy Zyro site that should permanently point at
 * the consolidated routes we built. Visitors (or stale Google results)
 * hitting these don't hit a stub page — they land where the content
 * actually lives now.
 *
 * Permanent: true so Google updates the index; statusCode 308 preserves
 * the request method on the redirect.
 */
const SLUG_REDIRECTS: { source: string; destination: string }[] = [
  // Staff pages → the consolidated /profesori grid
  { source: "/didactic", destination: "/profesori" },
  { source: "/didactic-auxiliar", destination: "/profesori" },
  { source: "/nedidactic", destination: "/profesori" },
  { source: "/conducerea-scolii", destination: "/profesori" },
  { source: "/director", destination: "/profesori" },
  { source: "/consiliul-de-administratie", destination: "/profesori" },
  { source: "/consiliul-profesoral", destination: "/profesori" },
  // Parent menu pages → home
  { source: "/elevi", destination: "/" },
  { source: "/informatii", destination: "/" },
  { source: "/scoala-noastra", destination: "/istoric" },
  // Tur virtual lived as a separate Zyro page; treat /campus as the home for it
  { source: "/tur-virtual", destination: "/campus" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "assets.zyrosite.com" },
      { protocol: "https", hostname: "seminarortodoxtargoviste.ro" },
      // Sanity-hosted images (assets uploaded via the import script + Studio)
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
  async redirects() {
    return SLUG_REDIRECTS.map((r) => ({
      source: r.source,
      destination: r.destination,
      permanent: true,
    }));
  },
};

export default nextConfig;

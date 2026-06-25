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
  // /director used to redirect to /profesori — now it's its own page
  { source: "/consiliul-profesoral", destination: "/profesori" },
  // Parent menu pages → home
  { source: "/elevi", destination: "/" },
  { source: "/informatii", destination: "/" },
  { source: "/scoala-noastra", destination: "/istoric" },
  // Tur virtual lived as a separate Zyro page; treat /campus as the home for it
  { source: "/tur-virtual", destination: "/campus" },
  // Capela was renamed to the Orthodox term Paraclis
  { source: "/campus/capela", destination: "/campus/paraclis" },
  // Legacy Erasmus sub-pages — everything consolidated on /erasmus
  { source: "/erasmusmobilitati", destination: "/erasmus" },
  { source: "/erasmusrezultate", destination: "/erasmus" },
  { source: "/erasmusvizibilitate", destination: "/erasmus" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  /**
   * Barrel-file packages that ship a re-export per module. Without this,
   * every lucide icon (or radix primitive) is bundled as a separate file
   * in dev — Turbopack compile of routes like /orar can hit 40s because of
   * it. With `optimizePackageImports`, Next rewrites bare imports to direct
   * deep paths so only the icons actually used get compiled. Dev-only win:
   * production builds already tree-shake.
   */
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "radix-ui",
      "@portabletext/react",
    ],
  },
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
  async headers() {
    // Conservative defaults applied site-wide. CSP is deliberately omitted
    // here because Sanity Studio + Google Maps embeds need a non-trivial
    // policy; a full CSP belongs in a follow-up once the embed surface is
    // pinned down. These headers cover the cheap wins.
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;

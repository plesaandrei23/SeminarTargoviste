import type { NextConfig } from "next";

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
};

export default nextConfig;

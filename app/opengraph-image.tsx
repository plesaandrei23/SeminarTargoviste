import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

/**
 * Default Open Graph image. Applied to every route that doesn't ship its
 * own `opengraph-image.tsx`. Rendered at request time by @vercel/og and
 * cached by Vercel — first share is ~200 ms, subsequent ones instant.
 */

// Default Node runtime — edge was hanging in dev with Turbopack; Node is
// fast enough for ~200 ms first-render and Vercel caches the result.
export const alt =
  "Seminarul Teologic Ortodox „Sf. Ioan Gură de Aur” · Târgoviște";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background:
            "radial-gradient(circle at 30% 20%, #1a3a5a 0%, #0b1f33 60%)",
          color: "white",
          fontFamily: "serif",
          padding: "80px",
          position: "relative",
        }}
      >
        {/* Gold tagline at top */}
        <div
          style={{
            position: "absolute",
            top: 64,
            left: 80,
            display: "flex",
            fontSize: 22,
            letterSpacing: 5,
            textTransform: "uppercase",
            color: "#e0c382",
            fontFamily: "sans-serif",
            fontWeight: 500,
          }}
        >
          Arhiepiscopia Târgoviștei
        </div>

        {/* Main title block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 32,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.7)",
              fontFamily: "sans-serif",
              fontWeight: 500,
            }}
          >
            Seminarul Teologic Ortodox
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 96,
              fontWeight: 600,
              color: "#e0c382",
              lineHeight: 1.05,
              marginTop: 16,
              fontStyle: "italic",
            }}
          >
            {`„${siteConfig.patron}”`}
          </div>
          {/* Divider */}
          <div
            style={{
              marginTop: 36,
              display: "flex",
              alignItems: "center",
              gap: 16,
              color: "rgba(200,160,78,0.6)",
            }}
          >
            <div style={{ height: 1, width: 80, background: "currentColor" }} />
            <div
              style={{
                width: 14,
                height: 14,
                background: "currentColor",
                transform: "rotate(45deg)",
              }}
            />
            <div style={{ height: 1, width: 80, background: "currentColor" }} />
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 36,
              color: "rgba(255,255,255,0.85)",
              fontFamily: "sans-serif",
              fontWeight: 500,
              marginTop: 20,
            }}
          >
            {`${siteConfig.city} · ${siteConfig.address.country}`}
          </div>
        </div>

        {/* Footer tagline */}
        <div
          style={{
            position: "absolute",
            bottom: 64,
            left: 80,
            right: 80,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontFamily: "sans-serif",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 22,
              color: "rgba(255,255,255,0.7)",
              maxWidth: 600,
            }}
          >
            {siteConfig.tagline}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 18,
              color: "rgba(200,160,78,0.85)",
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            seminarortodoxtargoviste.ro
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}

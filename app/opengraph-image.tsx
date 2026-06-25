import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

/**
 * Default Open Graph image. Applied to every route that doesn't ship its
 * own `opengraph-image.tsx`. Rendered at request time by @vercel/og and
 * cached by Vercel — first share is ~200 ms after fonts load, subsequent
 * ones instant.
 */

// Default Node runtime — edge was hanging in dev with Turbopack; Node is
// fast enough for ~200 ms first-render and Vercel caches the result.
export const alt = `Seminarul Teologic Ortodox „${siteConfig.patron}” · ${siteConfig.city}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Pull a single weight+style of a Google Font as the raw woff2 binary so
 * we can hand it to satori. Without this, @vercel/og falls back to its
 * default sans for everything — `fontFamily: "Cormorant Garamond"` and
 * `fontStyle: "italic"` would otherwise be ignored.
 */
async function loadGoogleFont(
  family: string,
  weight: number,
  style: "normal" | "italic",
): Promise<ArrayBuffer> {
  const styleAxis = style === "italic" ? 1 : 0;
  const cssUrl = `https://fonts.googleapis.com/css2?family=${family.replace(
    / /g,
    "+",
  )}:ital,wght@${styleAxis},${weight}&display=swap`;
  // The CSS endpoint serves different formats based on the User-Agent —
  // a modern browser UA gets woff2 (which satori can decode).
  const css = await fetch(cssUrl, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15",
    },
  }).then((r) => r.text());

  const match = css.match(/src:\s*url\((https:\/\/[^)]+\.woff2?)\)/);
  if (!match) throw new Error(`Couldn't extract font URL for ${family}`);
  return fetch(match[1]).then((r) => r.arrayBuffer());
}

export default async function Image() {
  // Fetch in parallel so the worst case is ~250ms, not 500ms.
  const [cormorantItalic, interMedium, interSemibold] = await Promise.all([
    loadGoogleFont("Cormorant Garamond", 600, "italic"),
    loadGoogleFont("Inter", 500, "normal"),
    loadGoogleFont("Inter", 600, "normal"),
  ]);

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
          fontFamily: "Inter",
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
              fontWeight: 500,
            }}
          >
            Seminarul Teologic Ortodox
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Cormorant Garamond",
              fontSize: 96,
              fontWeight: 600,
              fontStyle: "italic",
              color: "#e0c382",
              lineHeight: 1.05,
              marginTop: 16,
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
              fontWeight: 600,
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
    {
      ...size,
      fonts: [
        {
          name: "Cormorant Garamond",
          data: cormorantItalic,
          weight: 600,
          style: "italic",
        },
        { name: "Inter", data: interMedium, weight: 500, style: "normal" },
        { name: "Inter", data: interSemibold, weight: 600, style: "normal" },
      ],
    },
  );
}

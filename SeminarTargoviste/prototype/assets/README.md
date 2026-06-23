# Prototype assets

## Logo
Drop the school crest here as **`logo.png`** (this exact path: `prototype/assets/logo.png`).

- Preferred: **transparent background PNG**, at least ~512px on the long side.
- The nav and footer already point to `./assets/logo.png` and will use it automatically.
- If the file is missing, both fall back to the old site logo so nothing breaks.
- If the crest has a **white/opaque background**, tell Claude — a small badge/plate will be added so it looks clean on the dark hero.

## Note on the crest
The crest is detailed and contains its own banner text, which becomes illegible at small (nav/favicon) sizes. Recommended: a **two-tier logo system** — the full crest for large placements (hero, footer, about), and a simplified medallion/monogram + favicon for small placements. Claude can help derive the simplified mark.

## Hero zoom video (Google Earth Studio)
Drop the rendered clip here as **`hero-zoom.mp4`** (path: `prototype/assets/hero-zoom.mp4`).

How to produce it:
1. Open **Google Earth Studio** (free, browser-based) → new project.
2. Animate a camera path: start high over Europe/Romania, fast zoom down to the seminary at **Bd. Unirii 28, Târgoviște** (search the address).
3. Keep it short — **~2.5–3 seconds**. End framed close to the angle of the hero photo for a clean crossfade.
4. Render → export the image sequence → encode to MP4 (H.264), or export video directly. Compress for web (target < ~3–4 MB).
5. Save as `hero-zoom.mp4` here. Include Google's required attribution somewhere on the site.

Until the file exists, the hero shows a **simulated "from space" zoom** as a stand-in, then crossfades into the hero still. A `.webm` version alongside it is a nice-to-have for smaller size.


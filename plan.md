# Migration Plan — seminarortodoxtargoviste.ro

_Status as of 2026-06-23 · Owner: Andrei Plesa (project lead) + Claude_

Implementation of `docs/ARCHITECTURE.md` §5. This document tracks the *what* and *when* — the technical decisions live in ARCHITECTURE.md.

---

## Operating principle

**The live site at `seminarortodoxtargoviste.ro` is not touched.** All work happens on a Vercel preview URL and a staging domain until the client signs off on the final version. Cutover (DNS + redirects) only after written approval from the seminary.

```
seminarortodoxtargoviste.ro (Hostinger Website Builder)    ← LIVE, untouched
        │
        │  data flow only — scrape, never write
        ▼
preview deployments on Vercel    ← where we build & demo
        │
        │  promote on final approval
        ▼
seminarortodoxtargoviste.ro (Next.js on Vercel)    ← cutover step, last
```

---

## Phase 0 — Foundations ✅ Done

- [x] Next.js 16 + TypeScript + Tailwind v4 scaffolded at repo root.
- [x] Brand tokens (navy / gold / parchment), Cormorant Garamond + Inter via `next/font`.
- [x] shadcn/ui (Radix base, Nova preset) initialized; cobe globe in the hero.
- [x] Prototype recreated as React components (`/components/*`); home page assembles them.
- [x] Lighthouse 100/100/100/100 (a11y · best-practices · SEO · agentic-browsing).
- [x] `.gitignore` covers `node_modules`, `.next`, `.env*`, `.DS_Store`, secret patterns.

---

## Phase 1 — Inventory & scrape ✅ Done (with limits)

- [x] **Crawl inventory** — `scripts/scrape/crawl-inventory.mjs` produced `inventory.json` with 42 unique pages.
- [x] **Content extraction** — `scripts/scrape/extract-content.mjs` produced 45 CMS-neutral JSON records under `scripts/scrape/content/`:
  - 15 activity articles (8 from 2025-2026 + 7 from 2024-2025)
  - 2 admission cycles
  - 3 erasmus announcements
  - 25 standard pages

### ⚠️ Findings worth flagging to the client

- **The live homepage links to ~50 activities, but only 15 actually exist** on the per-year pages. The other 35 anchor links are dead (point to slugs that don't render). The migration is a chance to surface and clean this up.
- **All current images have empty `alt` text** — a hard accessibility gap (WCAG 2.1 AA fail). Re-hosting will be the moment to add proper alt.
- **Standard pages carry partner-archdiocese logos and nav fragments** inside the content area in Zyro's DOM. The current extracted markdown includes those; the CMS import script will strip them.

### What's still missing in Phase 1

- [ ] **Image re-hosting** — 473 unique `assets.zyrosite.com` URLs referenced. Need to download all of them locally and re-upload through the CMS pipeline (next phase).
- [ ] **Romarg & Hostinger admin pull** — Andrei mentioned holding credentials for both. Worth checking the Hostinger Website Builder's content DB for the missing 35 activities — they may exist in draft/archived state in the admin, not the public render. Same for Romarg if it hosted a previous CMS version.

---

## Phase 2 — CMS pick + schemas ⏳ Blocking decision

Open in `docs/ARCHITECTURE.md` §8. Until we pick, schema-specific code can't start.

| Criteria | **Sanity** (architecture's recommendation) | **Payload 3 + Supabase** |
|---|---|---|
| Editor UX for non-tech staff | Best-in-class | Good |
| Setup time | ~1 hour | ~4-6 hours |
| Ops to maintain | Zero (hosted) | Some (Supabase + Payload upgrade path) |
| Image pipeline | Built-in CDN with transforms | Requires Supabase Storage + an image CDN |
| Free tier | 2 users, 10k docs — fine for this site | Free up to Supabase limits |
| Data ownership | On Sanity's cloud | On your Supabase instance |
| Best fit if | Lowest-maintenance is the goal | Full self-ownership is mandatory |

**Recommended:** Sanity. Switch only if data ownership is a hard requirement for the seminary.

### Tasks once decided

- [ ] Spin up the CMS project + invite seminary staff at a non-admin role.
- [ ] Implement the schemas listed in ARCHITECTURE.md §3 (`activitate`, `anunt`, `admitere`, `rezultate`, `personal`, `erasmus`, `pagina`, `document`, `siteSettings`).
- [ ] Wire CMS-to-Next webhook for ISR revalidation (`/api/revalidate`).
- [ ] CMS Studio mounted at `/studio` if Sanity, or `/admin` if Payload — protected, staff-only.

---

## Phase 3 — Content migration (one-time import)

Depends on Phase 2 (schema must exist before import).

- [ ] **Image fetcher** — download all 473 referenced images from `assets.zyrosite.com` into `scripts/scrape/images/` with original filenames preserved.
- [ ] **Alt-text pass** — for each image, infer alt from surrounding article title (good enough as a baseline; staff can refine later in the CMS).
- [ ] **Import script** — read `scripts/scrape/content/**/*.json`, upload images to the CMS asset pipeline, create records via API. Markdown → Portable Text (Sanity) or Lexical (Payload) at this stage.
- [ ] **Redirect map** — generate `next.config.ts` `redirects()` for every old URL/anchor (e.g. `/activitati-2025-2026#festivitatea-...` → `/activitati/festivitatea-...`). Required to preserve search rankings + inbound links.
- [ ] **Spot check 20 random imported records** in the CMS Studio + on the rendered page.

---

## Phase 4 — Section build-out

Build the section templates that read from the CMS. UI components already exist for the home page; templates extend them.

- [ ] `/activitati` listing — filter by year + category, paginated.
- [ ] `/activitati/[slug]` article template — title, date, gallery, body, related.
- [ ] `/anunturi` (announcements + pinned avizier items, merged).
- [ ] `/admitere` — current cycle from CMS (spots, calendar, methodology, docs).
- [ ] `/elevi/{orar,burse,bacalaureat,atestat,consiliul-elevilor}` — CMS-backed pages or results tables.
- [ ] `/scoala-noastra/{istoric,misiune-si-viziune,regulamente}` — generic `pagina` template.
- [ ] `/conducerea-scolii/{director,consiliul-de-administratie,consiliul-profesoral}` — pulled from `personal`.
- [ ] `/personal/{didactic,mobilitate-cadre-didactice,didactic-auxiliar,nedidactic}` — same source, filtered.
- [ ] `/erasmus` + `/erasmus/[slug]` — projects + announcements.
- [ ] `/contact` — working form (Resend or similar) + map + hours. Current form is JS-only and likely dead.
- [ ] `/tur-virtual` — embed (presumably an existing 360° tour URL — check inventory).
- [ ] **Mega-menu in header** — the IA is deep; current hash-link nav won't scale once routes exist. shadcn `NavigationMenu` covers this.

---

## Phase 5 — Polish, QA, compliance

- [ ] **Component QA pass** — typography hierarchy, photography swap (current hero photo is provisional), microinteractions, focus states.
- [ ] **SEO** — structured data (`EducationalOrganization`, `Article`, `BreadcrumbList`), `sitemap.xml`, `robots.txt`, OG images, canonicals.
- [ ] **Performance budget** — green Core Web Vitals (LCP < 2.5s on 4G; CLS < 0.1; INP < 200ms). Audit each route.
- [ ] **Accessibility** — WCAG 2.1 AA across all templates. Plus the legal piece: a Romanian public institution under EU Directive 2016/2102 (Law 590/2021) needs a **„Declarație de accesibilitate”** in the footer.
- [ ] **GDPR / cookies** — privacy policy page, cookie consent banner if analytics sets cookies, contact-form consent checkbox.
- [ ] **Cross-device + cross-browser** — iPhone Safari, Android Chrome, desktop Chrome/Firefox/Safari, plus older Edge.
- [ ] **Language fallback** — RO primary; EN routing scaffolded behind a flag for Phase 6 if scope.

---

## Phase 6 — Launch (DNS cutover)

**Gated by client written approval.** Until then, the seminary's site stays exactly where it is.

- [ ] **Pre-flight**
  - [ ] Demo URL signed off by the seminary (Părintele Director + administrative lead).
  - [ ] Content migration spot-checked on real activities + admission cycle.
  - [ ] Redirects validated against a sample of inbound URLs (Google Search Console).
  - [ ] Editor training session with staff + handoff doc (`HANDOFF.md`).
- [ ] **Cutover** (estimated ~30 min window, low-traffic time slot)
  - [ ] Lower DNS TTL to 300s 24 hours ahead.
  - [ ] Update A/CNAME records at Hostinger (or wherever DNS lives) to point at Vercel.
  - [ ] Verify HTTPS cert provisioned on Vercel.
  - [ ] Smoke-test the top 20 inbound URLs from Search Console.
  - [ ] Bring TTL back up to 3600s.
- [ ] **Post-cutover**
  - [ ] 14-day watch on analytics + search rankings.
  - [ ] Keep the old Hostinger Website Builder subscription paid for 30 days as rollback.
  - [ ] Decommission Hostinger Website Builder once stable.

---

## Open items needing the client / Andrei

- **CMS choice** (Sanity vs Payload+Supabase) — gates Phase 2.
- **Brand assets** — vector logo source (current PNG is rasterized; the seminary likely has the original from the diocese).
- **High-res photography** — current photos are provisional. Hero photo placeholder needs a proper drone or interior shot.
- **Domain access** — confirm where DNS is managed (Hostinger or Romarg). Needed for cutover only.
- **English at launch?** — RO primary is the assumption; EN can be Phase 6 if needed for Erasmus+ audience.
- **Required institutional sections** — does the seminary need official sections we don't have yet? `Buget`, `Anti-bullying PO 6`, `Declarație de accesibilitate`. School inspectorate may require these.
- **Who maintains content** — affects training + CMS choice.

---

## Risk register

| Risk | Probability | Mitigation |
|---|---|---|
| Missing 35 activities never recoverable from Zyro admin | Med | Verify via Hostinger Website Builder admin; if truly gone, document and move on. |
| Image CDN URLs disappear when Hostinger sub is cancelled | High after cutover | Re-host *all* images in CMS before cutover (Phase 3). |
| Search ranking drop after cutover | Med | Comprehensive redirects + sitemap submission + 14-day watch. |
| Editor adoption fails (CMS too complex) | Low-Med if Sanity, Med if Payload | Pick Sanity unless data ownership mandates otherwise; do real training. |
| Legal/compliance gap on launch | Med | Add accessibility statement + GDPR cookies before cutover. |

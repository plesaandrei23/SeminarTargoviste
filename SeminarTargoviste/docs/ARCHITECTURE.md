# Seminarul Teologic Ortodox „Sfântul Ioan Gură de Aur" Târgoviște — Redesign Architecture & Tech Plan

_Last updated: 2026-06-20_

This document defines the architecture for rebuilding **seminarortodoxtargoviste.ro**. It is the technical reference for the redesign: stack, content model, URL mapping, migration, and delivery phases.

---

## 1. Context & goals

The current site runs on **Hostinger Website Builder (formerly Zyro)** — a no-code drag-and-drop builder. It has good content and a sensible information architecture, but the platform imposes hard limits:

- No CMS or database — every "article" is a hand-placed anchor (`#...`) inside one giant per-year page.
- The homepage dumps every activity card onto a single page (no feed/pagination).
- Duplicate content, broken/truncated page metadata, empty image `alt` text → SEO and accessibility gaps.
- No structured posting workflow or contributor roles.
- Vendor lock-in; no custom code.

### Goals for the rebuild

1. **Fast, accessible, SEO-correct** public website (Core Web Vitals green; WCAG 2.1 AA).
2. **Easy content posting** for non-technical staff (a real headless CMS with a friendly editor).
3. **Preserve** the information architecture, URL slugs (with redirects), existing content, and brand.
4. **Structured content** — real article pages and filterable listings instead of anchor-soup.
5. **Low cost + low maintenance** (a school budget; whoever maintains it may not be highly technical).
6. **Bilingual-ready** (Romanian primary; English optional, useful for the Erasmus+ audience).

---

## 2. Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js (App Router) + TypeScript** | SSG/ISR, image optimization, file-based routing, first-class Vercel support |
| Styling | **Tailwind CSS** (+ shadcn/ui for primitives) | Fast, consistent, accessible component base |
| CMS | **Headless CMS — Sanity (recommended)** | Best-in-class editor for non-tech staff, hosted (zero DB ops), free tier, excellent image CDN. _Alternative: Payload 3 + Supabase if we want to fully self-own the data — see §8._ |
| Hosting / CI | **Vercel** + GitHub | Free/Hobby tier is sufficient, preview deploys per PR, global CDN |
| Images | **next/image** + CMS image pipeline | Automatic responsive sizes, modern formats, lazy loading |
| Forms / email | Serverless route + **Resend** (or similar) | Working contact form (current one is JS-only and likely dead) |
| i18n | **next-intl** (Phase 2) | RO default, EN optional via `/en` routing + `hreflang` |
| Analytics | **Vercel Analytics** or **Plausible** | Privacy-friendly, GDPR-appropriate for an EU public institution |

### Rendering strategy

- **Static (SSG)** for stable pages (Istoric, Misiune, Contact, etc.).
- **ISR + on-demand revalidation** (webhook from the CMS) for news/announcements so new posts go live in seconds without a full rebuild.
- **Dynamic routes** for articles: `/activitati/[slug]`, `/anunturi/[slug]` — real, indexable, shareable pages.

---

## 3. Content model (CMS schemas)

The core transformation: turn the current per-year anchor pages into **structured, reusable content types**.

- **`activitate` (Activity / news post)** — title, slug, date, schoolYear, category/tags, coverImage, gallery[], body (rich text), excerpt, SEO fields. _Replaces the anchor entries on `/activitati-YYYY-YYYY`. Year pages become filtered listings._
- **`anunt` (Announcement)** — title, slug, date, body, attachments[] (PDF), pinned (bool), expiresAt. _Powers Anunțuri + Avizier._
- **`admitere` (Admission cycle)** — year, specializations, availableSpots, calendar/deadlines, methodology docs, body.
- **`rezultate` (Results)** — type (Evaluare Națională / Bacalaureat / Atestat), year, table or file, body.
- **`personal` (Staff member)** — name, role, category (didactic / auxiliar / nedidactic / conducere), subject, photo, order. _Powers Personal + Conducerea școlii._
- **`erasmus` (Erasmus+ project)** — projectNumber, year, mobilities, results, body, gallery.
- **`pagina` (Generic page)** — slug + rich text for static content (Istoric, Misiune, Regulamente) so staff can edit it.
- **`document` (Download)** — title, file (PDF), category. _Regulamente, results PDFs, Erasmus docs._
- **`siteSettings` (singleton)** — contact info, social links, logo, navigation, announcement bar.

All content types carry **SEO fields** (meta title/description, OG image) and **alt text on every image** (fixes current accessibility/SEO gaps).

---

## 4. Information architecture — old → new

Preserve the existing taxonomy and slugs; convert anchor pages to listings + article routes.

| Current | New | Notes |
|---|---|---|
| `/` (one giant feed) | `/` | Curated homepage: hero, latest news (paginated), admissions CTA, quick links |
| `/activitati-2022-2023 … 2025-2026` (anchors) | `/activitati` + `/activitati/[slug]` | Listing with **year + category filters**; each item a real page |
| `/anunturi`, `/avizier` | `/anunturi` (+ pinned) | Merge announcement streams; pinned items surface first |
| `/admitere` | `/admitere` | Current cycle pulled from CMS (spots, calendar, docs) |
| `/elevi` → evaluare, bacalaureat, atestat, consiliul-elevilor, orar, burse | keep slugs | CMS-backed pages/results |
| `/scoala-noastra` → istoric, misiune-si-viziune, regulamente | keep slugs | CMS `pagina` + `document` |
| `/conducerea-scolii` → director, consiliul-de-administratie, consiliul-profesoral | keep slugs | From `personal` |
| `/personal` → didactic, mobilitate-cadre-didactice, didactic-auxiliar, nedidactic | keep slugs | From `personal` |
| `/erasmus` (+ rezultate, vizibilitate, mobilitati) | `/erasmus` + `/erasmus/[slug]` | From `erasmus` |
| `/informatii` → tur-virtual, managementul-cazurilor-de-violenta | keep slugs | `avizier` merges into `/anunturi` (row above); keep tur virtual embed |
| `/contact` | `/contact` | Working form + map + hours |

**Redirects:** map any changed URL and every old article anchor (`/activitati-2025-2026#slug` → `/activitati/[slug]`) via `next.config` redirects to preserve inbound links and search rankings.

---

## 5. Migration plan

1. **Inventory & export** — crawl all ~30 pages; extract text content and download every image from the Zyro CDN into structured JSON.
2. **Transform** — map exported content to CMS schemas (one-time migration script via Sanity CLI / import API).
3. **Media** — re-host images in the CMS image pipeline; add alt text during import.
4. **Redirects** — generate the old→new URL/anchor map.
5. **QA** — link-check, metadata, Lighthouse (perf/SEO/a11y), cross-browser + mobile.

---

## 6. Design, UX & components

- **Component set:** header with mega-menu (the IA is deep), announcement bar, hero, news grid (filter + pagination), article template (gallery + lightbox), staff cards, downloads/documents list, admissions timeline, results tables, contact (form + map), footer (social + Archdiocese link).
- **Brand:** keep the existing logo and Archdiocese of Târgoviște affiliation; ecclesial palette (deep blue / gold / burgundy — confirm with client); diacritics-safe Romanian typography; tagline _„30 de ani în slujba Bisericii și a Educației"_.
- **Mobile-first** — most parents/students browse on phones.
- **Accessibility (public institution):** WCAG 2.1 AA, semantic HTML, keyboard navigation, visible focus, alt text, sufficient contrast.

---

## 7. SEO, performance & compliance

- Correct per-page metadata (fixes current truncation/encoding bug), Open Graph images, canonical URLs.
- Structured data (JSON-LD): `EducationalOrganization`, `Article`, `BreadcrumbList`.
- `sitemap.xml`, `robots.txt`, `hreflang` (if EN ships).
- Performance budget: green Core Web Vitals via `next/image`, font optimization, minimal JS.
- **GDPR / EU:** privacy policy, cookie consent (if analytics set cookies), form consent.
- **Accessibility statement** — Romanian public institutions fall under EU Directive 2016/2102 (Law 590/2021); include a „Declarație de accesibilitate".

---

## 8. Open decision — CMS choice

The stack is set except the specific CMS. Both are headless with friendly editors:

- **Sanity (recommended)** — hosted, free tier, fastest to set up, best editor UX, superb image CDN, **zero infrastructure to maintain**. Trade-off: content lives on Sanity's cloud.
- **Payload 3 + Supabase** — open-source, runs inside the Next.js app, data in **your** Supabase Postgres + Storage. Fully self-owned. Trade-off: more setup and ops responsibility.

Recommendation: **Sanity**, because lowest maintenance matters most for this client. Switch to Payload+Supabase only if data ownership/self-hosting is a hard requirement.

---

## 9. Phases & milestones

1. **Foundation** — repo scaffold (Next.js + TS + Tailwind), CI/CD to Vercel, design tokens/brand, base layout + nav.
2. **CMS + core templates** — content schemas, embedded Studio, listing/article/page templates, components.
3. **Content migration** — scripted export/import, media re-hosting, redirects.
4. **Section build-out** — news/activities, admissions, students, staff, Erasmus, info, working contact form.
5. **Polish & QA** — SEO, accessibility, performance, cross-device testing.
6. **Launch** — DNS cutover from Hostinger, redirects live, analytics, editor training + handoff docs.

_(Sequenced by dependency, not fixed dates — we'll attach a timeline once we confirm the launch target and who's contributing.)_

---

## 10. Open items / inputs needed from the client

- Confirm CMS choice (§8).
- Brand assets: logo source files, color palette, high-res photography.
- Domain/DNS access (currently Hostinger) for launch cutover.
- Who maintains content long-term (affects training + CMS).
- Is English required at launch, or Phase 2?
- Any required official documents/sections (e.g., transparency/„Buget", PO 6 anti-bullying, accessibility statement).

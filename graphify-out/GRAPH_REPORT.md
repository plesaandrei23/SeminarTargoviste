# Graph Report - /tmp/graphify-src-scope  (2026-06-23)

## Corpus Check
- Corpus is ~13,622 words - fits in a single context window. You may not need a graph.

## Summary
- 174 nodes · 264 edges · 12 communities (10 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Home page composition|Home page composition]]
- [[_COMMUNITY_Sanity content schemas|Sanity content schemas]]
- [[_COMMUNITY_Sanity import script|Sanity import script]]
- [[_COMMUNITY_Content extractor|Content extractor]]
- [[_COMMUNITY_Image downloader|Image downloader]]
- [[_COMMUNITY_Site inventory crawler|Site inventory crawler]]
- [[_COMMUNITY_shadcnui primitives|shadcn/ui primitives]]
- [[_COMMUNITY_Sanity client + Studio|Sanity client + Studio]]
- [[_COMMUNITY_Footer component|Footer component]]
- [[_COMMUNITY_App layout (fonts, metadata)|App layout (fonts, metadata)]]
- [[_COMMUNITY_Studio route layout|Studio route layout]]
- [[_COMMUNITY_Next.js config|Next.js config]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 18 edges
2. `crawl()` - 8 edges
3. `Reveal()` - 8 edges
4. `processPage()` - 6 edges
5. `markdownToPortableText()` - 5 edges
6. `uploadImage()` - 5 edges
7. `docId()` - 5 edges
8. `importActivity()` - 5 edges
9. `importErasmus()` - 5 edges
10. `siteConfig` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Hero()` --calls--> `cn()`  [EXTRACTED]
  components/Hero.tsx → lib/utils.ts
- `Header()` --calls--> `cn()`  [EXTRACTED]
  components/Header.tsx → lib/utils.ts
- `Reveal()` --calls--> `cn()`  [EXTRACTED]
  components/Reveal.tsx → lib/utils.ts
- `SheetOverlay()` --calls--> `cn()`  [EXTRACTED]
  components/ui/sheet.tsx → lib/utils.ts
- `SheetContent()` --calls--> `cn()`  [EXTRACTED]
  components/ui/sheet.tsx → lib/utils.ts

## Communities (12 total, 2 thin omitted)

### Community 0 - "Home page composition"
Cohesion: 0.1
Nodes (23): AdmissionsCTA(), pills, CampusMap(), Zone, ZoneId, ZONES, Header(), nav (+15 more)

### Community 1 - "Sanity content schemas"
Cohesion: 0.12
Nodes (12): localizedImage, seoFields, activitate, admitere, anunt, documentFile, erasmus, schemaTypes (+4 more)

### Community 2 - "Sanity import script"
Cohesion: 0.16
Nodes (18): args, client, CONTENT_DIR, dir, __dirname, docId(), handlers, IMAGES_DIR (+10 more)

### Community 3 - "Content extractor"
Cohesion: 0.17
Nodes (13): ANCHORED_PAGES, __dirname, extractImages(), extractTextBlock(), fetchHtml(), inventory, OUT, processPage() (+5 more)

### Community 4 - "Image downloader"
Cohesion: 0.15
Nodes (14): CONTENT_DIR, data, __dirname, download(), entries, localFilename(), name, originalUrl() (+6 more)

### Community 5 - "Site inventory crawler"
Cohesion: 0.2
Nodes (14): anchors, crawl(), __dirname, extractAnchorSlugs(), extractLinks(), fetchHtml(), metaContent(), OUT_DIR (+6 more)

### Community 6 - "shadcn/ui primitives"
Cohesion: 0.23
Nodes (9): cn(), Button(), buttonVariants, SheetContent(), SheetDescription(), SheetFooter(), SheetHeader(), SheetOverlay() (+1 more)

### Community 7 - "Sanity client + Studio"
Cohesion: 0.26
Nodes (4): sanityClient, builder, dataset, projectId

### Community 8 - "Footer component"
Cohesion: 0.22
Nodes (3): Footer(), nav, studentLinks

### Community 9 - "App layout (fonts, metadata)"
Cohesion: 0.4
Nodes (3): cormorant, inter, metadata

## Knowledge Gaps
- **53 isolated node(s):** `__dirname`, `OUT`, `RAW`, `inventory`, `ANCHORED_PAGES` (+48 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `shadcn/ui primitives` to `Home page composition`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Why does `Reveal()` connect `Home page composition` to `shadcn/ui primitives`?**
  _High betweenness centrality (0.008) - this node is a cross-community bridge._
- **Why does `siteConfig` connect `Home page composition` to `Footer component`?**
  _High betweenness centrality (0.003) - this node is a cross-community bridge._
- **What connects `__dirname`, `OUT`, `RAW` to the rest of the system?**
  _53 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Home page composition` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `Sanity content schemas` be split into smaller, more focused modules?**
  _Cohesion score 0.12 - nodes in this community are weakly interconnected._
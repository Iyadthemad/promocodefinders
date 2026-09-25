# SEO and conversion audit — September 25, 2026

## Scope

Audited private repository `Iyadthemad/promocodefinders` from commit `489df076f576850d4b1f58e6d8d245e1d4553a9b`. Baseline: 14 indexable static pages plus a 404, no build validation or CI. No Search Console export, production field-performance data or merchant redemption evidence was supplied.

Existing strengths retained: static HTML, Temu eligibility guidance, canonical tags, qualified affiliate links, sitemap, local assets and deferred JavaScript.

## Findings and changes

| Finding | Implementation | Files |
| --- | --- | --- |
| Shopping Guides opened only Temu | Retailer-neutral hub, category directory and two distinct comparison articles | `shopping-guides/index.html`, `categories/index.html`, `categories/home-organization/index.html`, `categories/beauty/index.html` |
| Olive Young used monthly metadata and unclear verification status | Evergreen metadata, unverified status, unknown terms and rejection checklist | `olive-young-promo-code/index.html`, `index.html`, `promo-codes/index.html`, `best-olive-young-products/index.html` |
| Product cards duplicated on coupon and buying pages | Consolidated product comparisons in buying guide; coupon page focuses on status/redemption | Olive Young code and product pages |
| Repetitive directory title | Distinct title/description aligned with intent | `promo-codes/index.html` |
| Missing/inconsistent schema | Organization, WebSite, WebPage/CollectionPage and visible matching BreadcrumbList; no unsupported commercial/rating claims | All indexable HTML |
| Flat/inconsistent hierarchy | Logical directory, retailer and guide/category parents with reciprocal links | All HTML navigation and related content |
| 404 declared itself canonical | Removed canonical; retained noindex and recovery links | `404.html` |
| No explicit slash redirect map | Slashless-to-directory 301 rules; all original routes preserved | `_redirects` |
| Crawler files lacked checks | Sitemap exactly covers 19 indexable pages; robots points to it; no invented lastmod | `sitemap.xml`, `robots.txt` |
| Clipboard success always named Temu | Retailer-specific copy feedback and manual-copy fallback | `assets/app.js`, code-bearing pages |
| Mobile navigation required JavaScript | Visible baseline menu with progressive enhancement | `assets/app.js`, `assets/styles.css` |
| Long content hard to scan | Static section navigation, related links and buying tables | Article pages and stylesheet |
| Missing image dimensions | Reserved 42×42 logo space; retained small assets and system fonts | All HTML |
| Public contact setup placeholder | Owner-supplied email and correction instructions | `contact/index.html` |
| No repeatable checks | Dependency-free build, crawl validation, asset budgets, CI | `package.json`, `scripts/`, `.github/workflows/validate.yml`, `.gitignore` |

HTML/assets/crawler paths above are under `promocodefinders-seo-updated/`; tooling is at repository root. `editorial-policy/index.html` is also new, explaining evidence and affiliate practices. README files document the actual publish directory.

## Architecture

Home → Promo Codes → retailer → redemption/eligibility guides.

Home → Shopping Guides → Categories → Home Organization / Beauty → relevant retailer and code pages.

Contextual cross-links add topical depth without forcing a long click path. All indexable pages are reachable within two links of home. Category content includes storage measurements, format comparisons and explicitly hypothetical unit-cost examples, not fabricated offers or hands-on reviews.

## Offer evidence

ALE832781, ALI240834, ALI015848 (Temu) and USEME123 (Olive Young) were existing repository listings. No documented successful redemption or merchant terms were supplied. All remain **not independently verified**. No discount amount, expiry, success rate, universal eligibility or current-stock claim was added. Existing affiliate URLs were preserved. Retaining a code does not verify its legitimacy or availability; merchant/owner evidence remains necessary for stronger claims.

## Validation

- Source and production output passed: 23 HTML documents, 22 indexable pages, 861 internal anchors, maximum two clicks from home.
- Checked unique titles/descriptions, canonicals/OG, JSON-LD, breadcrumbs, local files/fragments, image dimensions, qualified affiliate links, code/retailer pairs, exact sitemap coverage and noindex 404.
- CSS 15,752 bytes; JavaScript 2,234 bytes before compression. These are size checks, not Core Web Vitals measurements.
- Chromium checked all 22 pages at 320, 390 and 1440 pixels: no horizontal page overflow, broken images or JavaScript errors.
- Passed mobile menu/Escape, Olive Young clipboard success, clipboard-denied fallback, no-JavaScript mobile navigation, local 404 status and slash redirect.
- Desktop guide and mobile offer screenshots visually inspected.

## Deployment and next steps

1. Review/merge the branch and use the documented publish settings. Check homepage, new guides/categories, sitemap, robots and an unknown URL on the deployed host.
2. Confirm slashless and index.html variants resolve without loops; verify HTTPS/apex, www, pages.dev and preview-host behavior. Hosting settings were not changed.
3. Check actual affiliate destinations and collect merchant terms or checkout evidence before claiming any active offer. Do not advance dates just to imply freshness.
4. Submit the sitemap in Search Console and inspect indexed canonicals. Markup does not guarantee indexing or rich results.
5. Measure mobile Lighthouse and field Core Web Vitals on production; local layout/size checks do not establish real-user speed.
6. Establish outbound-click, code-copy and guide-to-retailer conversion baselines using consent-appropriate measurement. Compare these and search CTR over time before adjusting CTAs. No new tracking was installed.
7. Add categories only when distinct shopper value and supporting evidence exist; consolidate overlap rather than creating near-duplicate code/location pages.

## Primary references

- [Google useful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Google canonicalization](https://developers.google.com/search/docs/crawling-indexing/canonicalization)
- [Google sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)
- [Cloudflare Pages serving](https://developers.cloudflare.com/pages/configuration/serving-pages/)
- [Cloudflare Pages redirects](https://developers.cloudflare.com/pages/configuration/redirects/)

Indexing, ranking and conversion gains must be assessed after deployment.

## Owner-supplied products added during this update

Nine exact Temu destinations are stored in `data/products.json` and rendered by `scripts/generate-products.mjs` into three new indexable category pages:

- `/categories/automotive/`: multi-camera dash cam, front-seat cover pair, wireless car display, jump starter/inflator.
- `/categories/smart-home/`: solar deck lights, local-monitor doorbell, robot vacuum/mop, rechargeable motion lights.
- `/categories/home-entertainment/`: compact rotating projector with a room/resolution/input buying guide.

The homepage, shopping hub, category hub and Temu guide link to these collections. Product sections have stable fragment IDs instead of nine thin standalone pages. Retailer links are marked sponsored/nofollow and preserve the supplied destinations.

Web retrieval and browser navigation could not access the merchant pages, so no live price, currency, product image, stock or feature claim was verified. Supplied price strings and raw descriptions are preserved privately in the repository data outside the published directory. Public cards use price-check CTAs, explicit verification status and concrete comparison questions. Ambiguous claims such as PUPU, 150PSL, 10000A, universal vehicle compatibility and supported-versus-native 4K were not converted into factual product specifications.

The build additionally checks all nine exact product links and section IDs and ensures unverified reference prices are not included in public category HTML. The final site has 22 indexable pages rather than the earlier 19-page draft.

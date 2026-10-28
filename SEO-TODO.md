# SEO-TODO.md — PromoCodeFinder expansion

Shipped to feature branch `seo-expansion`: **28 October 2026**. **Not published** until the PR is merged and the production deployment is confirmed.

## Keyword-to-URL map (one primary keyword per indexable page)

| Primary keyword / search intent | Proposed URL | Change | Date shipped to branch |
|---|---|---|---|
| temu promo code first order | /temu-first-order-promo-code/ | New first-order eligibility guide | 2026-10-28 |
| temu discount codes uk | /temu-coupon-code-uk/ | UK-specific guide with GBP, VAT and postcode checks | 2026-10-28 |
| temu coupon code usa | /temu-coupon-code-usa/ | US-specific guide with USD, ZIP codes and sales tax checks | 2026-10-28 |
| temu coupon code canada; australia; ireland; new zealand; south africa; uae; philippines; malaysia; singapore | /temu-coupon-countries/ | **Merged** nine markets into a genuinely useful regional comparison; no speculative doorway pages | 2026-10-28 |
| how to apply a temu promo code in the app | /how-to-use-temu-promo-codes/ | Improved existing activation guide | 2026-10-28 |
| temu coupon not working causes and fixes | /temu-promo-code-not-working/ | Expanded existing troubleshooting guide | 2026-10-28 |
| olive young global coupon code and first order discount | /olive-young-promo-code/ | Updated USEME123 and welcome eligibility | 2026-10-28 |
| olive young global free shipping minimum | /olive-young-global-free-shipping/ | New guide using retailer-published shipping data | 2026-10-28 |
| olive young best sellers by skin type | /olive-young-skin-type-guide/ | New selection framework, **not** an invented best-seller ranking | 2026-10-28 |
| temu coupon codes | /temu-coupon-codes/ | Expanded Temu hub and internal links | 2026-10-28 |
| temu manual coupon checks | /temu-coupon-tracker/ | Manual dates recorded separately from discount proof | 2026-10-28 |

## Verification and non-doorway rules

- **Re-check all offers and update the date manually every 7 days.** Select 7-day cadence (from the 7/14-day option); record evidence and the actual date in HTML, JSON and sitemap only after a real manual check.
- Do not infer that publisher review proves successful checkout savings. Track account eligibility, offer value, country, and actual result separately.
- Never use automated build dates, cron, CI time or scripts to refresh a coupon's date. The GitHub workflow is a read-only verification helper.
- Country-specific delivery fees, timelines, payment methods and return exceptions were not fully verified in every market; refer readers to their own checkout instead of inventing values.
- Retain the single regional guide until local research can justify separate unique country pages with independently sourced facts.
- No hreflang applied: the country guides are distinct local information, not translated or matched regional-variant equivalents.
- FAQPage markup describes real visible questions, but Google generally restricts FAQ rich results to well-known authoritative health or government websites. Do not forecast FAQ snippets.
- A sitemap `lastmod` records a meaningful content change, not necessarily code redemption. Visible `Last checked` is reserved for manually reviewed offers.

## Deployment and Search Console checklist

- [ ] Review and merge the PR into `main` only when ready.
- [ ] Confirm deployment serves the **`promocodefinders-seo-updated/`** directory, not a stale/other output. Check the homepage and all new routes via the production domain.
- [ ] Test the site on iPhone Safari and Android Chrome, especially wide comparison tables and copy buttons.
- [ ] Re-run the read-only SEO validator and inspect any legacy warnings.
- [ ] Open Google Search Console > Sitemaps and submit `https://promocodefinders.com/sitemap.xml`.
- [ ] Request indexing of the new first-order, UK, US, regional, Olive Young shipping and skin-type guide URLs (after confirming live HTTP 200 and correct canonicals).
- [ ] Monitor impressions, indexing and query coverage by page; do not expect an immediate index or ranking.
- [ ] **2 weeks — 11 November 2026:** inspect URL indexing, impressions and crawl errors.
- [ ] **4 weeks — 25 November 2026:** compare search queries, CTR, internal navigation and cannibalization.
- [ ] **8 weeks — 23 December 2026:** review sustained rankings and prune/merge weak or overlapping content rather than scaling thin pages.

## Input still needed

- For each Temu country: verified delivery times, shipping fees, accepted payment methods, return-specific exceptions, and screenshots or links from accounts set to that destination. Only then consider individual country pages.
- For current Temu discounts: redemption results, caps, eligible customer definitions and exact promotional regions. No offer has been guaranteed.
- Confirm whether the Olive Young USEME123 code actually delivered a percentage reduction; only the publisher-provided code is currently stated.
- Confirm the Cloudflare/GitHub Pages deployment configuration. Repo contains `wrangler.jsonc` pointing to the static subdirectory; live deployment was not independently verified here.

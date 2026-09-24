# PromoCodeFinder static website — promocodefinders.com

A fast static affiliate/content website for GitHub + Cloudflare Pages. No WordPress plan or server is required.

## Production domain
**https://promocodefinders.com**

## Included pages
- Home
- Promo Codes directory
- Temu Coupon Codes (ALE832781, ALI240834, ALI015848)
- Best Temu Finds / product categories
- Olive Young Promo Code (USEME123)
- Olive Young Product Finds with MEDIHEAL, UNOVE, Primera and Anua links
- About
- Affiliate Disclosure
- Privacy Policy
- Contact

## Temu outbound links configured
- Primary offer CTA: https://temu.to/k/po38azlpgx9
- Product / shopping CTA: https://temu.to/k/pmzbnlwumc4

All affiliate/outbound retailer links use `rel="sponsored nofollow noopener noreferrer"`.

## Deploy on Cloudflare Pages
1. Upload the contents of this folder to a GitHub repository.
2. Cloudflare Dashboard → Workers & Pages → Create application → Pages.
3. Import the GitHub repository.
4. Production branch: `main`.
5. Framework preset: None.
6. Build command: leave blank or use `exit 0`.
7. Build output directory: `.`
8. Deploy.
9. Pages project → Custom domains → add `promocodefinders.com`.

## After deployment
- Confirm https://promocodefinders.com/sitemap.xml loads.
- Confirm https://promocodefinders.com/robots.txt loads.
- Test every external CTA.
- Add the domain property to Google Search Console.
- Submit `https://promocodefinders.com/sitemap.xml`.
- Request indexing for the homepage, Temu page, Olive Young page, promo-code directory, and product guides.

## Editing
Everything is plain HTML/CSS/JS. Edit files directly on GitHub; Cloudflare Pages will redeploy after each commit.

## Important content note
Update offer wording and dates only when you have checked the campaign information. Do not label a code as guaranteed or verified unless you have evidence for that claim.

## September 24, 2026 content update
Added /temu-ale832781/, /how-to-use-temu-promo-codes/, /temu-new-vs-existing-users/ and /temu-promo-code-not-working/. Expanded the existing shopping guide instead of creating shallow category pages. All original affiliate URLs and code values are retained.

Offer status is explicitly unverified; editorial review dates do not represent successful redemption. Structured data uses WebPage and BreadcrumbList without unsupported Product, Offer, rating or FAQ rich-result claims. The sitemap includes all 14 indexable pages; lastmod is omitted to avoid inventing substantive review dates for untouched content.

Unversioned assets now use a one-hour revalidation policy instead of a year-long immutable cache. After deploying, purge an existing cached CSS/JS response if needed.

No Search Console export was available. Later, compare query/page impressions, clicks, CTR and position to tune titles and guide coverage. Do not auto-roll dates or invent offer validation.

Upload this folder's contents at the existing static site's publish root. This archive is a standalone static site; it is not a verified checkout of the connected GitHub repository. No remote commit or deployment was performed.

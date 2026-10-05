# PromoCodeFinder static website — promocodefinders.com

A fast static affiliate/content website for GitHub + Cloudflare Pages. No WordPress plan or server is required.

## Production domain
**https://promocodefinders.com**

## Included pages
- Home
- Promo Codes directory
- Temu Coupon Codes (ALE832781, ALI240834, ALI015848)
- Temu Coupon Tracker with recorded manual check dates
- Coupon verification methodology
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

## Daily coupon verification workflow
After you manually check the Temu coupon(s), go to GitHub → Actions → **Mark coupons checked today** → **Run workflow**. Tick the confirmation box, choose `all` or a specific code, and run it. The workflow writes the real UTC check date to `data/coupons.json`, refreshes the visible tracker dates, updates relevant `dateModified` values, and refreshes sitemap `lastmod` entries. It intentionally does not change dates on a timer without a recorded manual check.

## Important content note
Update offer wording and dates only when you have checked the campaign information. Do not label a code as guaranteed or verified unless you have evidence for that claim.

## October 5, 2026 verification update
Added /temu-coupon-tracker/ and /how-we-verify-coupons/. The Temu hub and ALE832781 page now show recorded publisher check dates with explicit account/region caveats. Coupon status lives in a central JSON data source and is surfaced across the tracker and related pages.

Verification dates are not rolled forward automatically on a schedule. A date changes only after the publisher confirms a real manual check through the GitHub Actions workflow. Structured data remains limited to supported WebPage/BreadcrumbList markup, and affiliate links retain `rel="sponsored nofollow noopener noreferrer"`.

The sitemap now includes the tracker and verification methodology and uses truthful `lastmod` dates only for materially changed or newly verified pages.

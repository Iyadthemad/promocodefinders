# PromoCodeFinder

Dependency-free static site for https://promocodefinders.com. Website source stays in `promocodefinders-seo-updated/` so existing deployments using that directory continue to work.

## Build and validate

Use Node.js 22 or later. No package installation is required.

```sh
npm test
npm run build
npm run preview
```

The build validates source and output and copies public files to `dist/`. Preview runs at http://127.0.0.1:4173. HTML remains directly editable. GitHub Actions runs the same build on pushes and pull requests.

## Cloudflare Pages

- Root directory: repository root (leave blank).
- Framework preset: None.
- Build command: `npm run build`.
- Output directory: `dist`.
- Node version: 22 or later.

An existing no-build deployment can continue publishing `promocodefinders-seo-updated` directly. Do not publish the whole repository root, which has no homepage. Hosting settings are not changed by this commit.

Pages normalizes directory `index.html` URLs. `_redirects` adds explicit slashless-to-directory redirects matching canonical URLs. Root `404.html` prevents the default SPA fallback. Local preview tests file routing, not production edge behavior.

Verify HTTPS/apex redirects, the production `pages.dev` alias, and preview `X-Robots-Tag` behavior in the hosting account. Do not redirect unknown URLs to the homepage. See [Pages serving](https://developers.cloudflare.com/pages/configuration/serving-pages/) and [build settings](https://developers.cloudflare.com/pages/configuration/build-configuration/).

## Content maintenance

- Align canonical/OG URLs, visible breadcrumbs, JSON-LD and sitemap entries.
- Link new pages from a relevant guide/category and back to retailer guidance.
- Existing codes and affiliate destinations are retained as unverified listings. No successful redemption evidence was available.
- Record merchant terms or redemption evidence, date, country and account/basket restrictions before making stronger claims. Never invent discount amounts, expiry dates, success rates, reviews or ratings.
- Editorial dates are not redemption dates. Sitemap lastmod is omitted rather than generated from the build date.
- Owner-supplied contact: `jessegovi99@gmail.com`.
- Review performance and privacy implications before adding tracking or widgets.

See [the audit and launch checklist](docs/SEO-AUDIT.md).

## Adding products

Edit `data/products.json` and run `npm run build`. The generator writes static automotive, smart-home and home-entertainment category pages, then refreshes sitemap and slash redirects. Commit both the product records and generated HTML so existing no-build deployments remain compatible. Other pages remain hand-edited HTML.

Each record holds an ID, category, exact retailer URL, supplied description, reference price, verification status and useful shopper checks. Reference prices and raw promotional descriptions are editorial data outside the public folder, not live offers. The current records intentionally have unknown currency and unverified status. Do not publish those prices or change status without merchant evidence and an accompanying template/validation review.

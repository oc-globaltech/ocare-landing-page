# OCare Landing Page

Static marketing site for OCare — school communication & well-being platform.
Single-file `index.html` (no build step), deployed to Cloudflare Pages.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Full landing page (HTML + inline CSS + tiny JS) |
| `_headers` | Cloudflare Pages security + cache headers |
| `_redirects` | URL redirects |
| `robots.txt` / `sitemap.xml` | SEO |
| `wrangler.toml` | Cloudflare project config |
| `package.json` | `dev` / `deploy` scripts via Wrangler |

## Local dev

```bash
npm install
npm run dev          # http://localhost:4321
```

`wrangler pages dev` serves the directory and applies `_headers` / `_redirects` exactly like production.

Or just open `index.html` in a browser — no build step required.

## Deploy to Cloudflare Pages

### One-time setup

1. Cloudflare account → **Workers & Pages** → **Create** → **Pages** → **Direct Upload**.
2. Project name: `ocare-landing` (matches `wrangler.toml` and `package.json`).
3. Authenticate Wrangler locally:
   ```bash
   npx wrangler login
   ```

### Deploy production

```bash
npm run deploy
```

Pushes the current directory to the `main` branch of the Pages project. Cloudflare gives you a `*.pages.dev` URL immediately; map a custom domain (`ocare.io`) in the Cloudflare dashboard under **Pages → Custom domains**.

### Deploy preview

```bash
npm run deploy:preview
```

### Git-based deploy (alternative)

Connect the GitHub repo in the Cloudflare dashboard:
- **Build command:** _(leave empty)_
- **Build output directory:** `ocare-app`
- **Root directory:** repository root

Every push to `main` then auto-deploys. PRs get preview URLs.

## Custom domain

After first deploy:
1. Pages → `ocare-landing` → **Custom domains** → **Set up a custom domain**.
2. Add `ocare.io` (and `www.ocare.io`).
3. Cloudflare auto-provisions SSL.
4. Update `<link rel="canonical">`, `og:url`, and `sitemap.xml` if using a different domain.

## Editing

The page is intentionally a single file. To update copy / colors / sections, edit `index.html`. Brand palette is locked to 6 colors via CSS custom properties at the top of the file:

```
#743C00  --deep-700   primary dark / text
#FF8800  --teal-500   primary accent
#EF9A4A  --teal-400   secondary accent
#FFD658  --cyan-300   highlight / glow
#FDE3A6  --bg-2       soft tint / surfaces
#F8F8F8  --bg         base background
```

## Hooks for forms

Demo / contact CTAs currently use `mailto:` links. To swap to a form provider (Formspree, Cloudflare Workers, Pages Functions), replace the `href="mailto:..."` on `.btn-light` and `Contact sales` in the final CTA section.

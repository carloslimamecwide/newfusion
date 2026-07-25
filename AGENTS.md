<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# WebFusionLab Design System

## Brand
- **Primary navy:** `--color-navy: oklch(0.26 0.12 280)` / `#1a1a4a`
- **Accent blue:** `--color-accent: oklch(0.62 0.22 255)` / `#1e6ff5`
- **Logo files:** `public/brand/logo-full.webp`, `logo-mark.webp`, `.png` variants
- All logos include white "WebFusionLab" text — use `logo-mark.webp` for icon-only contexts

## Typography
- **Display:** Bricolage Grotesque (`font-brand`) — headings, hero text, nav brand
- **Body:** Source Sans 3 (`font-sans`) — paragraphs, UI, form labels
- Scale uses `--space-step` ratio (1.2×) for consistent rhythm
- **DO NOT use DM Sans** — removed from project

## Design Tokens (OKLCH)
- Backgrounds: `--bg`, `--bg-muted`, `--bg-subtle`
- Text: `--fg`, `--fg-muted`, `--fg-subtle`
- Borders: `--border`, `--border-muted`
- Radius: `--radius-sm/md/lg`
- Shadows: `--shadow-sm/md/lg`

## Icons
- `src/components/Icon.tsx` — SVG line icons (no emoji)
- Available: `Code`, `Design`, `Strategy`, `Megaphone`, `Gauge`, `Shield`, `Chat`, `Arrow`, `Check`, `ExternalLink`, `Clock`, `Lightbulb`, `Target`, `Star`, `Phone`, `Calendar`

## Images
- All images are **local** in `public/images/` (hero/, services/, work/, about/)
- Services use `ImageService` type with `image` and `imageAlt` fields
- Portfolio uses local `image` paths in portfolio content
- **NEVER use remote Unsplash URLs** — all images are curated local assets

## Components
- `Section.tsx` — layout wrapper with `--section-y` rhythm, asymmetric heading support
- `Header.tsx` — real logo via `next/image`, brand tokens, mobile menu
- `Footer.tsx` — real logo, social links, brand tokens
- `ContactForm.tsx` — brand focus states, Resend integration
- `Icon.tsx` — SVG icon set

## i18n
- `next-intl` with PT (default) and EN
- Messages in `messages/pt.json` and `messages/en.json`
- Use `useTranslations('namespace')` in components

## Content
- Services defined in `src/content/services.ts` — 7 services with slugs, images, includes, process steps
- Portfolio defined in `src/content/portfolio.ts` — 3 case studies with challenge/solution/result/stack
- `src/lib/site.ts` — URL helpers (Calendly, WhatsApp, site)

## Deployment
- **GitHub Actions** builds Docker image → pushes to GHCR (`ghcr.io/carloslimamecwide/webfusionlab`)
- **VPS** only pulls the image via `docker compose pull` — never builds locally
- `.github/workflows/build.yml` — CI/CD pipeline
- `docker-compose.production.yml` — VPS compose config
- `Dockerfile` — multi-stage build (deps → builder → runner)

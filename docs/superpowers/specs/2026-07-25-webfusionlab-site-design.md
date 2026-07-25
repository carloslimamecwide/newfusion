# WebFusionLab — Site institucional v1

**Date:** 2026-07-25  
**Status:** Approved  
**Domain:** webfusionlab.pt (PT + EN)

## Goals
- Leads: form (Resend) + WhatsApp + Calendly
- SEO: multi-page + service detail pages
- Credibility: 2–3 portfolio cases
- Audience: PME/local + mid-market B2B, international

## Approach
Next.js 16 App Router, Tailwind 4, next-intl, content in TS files (no CMS), Docker deploy to `/srv/apps/webfusionlab` behind shared nginx proxy.

## Routes
- `/` → `/pt`
- `/pt`, `/en` — Home
- `/pt/servicos`, `/en/services` — service list
- `/pt/servicos/[slug]`, `/en/services/[slug]` — service detail
- `/pt/portfolio`, `/en/portfolio`
- `/pt/sobre`, `/en/about`
- `/pt/contacto`, `/en/contact`

## Services (7)
sites-landing-pages, web-applications, ecommerce, mobile-apps, integrations-apis, maintenance-support, consulting-ux

## Visual
Light corporate: white/off-white, trust blue, clean sans, subtle motion.

## Out of scope v1
CMS, blog, SQL, client portal, dark mode default.

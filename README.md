<div align="center">

# Specialist Group

**Licensed Workforce Solutions from Uzbekistan to the World**

A production, enterprise-grade website and management platform for a
government-licensed international labour-migration & recruitment agency based in
Tashkent, Uzbekistan.

Next.js 15 · TypeScript · Tailwind · Prisma/PostgreSQL · NextAuth · next-intl (7 languages)

</div>

---

## ✨ Overview

Specialist Group recruits, trains and legally deploys pre-screened workers from
Uzbekistan to international employers. This platform is built to convince foreign
employers that the agency is trustworthy, licensed and professional — and to
convert visitors into qualified inquiries.

It includes a polished public marketing site, an end-to-end employer-request
pipeline (database + email + tracking), an authenticated **admin dashboard** and
an **employer portal**, full internationalization, SEO and accessibility.

## 🧱 Tech stack

| Area | Choice |
| --- | --- |
| Framework | Next.js 15 (App Router, RSC, Server Actions) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS + shadcn-style component library |
| Animation | Framer Motion (reduced-motion aware) |
| Database | PostgreSQL via Prisma ORM |
| Auth | NextAuth v5 (credentials + JWT, bcrypt) |
| i18n | next-intl — EN, RU, UZ, KO, DE, JA, AR (RTL) |
| Forms | React Hook Form + Zod |
| Email | Nodemailer (branded HTML templates) |
| Icons | Lucide React · Flags: country-flag-icons |
| Testing | Vitest (unit) + Playwright (E2E) |
| Quality | ESLint + Prettier |
| Deploy | Vercel |

## 🚀 Getting started

```bash
# 1. Install dependencies
pnpm install

# 2. Configure environment
cp .env.example .env        # then fill in DATABASE_URL, AUTH_SECRET, SMTP…

# 3. Set up the database
pnpm prisma:migrate         # creates tables
pnpm db:seed                # admin user + demo data

# 4. Run
pnpm dev                    # http://localhost:3000
```

### Seed credentials (change in production)

| Role | Email | Password |
| --- | --- | --- |
| Admin | `admin@specialistgroup.uz` | `ChangeMe!2026` (from `SEED_ADMIN_PASSWORD`) |
| Employer | `employer@hanwoo-construction.com` | `Employer!2026` |

## 📜 Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the dev server |
| `pnpm build` | `prisma generate` + production build |
| `pnpm start` | Serve the production build |
| `pnpm typecheck` | TypeScript checking |
| `pnpm lint` / `pnpm format` | ESLint / Prettier |
| `pnpm test` | Vitest unit tests |
| `pnpm test:e2e` | Playwright E2E (run `pnpm exec playwright install` first) |
| `pnpm prisma:studio` | Prisma Studio |
| `pnpm db:seed` | Seed the database |

## 🗂️ Project structure

```
src/
├─ app/[locale]/
│  ├─ (site)/        Public pages (home, about, services, industries, …)
│  ├─ (auth)/login   Authentication
│  ├─ (admin)/admin  Staff dashboard (auth-gated, dynamic)
│  ├─ (portal)/portal Employer portal (auth-gated, dynamic)
│  └─ layout.tsx     Root: <html lang dir>, fonts, providers
│  app/{sitemap,robots,manifest}.ts · app/og/route.tsx · api/auth/[...nextauth]
├─ components/  ui · layout · sections · forms · dashboard · brand · shared · seo
├─ config/      site · license · industries · services · images · testimonials · news
├─ server/actions/  employer-request · contact · track · admin
├─ lib/         prisma · auth · mail · seo · utils · validations
└─ i18n/        routing · navigation · request · deep-merge
messages/       en · ru · uz · ko · de · ja · ar
prisma/         schema.prisma · seed.ts
```

## 🌍 Internationalization

Seven languages with locale-prefixed routing (`as-needed` — English has no
prefix), an in-header language switcher with accurate SVG flags, RTL support for
Arabic, and `hreflang` alternates in metadata and the sitemap. Translation
catalogs **deep-merge over English**, so each locale only needs to translate the
strings it overrides; anything missing falls back gracefully. The full UI chrome
(navigation, hero, footer, CTAs, forms, SEO titles) is translated in all seven
languages; long-form editorial content currently falls back to English pending
professional localization.

## 🖼️ Images — real photography only

**No AI-generated imagery is used anywhere.** All images are real editorial/stock
photography referenced through `src/config/images.ts` (with photographer credits)
and rendered via `<SmartImage>`, which lazy-loads, blurs up, and shows a branded
fallback if a source is unreachable — so the layout is never broken. To self-host
licensed photography, set `NEXT_PUBLIC_LOCAL_IMAGES=true` and drop files into
`/public/images/<key>.jpg`.

## 🔐 Licensing & compliance

Official credentials are displayed prominently and stored in `src/config/site.ts`:
License No. **0078** · Register No. **0106** · TIN **308231656** · Registration No. **956266**.
The License page includes a certificate viewer (zoom + download) — place the real
scan at `/public/license/certificate.{jpg,pdf}`.

## 🛡️ Admin & employer portal

- **Admin** (`/admin`): analytics overview, inquiry pipeline with status updates &
  communication log, contact messages, candidates, employers, license.
- **Portal** (`/portal`): employer dashboard with request stats and live tracking.

Both are server-side protected in their layouts and rendered dynamically.

## ♿ Accessibility & SEO

WCAG-AA-minded: semantic landmarks, keyboard navigation, visible focus rings,
ARIA labels, skip link, accessible forms, AA contrast, reduced-motion support.
Enterprise SEO: per-page metadata, Open Graph + Twitter cards, JSON-LD
(Organization, Website, Breadcrumb, FAQ, NewsArticle), dynamic OG image,
`sitemap.xml`, `robots.txt`, web manifest.

## ☁️ Deployment (Vercel)

1. Provision PostgreSQL (Vercel Postgres / Neon / Supabase).
2. Set env vars from `.env.example` in the Vercel project.
3. Build command `pnpm build` runs `prisma generate`; run `pnpm prisma:deploy`
   (migrations) against the production database.
4. Configure SMTP and set `ENABLE_EMAIL=true` to activate transactional email.

## 🧪 Testing

- `pnpm test` — unit tests (utils, validation schemas, i18n).
- `pnpm test:e2e` — Playwright flows (home, navigation, mobile menu, form
  validation, no horizontal overflow). Install browsers first with
  `pnpm exec playwright install`.

---

© Specialist Group LLC. All rights reserved. Built to enterprise standards.

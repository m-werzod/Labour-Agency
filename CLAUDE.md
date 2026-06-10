# CLAUDE.md

Guidance for AI assistants and engineers working in this repository.

## Project

**Specialist Group** — production website + portal for a government-licensed
international labour-migration & recruitment agency in Tashkent, Uzbekistan.
Goal: convert foreign employers into clients. Mobile-first, multilingual,
enterprise-grade.

## Stack

Next.js 15 (App Router) · TypeScript · Tailwind CSS · shadcn-style UI · Framer
Motion · Prisma + PostgreSQL · NextAuth v5 (credentials/JWT) · next-intl (7
locales) · React Hook Form + Zod · Nodemailer · Vitest · Playwright.

## Commands

```bash
pnpm dev              # dev server
pnpm build            # prisma generate + next build
pnpm typecheck        # tsc --noEmit
pnpm lint             # eslint
pnpm test             # vitest unit tests
pnpm test:e2e         # playwright (needs `pnpm exec playwright install`)
pnpm prisma:migrate   # create/apply dev migration
pnpm db:seed          # seed admin/employer/candidates/requests
```

Always run `pnpm typecheck` and `pnpm build` before committing significant changes.

## Architecture

- `src/app/[locale]/` — all routes are locale-prefixed (`as-needed`: `en` has no prefix).
  - `(site)/` — public marketing pages (Header + Footer), statically generated.
  - `(auth)/login` — authentication.
  - `(admin)/admin` — staff dashboard. **Auth-gated in the layout; `force-dynamic`.**
  - `(portal)/portal` — employer portal. **Auth-gated in the layout; `force-dynamic`.**
  - `[...rest]` — catch-all → localized `not-found`.
- `src/components/` — `ui/` (primitives), `layout/`, `sections/` (home/page sections),
  `forms/`, `dashboard/`, `brand/`, `shared/`, `seo/`.
- `src/config/` — single source of truth for content structure (site facts, license,
  industries, services, images, testimonials, news, countries, stats).
- `src/server/actions/` — `'use server'` actions (employer-request, contact, track, admin).
- `src/lib/` — `prisma`, `auth`, `mail`, `seo`, `utils`, `validations/`.
- `src/i18n/` — `routing`, `navigation`, `request`, `deep-merge`.
- `messages/<locale>.json` — translation catalogs.
- `prisma/schema.prisma` + `prisma/seed.ts`.

## Conventions & gotchas

- **i18n:** import navigation from `@/i18n/navigation` (`Link`, `useRouter`,
  `redirect`, `usePathname`) — never `next/link`/`next/navigation` for routing.
  Catalogs deep-merge over English (`src/i18n/request.ts`), so locale files only
  need to translate what they override; missing keys fall back to English.
- **Server vs client:** `useTranslations` works in both. Client components that
  call it rely on `<NextIntlClientProvider messages={...}>` in the locale layout.
- **Images:** STRICT POLICY — real photography only, **never AI-generated**. All
  imagery goes through `<SmartImage>` (lazy, blur-up, branded fallback) and the
  manifest in `src/config/images.ts`. Set `NEXT_PUBLIC_LOCAL_IMAGES=true` to self-host.
- **Auth:** protection is enforced server-side in the `(admin)`/`(portal)` layouts
  via `auth()` + `redirect`. Protected pages export `dynamic = 'force-dynamic'` so
  they are never statically prerendered (which would bake in the login redirect).
- **Brand:** navy `--primary`, emerald `--secondary`, muted orange = `accent-500`
  scale (shadcn `--accent` stays a neutral hover surface). Fonts: Inter (body),
  Manrope (display).
- **License facts** (0078 / 0106 / 308231656 / 956266) live in `src/config/site.ts`.
- Add real translations to `messages/*.json` rather than hardcoding copy in components.

## Database

PostgreSQL via Prisma. No live DB is needed to `build` (client generation only);
public pages are static. Server actions and admin/portal hit the DB at request
time. Configure `DATABASE_URL`/`DIRECT_URL`, then `pnpm prisma:migrate && pnpm db:seed`.

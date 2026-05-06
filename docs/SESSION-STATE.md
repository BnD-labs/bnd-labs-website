# BND Labs Website — Session State

_Last updated: 2026-04-17 (Phase 5 complete)_

Persistent log of build progress across sessions. Read this at the start of
any new session to resume work without re-deriving context.

---

## Project Overview

**BND Labs** — Zambian digital agency ("Growth Systems Architects") based in
Lusaka. Helps established businesses generate leads through digital
infrastructure (not freelancer work).

- **Target industries:** healthcare, hospitality, education
- **Primary conversion goal:** discovery call bookings
- **Services:**
  - Growth Starter — ZMW 5,000–8,000 project
  - Growth System Retainer — ZMW 4,500–6,000/mo (flagged "Most Popular")
  - AI Growth Engine — ZMW 12,000–20,000 project

## Tech Stack

- Next.js 15.5.15 (App Router + Turbopack)
- React 19.1.0
- Tailwind CSS v4 (uses `@theme inline` in `app/globals.css`, **not** a
  `tailwind.config.js`)
- shadcn/ui with **base-nova** style (uses `@base-ui/react`, NOT Radix UI)
  - Uses `render` prop instead of `asChild`
  - Accordion defaults to `multiple = false` (single-open)
- Framer Motion 12.38.0
- react-hook-form + zod + @hookform/resolvers
- next-mdx-remote + gray-matter + reading-time
- lucide-react icons
- TypeScript strict mode

## Design Tokens

- Primary: Deep Teal `#0e7490`
- Neutrals: Slate
- Accent: Amber/Gold `#f59e0b`
- Fonts: Inter (body), Plus Jakarta Sans (display), Geist Mono (code)
- CSS vars use hex values (base-nova compatibility)

---

## Phase Progress

### Phase 1 — Foundation ✅
Tailwind v4 theme, design tokens, fonts, layout scaffold, core UI primitives.

### Phase 2 — Design Research ✅
Reference analysis documented (First Internet site was 403-blocked to
WebFetch — documented workaround in `docs/first-internet-analysis.md`).

### Phase 3 — Core Components & Content Architecture ✅ COMPLETE

All 16 tasks finished. Build passes cleanly (20 static pages, type check
clean, no ESLint errors or warnings).

**Delivered:**

| Area | Files |
|------|-------|
| Layout primitives | `components/sections/section.tsx` (Section + SectionHeader) |
| Section components | `problem-section.tsx`, `services-grid.tsx`, `stats-bar.tsx`, `process-steps.tsx`, `testimonials.tsx`, `featured-blog.tsx`, `faq-accordion.tsx`, `conversion-cta.tsx`, `pricing-table.tsx`, `trust-signals.tsx` |
| Forms | `forms/contact-form.tsx`, `forms/discovery-call-form.tsx`, `forms/newsletter-form.tsx` |
| Validation | `lib/schemas.ts` (zod: contact / discovery-call / newsletter) |
| API | `app/api/contact/route.ts` (zod discriminatedUnion for 3 form types) |
| Animations | `lib/animations.ts` (Framer Motion variants) |
| Blog infra | `lib/blog.ts` (server), `lib/blog-shared.ts` (client-safe), `mdx-components.tsx` |
| Blog components | `components/blog/post-card.tsx`, `featured-post-card.tsx`, `category-filter.tsx`, `table-of-contents.tsx`, `related-posts.tsx`, `blog-cta.tsx`, `post-layout.tsx` |
| Blog routes | `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`, `app/blog/categories/[category]/page.tsx` |
| Seed content | `content/blog/welcome-to-bnd-labs.mdx`, `building-digital-infrastructure.mdx`, `lead-generation-zambian-businesses.mdx` |
| Homepage | `app/(marketing)/page.tsx` composed with all sections |

**Key architecture decisions:**

1. **`lib/blog-shared.ts` vs `lib/blog.ts`** — client/server split. The
   shared module has no `node:fs` imports so `CategoryFilter` (client
   component) can import `BLOG_CATEGORIES` and `slugifyCategory`. The
   server module re-exports everything from the shared module.
2. **Heading IDs** — `mdx-components.tsx` slugifies heading text. The
   `extractToc()` function in `blog-shared.ts` must mirror this logic.
3. **Native `<select>`** — `discovery-call-form.tsx` uses a styled
   `NativeSelect` instead of base-ui Select to keep the form controller
   simple.
4. **Form API** — Single `/api/contact` endpoint routes via
   `z.discriminatedUnion("formType", ...)`. Defaults to `"contact"` for
   legacy payloads. Email integration deferred to Phase 5.

**Build output (last verified):**

```
Route (app)                                        Size  First Load JS
┌ ○ /                                           58.7 kB         292 kB
├ ○ /about                                          0 B         234 kB
├ ƒ /api/contact                                    0 B            0 B
├ ○ /blog                                           0 B         132 kB
├ ● /blog/[slug]                                21.2 kB         135 kB
│   ├ /blog/building-digital-infrastructure
│   ├ /blog/lead-generation-zambian-businesses
│   └ /blog/welcome-to-bnd-labs
├ ● /blog/categories/[category]                     0 B         132 kB
│   └ 5 category slugs
├ ○ /contact                                        0 B         234 kB
├ ○ /services                                       0 B         234 kB
└ ○ /thank-you                                      0 B         234 kB
```

---

### Phase 4 — Spline 3D Integration ✅ COMPLETE

Build verified: homepage `/` route went from 58.7 kB → 59.4 kB (+0.7 kB
initial). Spline runtime (~300 kB) is code-split via `lazy()` and only
downloaded after client mount. SSR-safe, reduced-motion-safe, error-safe.

**Delivered:**

| File | Purpose |
|------|---------|
| `components/hero/spline-hero.tsx` | Client component with lazy Spline, error boundary, prefers-reduced-motion fallback, static gradient base layer |
| `components/hero/index.ts` | Barrel export |
| `lib/spline.ts` | Reads `NEXT_PUBLIC_SPLINE_HERO_URL` from env |
| `app/(marketing)/page.tsx` | Swapped placeholder section for `<SplineHero>` wrapping hero copy + CTAs |

**Architecture notes:**

1. **Lazy Spline import** — `React.lazy(() => import("@splinetool/react-spline"))`
   keeps Spline out of the initial bundle. SSR sends only the gradient
   fallback; the canvas hydrates after mount.
2. **Three-layer fallback chain**:
   - Gradient (always rendered, z-index base)
   - Spline canvas (only if mounted + not reduced-motion + no error + URL set)
   - Foreground content (hero copy, CTAs — always rendered)
3. **Error boundary** — `SplineErrorBoundary` swallows runtime errors
   (WebGL unavailable, bad scene URL, network failure) and falls back to
   gradient silently.
4. **Reduced motion** — `matchMedia("(prefers-reduced-motion: reduce)")`
   listener; users with that preference never see the 3D canvas.
5. **Mask** — `[mask-image:linear-gradient(to_bottom,black_70%,transparent)]`
   fades the Spline bottom edge into the section below it.

### Spline Scene Setup (Required Before Launch)

The hero ships with **no scene URL** — shows a static gradient. To enable
the 3D canvas:

1. In Spline Editor: **File → Export → Code Export** → copy the
   `.splinecode` URL (e.g. `https://prod.spline.design/abc123/scene.splinecode`).
2. Create `.env.local` in project root:
   ```
   NEXT_PUBLIC_SPLINE_HERO_URL=https://prod.spline.design/YOUR_ID/scene.splinecode
   ```
3. Restart `npm run dev`. The 3D canvas will render automatically.

User has reference screenshots + VOXR AI live site for scene inspiration.

---

### Phase 5 — Marketing Pages & Blog Launch ✅ COMPLETE

Build verified: 40 static pages, all routes compiling cleanly, all OG images
rendering. Type check clean, no ESLint errors.

**Delivered:**

| Area | Files |
|------|-------|
| About page | `app/(marketing)/about/page.tsx` — hero, story, values (4 cards), StatsBar, industries (4 sectors), CTA |
| Services page | `app/(marketing)/services/page.tsx` — hero, 3 detailed service sections with anchor IDs, deliverable cards, ideal-for callouts, ProcessSteps, Testimonials, FAQ, CTA |
| Contact page | `app/(marketing)/contact/page.tsx` — hero, DiscoveryCallForm + sidebar with contact info + "what to expect" card, general ContactForm, contextual FAQ |
| Thank You page | `app/(marketing)/thank-you/page.tsx` — success icon, next-steps cards (3-step), blog + home CTAs |
| Email integration | `lib/email.ts` + updated `app/api/contact/route.ts` — Resend SDK, team notification + submitter confirmation emails, lazy init (build-safe without API key) |
| Blog posts (7 total) | Added 4 new: `private-clinic-lead-generation.mdx` (Healthcare), `safari-lodge-direct-bookings.mdx` (Hospitality), `private-school-enrollment-pipeline.mdx` (Education), `ai-automation-small-business.mdx` (AI & Automation) |
| Blog categories | Updated `lib/blog-shared.ts` — added Healthcare, Hospitality, Education, AI & Automation |
| OG images | `lib/og.tsx` (shared generator) + `opengraph-image.tsx` for homepage, about, services, contact, blog index, and dynamic blog/[slug] |

**Architecture notes:**

1. **Resend lazy init** — `getResend()` returns `null` when `RESEND_API_KEY`
   is not set, so the build doesn't crash during static generation. Emails
   silently skip when no key is configured.
2. **OG image shared layout** — `lib/og.tsx` exports `generateOgImage()`
   used by all per-route `opengraph-image.tsx` files. Dark slate background
   with primary/accent gradient accents, BND Labs logo, bottom accent bar.
3. **Services page anchor IDs** — Each service section has `id="growth-starter"`,
   `id="growth-retainer"`, `id="ai-growth-engine"` matching footer links.
4. **Contact page dual forms** — Discovery call form (primary, with sidebar)
   and general contact form (secondary, below). Both submit to `/api/contact`.

**Resend Setup (Required Before Launch):**

1. Sign up at [resend.com](https://resend.com) and verify your domain.
2. Add to `.env.local`:
   ```
   RESEND_API_KEY=re_xxxxx
   RESEND_FROM_EMAIL=notifications@bnd-lab-agency.com
   NOTIFY_EMAIL=info@bnd-lab-agency.com
   ```
3. Restart `npm run dev`. Form submissions will now send emails.

**Build output (last verified):**

```
Route (app)                                        Size  First Load JS
┌ ○ /                                           20.3 kB         297 kB
├ ○ /about                                      1.42 kB         278 kB
├ ƒ /api/contact                                    0 B            0 B
├ ○ /blog                                           0 B         132 kB
├ ● /blog/[slug]                                13.6 kB         136 kB
│   └ 7 blog posts
├ ● /blog/categories/[category]                     0 B         132 kB
│   └ 9 category slugs
├ ○ /contact                                    9.53 kB         286 kB
├ ○ /services                                   9.94 kB         286 kB
└ ○ /thank-you                                      0 B         235 kB
+ OG images for all routes
```

---

## Next Phases (Not Yet Started)

### Phase 6 — Optimization
- Image optimization audit
- Lighthouse / Core Web Vitals pass
- Analytics (Vercel Analytics + Plausible?)
- Structured data (Organization, Article, FAQPage)

---

## Known Issues & Gotchas

- **base-nova ≠ Radix.** When adding new shadcn components, check that
  they import from `@base-ui/react`, not `@radix-ui/*`. Use `render` not
  `asChild` for polymorphic composition.
- **CSS variables are hex, not RGB triplets.** Tailwind v4's `@theme
  inline` + base-nova expects `--color-primary: #0e7490;` not the
  Tailwind-v3 `222 47% 11%` pattern.
- **MDX `next-mdx-remote/rsc` in Server Components only.** The
  `PostLayout` must stay a server component (no "use client" directive)
  because `<MDXRemote>` is RSC-only.
- **First Internet site is 403-blocked to WebFetch.** User will paste
  screenshots / code snippets when reference is needed.

---

## Commands

```bash
# Dev
npm run dev

# Type check (fast, no build)
npx tsc --noEmit

# Production build
npm run build

# Install shadcn component (base-nova)
npx shadcn@latest add <component>
```

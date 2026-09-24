# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Established Zambian business owners and directors — the decision-maker is usually the owner, which is why the discovery-call form captures role as a lead-scoring axis (`ROLES` in `lib/schemas.ts`). They browse during work hours on both phone and laptop.

Confirmed sectors are the `INDUSTRIES` list in `lib/schemas.ts`, ordered by priority: Logistics & Freight, Hospitality & F&B, Education (private or vocational), ICT & Professional Services, Creative & Production, Retail/Trade/Ecommerce, Healthcare (private clinic), Other.

They are typically frustrated by unreliable freelancers and one-off projects, and are looking for a partner who delivers predictable lead generation. They want a system, not a campaign.

## Product Purpose

BND Labs builds lead-generation systems for Zambian SMEs: lead capture, CRM setup, follow-up automation, conversion websites, content systems and performance reporting. Success is the client having a working lead engine installed inside their own business that keeps running without BND.

## Positioning

**Ownership.** The system is installed inside the client's business and handed over — not rented, not retained, not dependent on BND's continued involvement. A neighbouring agency selling monthly retainers cannot truthfully make this claim.

The mechanism behind it is the **Prospect Engine**, BND's own prospect-research software (contact tracking, response patterns, pipeline stages, CRM sync, CSV export). It is what makes the service materially different from a freelancer or a generalist agency.

**Binding copy constraint:** marketing copy must not use subscription, rental or retainer framing anywhere. Two live components currently violate this — see Evidence on Hand.

## Operating Context

- Enquiries arrive through two forms: a low-friction contact form, and a longer discovery-call form capturing industry, budget, timeline and role.
- Submissions are emailed via Resend and forwarded to HubSpot. Both run off the response path via `waitUntil` in `functions/api/contact.ts`.
- The Prospect Engine is used internally today to run BND's own and clients' prospect research. It is not sold standalone.

## Capabilities and Constraints

- Next.js 15.5.15 App Router, React 19, TypeScript strict, Tailwind v4 (`@theme inline`, no `tailwind.config.js`), shadcn/ui **base-nova** on `@base-ui/react` — uses the `render` prop, not `asChild`.
- Static export (`output: "export"`). The `/api/contact` endpoint is a Cloudflare Pages Function in `functions/`; it does not run under `next dev`. Use `wrangler pages dev`.
- Deployed to Cloudflare Pages from `main` at bnd-lab-agency.com. Secrets live in Cloudflare environment variables — never `.env` files or hardcoded tokens.
- **HubSpot is on the free tier at 10/10 custom properties.** No new custom properties may be added.
- Page-weight budget: 512 KB. The Rive hero animation was removed for this reason (1,723 KB → 519 KB); do not reintroduce a heavyweight hero.
- `lib/email.ts` and `lib/lead-forward.ts` are correct and must not be restructured.

**Undecided:** whether the Prospect Engine is ever sold standalone. Current decision is a phased path — sell it as the reason the service is better, then attach a maintenance-and-hosting fee to installs, and only build multi-tenancy and billing once clients reliably pay that line. There is no product page and no pricing page, deliberately. Any customisation must be configuration on one codebase, never a fork per client.

## Brand Commitments

- Name: **BND Labs**. Descriptor: "Growth Systems Architects". Based in Lusaka, Zambia.
- Typography: Epilogue (display), Source Sans 3 (body), Geist Mono (code).
- Colour and theme tokens live in `app/globals.css`, which is the source of truth. Both light and dark are fully defined and both must be designed for. `.impeccable.md` carries the design context and the known `--chart-1`/`--chart-3` collision in dark mode.
- Registered company details must match the PACRA certificate exactly — Meta verification compares them.

## Evidence on Hand

**Real and in use — public Google Business Profile reviews, all five-star:**
- **Mildred Musonda, Bastuku Investments** (Logistics & Supply). The strongest asset the company has. States the Growth Starter package built their digital infrastructure from scratch in two weeks, and that "within three weeks we had 15 qualified leads, which turned into 8 quotes and 3 invoices." Quoted verbatim in `components/sections/testimonials.tsx` and `components/sections/selected-work.tsx`.
- **Queso Pizza** (Chongwe, Lusaka) — "We have been working with BnD Labs for months now. Their work is nothing short of incredible."
- **Future** — "Thank you for the great works on my company website."
- **Arthur Chipolomoka** — "Your Dream is in safe hands, No one else can lock you in the way they do.." Real, but deliberately unused: "lock you in" reads against the ownership positioning.

Because these are published and attributable, provenance is shown on the page ("Google review"). Do not edit their wording, and do not add a quote that is not published there. **Needed from the user:** the public Google Business Profile URL, so the reviews can link out to independent verification.

**Real client work — both live and linked from the homepage:**
- **Bastuku Investments** — bastuku-inv.com. Conversion website with online bookings, lead capture system, social platforms, content strategy.
- **Queso Pizza** — quesopizza.com. Mobile-first marketing site, WhatsApp order builder with call-to-confirm, Kwacha menu system.
- A third project, Vast Gallery / vast-media (photography marketing plus client photo delivery), exists in the user's working directories but has not been confirmed live and is deliberately not listed.

**Removed as fabricated (2026-09-23):**
- `components/sections/testimonials.tsx` previously shipped three invented testimonials with invented attributed people ("Dr. N. Banda", "J. Mwansa", "Mrs. T. Phiri") and an invented metric. Replaced with the real reviews above.
- `components/sections/stats-bar.tsx` shipped four invented figures (3x lead increase, 48hr response, 95% retention, 6+ industries) on both the homepage and the About page. Both usages removed; the component now requires a `stats` prop with no default so it cannot render unsourced numbers again.
- `components/navigation/footer.tsx` rendered literal `TODO:` strings in the public footer. Now gated behind `companyDetailsReady` until real values land.

**Still absent — must not be fabricated to fill a gap:**
- No verified response-time or retention figures. The internal CRM numbers are weak because the first system was a trial without follow-through; the user's decision is to publish no aggregate figures rather than dress these up.
- The real PACRA registered name, address and phone.
- The Prospect Engine's live instance shows zero-state data, so no screenshot of it can carry real volume numbers. This is why the hero product frame shows structure rather than counts.

## Product Principles

1. **Ownership over retention.** Every claim, feature and CTA reinforces that the client keeps the system. Retainer and subscription framing is off-limits.
2. **Earn every claim.** No invented numbers, testimonials, logos, or unverifiable timings. If a figure cannot be sourced, cut the element rather than fill it.
3. **Systems over campaigns.** Visual and copy decisions should reinforce reliable, installed machinery rather than marketing activity.
4. **Respect the local market.** Zambian SME owners are sophisticated buyers; design for them without patronising, and price and frame in their context.
5. **Productise deliberately.** The Prospect Engine advances only on evidence of demand, never on enthusiasm.

## Accessibility & Inclusion

Both light and dark themes must be legible; contrast was tuned deliberately in `globals.css` (accent darkened to `#b85a35` for AA). Motion runs once and respects `prefers-reduced-motion` — no perpetual loops.

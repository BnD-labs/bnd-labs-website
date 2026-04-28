# Voxr AI — Design Pattern Analysis

> Source: https://voxr.ai (analyzed April 2026)

## Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#0b040d` | Dark purple-black base |
| Accent Purple | `#ab00ff` | Gradients, buttons, borders |
| Light Purple | `rgba(233, 197, 255, 0.6)` | Gradient overlays, glassmorphism borders |
| Text Primary | `#ffffff` | Headings, body text on dark |
| Text Muted | `rgba(255,255,255,0.6)` | Secondary text, descriptions |

**Theme:** Dark-mode-first with purple-gradient glassmorphism.

---

## Typography

- **Font Family:** DM Sans (300, 400, 500, 600, 700)
- **Sizing:** Viewport-width units (`1.111111vw` desktop, `4.103vw` mobile)
- **Headings:** Bold 600-700, large scale
- **Body:** 400-500 weight

---

## Page Structure (Homepage Flow)

1. **Hero** — Headline + subheading + video bg + dual CTAs
2. **Features Grid** — 6 cards in grid
3. **Key Stats** — 3-column stats with glassmorphic containers
4. **How it Works** — 5-step process flow
5. **Benefits** — 6 outcome-focused benefit cards
6. **Case Studies** — Swiper.js carousel (4 studies)
7. **FAQ Accordion** — 11 items, single-open behavior
8. **Final CTA** — Closing conversion section
9. **Footer** — Multi-column (Legal, Nav, Contact)

---

## Hero Section

- **Layout:** Centered text over dark video background
- **Headline:** "Stop Chasing Leads. Start Closing Them."
- **Subheading:** AI-powered outbound calling that qualifies intent in real-time
- **Primary CTA:** "Try it now" (glass button, purple gradient border)
- **Secondary CTA:** "Contact us" (lighter variant)
- **Animations:** Opacity transitions, staggered transforms on load

---

## Navigation

- **Style:** Fixed/sticky, dark background, transparent initially
- **Items:** Features, Pricing, About Us
- **CTA:** "Login" + "Contact us" buttons in header
- **Mobile:** Burger icon (≤479px), slides in from top with blur overlay
- **Behavior:** Background switches dynamically based on scroll position

---

## Conversion Patterns

### CTA Strategy
- Hero: Dual CTA (try + contact)
- After each major section: Reinforcement CTA
- Final dedicated CTA section before footer
- Header: Persistent "Contact us" button

### Trust Signals
- 5-star rating display
- Quote from VP Sales Manager with name + title
- Partner logos section
- Case studies with real metrics
- Compliance links in footer (DPA, SLA, T&Cs)

### Conversion Funnel
1. Awareness (Hero) → 2. Education (Features) → 3. Process (How it Works) → 4. Benefits → 5. Social Proof (Case Studies) → 6. Objections (FAQ) → 7. Action (Final CTA)

---

## Component Inventory

### Buttons
- **Glass Button (Primary):** Gradient border (`linear-gradient(135deg, rgba(255,255,255,0.6)...)`), transparent bg, white text
- **Glass Label (Secondary):** Lighter variant, subtler border
- **Scroll Button:** Navigation aid

### Cards
- **Feature Cards:** Icon (SVG) + heading + description, opacity animate on load
- **Benefit Cards:** Gradient borders, glassmorphic containers
- **Case Study Cards:** Stats + testimonial + results
- **Stats Cards:** Large number + label, `.case-studie-stats` glassmorphic container

### FAQ Accordion
- Single-open behavior (auto-close siblings)
- `is-open` class toggle
- 300ms cubic-bezier easing
- 11 items covering objections

### Carousels
- Swiper.js (mobile cards, stack mode)
- `grabCursor` enabled for touch
- 22deg rotation on exit animation
- 150-550ms staggered durations

---

## Animations

| Pattern | Details |
|---------|---------|
| Scroll fade-in | Opacity 0→1, translate from 4rem left |
| Hover | Opacity transitions on buttons |
| Accordion | 300ms cubic-bezier toggle |
| Stack slider | 22deg rotation on exit, staggered text swaps |
| Loading | Fade-swap text with outlined delays |
| Hero | Staggered opacity + transform on initial load |

---

## Footer

- **Columns:** Legal | Navigation | Contact
- **Legal:** Privacy Policy, Terms, Partner Terms, SLA, DPA
- **Contact:** Address, email (support@voxr.ai)
- **Social:** LinkedIn, Facebook, X (Twitter)
- **Copyright:** Bottom row

---

## Responsive Breakpoints

| Breakpoint | Behavior |
|------------|----------|
| ≥992px | Desktop: full layout |
| 768-991px | Tablet: adjusted grid |
| ≤479px | Mobile: burger menu, vertical stack, simplified sliders |

---

## Key Takeaways for BND Labs

1. **Dark theme with accent gradients** creates premium, tech-forward feel
2. **Glassmorphism cards** with gradient borders = distinctive visual identity
3. **Conversion funnel structure** (Hero → Features → Stats → Process → Benefits → Proof → FAQ → CTA) is highly effective
4. **Stats section** with large numbers builds immediate credibility
5. **Single-open FAQ accordion** handles objections cleanly
6. **Persistent header CTA** keeps conversion accessible at all times
7. **DM Sans** as sole font keeps things clean — BND Labs uses Inter + Plus Jakarta Sans similarly
8. **Page flow is education-first** — teaches before selling

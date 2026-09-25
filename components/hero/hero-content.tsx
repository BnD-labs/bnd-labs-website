import { FlowButton } from "@/components/ui/flow-button";

/**
 * Deliberately a server component with a CSS-only entrance.
 *
 * This used to animate with framer-motion from `initial={{ opacity: 0 }}`,
 * which meant the h1 — the LCP element — stayed invisible until the bundle
 * downloaded, hydrated and ran. Measured at 500ms on a local server it still
 * computed to opacity:0. On a mid-range phone over mobile data that is a blank
 * hero, and with JS disabled or broken it never appears at all.
 *
 * The h1 carries no delay so it starts on the first painted frame; only the
 * supporting copy and the CTA are staggered behind it.
 */
export function HeroContent() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
      <h1 className="hero-rise text-balance font-display text-5xl font-bold leading-[1.02] tracking-[-0.045em] text-foreground sm:text-6xl lg:text-[4.5rem] lg:leading-[0.98]">
        We build lead systems <span className="text-primary">you own</span>.
      </h1>

      <p
        className="hero-rise-delayed mt-5 max-w-xl text-pretty text-lg text-muted-foreground sm:text-xl"
        style={{ animationDelay: "0.12s" }}
      >
        Not a retainer. Not freelancer hours. One engine that finds, captures
        and follows up your leads. Built to keep running without us.
      </p>

      <div className="hero-rise-delayed mt-8" style={{ animationDelay: "0.24s" }}>
        <FlowButton text="Book a Discovery Call" href="/contact" size="lg" />
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface HeroSectionProps {
  children: ReactNode;
  className?: string;
}

/**
 * The drifting texture, oversized by exactly one 160px cycle up and to the
 * left. The parent is the plane that parallax moves; this child is the thing
 * that drifts, so the two transforms never contend for the same element.
 */
const driftLayer =
  "hero-grid-drift absolute -left-40 -top-40 h-[calc(100%+10rem)] w-[calc(100%+10rem)]";

/** The two-tier drafting grid, shared by the base and the revealed layer. */
const gridLayers = {
  backgroundImage:
    "linear-gradient(var(--grid-line) 1px, transparent 1px)," +
    "linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)," +
    "linear-gradient(var(--grid-line-major) 1px, transparent 1px)," +
    "linear-gradient(90deg, var(--grid-line-major) 1px, transparent 1px)",
  backgroundSize: "32px 32px, 32px 32px, 160px 160px, 160px 160px",
} as const;

export function HeroSection({ children, className }: HeroSectionProps) {
  return (
    <section
      data-hero=""
      className={cn(
        // Pulled up behind the floating nav (72px: see Header) so the grid
        // runs to the very top of the page instead of starting below the pill
        // and leaving a seam. The matching padding restores the content.
        "relative -mt-[72px] overflow-hidden bg-background pt-[72px] pb-0",
        className,
      )}
    >
      {/*
        Base grid. Drifts diagonally and forever, one major cell per cycle, so
        the loop is seamless for both tiers (160 is five 32s). The drift is a
        CSS animation rather than a rAF loop: it works with JavaScript off, and
        the global reduced-motion rule stops it.

        Two elements, not one, and that is load bearing. The outer is the
        parallax plane; the inner is the texture. Both animate `transform`, and
        a single element can only have one, so collapsing these back together
        is what forced the drift onto `background-position` and cost a full
        repaint every frame. See the note in `globals.css`.
      */}
      <div
        aria-hidden="true"
        className="hero-plane-grid absolute -inset-y-24 inset-x-0 overflow-hidden"
      >
        <div className={driftLayer} style={gridLayers} />
      </div>

      {/*
        The same grid again, brighter, revealed only under the cursor. This is
        the interactive layer: a radial mask follows the pointer, so the grid
        appears to switch on where you look. The mask lives on the plane rather
        than the texture, so the spotlight stays under the cursor instead of
        drifting away with the grid. Removed outright on a coarse pointer.

        `overflow-hidden` is required here, not cosmetic. The mask defaults to
        `mask-repeat: repeat`, so any part of the texture that hangs outside
        this box gets its own tiled copy of the spotlight gradient — a second
        glow with no cursor under it. Clipping to the plane also keeps the
        rasterised area down to the plane rather than the oversized child.
      */}
      <div
        aria-hidden="true"
        className="hero-plane-grid hero-grid-reveal absolute -inset-y-24 inset-x-0 overflow-hidden"
      >
        <div className={driftLayer} style={gridLayers} />
      </div>

      {/*
        Atmospheric plane. Warm top right, cool bottom left, all three from the
        molecular palette rather than a generic orange and blue. Held low on a
        light ground: heavy coloured glow is one of the clearest tells of a
        generated page, so these read as light on the grid, not a colour wash.
      */}
      <div
        aria-hidden="true"
        className="hero-plane-glow pointer-events-none absolute -inset-y-32 inset-x-0"
      >
        <div className="absolute right-[-14%] top-[-18%] h-[46%] w-[42%] rounded-full bg-[var(--color-mol-orange)] opacity-[0.30] blur-[120px]" />
        <div className="absolute right-[8%] top-[-12%] h-[26%] w-[22%] rounded-full bg-primary opacity-[0.26] blur-[100px]" />
        <div className="absolute left-[-12%] bottom-[-22%] h-[46%] w-[40%] rounded-full bg-[var(--color-mol-cyan)] opacity-[0.32] blur-[120px]" />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 mx-auto max-w-[90rem] px-4 pt-14 sm:px-6 sm:pt-20 lg:px-8 lg:pt-20">
        {children}
      </div>
    </section>
  );
}

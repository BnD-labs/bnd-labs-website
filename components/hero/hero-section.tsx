import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface HeroSectionProps {
  children: ReactNode;
  className?: string;
}

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
        CSS animation rather than a rAF loop: it costs no main thread, works
        with JavaScript off, and the global reduced-motion rule stops it.
      */}
      <div
        aria-hidden="true"
        className="hero-plane-grid hero-grid-drift absolute -inset-y-24 inset-x-0"
        style={gridLayers}
      />

      {/*
        The same grid again, brighter, revealed only under the cursor. This is
        the interactive layer: a radial mask follows the pointer, so the grid
        appears to switch on where you look. Hidden until a mouse actually
        moves over the hero, and never shown for touch.
      */}
      <div
        aria-hidden="true"
        className="hero-plane-grid hero-grid-drift hero-grid-reveal absolute -inset-y-24 inset-x-0"
        style={gridLayers}
      />

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
        <div className="absolute right-[-14%] top-[-18%] h-[46%] w-[42%] rounded-full bg-[var(--color-mol-orange)] opacity-[0.16] blur-[120px]" />
        <div className="absolute right-[8%] top-[-12%] h-[26%] w-[22%] rounded-full bg-primary opacity-[0.14] blur-[100px]" />
        <div className="absolute left-[-12%] bottom-[-22%] h-[46%] w-[40%] rounded-full bg-[var(--color-mol-cyan)] opacity-[0.18] blur-[120px]" />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 mx-auto max-w-[90rem] px-4 pt-14 sm:px-6 sm:pt-20 lg:px-8 lg:pt-20">
        {children}
      </div>
    </section>
  );
}

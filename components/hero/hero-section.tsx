import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface HeroSectionProps {
  children: ReactNode;
  className?: string;
}

export function HeroSection({ children, className }: HeroSectionProps) {
  return (
    <section
      className={cn(
        // Pulled up behind the floating nav (72px: see Header) so the drafting
        // grid runs to the very top of the page instead of starting below the
        // pill and leaving a seam. The matching padding restores the content.
        "relative -mt-[72px] overflow-hidden bg-background pt-[72px] pb-0",
        className,
      )}
    >
      {/*
        Drafting grid — a two-tier rule at 32px and 160px. Committed rather
        than whispered: at a lower opacity it reads as noise instead of as a
        decision. Colours come from --grid-line so it follows the theme.
      */}
      <div
        aria-hidden="true"
        className="hero-plane-grid absolute -inset-y-24 inset-x-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid-line) 1px, transparent 1px)," +
            "linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)," +
            "linear-gradient(var(--grid-line-major) 1px, transparent 1px)," +
            "linear-gradient(90deg, var(--grid-line-major) 1px, transparent 1px)",
          backgroundSize: "32px 32px, 32px 32px, 160px 160px, 160px 160px",
        }}
      />

      {/*
        Atmospheric plane, pulled off-centre to match the composition's lean.
        Held at 7%: a purple radial glow is one of the clearest tells of a
        generated page, so it reads as light on the grid rather than as a
        colour wash.
      */}
      <div
        aria-hidden="true"
        className="hero-plane-glow absolute -inset-y-32 inset-x-0 bg-[radial-gradient(1100px_620px_at_46%_-6%,var(--color-primary),transparent_66%)] opacity-[0.07]"
      />

      {/* Foreground content */}
      <div className="relative z-10 mx-auto max-w-[90rem] px-4 pt-14 sm:px-6 sm:pt-20 lg:px-8 lg:pt-20">
        {children}
      </div>
    </section>
  );
}

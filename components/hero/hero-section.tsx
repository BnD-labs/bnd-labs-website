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
        "relative min-h-[700px] overflow-hidden bg-background lg:min-h-[750px]",
        className,
      )}
    >
      {/* Gradient background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5"
      >
        <div className="absolute -right-1/4 top-1/4 h-[480px] w-[480px] rounded-full bg-primary/10 blur-[120px] animate-[pulse_6s_ease-in-out_infinite]" />
        <div className="absolute -left-1/4 bottom-0 h-[360px] w-[360px] rounded-full bg-accent/10 blur-[100px] animate-[pulse_8s_ease-in-out_infinite_1s]" />
      </div>

      {/* Subtle grid overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px),
                            linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Foreground content */}
      <div className="relative z-10 mx-auto flex min-h-[inherit] max-w-7xl items-center px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        {children}
      </div>
    </section>
  );
}

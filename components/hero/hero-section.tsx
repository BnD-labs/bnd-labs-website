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
        "relative overflow-hidden bg-background lg:min-h-[750px]",
        className,
      )}
    >
      {/* Gradient background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5"
      />

      {/* Foreground content */}
      <div className="relative z-10 mx-auto flex max-w-[90rem] items-center px-4 py-16 sm:px-6 sm:py-24 lg:min-h-[750px] lg:px-8 lg:py-40">
        {children}
      </div>
    </section>
  );
}

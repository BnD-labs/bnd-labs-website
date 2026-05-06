import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** Size variant */
  size?: "sm" | "md" | "lg";
}

/**
 * BND Labs logo — renders the brand logo PNG.
 */
export function Logo({ className, size = "md" }: LogoProps) {
  const dimensions = {
    sm: { width: 100, height: 48 },
    md: { width: 130, height: 62 },
    lg: { width: 160, height: 76 },
  }[size];

  const textSize = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-xl",
  }[size];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 transition-opacity hover:opacity-90 active:opacity-80",
        className,
      )}
    >
      <Image
        src="/bnd-logo.svg"
        alt=""
        width={dimensions.width}
        height={dimensions.height}
        className="shrink-0"
        priority
      />
      <span className={cn("font-display font-bold tracking-tight text-foreground", textSize)}>
        BND Labs
      </span>
    </span>
  );
}

import { cn } from "@/lib/utils";

/** Brand blue — single source of truth for the logo colour system */
const BRAND_BLUE = "#1A6BFF";

/**
 * Molecular node icon from the BND Labs brand kit.
 * Three interconnected circles rendered in the brand-blue colour system.
 */
function MolecularIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={cn("shrink-0", className)}
      aria-hidden="true"
    >
      {/* Connecting lines */}
      <line x1="10" y1="10" x2="22" y2="12" stroke={BRAND_BLUE} strokeWidth="1.5" opacity="0.35" />
      <line x1="10" y1="10" x2="14" y2="24" stroke={BRAND_BLUE} strokeWidth="1.5" opacity="0.35" />
      <line x1="22" y1="12" x2="14" y2="24" stroke={BRAND_BLUE} strokeWidth="1.5" opacity="0.35" />

      {/* Primary node (largest, top-left) */}
      <circle cx="10" cy="10" r="6" fill={BRAND_BLUE} />
      {/* Secondary node (medium, top-right) */}
      <circle cx="22" cy="12" r="5" fill={BRAND_BLUE} opacity="0.75" />
      {/* Tertiary node (smallest, bottom) */}
      <circle cx="14" cy="24" r="4" fill={BRAND_BLUE} opacity="0.55" />
    </svg>
  );
}

interface LogoProps {
  className?: string;
  /** Show the molecular icon alongside the wordmark */
  showIcon?: boolean;
  /** Size variant */
  size?: "sm" | "md" | "lg";
}

/**
 * BND Labs logo — molecular icon + wordmark.
 * Uses the display font (Plus Jakarta Sans) for the wordmark.
 */
export function Logo({ className, showIcon = true, size = "md" }: LogoProps) {
  const iconSize = {
    sm: "size-5",
    md: "size-7",
    lg: "size-10",
  }[size];

  const textSize = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-3xl",
  }[size];

  const labsSize = {
    sm: "text-[0.5rem] tracking-[0.2em]",
    md: "text-[0.6rem] tracking-[0.22em]",
    lg: "text-xs tracking-[0.25em]",
  }[size];

  return (
    <span className={cn("inline-flex items-center gap-1.5 transition-opacity hover:opacity-90 active:opacity-80", className)}>
      {showIcon && <MolecularIcon className={iconSize} />}
      <span className="flex flex-col leading-none">
        <span className={cn("font-display font-bold tracking-tight", textSize)} style={{ color: BRAND_BLUE }}>
          bnd
        </span>
        <span className={cn("font-display font-semibold uppercase", labsSize)} style={{ color: BRAND_BLUE, opacity: 0.7 }}>
          Labs
        </span>
      </span>
    </span>
  );
}

export { MolecularIcon };

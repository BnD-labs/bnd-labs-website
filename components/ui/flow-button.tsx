import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type FlowButtonVariant =
  | "solid"
  | "outline"
  | "solid-on-dark"
  | "outline-on-dark";
type FlowButtonSize = "default" | "lg";

/**
 * Four variants, two per ground.
 *
 * On a light page `solid` is the same deep-purple pill the site has always
 * used, so hierarchy does not move; the ink that floods it is the navy
 * foreground, which reads as the purple deepening rather than as a second
 * colour arriving. `outline` is the quieter form for persistent chrome: brand
 * text on a hairline, filling purple only when you reach for it.
 *
 * The `-on-dark` pair is for `Section background="dark"` (brand-900, very near
 * black) and mirrors that logic inverted: white is the loud one, a white
 * hairline is the quiet one. They are not dark-mode variants — the dark
 * section is dark in either theme — so they name white directly, the way
 * `Section` itself does.
 *
 * Purple on brand-900 measures 1.34:1, which is why the primary CTA in a dark
 * section must not be `solid`. It was, and the pale `secondary` button beside
 * it out-shouted it.
 *
 * That same 1.34:1 is why `solid-on-dark` keeps a white ring once it floods:
 * the purple fill alone would leave the button's shape invisible against the
 * ground at the exact moment you are pointing at it. At rest the ring is
 * transparent and the white fill shows through it, so it costs nothing.
 */
const variantClasses: Record<FlowButtonVariant, string> = {
  solid: "border-transparent bg-primary text-primary-foreground",
  outline:
    "border-primary/30 bg-transparent text-primary " +
    "hover:border-transparent hover:text-primary-foreground " +
    "focus-visible:border-transparent focus-visible:text-primary-foreground",
  "solid-on-dark":
    "border-transparent bg-white text-primary " +
    "hover:border-white hover:text-white " +
    "focus-visible:border-white focus-visible:text-white",
  "outline-on-dark":
    "border-white/35 bg-transparent text-white " +
    "hover:border-transparent hover:text-primary " +
    "focus-visible:border-transparent focus-visible:text-primary",
};

const inkClasses: Record<FlowButtonVariant, string> = {
  solid: "bg-foreground",
  outline: "bg-primary",
  "solid-on-dark": "bg-primary",
  "outline-on-dark": "bg-white",
};

const sizeClasses: Record<FlowButtonSize, string> = {
  default: "px-7 py-2.5 text-sm",
  lg: "px-9 py-3.5 text-[0.9375rem]",
};

interface FlowButtonOwnProps {
  text: string;
  /** Renders a Next link instead of a button. Both CTAs on this site navigate. */
  href?: string;
  variant?: FlowButtonVariant;
  size?: FlowButtonSize;
  className?: string;
}

type FlowButtonProps = FlowButtonOwnProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof FlowButtonOwnProps | "children">;

/**
 * The site's call-to-action button, with the hover choreography defined under
 * "Flow button" in `app/globals.css` — read that comment before changing the
 * markup here, because the class names below are the hooks it moves.
 *
 * Deliberately not a client component. It holds no state and no handlers: the
 * whole interaction is CSS, so in the hero it ships zero JavaScript and
 * renders identically before hydration, which is the rule the rest of that
 * section already follows.
 */
export function FlowButton({
  text,
  href,
  variant = "solid",
  size = "default",
  className,
  ...props
}: FlowButtonProps) {
  const classes = cn(
    "flow-btn group relative inline-flex cursor-pointer items-center justify-center",
    "overflow-hidden rounded-full border-[1.5px] font-semibold",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  const inner = (
    <>
      {/* The flood. First in source order and unpositioned in z, so it sits
          under the label without either needing a stacking index fight. */}
      <span
        aria-hidden="true"
        className={cn(
          "flow-btn-ink pointer-events-none absolute left-1/2 top-1/2 aspect-square w-full rounded-full",
          inkClasses[variant],
        )}
      />

      {/* Arriving arrow — parked off the left edge until the button is reached. */}
      <ArrowRight
        aria-hidden="true"
        className="flow-btn-arrow flow-btn-arrow-in pointer-events-none absolute left-4 z-10 h-4 w-4"
      />

      <span className="flow-btn-label relative z-10">{text}</span>

      {/* Resting arrow — the one you see, and the one that leaves. */}
      <ArrowRight
        aria-hidden="true"
        className="flow-btn-arrow flow-btn-arrow-out pointer-events-none absolute right-4 z-10 h-4 w-4"
      />
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {inner}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {inner}
    </button>
  );
}

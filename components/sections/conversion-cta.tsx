import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/sections/section";
import { ScrollReveal } from "@/components/scroll-reveal";

interface ConversionCtaProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  background?: "dark" | "primary" | "default";
}

export function ConversionCta({
  eyebrow = "Ready to Grow?",
  title = "Let's Build Your Growth System",
  description = "Book a free 30-minute discovery call. We'll audit your current lead flow and show you exactly where the gaps are — no pitch, no pressure.",
  primaryCta = { label: "Book a Discovery Call", href: "/contact" },
  secondaryCta = { label: "View Our Services", href: "/services" },
  background = "dark",
}: ConversionCtaProps) {
  const isDark = background === "dark" || background === "primary";

  return (
    <Section size="lg" background={background}>
      <ScrollReveal stagger={false} className="mx-auto max-w-3xl text-center">
        {eyebrow && (
          <p
            className={`text-sm font-semibold uppercase tracking-widest ${
              isDark ? "text-primary-foreground/70" : "text-primary"
            }`}
          >
            {eyebrow}
          </p>
        )}
        <h2
          className={`mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl ${
            isDark ? "text-white" : "text-foreground"
          }`}
        >
          {title}
        </h2>
        <p
          className={`mt-6 text-lg sm:text-xl ${
            isDark ? "text-white/80" : "text-muted-foreground"
          }`}
        >
          {description}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" className="text-base" render={<Link href={primaryCta.href} />}>
            {primaryCta.label}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          {secondaryCta && (
            <Button
              variant={isDark ? "secondary" : "outline"}
              size="lg"
              className="text-base"
              render={<Link href={secondaryCta.href} />}
            >
              {secondaryCta.label}
            </Button>
          )}
        </div>
      </ScrollReveal>
    </Section>
  );
}

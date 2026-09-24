import { Section } from "@/components/sections/section";
import { ScrollReveal, RevealItem } from "@/components/scroll-reveal";

interface Stat {
  value: string;
  label: string;
  description?: string;
}

/**
 * Unused as of 2026-09-23. It previously shipped four invented figures (3x
 * lead increase, 48hr response, 95% retention, 6+ industries) which were live
 * on the homepage and backed by nothing.
 *
 * `stats` is deliberately required and has no default: this section cannot
 * render until someone passes numbers they can actually source. Do not add a
 * default array back.
 */
interface StatsBarProps {
  stats: Stat[];
}

export function StatsBar({ stats }: StatsBarProps) {
  if (stats.length === 0) return null;

  return (
    <Section size="sm" background="primary">
      <ScrollReveal className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-primary-foreground/10 lg:grid-cols-4">
        {stats.map((stat) => (
          <RevealItem
            key={stat.label}
            className="flex flex-col justify-center bg-primary px-6 py-8 lg:px-8 lg:py-10"
          >
            <span className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {stat.value}
            </span>
            <span className="mt-1 text-sm font-medium text-primary-foreground/90">
              {stat.label}
            </span>
            {stat.description && (
              <span className="mt-0.5 text-xs text-primary-foreground/60">
                {stat.description}
              </span>
            )}
          </RevealItem>
        ))}
      </ScrollReveal>
    </Section>
  );
}

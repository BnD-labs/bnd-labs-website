import { Section } from "@/components/sections/section";
import { ScrollReveal, RevealItem } from "@/components/scroll-reveal";

interface Stat {
  value: string;
  label: string;
  description?: string;
}

const defaultStats: Stat[] = [
  {
    value: "3x",
    label: "Avg. lead increase",
    description: "Within 90 days of Retainer",
  },
  {
    value: "48hr",
    label: "Response time",
    description: "To qualified inbound leads",
  },
  {
    value: "95%",
    label: "Client retention",
    description: "After first 3 months",
  },
  {
    value: "6+",
    label: "Industries served",
    description: "Healthcare, hospitality & more",
  },
];

interface StatsBarProps {
  stats?: Stat[];
}

export function StatsBar({ stats = defaultStats }: StatsBarProps) {
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

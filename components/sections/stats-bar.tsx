import { Section, SectionHeader } from "@/components/sections/section";
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
    value: "15+",
    label: "Industries served",
    description: "Across Zambia",
  },
];

interface StatsBarProps {
  stats?: Stat[];
  eyebrow?: string;
  title?: string;
}

export function StatsBar({
  stats = defaultStats,
  eyebrow = "Results",
  title = "Numbers That Speak for Themselves",
}: StatsBarProps) {
  return (
    <Section size="md" background="primary">
      <ScrollReveal>
        <div className="mb-12 max-w-3xl text-center mx-auto">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary-foreground/70">
            {eyebrow}
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
        </div>
      </ScrollReveal>
      <ScrollReveal className="grid grid-cols-2 gap-8 lg:grid-cols-4">
        {stats.map((stat) => (
          <RevealItem key={stat.label} className="text-center">
            <div className="font-display text-5xl font-bold tracking-tight sm:text-6xl">
              {stat.value}
            </div>
            <div className="mt-2 text-sm font-semibold uppercase tracking-wide text-primary-foreground/90">
              {stat.label}
            </div>
            {stat.description && (
              <p className="mt-1 text-sm text-primary-foreground/70">
                {stat.description}
              </p>
            )}
          </RevealItem>
        ))}
      </ScrollReveal>
    </Section>
  );
}

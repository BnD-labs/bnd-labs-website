import { TrendingDown, Clock, Users } from "lucide-react";
import { Section } from "@/components/sections/section";
import { ScrollReveal, RevealItem } from "@/components/scroll-reveal";

const problems = [
  {
    icon: TrendingDown,
    title: "Inconsistent Lead Flow",
    description:
      "Some months you're flooded with leads. Other months, nothing. You can't forecast, plan, or scale when revenue is unpredictable.",
  },
  {
    icon: Clock,
    title: "Wasted Time on the Wrong Leads",
    description:
      "Your team chases cold prospects while hot leads slip through the cracks. No qualification, no follow-up system, no leverage.",
  },
  {
    icon: Users,
    title: "Dependency on Word-of-Mouth",
    description:
      "Referrals brought you here, but they won't take you there. Growth plateaus when you don't control your own lead pipeline.",
  },
];

export function ProblemSection() {
  return (
    <Section size="lg" background="muted">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
        {/* Left column — section header, left-aligned */}
        <div className="lg:col-span-5 lg:sticky lg:top-32">
          <ScrollReveal stagger={false}>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              The Problem
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Your Business Is Losing Leads. Here&rsquo;s Why.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Most Zambian businesses rely on luck, referrals, or freelancers.
              None of those scale.
            </p>
          </ScrollReveal>
        </div>

        {/* Right column — problems as a stacked list, no cards */}
        <div className="lg:col-span-7">
          <ScrollReveal className="space-y-10">
            {problems.map((problem) => {
              const Icon = problem.icon;
              return (
                <RevealItem key={problem.title}>
                  <div className="flex gap-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground sm:text-xl">
                        {problem.title}
                      </h3>
                      <p className="mt-2 leading-relaxed text-muted-foreground">
                        {problem.description}
                      </p>
                    </div>
                  </div>
                </RevealItem>
              );
            })}
          </ScrollReveal>
        </div>
      </div>
    </Section>
  );
}

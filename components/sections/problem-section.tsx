import { TrendingDown, Clock, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/sections/section";
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
    <Section size="md" background="muted">
      <SectionHeader
        eyebrow="The Problem"
        title="Your Business Is Losing Leads. Here's Why."
        description="Most Zambian businesses rely on luck, referrals, or freelancers. None of those scale."
      />
      <ScrollReveal className="grid gap-6 md:grid-cols-3">
        {problems.map((problem) => {
          const Icon = problem.icon;
          return (
            <RevealItem key={problem.title}>
              <Card className="h-full border-border/60 bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <CardContent className="p-6 sm:p-8">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    {problem.title}
                  </h3>
                  <p className="mt-3 text-muted-foreground">
                    {problem.description}
                  </p>
                </CardContent>
              </Card>
            </RevealItem>
          );
        })}
      </ScrollReveal>
    </Section>
  );
}

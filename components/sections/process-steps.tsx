import { Search, Lightbulb, Wrench, Rocket } from "lucide-react";
import { Section, SectionHeader } from "@/components/sections/section";
import { ScrollReveal, RevealItem } from "@/components/scroll-reveal";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discovery",
    description:
      "We audit your current lead flow, identify leaks, and map your ideal customer journey. No assumptions — only data.",
  },
  {
    number: "02",
    icon: Lightbulb,
    title: "Strategy",
    description:
      "We design your custom growth system: channels, funnels, automation logic, and content architecture tailored to your industry.",
  },
  {
    number: "03",
    icon: Wrench,
    title: "Build",
    description:
      "We implement the full infrastructure — website, CRM, lead capture, nurture sequences, and reporting dashboards.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Launch & Optimize",
    description:
      "We go live, monitor performance, and iterate weekly. Your system gets smarter the longer it runs.",
  },
];

export function ProcessSteps() {
  return (
    <Section size="lg">
      <SectionHeader
        eyebrow="How We Work"
        title="A Systems Approach to Growth"
        description="Four phases. One outcome: a lead engine that runs without you."
      />
      <ScrollReveal className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <RevealItem key={step.number}>
              <div className="flex items-center gap-3">
                <span className="font-display text-5xl font-bold text-primary/20">
                  {step.number}
                </span>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-3 text-muted-foreground">{step.description}</p>
            </RevealItem>
          );
        })}
      </ScrollReveal>
    </Section>
  );
}

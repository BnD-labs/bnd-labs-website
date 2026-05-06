import { Section, SectionHeader } from "@/components/sections/section";
import { ScrollReveal, RevealItem } from "@/components/scroll-reveal";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We audit your current lead flow, identify leaks, and map your ideal customer journey. No assumptions — only data.",
  },
  {
    number: "02",
    title: "Strategy",
    description:
      "We design your custom growth system: channels, funnels, automation logic, and content architecture tailored to your industry.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "We implement the full infrastructure — website, CRM, lead capture, nurture sequences, and reporting dashboards.",
  },
  {
    number: "04",
    title: "Launch & Optimize",
    description:
      "We go live, monitor performance, and iterate weekly. Your system gets smarter the longer it runs.",
  },
];

export function ProcessSteps() {
  return (
    <Section size="md">
      <SectionHeader
        eyebrow="How We Work"
        title="A Systems Approach to Growth"
        description="Four phases. One outcome: a lead engine that runs without you."
        align="left"
      />

      {/* Ruled list layout — number | title | description */}
      <ScrollReveal className="divide-y divide-border">
        {steps.map((step) => (
          <RevealItem key={step.number}>
            <div className="grid grid-cols-12 items-baseline gap-4 py-8 first:pt-0 lg:gap-8 lg:py-12">
              <div className="col-span-2 sm:col-span-1">
                <span className="font-display text-3xl font-bold text-primary/25 lg:text-4xl">
                  {step.number}
                </span>
              </div>
              <div className="col-span-10 sm:col-span-3 lg:col-span-3">
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {step.title}
                </h3>
              </div>
              <div className="col-span-12 sm:col-span-8 sm:col-start-5 lg:col-span-7 lg:col-start-5">
                <p className="leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          </RevealItem>
        ))}
      </ScrollReveal>
    </Section>
  );
}

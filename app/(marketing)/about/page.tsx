import type { Metadata } from "next";
import {
  Target,
  Zap,
  Shield,
  Heart,
  Building2,
  GraduationCap,
  UtensilsCrossed,
} from "lucide-react";
import { Section, SectionHeader } from "@/components/sections/section";
import { Card, CardContent } from "@/components/ui/card";
import { StatsBar } from "@/components/sections/stats-bar";
import { ConversionCta } from "@/components/sections/conversion-cta";

export const metadata: Metadata = {
  title: "About BND Labs — Growth Systems Architects, Lusaka",
  description:
    "BND Labs builds digital infrastructure that generates consistent, predictable leads for established Zambian businesses in healthcare, hospitality, and education.",
};

const values = [
  {
    icon: Target,
    title: "Systems Over Services",
    description:
      "We don't sell hours or campaigns. We build infrastructure that compounds — assets you own, not dependencies you rent.",
  },
  {
    icon: Zap,
    title: "Speed With Substance",
    description:
      "We ship fast because our clients can't wait. But we never sacrifice architecture for speed — every system is built to scale.",
  },
  {
    icon: Shield,
    title: "Radical Transparency",
    description:
      "No vanity metrics. No jargon. You get dashboards that show exactly what's working, what's not, and what we're doing about it.",
  },
  {
    icon: Heart,
    title: "Zambia First",
    description:
      "We understand this market because we're in it. Our playbooks are built for Zambian buying behavior, not imported from Silicon Valley.",
  },
];

const industries = [
  {
    icon: Heart,
    name: "Healthcare",
    description:
      "Private clinics and medical practices that need a steady stream of qualified patient inquiries without relying on word-of-mouth alone.",
    examples: "Private clinics, dental practices, specialist consultancies",
  },
  {
    icon: UtensilsCrossed,
    name: "Hospitality",
    description:
      "Lodges, hotels, and restaurants that want direct bookings instead of paying commissions to third-party platforms.",
    examples: "Safari lodges, boutique hotels, restaurant groups",
  },
  {
    icon: GraduationCap,
    name: "Education",
    description:
      "Private schools that need to fill enrollment pipelines with qualified families during admission cycles.",
    examples: "Private schools, training centres, educational programmes",
  },
  {
    icon: Building2,
    name: "Professional Services",
    description:
      "Law firms, accounting practices, and consultancies that want to systematize their client acquisition beyond referrals.",
    examples: "Law firms, accounting firms, consultancies",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <Section size="lg">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            About BND Labs
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            We Build Growth Systems.{" "}
            <span className="text-primary">Not Campaigns.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
            BND Labs is a digital agency based in Lusaka, Zambia. We help
            established businesses generate consistent, predictable leads
            through digital infrastructure — not freelancer hours, not ad spend,
            not luck.
          </p>
        </div>
      </Section>

      {/* Story */}
      <Section size="md" background="muted">
        <div className="mx-auto max-w-3xl">
          <SectionHeader
            eyebrow="Our Story"
            title="Born From a Simple Observation"
            align="left"
          />
          <div className="space-y-6 text-muted-foreground">
            <p>
              Most Zambian businesses hit a ceiling. They grow through referrals,
              word-of-mouth, and personal networks until one day those sources
              plateau. Revenue becomes unpredictable. Growth stalls.
            </p>
            <p>
              The typical response is to hire a freelancer or run some ads. But
              that creates a new problem: you&apos;re now dependent on someone else&apos;s
              time or a platform&apos;s algorithm. Stop paying, stop growing.
            </p>
            <p>
              We started BND Labs to offer a third option:{" "}
              <strong className="text-foreground">
                build the infrastructure once, and let it generate leads on
                autopilot.
              </strong>{" "}
              A website that converts. A CRM that qualifies. Follow-up sequences
              that close. Dashboards that show you everything.
            </p>
            <p>
              We call these <strong className="text-foreground">growth systems</strong> — and
              once they&apos;re running, they don&apos;t stop when a freelancer goes on
              holiday.
            </p>
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section size="lg">
        <SectionHeader
          eyebrow="What We Believe"
          title="Principles That Guide Every Build"
          description="These aren't wall posters. They're the decisions we make when nobody's watching."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <Card key={value.title} className="border-border/60">
                <CardContent className="p-6 sm:p-8">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Stats */}
      <StatsBar />

      {/* Industries */}
      <Section size="lg">
        <SectionHeader
          eyebrow="Who We Serve"
          title="Industries We Know Inside Out"
          description="We specialize so we can go deep. Every playbook is built for the specific lead patterns of these industries."
        />
        <div className="grid gap-8 md:grid-cols-2">
          {industries.map((industry) => {
            const Icon = industry.icon;
            return (
              <div key={industry.name} className="flex gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {industry.name}
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    {industry.description}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground/70">
                    {industry.examples}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* CTA */}
      <ConversionCta
        eyebrow="Work With Us"
        title="Ready to Build Your Growth System?"
        description="Book a free 30-minute discovery call. We'll audit your current lead flow and tell you honestly whether a growth system is the right move."
        primaryCta={{ label: "Book a Discovery Call", href: "/contact" }}
        secondaryCta={{ label: "See Our Services", href: "/services" }}
      />
    </>
  );
}

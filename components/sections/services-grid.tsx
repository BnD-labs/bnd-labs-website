"use client";

import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/sections/section";
import { ScrollReveal, RevealItem } from "@/components/scroll-reveal";
import { cn } from "@/lib/utils";

export const services = [
  {
    id: "growth-starter",
    name: "Growth Starter",
    tagline: "Your digital foundation, engineered to generate leads from day one.",
    price: "ZMW 5,000 – 8,000",
    priceNote: "One-time project",
    duration: "2–3 weeks",
    badge: null,
    features: [
      "Brand identity + messaging",
      "Conversion-focused website",
      "Social optimization",
      "30-day content strategy",
      "CRM setup",
      "Lead capture system",
    ],
    cta: "Start Your Foundation",
    href: "/services#growth-starter",
    highlight: false,
  },
  {
    id: "growth-retainer",
    name: "Growth System Retainer",
    tagline:
      "We run your lead generation engine every month — so you scale without adding workload.",
    price: "ZMW 4,500 – 6,000",
    priceNote: "Per month · 3-month minimum",
    duration: "Ongoing",
    badge: "Most Popular",
    features: [
      "Monthly content creation",
      "Social media management",
      "Lead generation workflows",
      "AI automation",
      "Performance reports",
      "Monthly strategy sessions",
    ],
    cta: "Scale Your Pipeline",
    href: "/services#growth-retainer",
    highlight: true,
  },
  {
    id: "ai-growth-engine",
    name: "AI Growth Engine",
    tagline: "We build and install a custom AI-powered lead and operations system.",
    price: "ZMW 12,000 – 20,000",
    priceNote: "Project + ZMW 6,000/mo maintenance",
    duration: "4–6 weeks",
    badge: "Coming Soon",
    features: [
      "Custom AI lead qualification",
      "Automated follow-up sequences",
      "Intelligent routing",
      "Operations automation",
      "Performance dashboards",
      "Ongoing optimization",
    ],
    cta: "Join the Waitlist",
    href: "/services#ai-growth-engine",
    highlight: false,
  },
];

export function ServicesGrid() {
  return (
    <Section size="lg">
      <SectionHeader
        eyebrow="Our Services"
        title="From Foundation to Full Growth Engine"
        description="Three tiers. One philosophy: build systems, not dependencies."
      />
      <ScrollReveal className="grid gap-6 lg:grid-cols-3">
        {services.map((service) => (
          <RevealItem key={service.id}>
            <Card
              className={cn(
                "relative flex h-full flex-col overflow-visible border-border/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
                service.highlight &&
                  "border-primary/40 shadow-lg shadow-primary/10 ring-1 ring-primary/20 hover:shadow-xl hover:shadow-primary/15",
              )}
            >
              {service.badge && (
                <Badge
                  className={cn(
                    "absolute -top-3 left-6",
                    service.highlight
                      ? "bg-primary text-primary-foreground"
                      : "bg-accent text-accent-foreground",
                  )}
                >
                  {service.badge}
                </Badge>
              )}
              <CardContent className="flex flex-1 flex-col p-6 sm:p-8">
                <h3 className="font-display text-2xl font-bold text-foreground">
                  {service.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {service.tagline}
                </p>
                <div className="mt-6 border-b border-border pb-6">
                  <div className="font-display text-3xl font-bold text-foreground">
                    {service.price}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {service.priceNote} · {service.duration}
                  </p>
                </div>
                <ul className="mt-6 flex-1 space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href={service.href} className="mt-8">
                  <Button
                    variant={service.highlight ? "default" : "outline"}
                    className="w-full"
                    size="lg"
                  >
                    {service.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </RevealItem>
        ))}
      </ScrollReveal>
    </Section>
  );
}

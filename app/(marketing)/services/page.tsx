import type { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  ArrowRight,
  Globe,
  Palette,
  BarChart3,
  Mail,
  Bot,
  Workflow,
  Gauge,
  Users,
  Megaphone,
  CalendarCheck,
} from "lucide-react";
import { Section } from "@/components/sections/section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProcessSteps } from "@/components/sections/process-steps";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { Testimonials } from "@/components/sections/testimonials";
import { ConversionCta } from "@/components/sections/conversion-cta";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services — Growth Systems for Zambian Businesses | BND Labs",
  description:
    "From digital foundations to full AI-powered growth engines. Three service tiers designed to generate consistent, predictable leads for established Zambian businesses.",
};

const serviceDetails = [
  {
    id: "growth-starter",
    name: "Growth Starter",
    tagline:
      "Your digital foundation, engineered to generate leads from day one.",
    price: "ZMW 5,000 – 8,000",
    priceNote: "One-time project",
    duration: "2–3 weeks",
    badge: null,
    highlight: false,
    description:
      "Most businesses come to us with a website that looks fine but doesn't convert. The Growth Starter fixes that — we build your entire digital foundation from scratch, optimized for lead capture from day one.",
    deliverables: [
      {
        icon: Palette,
        title: "Brand Identity & Messaging",
        detail:
          "Logo refinement, brand guidelines, and messaging framework that speaks directly to your ideal customer.",
      },
      {
        icon: Globe,
        title: "Conversion-Focused Website",
        detail:
          "A fast, mobile-first website built to capture leads — not just look pretty. Every page has a job.",
      },
      {
        icon: Megaphone,
        title: "Social Optimization",
        detail:
          "Your Google Business Profile, social accounts, and directory listings — all aligned and optimized.",
      },
      {
        icon: CalendarCheck,
        title: "30-Day Content Strategy",
        detail:
          "A month of content mapped to your buyer journey so you launch with momentum, not silence.",
      },
      {
        icon: Users,
        title: "CRM Setup & Lead Capture",
        detail:
          "Forms, landing pages, and a CRM configured to capture, qualify, and route every lead.",
      },
    ],
    idealFor:
      "Businesses that have been running 3+ years and know what they sell, but their digital presence doesn't reflect their quality.",
    cta: "Start Your Foundation",
    href: "/contact",
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
    highlight: true,
    description:
      "The Starter gives you the foundation. The Retainer keeps it running and growing. We manage your entire lead generation engine — content, social, automation, reporting — every single month.",
    deliverables: [
      {
        icon: Megaphone,
        title: "Monthly Content Creation",
        detail:
          "Blog posts, social content, and email campaigns — all written, designed, and published for you.",
      },
      {
        icon: BarChart3,
        title: "Social Media Management",
        detail:
          "Daily posting, community engagement, and audience growth across your key platforms.",
      },
      {
        icon: Workflow,
        title: "Lead Generation Workflows",
        detail:
          "Automated follow-up sequences, qualification flows, and nurture campaigns that run 24/7.",
      },
      {
        icon: Bot,
        title: "AI Automation",
        detail:
          "Smart chatbots, auto-responses, and intelligent routing that handle inquiries instantly.",
      },
      {
        icon: Gauge,
        title: "Performance Reports",
        detail:
          "Monthly dashboards showing leads generated, conversion rates, and revenue attribution.",
      },
      {
        icon: CalendarCheck,
        title: "Monthly Strategy Sessions",
        detail:
          "A dedicated call each month to review results, adjust tactics, and plan the next sprint.",
      },
    ],
    idealFor:
      "Businesses that have their foundation in place and want consistent, predictable lead flow without hiring an in-house marketing team.",
    cta: "Scale Your Pipeline",
    href: "/contact",
  },
  {
    id: "ai-growth-engine",
    name: "AI Growth Engine",
    tagline:
      "We build and install a custom AI-powered lead and operations system.",
    price: "ZMW 12,000 – 20,000",
    priceNote: "Project + ZMW 6,000/mo maintenance",
    duration: "4–6 weeks",
    badge: "Coming Soon",
    highlight: false,
    description:
      "For businesses ready to go beyond standard automation. We design and deploy a custom AI system that qualifies leads, automates operations, and optimizes itself over time.",
    deliverables: [
      {
        icon: Bot,
        title: "Custom AI Lead Qualification",
        detail:
          "An AI agent that scores, qualifies, and routes leads based on your specific criteria — no human bottleneck.",
      },
      {
        icon: Mail,
        title: "Automated Follow-Up Sequences",
        detail:
          "Personalized email and messaging sequences triggered by lead behavior, not just time delays.",
      },
      {
        icon: Workflow,
        title: "Intelligent Routing",
        detail:
          "Leads get sent to the right person or department automatically based on qualification data.",
      },
      {
        icon: Gauge,
        title: "Operations Automation",
        detail:
          "Repetitive admin tasks — appointment scheduling, document generation, data entry — handled by AI.",
      },
      {
        icon: BarChart3,
        title: "Performance Dashboards",
        detail:
          "Real-time analytics showing lead quality, conversion velocity, and system health.",
      },
      {
        icon: CalendarCheck,
        title: "Ongoing Optimization",
        detail:
          "Monthly tuning of AI models, workflow adjustments, and performance optimization.",
      },
    ],
    idealFor:
      "Established businesses processing 50+ leads/month that want to eliminate manual qualification and scale without adding headcount.",
    cta: "Join the Waitlist",
    href: "/contact",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <Section size="lg">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Our Services
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Three Tiers.{" "}
            <span className="text-primary">One Philosophy.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
            Build systems, not dependencies. Every tier is designed to give you
            ownership of your growth — not lock you into our hours.
          </p>
        </div>
      </Section>

      {/* Service Details */}
      {serviceDetails.map((service, idx) => (
        <Section
          key={service.id}
          id={service.id}
          size="lg"
          background={idx % 2 === 0 ? "muted" : "default"}
        >
          <div className="mx-auto max-w-5xl">
            {/* Header */}
            <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-2xl">
                {service.badge && (
                  <Badge
                    className={cn(
                      "mb-4",
                      service.highlight
                        ? "bg-primary text-primary-foreground"
                        : "bg-accent text-accent-foreground",
                    )}
                  >
                    {service.badge}
                  </Badge>
                )}
                <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {service.name}
                </h2>
                <p className="mt-3 text-lg text-muted-foreground">
                  {service.tagline}
                </p>
                <p className="mt-4 text-muted-foreground">
                  {service.description}
                </p>
              </div>
              <div className="shrink-0 rounded-xl border border-border bg-background p-6 text-center shadow-sm">
                <div className="font-display text-3xl font-bold text-foreground">
                  {service.price}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {service.priceNote}
                </p>
                <p className="text-sm text-muted-foreground">
                  {service.duration}
                </p>
                <Link href={service.href} className="mt-4 block">
                  <Button
                    variant={service.highlight ? "default" : "outline"}
                    className="w-full"
                  >
                    {service.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Deliverables grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {service.deliverables.map((item) => {
                const Icon = item.icon;
                return (
                  <Card key={item.title} className="border-border/60">
                    <CardContent className="p-6">
                      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-display text-base font-semibold text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {item.detail}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Ideal for */}
            <div className="mt-8 flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/5 p-5">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <p className="text-sm text-foreground">
                <strong>Ideal for:</strong> {service.idealFor}
              </p>
            </div>
          </div>
        </Section>
      ))}

      {/* Process */}
      <ProcessSteps />

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ */}
      <FaqAccordion />

      {/* CTA */}
      <ConversionCta
        eyebrow="Not Sure Which Tier?"
        title="Let's Figure It Out Together"
        description="Book a free 30-minute discovery call. We'll assess your current setup and recommend the right starting point — no pressure, no pitch."
        primaryCta={{ label: "Book a Discovery Call", href: "/contact" }}
        secondaryCta={{ label: "Learn About Us", href: "/about" }}
      />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Section } from "@/components/sections/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Thank You | BND Labs",
  description: "We've received your message. Here's what happens next.",
};

const nextSteps = [
  {
    title: "Check Your Inbox",
    description:
      "You'll receive a confirmation email shortly. If you requested a discovery call, we'll send a calendar link within 24 hours.",
  },
  {
    title: "We Review Your Details",
    description:
      "Our team reviews every submission personally — no auto-responses, no bots. We'll prepare specific insights for your business.",
  },
  {
    title: "We Come Prepared",
    description:
      "When we connect, we'll already have an initial audit of your digital presence and actionable recommendations ready to discuss.",
  },
];

export default function ThankYouPage() {
  return (
    <Section size="lg">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle2 className="h-8 w-8 text-primary" />
        </div>
        <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          We&apos;ve Got Your Message
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Thanks for reaching out. We take every inquiry seriously — here&apos;s
          what happens next.
        </p>
      </div>

      {/* Next steps */}
      <div className="mx-auto mt-16 grid max-w-3xl gap-6 sm:grid-cols-3">
        {nextSteps.map((step, i) => {
          return (
            <Card key={step.title} className="border-border/60 text-center">
              <CardContent className="p-6">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <span className="font-display text-sm font-bold text-primary">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-display text-base font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Actions */}
      <div className="mx-auto mt-12 flex max-w-md flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Button variant="default" size="lg" render={<Link href="/blog" />}>
          Read Our Blog
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button variant="outline" size="lg" render={<Link href="/" />}>
          Back to Home
        </Button>
      </div>
    </Section>
  );
}

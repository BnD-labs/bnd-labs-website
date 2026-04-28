import { Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Section, SectionHeader } from "@/components/sections/section";
import { ScrollReveal, RevealItem } from "@/components/scroll-reveal";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  industry?: string;
}

const defaultTestimonials: Testimonial[] = [
  {
    quote:
      "We went from 2 leads a month to over 15 qualified inquiries — without hiring anyone. BND Labs built a system that runs itself.",
    author: "Dr. N. Banda",
    role: "Founder",
    company: "Private Clinic, Lusaka",
    industry: "Healthcare",
  },
  {
    quote:
      "They don't sell services. They build systems. Our booking flow hasn't stopped since we launched with them.",
    author: "J. Mwansa",
    role: "General Manager",
    company: "Safari Lodge",
    industry: "Hospitality",
  },
  {
    quote:
      "The monthly retainer changed everything. I stopped managing marketing and started running my school. That's what a growth system does.",
    author: "Mrs. T. Phiri",
    role: "Director",
    company: "Private School, Copperbelt",
    industry: "Education",
  },
];

interface TestimonialsProps {
  testimonials?: Testimonial[];
}

export function Testimonials({
  testimonials = defaultTestimonials,
}: TestimonialsProps) {
  return (
    <Section size="lg" background="muted">
      <SectionHeader
        eyebrow="Client Stories"
        title="Trusted by Ambitious Zambian Businesses"
        description="Real clients. Real results. Real systems."
      />
      <ScrollReveal className="grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial, i) => (
          <RevealItem key={i}>
            <Card className="h-full border-border/60 bg-background transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <CardContent className="flex h-full flex-col p-6 sm:p-8">
                <Quote
                  className="h-8 w-8 text-primary/30"
                  aria-hidden="true"
                />
                <p className="mt-4 flex-1 text-foreground">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="mt-6 border-t border-border pt-4">
                  <p className="font-semibold text-foreground">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role} · {testimonial.company}
                  </p>
                </div>
              </CardContent>
            </Card>
          </RevealItem>
        ))}
      </ScrollReveal>
    </Section>
  );
}

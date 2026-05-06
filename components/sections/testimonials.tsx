import { Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Section } from "@/components/sections/section";
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
  const [featured, ...supporting] = testimonials;

  return (
    <Section size="md" background="muted">
      {/* Left-aligned header — no eyebrow for variety */}
      <ScrollReveal stagger={false}>
        <div className="mb-12 max-w-2xl sm:mb-16">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Trusted by Ambitious Zambian Businesses
          </h2>
        </div>
      </ScrollReveal>

      {/* Asymmetric grid: featured quote large, supporting stacked */}
      <ScrollReveal className="grid gap-6 lg:grid-cols-5">
        {/* Featured testimonial — spans 3 columns */}
        <RevealItem className="lg:col-span-3">
          <Card className="h-full border-border/60 bg-background">
            <CardContent className="flex h-full flex-col p-8 sm:p-10 lg:p-12">
              <Quote
                className="h-10 w-10 text-primary/30"
                aria-hidden="true"
              />
              <p className="mt-6 flex-1 font-display text-xl font-medium leading-relaxed text-foreground sm:text-2xl">
                &ldquo;{featured.quote}&rdquo;
              </p>
              <div className="mt-8">
                <p className="font-semibold text-foreground">
                  {featured.author}
                </p>
                <p className="text-sm text-muted-foreground">
                  {featured.role} · {featured.company}
                </p>
              </div>
            </CardContent>
          </Card>
        </RevealItem>

        {/* Supporting testimonials — stacked in 2 columns */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          {supporting.map((testimonial, i) => (
            <RevealItem key={i} className="flex-1">
              <Card className="h-full border-border/60 bg-background">
                <CardContent className="flex h-full flex-col p-6 sm:p-8">
                  <Quote
                    className="h-6 w-6 text-primary/30"
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
        </div>
      </ScrollReveal>
    </Section>
  );
}

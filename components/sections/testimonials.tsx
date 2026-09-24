import { ArrowUpRight, Quote, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Section } from "@/components/sections/section";
import { ScrollReveal, RevealItem } from "@/components/scroll-reveal";

/**
 * The Business Profile itself, where the reviews can be read.
 *
 * Deliberately not `.../review` — that variant resolves to Google's
 * write-a-review dialog (`12e1`, `laa=nmx-review-solicitation`), which is the
 * right link for asking a finished client to leave feedback, and the wrong one
 * for a visitor checking that these quotes are real. Also not the
 * google.com/search?... URL, which carries `sxsrf`/`ved`/`sca_esv` session
 * tokens from a signed-in manager view.
 */
const GOOGLE_REVIEWS_URL = "https://g.page/r/CRaGQ8ktcQpZEBM";

interface Testimonial {
  quote: string;
  author: string;
  company?: string;
  industry?: string;
  /** Out of five. Every review we hold is a public 5-star Google review. */
  rating: number;
}

/**
 * Verbatim from BND Labs' public Google Business Profile reviews. These are
 * real, attributable and independently checkable, which is the whole point —
 * do not edit the wording, and do not add a quote that isn't published there.
 */
const defaultTestimonials: Testimonial[] = [
  {
    quote:
      "Working with BND Labs has been exceptional. As a Logistics and Supply company, BASTUKU needed to be seen by the right customers, and they delivered. Through their Growth Starter package, they built our digital infrastructure from scratch in just two weeks: a great website that showcases our services and lets clients make bookings, our social media platforms, a clear content strategy, and a proper lead capture system. Within three weeks we had 15 qualified leads, which turned into 8 quotes and 3 invoices. That is real, measurable business, not just likes.",
    author: "Mildred Musonda",
    company: "Bastuku Investments",
    industry: "Logistics & Supply",
    rating: 5,
  },
  {
    quote:
      "We have been working with BnD Labs for months now. Their work is nothing short of incredible. Keep it up",
    author: "Queso Pizza",
    company: "Chongwe, Lusaka",
    industry: "Hospitality & F&B",
    rating: 5,
  },
  {
    quote: "Thank you for the great works on my company website.",
    author: "Future",
    rating: 5,
  },
];

interface TestimonialsProps {
  testimonials?: Testimonial[];
}

function Rating({ value }: { value: number }) {
  return (
    <div
      className="flex gap-0.5"
      role="img"
      aria-label={`${value} out of 5 stars`}
    >
      {Array.from({ length: value }, (_, i) => (
        <Star
          key={i}
          className="h-4 w-4 fill-warning text-warning"
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function Attribution({ testimonial }: { testimonial: Testimonial }) {
  const detail = [testimonial.company, testimonial.industry]
    .filter(Boolean)
    .join(" · ");

  return (
    <>
      <p className="font-semibold text-foreground">{testimonial.author}</p>
      {detail && <p className="text-sm text-muted-foreground">{detail}</p>}
      <p className="mt-1 text-xs text-muted-foreground">Google review</p>
    </>
  );
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
          <p className="mt-4 text-muted-foreground">
            Every review below is public on our Google Business Profile, in the
            client&rsquo;s own words.
          </p>
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            Read them on Google
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
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
              <p className="mt-6 flex-1 font-display text-lg font-medium leading-relaxed text-foreground sm:text-xl">
                &ldquo;{featured.quote}&rdquo;
              </p>
              <div className="mt-8">
                <Rating value={featured.rating} />
                <div className="mt-3">
                  <Attribution testimonial={featured} />
                </div>
              </div>
            </CardContent>
          </Card>
        </RevealItem>

        {/* Supporting testimonials — stacked in 2 columns */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          {supporting.map((testimonial) => (
            <RevealItem key={testimonial.author} className="flex-1">
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
                    <Rating value={testimonial.rating} />
                    <div className="mt-3">
                      <Attribution testimonial={testimonial} />
                    </div>
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

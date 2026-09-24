import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/sections/section";
import { ScrollReveal, RevealItem } from "@/components/scroll-reveal";

interface Project {
  sector: string;
  client: string;
  descriptor: string;
  /** What was actually built and handed over. */
  built: string[];
  /** Only present where the client stated it publicly themselves. */
  outcome?: {
    quote: string;
    attribution: string;
  };
  href: string;
  /** Domain shown as the link label. */
  domain: string;
}

/**
 * Every entry here is a live site we can link to, and every outcome is quoted
 * from the client's own public Google review rather than asserted by us. If a
 * project has no verifiable outcome, it ships without one — do not write a
 * result we cannot point at.
 */
const projects: Project[] = [
  {
    sector: "Logistics & Freight",
    client: "Bastuku Investments",
    descriptor: "Movers and logistics, Lusaka",
    built: [
      "Conversion website with online bookings",
      "Lead capture system",
      "Social platforms set up and running",
      "Content strategy",
    ],
    outcome: {
      quote:
        "Within three weeks we had 15 qualified leads, which turned into 8 quotes and 3 invoices. That is real, measurable business, not just likes.",
      attribution: "Mildred Musonda, Bastuku Investments · Google review",
    },
    href: "https://bastuku-inv.com",
    domain: "bastuku-inv.com",
  },
  {
    sector: "Hospitality & F&B",
    client: "Queso Pizza",
    descriptor: "Fast-food restaurant, Chongwe",
    built: [
      "Mobile-first marketing site",
      "WhatsApp order builder with call-to-confirm",
      "Menu system priced in Kwacha",
    ],
    href: "https://quesopizza.com",
    domain: "quesopizza.com",
  },
];

export function SelectedWork() {
  return (
    <Section size="md">
      <SectionHeader
        title="Systems We've Built"
        description="Live sites you can open right now, for businesses you can look up."
        align="left"
      />

      {/* Ruled bands — identity on the left, what shipped on the right */}
      <ScrollReveal className="divide-y divide-border border-b border-border">
        {projects.map((project) => (
          <RevealItem key={project.client}>
            <article className="grid gap-6 py-8 lg:grid-cols-12 lg:gap-12 lg:py-12">
              <div className="lg:col-span-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {project.sector}
                </p>
                <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-foreground">
                  {project.client}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {project.descriptor}
                </p>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline"
                >
                  {project.domain}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </div>

              <div className="lg:col-span-8">
                <ul className="grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                  {project.built.map((item) => (
                    <li
                      key={item}
                      className="text-sm leading-relaxed text-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                {project.outcome && (
                  <figure className="mt-8 border-l border-border pl-5">
                    <blockquote className="font-display text-lg font-medium leading-relaxed text-foreground">
                      &ldquo;{project.outcome.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-3 text-sm text-muted-foreground">
                      {project.outcome.attribution}
                    </figcaption>
                  </figure>
                )}
              </div>
            </article>
          </RevealItem>
        ))}
      </ScrollReveal>
    </Section>
  );
}

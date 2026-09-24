import type { CSSProperties } from "react";
import { Section } from "./section";
import { ScrollReveal, RevealItem } from "@/components/scroll-reveal";

/**
 * What an engagement actually includes.
 *
 * This was six cards, each carrying a bespoke SVG mockup of software that did
 * not exist - abstract grey-box interfaces standing in for a product. That was
 * the best available option when the page had nothing real to show. It no
 * longer is: the hero shows the actual Prospect Engine and Selected Work links
 * to two live client sites, and against those, invented interfaces were the
 * weakest content on the page.
 *
 * Cut to four parts with no illustrations, and inverted onto the brand purple
 * so it reads as the one dark moment in the page rather than a third ruled
 * section. Removing the mockups also removed ~380 lines of inline SVG and the
 * entire feat-anim-* animation system they depended on.
 */
const parts = [
  {
    title: "Lead capture",
    description:
      "Forms, landing pages and a conversion site that route every enquiry somewhere, instead of into an inbox nobody checks.",
    marker: "var(--color-mol-cyan)",
    from: { x: "-28px", y: "18px" },
  },
  {
    title: "CRM, set up properly",
    description:
      "Pipeline stages, clear ownership, and follow-up reminders that actually fire.",
    marker: "var(--color-mol-yellow)",
    from: { x: "28px", y: "18px" },
  },
  {
    title: "Follow-up automation",
    description:
      "Sequences that keep working through the week you are too busy to chase anyone.",
    marker: "var(--color-mol-orange)",
    from: { x: "-28px", y: "34px" },
  },
  {
    title: "Reporting you will read",
    description:
      "What came in, where it came from, and what it turned into. One page, every month.",
    marker: "var(--color-mol-purple)",
    from: { x: "28px", y: "34px" },
  },
];

export function FeaturesGrid() {
  return (
    <Section size="lg" background="primary">
      <div className="mb-12 max-w-2xl sm:mb-16">
        <h2 className="font-display text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl lg:text-5xl">
          Everything the system includes
        </h2>
        <p className="mt-4 text-lg text-primary-foreground/70 sm:text-xl">
          One engine, four parts. Built together and handed over together,
          not a patchwork of disconnected tools.
        </p>
      </div>

      {/* Hairline cross-rule, drafting sheet rather than cards */}
      <ScrollReveal className="grid grid-cols-1 border-t border-primary-foreground/15 sm:grid-cols-2">
        {parts.map((part) => (
          <RevealItem
            key={part.title}
            className="reveal-assemble border-b border-primary-foreground/15 sm:[&:nth-child(odd)]:border-r"
            style={
              {
                "--assemble-x": part.from.x,
                "--assemble-y": part.from.y,
              } as CSSProperties
            }
          >
            <div className="py-8 sm:px-8 sm:py-10">
              <span
                className="block h-2 w-2 rounded-full"
                style={{ background: part.marker }}
                aria-hidden="true"
              />
              <h3 className="mt-5 font-display text-xl font-bold tracking-tight text-primary-foreground sm:text-2xl">
                {part.title}
              </h3>
              <p className="mt-3 max-w-md leading-relaxed text-primary-foreground/70">
                {part.description}
              </p>
            </div>
          </RevealItem>
        ))}
      </ScrollReveal>
    </Section>
  );
}

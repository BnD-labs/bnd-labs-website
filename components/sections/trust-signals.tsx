import { Section } from "@/components/sections/section";
import { ScrollReveal } from "@/components/scroll-reveal";

interface TrustSignalsProps {
  label?: string;
  logos?: { name: string; src?: string }[];
}

// Placeholder logos — replace with real client logos when available
const defaultLogos = [
  { name: "Client One" },
  { name: "Client Two" },
  { name: "Client Three" },
  { name: "Client Four" },
  { name: "Client Five" },
  { name: "Client Six" },
];

export function TrustSignals({
  label = "Trusted by established Zambian businesses across industries",
  logos = defaultLogos,
}: TrustSignalsProps) {
  return (
    <Section size="sm">
      <ScrollReveal stagger={false} className="text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          {label}
        </p>
        <div className="mt-8 grid grid-cols-2 items-center gap-8 sm:grid-cols-3 lg:grid-cols-6">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="flex h-12 items-center justify-center text-muted-foreground/60"
            >
              {/* Replace with <Image /> when real logos available */}
              <span className="font-display text-sm font-semibold uppercase tracking-wider">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </Section>
  );
}

import dynamic from "next/dynamic";
import {
  HeroSection,
  HeroContent,
  ProspectEngine,
  HeroMotion,
} from "@/components/hero";
import { ServicesTicker } from "@/components/sections/services-ticker";
import { ProblemSection } from "@/components/sections/problem-section";
import { getFeaturedPosts } from "@/lib/blog";

// Below-fold sections — lazy-loaded to reduce initial bundle
const FeaturesGrid = dynamic(
  () =>
    import("@/components/sections/features-grid").then(
      (m) => m.FeaturesGrid,
    ),
  { ssr: true },
);
const ServicesGrid = dynamic(
  () =>
    import("@/components/sections/services-grid").then((m) => m.ServicesGrid),
  { ssr: true },
);
const SelectedWork = dynamic(
  () =>
    import("@/components/sections/selected-work").then((m) => m.SelectedWork),
  { ssr: true },
);
const ProcessSteps = dynamic(
  () =>
    import("@/components/sections/process-steps").then((m) => m.ProcessSteps),
  { ssr: true },
);
const Testimonials = dynamic(
  () =>
    import("@/components/sections/testimonials").then((m) => m.Testimonials),
  { ssr: true },
);
const FeaturedBlog = dynamic(
  () =>
    import("@/components/sections/featured-blog").then((m) => m.FeaturedBlog),
  { ssr: true },
);
const FaqAccordion = dynamic(
  () =>
    import("@/components/sections/faq-accordion").then((m) => m.FaqAccordion),
  { ssr: true },
);
const ConversionCta = dynamic(
  () =>
    import("@/components/sections/conversion-cta").then((m) => m.ConversionCta),
  { ssr: true },
);

export default async function HomePage() {
  const posts = await getFeaturedPosts();

  return (
    <>
      <HeroSection>
        <HeroMotion />

        <div className="hero-plane-type">
          <HeroContent />
        </div>

        {/*
          The product frame breaks the centre axis: it starts at 30% and runs
          off the right edge, so the composition leans rather than sitting
          symmetrically. The annotation fills the gap that opens on the left,
          which is what makes the offset read as a decision.
        */}
        <div className="relative mt-12 sm:mt-14">
          <div className="hero-plane-note absolute left-0 top-12 hidden w-[27%] pr-10 lg:block">
            <div className="h-px bg-border" />
            <p className="mt-5 font-display text-xl font-bold tracking-tight text-foreground">
              The system we install
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Prospect Engine is our own software. We build it, install it
              inside your business, and hand you the login.
            </p>
          </div>

          <div className="hero-plane-frame">
            <ProspectEngine className="w-full lg:ml-[30%] lg:w-[78%]" />
          </div>
        </div>
      </HeroSection>

      <ServicesTicker />

      <ProblemSection />
      <FeaturesGrid />
      <ServicesGrid />
      <ProcessSteps />
      <SelectedWork />
      <Testimonials />
      <FeaturedBlog posts={posts} />
      <FaqAccordion />
      <ConversionCta
        eyebrow="Stop Guessing, Start Growing"
        title="Your Lead System Starts Here"
        description="Book a free 30-minute discovery call. We'll audit your current lead flow, pinpoint the gaps, and give you a concrete action plan, whether you work with us or not."
        primaryCta={{ label: "Book a Discovery Call", href: "/contact" }}
        secondaryCta={{ label: "See How It Works", href: "/services" }}
      />
    </>
  );
}

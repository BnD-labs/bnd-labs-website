import dynamic from "next/dynamic";
import { HeroSection, HeroContent, RiveHero } from "@/components/hero";
import { ProblemSection } from "@/components/sections/problem-section";
import { getAllPosts } from "@/lib/blog";

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
const StatsBar = dynamic(
  () => import("@/components/sections/stats-bar").then((m) => m.StatsBar),
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
  const posts = await getAllPosts();

  return (
    <>
      <HeroSection>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[6fr_5fr]">
          <HeroContent />
          <RiveHero className="w-full lg:-mr-8" />
        </div>
      </HeroSection>

      <ProblemSection />
      <FeaturesGrid />
      <ServicesGrid />
      <StatsBar />
      <ProcessSteps />
      <Testimonials />
      <FeaturedBlog posts={posts} />
      <FaqAccordion />
      <ConversionCta
        eyebrow="Stop Guessing, Start Growing"
        title="Your Lead System Starts Here"
        description="Book a free 30-minute discovery call. We'll audit your current lead flow, pinpoint the gaps, and give you a concrete action plan — whether you work with us or not."
        primaryCta={{ label: "Book a Discovery Call", href: "/contact" }}
        secondaryCta={{ label: "See How It Works", href: "/services" }}
      />
    </>
  );
}

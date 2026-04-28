import dynamic from "next/dynamic";
import { HeroSection, HeroContent } from "@/components/hero";
import { ProblemSection } from "@/components/sections/problem-section";
import { getAllPosts } from "@/lib/blog";

// Below-fold sections — lazy-loaded to reduce initial bundle
const IsometricWorlds = dynamic(
  () =>
    import("@/components/sections/isometric-worlds").then(
      (m) => m.IsometricWorlds,
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
        <HeroContent />
      </HeroSection>

      <ProblemSection />
      <IsometricWorlds />
      <ServicesGrid />
      <StatsBar />
      <ProcessSteps />
      <Testimonials />
      <FeaturedBlog posts={posts} />
      <FaqAccordion />
      <ConversionCta />
    </>
  );
}

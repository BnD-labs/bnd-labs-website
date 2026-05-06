import type { Metadata } from "next";
import { CategoryFilter } from "@/components/blog/category-filter";
import { FeaturedPostCard } from "@/components/blog/featured-post-card";
import { PostCard } from "@/components/blog/post-card";
import { ConversionCta } from "@/components/sections/conversion-cta";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on lead generation, digital systems, and growth strategies for established Zambian businesses.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const [hero, ...rest] = posts;

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            BND Labs Journal
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Growth systems, written down.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Practical playbooks on lead generation, digital infrastructure, and
            scaling established Zambian businesses.
          </p>
        </div>
      </section>

      {/* Posts */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <CategoryFilter />

        {posts.length === 0 ? (
          <p className="mt-12 text-muted-foreground">
            No posts yet — check back soon.
          </p>
        ) : (
          <>
            {hero && (
              <div className="mt-10">
                <FeaturedPostCard post={hero} />
              </div>
            )}
            {rest.length > 0 && (
              <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <ConversionCta
        eyebrow="Put These Ideas to Work"
        title="We'll Build It for You"
        description="Like what you're reading? Let us turn these strategies into a working growth system for your business."
        primaryCta={{ label: "Book a Discovery Call", href: "/contact" }}
        secondaryCta={{ label: "See Our Services", href: "/services" }}
      />
    </div>
  );
}

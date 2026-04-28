import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/sections/section";
import { ScrollReveal, RevealItem } from "@/components/scroll-reveal";
import { PostCard } from "@/components/blog/post-card";
import type { BlogPostMeta } from "@/lib/blog";

interface FeaturedBlogProps {
  posts: BlogPostMeta[];
  eyebrow?: string;
  title?: string;
  description?: string;
}

export function FeaturedBlog({
  posts,
  eyebrow = "Insights",
  title = "From the blog",
  description = "Practical playbooks on lead generation, digital systems, and growth strategy for Zambian businesses.",
}: FeaturedBlogProps) {
  if (posts.length === 0) return null;

  return (
    <Section size="lg">
      <SectionHeader eyebrow={eyebrow} title={title} description={description} />
      <ScrollReveal className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.slice(0, 3).map((post) => (
          <RevealItem key={post.slug}>
            <PostCard post={post} />
          </RevealItem>
        ))}
      </ScrollReveal>
      <div className="mt-12 flex justify-center">
        <Button variant="outline" size="lg" render={<Link href="/blog" />}>
          View all articles
          <ArrowRight className="ml-1" aria-hidden="true" />
        </Button>
      </div>
    </Section>
  );
}

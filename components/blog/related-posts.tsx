import { PostCard } from "@/components/blog/post-card";
import type { BlogPostMeta } from "@/lib/blog";

interface RelatedPostsProps {
  posts: BlogPostMeta[];
  heading?: string;
}

export function RelatedPosts({
  posts,
  heading = "Related articles",
}: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section
      aria-labelledby="related-posts-heading"
      className="border-t border-border py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          id="related-posts-heading"
          className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
        >
          {heading}
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}

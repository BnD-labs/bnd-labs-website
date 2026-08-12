import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryFilter } from "@/components/blog/category-filter";
import { PostCard } from "@/components/blog/post-card";
import {
  BLOG_CATEGORIES,
  categoryFromSlug,
  getPostsByCategory,
  slugifyCategory,
} from "@/lib/blog";

interface PageParams {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return BLOG_CATEGORIES.map((c) => ({ category: slugifyCategory(c) }));
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { category } = await params;
  const cat = categoryFromSlug(category);
  if (!cat) return { title: "Category not found" };
  return {
    title: `${cat} — Blog`,
    description: `Articles on ${cat.toLowerCase()} for established Zambian businesses.`,
  };
}

export default async function CategoryPage({ params }: PageParams) {
  const { category } = await params;
  const cat = categoryFromSlug(category);
  if (!cat) notFound();

  const posts = await getPostsByCategory(cat);

  return (
    <div className="bg-background">
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Category
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {cat}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {posts.length} article{posts.length === 1 ? "" : "s"} in this
            category.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <CategoryFilter />
        {posts.length === 0 ? (
          <p className="mt-12 text-muted-foreground">
            No posts in this category yet.
          </p>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

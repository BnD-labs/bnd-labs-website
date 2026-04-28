import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/mdx-components";
import { Badge } from "@/components/ui/badge";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { RelatedPosts } from "@/components/blog/related-posts";
import { BlogCta } from "@/components/blog/blog-cta";
import {
  formatPostDate,
  slugifyCategory,
  extractToc,
  type BlogPost,
  type BlogPostMeta,
} from "@/lib/blog";

interface PostLayoutProps {
  post: BlogPost;
  relatedPosts: BlogPostMeta[];
}

export function PostLayout({ post, relatedPosts }: PostLayoutProps) {
  const toc = extractToc(post.content);

  return (
    <article>
      {/* Header */}
      <header className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to blog
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link href={`/blog/categories/${slugifyCategory(post.category)}`}>
              <Badge variant="secondary">{post.category}</Badge>
            </Link>
            {post.tags?.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline">
                #{tag}
              </Badge>
            ))}
          </div>
          <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
            {post.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{post.author}</span>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              <span>{formatPostDate(post.date)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden="true" />
              <span>{post.readingTime}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Cover image */}
      {post.coverImage && (
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="(min-width: 1024px) 960px, 100vw"
              priority
              className="object-cover"
            />
          </div>
        </div>
      )}

      {/* Content + TOC */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_220px]">
          <div className="mx-auto w-full max-w-2xl lg:mx-0">
            <MDXRemote source={post.content} components={mdxComponents} />
            <BlogCta />
          </div>
          {toc.length > 0 && (
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <TableOfContents items={toc} />
              </div>
            </aside>
          )}
        </div>
      </div>

      {/* Related */}
      <RelatedPosts posts={relatedPosts} />
    </article>
  );
}

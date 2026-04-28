import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  formatPostDate,
  slugifyCategory,
  type BlogPostMeta,
} from "@/lib/blog";

interface FeaturedPostCardProps {
  post: BlogPostMeta;
  className?: string;
}

export function FeaturedPostCard({ post, className }: FeaturedPostCardProps) {
  return (
    <article
      className={cn(
        "group grid overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10 transition-all hover:ring-primary/30 lg:grid-cols-2",
        className,
      )}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="relative block aspect-[16/10] overflow-hidden lg:aspect-auto"
      >
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/80 to-primary">
            <span className="font-display text-6xl font-bold tracking-tight text-primary-foreground opacity-30">
              BND
            </span>
          </div>
        )}
      </Link>
      <div className="flex flex-col justify-center gap-4 p-8 sm:p-10 lg:p-12">
        <div className="flex items-center gap-3">
          <Badge>Featured</Badge>
          <Link href={`/blog/categories/${slugifyCategory(post.category)}`}>
            <Badge variant="secondary">{post.category}</Badge>
          </Link>
        </div>
        <Link href={`/blog/${post.slug}`}>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-4xl">
            {post.title}
          </h2>
        </Link>
        <p className="text-base text-muted-foreground sm:text-lg">
          {post.description}
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" aria-hidden="true" />
            <span>{formatPostDate(post.date)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" aria-hidden="true" />
            <span>{post.readingTime}</span>
          </div>
        </div>
        <Link
          href={`/blog/${post.slug}`}
          className="mt-2 inline-flex items-center gap-2 font-medium text-primary transition-colors hover:text-primary/80"
        >
          Read article
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  );
}

import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  formatPostDate,
  slugifyCategory,
  type BlogPostMeta,
} from "@/lib/blog";

interface PostCardProps {
  post: BlogPostMeta;
  className?: string;
}

export function PostCard({ post, className }: PostCardProps) {
  return (
    <Card
      className={cn(
        "group h-full overflow-hidden transition-all hover:ring-primary/30",
        className,
      )}
    >
      {post.coverImage && (
        <Link
          href={`/blog/${post.slug}`}
          className="relative block aspect-[16/9] overflow-hidden"
        >
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
      )}
      <CardContent className="flex h-full flex-col gap-3 p-6">
        <div className="flex items-center gap-3">
          <Link href={`/blog/categories/${slugifyCategory(post.category)}`}>
            <Badge variant="secondary">{post.category}</Badge>
          </Link>
        </div>
        <Link href={`/blog/${post.slug}`} className="block">
          <h3 className="font-display text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-2xl">
            {post.title}
          </h3>
        </Link>
        <p className="flex-1 text-sm text-muted-foreground">
          {post.description}
        </p>
        <div className="mt-2 flex items-center gap-4 border-t border-border pt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{formatPostDate(post.date)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{post.readingTime}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

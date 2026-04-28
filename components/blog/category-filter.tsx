"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { BLOG_CATEGORIES, slugifyCategory } from "@/lib/blog-shared";

interface CategoryFilterProps {
  className?: string;
}

export function CategoryFilter({ className }: CategoryFilterProps) {
  const pathname = usePathname();
  const activeSlug = pathname.startsWith("/blog/categories/")
    ? pathname.replace("/blog/categories/", "").replace(/\/$/, "")
    : null;
  const isAll = pathname === "/blog" || pathname === "/blog/";

  return (
    <nav
      aria-label="Blog categories"
      className={cn("flex flex-wrap items-center gap-2", className)}
    >
      <CategoryPill href="/blog" active={isAll}>
        All posts
      </CategoryPill>
      {BLOG_CATEGORIES.map((category) => {
        const slug = slugifyCategory(category);
        return (
          <CategoryPill
            key={category}
            href={`/blog/categories/${slug}`}
            active={activeSlug === slug}
          >
            {category}
          </CategoryPill>
        );
      })}
    </nav>
  );
}

function CategoryPill({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground",
      )}
    >
      {children}
    </Link>
  );
}

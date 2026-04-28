// Client-safe blog utilities and types. No `fs` / Node imports here so
// this module can be imported from "use client" components.

export const BLOG_CATEGORIES = [
  "Lead Generation",
  "Digital Systems",
  "Case Studies",
  "Automation",
  "Industry Insights",
  "Healthcare",
  "Hospitality",
  "Education",
  "AI & Automation",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export interface BlogFrontmatter {
  title: string;
  description: string;
  date: string;
  author: string;
  category: BlogCategory;
  tags?: string[];
  featured?: boolean;
  coverImage?: string;
}

export interface BlogPostMeta extends BlogFrontmatter {
  slug: string;
  readingTime: string;
  wordCount: number;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

export function formatPostDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function slugifyCategory(category: BlogCategory): string {
  return category.toLowerCase().replace(/\s+/g, "-");
}

export function categoryFromSlug(slug: string): BlogCategory | null {
  return (
    BLOG_CATEGORIES.find(
      (c) => c.toLowerCase().replace(/\s+/g, "-") === slug.toLowerCase(),
    ) ?? null
  );
}

export interface TocEntry {
  id: string;
  text: string;
  level: 2 | 3;
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Parse h2/h3 headings from raw MDX content to build a table of contents.
 * Must mirror the slug logic used in mdx-components.tsx Heading.
 */
export function extractToc(markdown: string): TocEntry[] {
  const lines = markdown.split("\n");
  const entries: TocEntry[] = [];
  let inFence = false;
  for (const line of lines) {
    if (/^```/.test(line.trim())) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!match) continue;
    const level = match[1].length as 2 | 3;
    const text = match[2].replace(/[*_`]/g, "").trim();
    entries.push({ id: slugifyHeading(text), text, level });
  }
  return entries;
}

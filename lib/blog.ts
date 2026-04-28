import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type {
  BlogCategory,
  BlogFrontmatter,
  BlogPost,
  BlogPostMeta,
} from "@/lib/blog-shared";

// Re-export client-safe helpers so existing imports from "@/lib/blog" keep
// working for server components. Client components must import directly from
// "@/lib/blog-shared" to avoid pulling in `node:fs/promises`.
export * from "@/lib/blog-shared";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

async function readMdxFile(filename: string): Promise<BlogPost> {
  const filePath = path.join(BLOG_DIR, filename);
  const raw = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);
  const slug = filename.replace(/\.mdx?$/, "");

  return {
    slug,
    content,
    readingTime: stats.text,
    wordCount: stats.words,
    ...(data as BlogFrontmatter),
  };
}

async function getMdxFilenames(): Promise<string[]> {
  try {
    const entries = await fs.readdir(BLOG_DIR);
    return entries.filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
  } catch {
    return [];
  }
}

export async function getAllPosts(): Promise<BlogPostMeta[]> {
  const filenames = await getMdxFilenames();
  const posts = await Promise.all(filenames.map(readMdxFile));
  return posts
    .map(({ content: _content, ...meta }) => {
      void _content;
      return meta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const filenames = await getMdxFilenames();
  const match = filenames.find((f) => f.replace(/\.mdx?$/, "") === slug);
  if (!match) return null;
  return readMdxFile(match);
}

export async function getPostsByCategory(
  category: BlogCategory,
): Promise<BlogPostMeta[]> {
  const all = await getAllPosts();
  return all.filter((p) => p.category === category);
}

export async function getRelatedPosts(
  currentSlug: string,
  category: BlogCategory,
  limit = 3,
): Promise<BlogPostMeta[]> {
  const all = await getAllPosts();
  const sameCategory = all.filter(
    (p) => p.slug !== currentSlug && p.category === category,
  );
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
  // Fallback: fill with other recent posts
  const others = all.filter(
    (p) => p.slug !== currentSlug && p.category !== category,
  );
  return [...sameCategory, ...others].slice(0, limit);
}

export async function getFeaturedPosts(limit = 3): Promise<BlogPostMeta[]> {
  const all = await getAllPosts();
  const featured = all.filter((p) => p.featured);
  if (featured.length >= limit) return featured.slice(0, limit);
  return [...featured, ...all.filter((p) => !p.featured)].slice(0, limit);
}

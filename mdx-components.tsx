import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function Heading({
  level,
  children,
  className,
  ...props
}: {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children?: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLHeadingElement>) {
  const text =
    typeof children === "string"
      ? children
      : Array.isArray(children)
        ? children.filter((c) => typeof c === "string").join(" ")
        : "";
  const id = text ? slugify(text) : undefined;

  const baseClasses: Record<number, string> = {
    1: "mt-0 mb-8 font-display text-4xl font-bold tracking-tight sm:text-5xl",
    2: "mt-12 mb-4 font-display text-3xl font-bold tracking-tight sm:text-4xl scroll-mt-20",
    3: "mt-8 mb-3 font-display text-2xl font-semibold tracking-tight scroll-mt-20",
    4: "mt-6 mb-2 font-display text-xl font-semibold scroll-mt-20",
    5: "mt-4 mb-2 font-display text-lg font-semibold scroll-mt-20",
    6: "mt-4 mb-2 font-display text-base font-semibold scroll-mt-20",
  };

  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  return (
    <Tag id={id} className={cn(baseClasses[level], className)} {...props}>
      {children}
    </Tag>
  );
}

export const mdxComponents: MDXComponents = {
  h1: (props) => <Heading level={1} {...props} />,
  h2: (props) => <Heading level={2} {...props} />,
  h3: (props) => <Heading level={3} {...props} />,
  h4: (props) => <Heading level={4} {...props} />,
  h5: (props) => <Heading level={5} {...props} />,
  h6: (props) => <Heading level={6} {...props} />,
  p: ({ className, ...props }) => (
    <p
      className={cn("my-6 text-base leading-7 text-foreground", className)}
      {...props}
    />
  ),
  a: ({ href, className, children, ...props }) => {
    const isExternal = href?.startsWith("http") || href?.startsWith("//");
    const cls = cn(
      "font-medium text-primary underline underline-offset-4 hover:text-primary/80",
      className,
    );
    if (isExternal) {
      return (
        <a
          href={href}
          className={cls}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href ?? "#"} className={cls}>
        {children}
      </Link>
    );
  },
  ul: ({ className, ...props }) => (
    <ul className={cn("my-6 ml-6 list-disc space-y-2", className)} {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={cn("my-6 ml-6 list-decimal space-y-2", className)}
      {...props}
    />
  ),
  li: ({ className, ...props }) => (
    <li className={cn("text-foreground leading-7", className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        "my-8 border-l-4 border-primary pl-6 italic text-muted-foreground",
        className,
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }) => (
    <code
      className={cn(
        "rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground",
        className,
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }) => (
    <pre
      className={cn(
        "my-6 overflow-x-auto rounded-lg border border-border bg-muted p-4 font-mono text-sm",
        className,
      )}
      {...props}
    />
  ),
  hr: ({ className, ...props }) => (
    <hr className={cn("my-12 border-border", className)} {...props} />
  ),
  img: ({ src, alt, width, height, ...props }) => {
    if (!src || typeof src !== "string") return null;
    return (
      <Image
        src={src}
        alt={alt ?? ""}
        width={typeof width === "number" ? width : 1200}
        height={typeof height === "number" ? height : 630}
        className="my-8 rounded-lg"
        {...props}
      />
    );
  },
};

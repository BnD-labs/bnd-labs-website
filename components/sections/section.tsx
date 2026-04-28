import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/scroll-reveal";

type SectionSize = "sm" | "md" | "lg";
type SectionBg = "default" | "muted" | "primary" | "dark";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  size?: SectionSize;
  background?: SectionBg;
  container?: boolean;
  as?: "section" | "div";
}

const sizeClasses: Record<SectionSize, string> = {
  sm: "py-16 sm:py-20",
  md: "py-20 sm:py-24 lg:py-28",
  lg: "py-24 sm:py-32 lg:py-40",
};

const bgClasses: Record<SectionBg, string> = {
  default: "bg-background",
  muted: "bg-muted/50",
  primary: "bg-primary text-primary-foreground",
  dark: "bg-slate-950 text-white",
};

export function Section({
  size = "md",
  background = "default",
  container = true,
  as: Tag = "section",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <Tag
      className={cn(sizeClasses[size], bgClasses[background], className)}
      {...props}
    >
      {container ? (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
      ) : (
        children
      )}
    </Tag>
  );
}

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <ScrollReveal stagger={false}>
      <div
        className={cn(
          "mb-12 max-w-3xl sm:mb-16",
          align === "center" && "mx-auto text-center",
          className,
        )}
      >
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            {eyebrow}
          </p>
        )}
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
            {description}
          </p>
        )}
      </div>
    </ScrollReveal>
  );
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BlogCtaProps {
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
}

export function BlogCta({
  title = "Ready to build your growth system?",
  description = "Book a 30-minute discovery call. No pitch — just a clear conversation about whether a growth system fits your business.",
  ctaLabel = "Book a discovery call",
  ctaHref = "/contact",
  className,
}: BlogCtaProps) {
  return (
    <aside
      className={cn(
        "my-12 rounded-2xl bg-primary px-8 py-10 text-primary-foreground sm:px-12 sm:py-14",
        className,
      )}
    >
      <div className="mx-auto max-w-2xl text-center">
        <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
          {title}
        </h3>
        <p className="mt-3 text-base text-primary-foreground/90 sm:text-lg">
          {description}
        </p>
        <div className="mt-6">
          <Button
            size="lg"
            variant="secondary"
            render={<Link href={ctaHref} />}
          >
            {ctaLabel}
            <ArrowRight className="ml-1" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </aside>
  );
}

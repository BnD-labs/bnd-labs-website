import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The hero's product frame: a view of the Prospect Engine, our own
 * prospect-research software.
 *
 * It deliberately shows *structure* — the pipeline stages a prospect moves
 * through and the sectors we research — and never volume. The earlier concept
 * put counts and charts here; every figure would have been invented, and the
 * live instance has nothing real to screenshot. Structure is the honest half
 * of the story and it is the half that actually explains the product.
 *
 * No client JavaScript, no chart libraries, no images.
 */

interface Stage {
  name: string;
  /**
   * Token for the stage marker. --chart-3 is deliberately skipped: in dark
   * mode it is near-identical to --chart-1 and the two cannot be told apart.
   */
  dot: string;
  prospects: { sector: string; city: string }[];
}

const stages: Stage[] = [
  {
    name: "New",
    dot: "var(--chart-1)",
    prospects: [
      { sector: "Logistics & Freight", city: "Lusaka" },
      { sector: "Retail & Trade", city: "Kitwe" },
    ],
  },
  {
    name: "Contacted",
    dot: "var(--chart-2)",
    prospects: [
      { sector: "Education", city: "Ndola" },
      { sector: "ICT & Professional", city: "Lusaka" },
    ],
  },
  {
    name: "Responded",
    dot: "var(--chart-4)",
    prospects: [{ sector: "Hospitality & F&B", city: "Livingstone" }],
  },
  {
    name: "Follow-up due",
    dot: "var(--chart-5)",
    prospects: [
      { sector: "Healthcare", city: "Lusaka" },
      { sector: "Creative & Production", city: "Lusaka" },
    ],
  },
  {
    name: "Logged to CRM",
    dot: "var(--muted-foreground)",
    prospects: [{ sector: "Logistics & Freight", city: "Ndola" }],
  },
];

const filters = ["All sectors", "Logistics & Freight", "Education", "Retail"];

export function ProspectEngine({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-t-2xl border border-b-0 border-border bg-card",
        "shadow-[-18px_-10px_80px_rgb(16_26_64_/_0.13)]",
        className,
      )}
    >
      {/* Product toolbar. No fake browser chrome — the app's own header. */}
      <div className="flex items-center gap-3 border-b border-border px-5 py-3.5 sm:px-6">
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary">
          <TrendingUp
            className="h-3.5 w-3.5 text-primary-foreground"
            aria-hidden="true"
          />
        </span>
        <span className="font-display text-sm font-bold tracking-tight text-foreground">
          Prospect Engine
        </span>

        {/*
          Actions sit beside the title rather than pushed right. The frame is
          deliberately cut off by the viewport, and a half-cropped column reads
          as "there is more"; a half-cropped button just reads as broken.
        */}
        <span className="ml-auto flex items-center gap-2 lg:ml-6">
          <span className="hidden rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground sm:inline-block">
            Reminders
          </span>
          <span className="rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">
            Export CSV
          </span>
        </span>
      </div>

      {/* Sector filters — faded at the right rather than cut mid-word */}
      <div className="relative flex gap-2 overflow-hidden border-b border-border px-5 py-3 sm:px-6">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-card to-transparent"
        />
        {filters.map((filter, i) => (
          <span
            key={filter}
            className={cn(
              "whitespace-nowrap rounded-full border px-3 py-1 text-xs",
              i === 0
                ? "border-primary bg-primary/10 font-semibold text-primary"
                : "border-border text-muted-foreground",
            )}
          >
            {filter}
          </span>
        ))}
      </div>

      {/* Pipeline board */}
      <div className="grid grid-cols-2 gap-px bg-border sm:grid-cols-3 lg:grid-cols-5">
        {stages.map((stage) => (
          <div key={stage.name} className="bg-card p-4 sm:p-5">
            <div className="flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: stage.dot }}
                aria-hidden="true"
              />
              <span className="truncate text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                {stage.name}
              </span>
            </div>

            <ul className="mt-4 space-y-2">
              {stage.prospects.map((prospect) => (
                <li
                  key={`${prospect.sector}-${prospect.city}`}
                  className="rounded-lg border border-border bg-muted/40 px-3 py-2.5"
                >
                  <p className="truncate text-xs font-semibold text-foreground">
                    {prospect.sector}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {prospect.city}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

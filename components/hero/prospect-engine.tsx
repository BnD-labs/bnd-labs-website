import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The hero's product frame: a view of the Prospect Engine, our own
 * prospect-research software.
 *
 * This was a five-column kanban board, which was the wrong shape twice over.
 * The product has no board — it has a list with a detail modal — and a board
 * card can only carry two facts, so the frame showed a sector and a city and
 * stopped. The real row carries the things that actually explain the product:
 * what the software *judged* about a business, not merely that it found one.
 * A digital rating and a recommended channel are the research output; a name
 * and a city are just a lead.
 *
 * Two rules hold this honest, and both come from PRODUCT.md:
 *
 * 1. Real shape, anonymised content. The live instance lists real Zambian
 *    businesses with owner names, phone numbers and email addresses. None of
 *    that can appear on a public marketing site: it would expose our own
 *    prospect list and name third parties who never agreed to it. Rows are
 *    sector and city only, exactly as before.
 *
 * 2. Attributes, never aggregates. Everything here is per-record and
 *    illustrates the shape of a research result. There are no totals,
 *    response rates or conversion figures, because the live instance is at
 *    zero on every one of them and inventing them is the thing we removed
 *    fabricated testimonials and stats to stop doing.
 *
 * The five pipeline stages survive as the Status column rather than as the
 * layout, so the progression a prospect moves through is still legible while
 * the frame reads as the software it actually is.
 *
 * No client JavaScript, no chart libraries, no images.
 */

interface Prospect {
  sector: string;
  city: string;
  /** A band, as the tool reports it — never a precise figure. */
  revenue: string;
  /** A band, as the tool reports it — the real record's Employees field. */
  staff: string;
  /** The tool's digital-presence score, out of five. */
  rating: number;
  channel: string;
  priority: "High" | "Medium" | "Low";
  status: string;
  /**
   * Token for the status marker. --chart-3 is deliberately skipped: in dark
   * mode it is near-identical to --chart-1 and the two cannot be told apart.
   */
  dot: string;
}

/** One per pipeline stage, so the full progression is still represented. */
const prospects: Prospect[] = [
  {
    sector: "Logistics & Freight",
    city: "Lusaka",
    staff: "18–24 staff",
    revenue: "ZMW 60–85K",
    rating: 4,
    channel: "LinkedIn",
    priority: "High",
    status: "Responded",
    dot: "var(--chart-4)",
  },
  {
    sector: "Hospitality & F&B",
    city: "Livingstone",
    staff: "25–40 staff",
    revenue: "ZMW 30–50K",
    rating: 5,
    channel: "Instagram",
    priority: "High",
    status: "Follow-up due",
    dot: "var(--chart-5)",
  },
  {
    sector: "Education",
    city: "Ndola",
    staff: "40–60 staff",
    revenue: "ZMW 40–60K",
    rating: 3,
    channel: "Email",
    priority: "Medium",
    status: "Contacted",
    dot: "var(--chart-2)",
  },
  {
    sector: "Retail & Trade",
    city: "Kitwe",
    staff: "6–12 staff",
    revenue: "ZMW 25–40K",
    rating: 2,
    channel: "WhatsApp",
    priority: "Low",
    status: "New",
    dot: "var(--chart-1)",
  },
  {
    sector: "ICT & Professional",
    city: "Lusaka",
    staff: "12–18 staff",
    revenue: "ZMW 55–75K",
    rating: 4,
    channel: "LinkedIn",
    priority: "Medium",
    status: "Logged to CRM",
    dot: "var(--muted-foreground)",
  },
];

const filters = ["All sectors", "Logistics & Freight", "Education", "Retail"];

/**
 * Column track. Defined once so the header labels and every row stay in step;
 * the trailing column is slack that absorbs the viewport crop, since the frame
 * runs off the right edge and a half-cut word reads as broken rather than as
 * "there is more".
 */
const columns =
  "lg:grid lg:grid-cols-[minmax(0,1.6fr)_0.85fr_0.8fr_0.85fr_1fr_2rem] lg:items-center lg:gap-4";

const priorityStyles: Record<Prospect["priority"], string> = {
  High: "border-primary/30 bg-primary/10 text-primary",
  Medium: "border-border bg-muted text-muted-foreground",
  Low: "border-border bg-transparent text-muted-foreground",
};

/** The digital-presence score, as a meter rather than a number. */
function Rating({ value }: { value: number }) {
  return (
    <span
      className="flex items-center gap-[3px]"
      role="img"
      aria-label={`Digital presence ${value} out of 5`}
    >
      {[1, 2, 3, 4, 5].map((step) => (
        <span
          key={step}
          aria-hidden="true"
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            step <= value ? "bg-primary" : "bg-border",
          )}
        />
      ))}
    </span>
  );
}

/** A label/value pair. The label shows only below lg, where the header is gone. */
function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground lg:hidden">
        {label}
      </p>
      <div className="mt-1 text-xs text-foreground lg:mt-0">{children}</div>
    </div>
  );
}

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
          deliberately cut off by the viewport, and a half-cropped button reads
          as broken.
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

      {/*
        Column labels, printed once for the whole table rather than repeated on
        every row. That is where the density comes from: five attributes per
        prospect in the vertical space the old board spent on two.

        Below lg there is no header — the rows stack and carry their own
        labels, which also retires the horizontal scroll the board needed.
      */}
      <div
        aria-hidden="true"
        className={cn(
          "hidden border-b border-border px-5 py-2.5 sm:px-6",
          "text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground",
          columns,
          "lg:grid",
        )}
      >
        <span>Prospect</span>
        <span>Revenue</span>
        <span>Digital</span>
        <span>Best channel</span>
        <span>Status</span>
        <span />
      </div>

      <ul>
        {prospects.map((prospect) => (
          <li
            key={`${prospect.sector}-${prospect.city}`}
            className={cn(
              "border-b border-border px-5 py-4 last:border-b-0 sm:px-6 lg:py-3",
              columns,
            )}
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="truncate text-xs font-semibold text-foreground">
                  {prospect.sector}
                </p>
                <span
                  className={cn(
                    "shrink-0 rounded-full border px-1.5 py-px text-[10px] font-medium",
                    priorityStyles[prospect.priority],
                  )}
                >
                  {prospect.priority}
                </span>
              </div>
              {/*
                City and a staff band, not an owner. The real record carries a
                contact name here; publishing one would either expose a real
                person or invent one, and the band is a real field of the same
                record that does neither.
              */}
              <p className="mt-0.5 truncate text-xs text-muted-foreground">
                {prospect.city} · {prospect.staff}
              </p>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3 lg:mt-0 lg:contents">
              <Field label="Revenue">
                <span className="text-muted-foreground">{prospect.revenue}</span>
              </Field>

              <Field label="Digital">
                <Rating value={prospect.rating} />
              </Field>

              <Field label="Best channel">
                <span className="font-medium">{prospect.channel}</span>
              </Field>

              <Field label="Status">
                <span className="flex items-center gap-1.5">
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: prospect.dot }}
                    aria-hidden="true"
                  />
                  <span className="truncate text-muted-foreground">
                    {prospect.status}
                  </span>
                </span>
              </Field>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

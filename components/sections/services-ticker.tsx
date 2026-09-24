const services = [
  "Lead Capture",
  "CRM Setup",
  "Follow-Up Automation",
  "Conversion Websites",
  "Content Systems",
  "Performance Reporting",
];

function Pills() {
  return (
    <>
      {services.map((service) => (
        <span
          key={service}
          className="whitespace-nowrap rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground"
        >
          {service}
        </span>
      ))}
    </>
  );
}

/**
 * A quiet marquee of what we actually build, sitting under the hero.
 *
 * CSS only — no JavaScript, no library. The track holds two identical copies
 * and translates by exactly half its width, which is what makes the loop
 * seamless. Under prefers-reduced-motion the animation stops, the duplicate
 * is removed from the DOM flow, and the row simply wraps — nothing moves and
 * nothing is hidden from the reader.
 */
export function ServicesTicker() {
  return (
    <div className="relative overflow-hidden border-y border-border bg-background py-5">
      {/* Edge fades so pills enter and leave rather than being cut off */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-28"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-28"
      />

      <div className="ticker-track flex w-max motion-reduce:w-full">
        <div className="flex gap-3 pr-3 motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-3 motion-reduce:px-4">
          <Pills />
        </div>
        <div className="flex gap-3 pr-3 motion-reduce:hidden" aria-hidden="true">
          <Pills />
        </div>
      </div>
    </div>
  );
}

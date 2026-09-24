import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/sections/section";
import { ScrollReveal, RevealItem } from "@/components/scroll-reveal";
import { cn } from "@/lib/utils";

interface Project {
  sector: string;
  client: string;
  descriptor: string;
  /** What the engagement actually produced. */
  summary: string;
  /** The part worth explaining — a real constraint or a real mechanism. */
  detail: string;
  built: string[];
  /** Only where the client stated it publicly themselves. */
  outcome?: { quote: string; attribution: string };
  href: string;
  domain: string;
  image: string;
  /** Describes the screenshot for anyone who cannot see it. */
  alt: string;
}

/**
 * Every entry is a live site, every screenshot is that site captured as it
 * actually renders, and the one outcome we cite is quoted from the client's
 * own public review rather than asserted by us. Nothing here is a mockup.
 */
const projects: Project[] = [
  {
    sector: "Logistics & Freight",
    client: "Bastuku Investments",
    descriptor: "Movers and logistics, Lusaka",
    summary:
      "A full digital setup built from scratch in two weeks, under our Growth Starter package.",
    detail:
      "The site opens with a move-scoping form rather than a brochure: pick what you are moving, where from and where to, and the enquiry arrives already qualified. That is the difference between a lead and a phone number.",
    built: [
      "Conversion website with online bookings",
      "Lead capture system",
      "Social platforms set up and running",
      "Content strategy",
    ],
    outcome: {
      quote:
        "Within three weeks we had 15 qualified leads, which turned into 8 quotes and 3 invoices. That is real, measurable business, not just likes.",
      attribution: "Mildred Musonda, Bastuku Investments · Google review",
    },
    href: "https://bastuku-inv.com",
    domain: "bastuku-inv.com",
    image: "/work/bastuku.jpg",
    alt: "The Bastuku Investments homepage: a full-width photograph of a loading bay behind the headline “We’ll carry the load. You carry on.”, with a form to scope a move in twenty seconds.",
  },
  {
    sector: "Hospitality & F&B",
    client: "Queso Pizza",
    descriptor: "Fast-food restaurant, Chongwe",
    summary:
      "A mobile-first ordering site with no cart, no checkout and no payment gateway. Deliberately.",
    detail:
      "Queso has no POS, and the WhatsApp number sits on the owner’s personal phone. So the order builder compiles a selection into a pre-filled WhatsApp message, paired with a call-to-confirm button, because on-site staff can answer a phone when they cannot answer WhatsApp. The constraint shaped the product.",
    built: [
      "Mobile-first marketing site",
      "WhatsApp order builder",
      "Paired call-to-confirm flow",
      "Menu system priced in Kwacha",
    ],
    href: "https://quesopizza.com",
    domain: "quesopizza.com",
    image: "/work/queso.jpg",
    alt: "The Queso Pizza homepage: a bold red hero with a photograph of a pizza and the headline “The taste that stays with you”, above a fixed bar offering Order on WhatsApp and Call to Confirm.",
  },
  {
    sector: "Creative & Production",
    client: "Vast Gallery",
    descriptor: "Photography studio, Lusaka",
    summary:
      "A marketing site plus a private client delivery system that replaced their WeTransfer workflow.",
    detail:
      "After a shoot, each client gets their own token-linked gallery: they preview, pick, and download single frames or the whole set as a zip, with every download recorded. Bookings and galleries are run from an admin area the studio owns, so there are no expiring links and no third-party transfer service in the middle.",
    built: [
      "Marketing site with booking enquiries",
      "Token-linked private client galleries",
      "Single and bulk photo delivery",
      "Admin area for bookings and galleries",
    ],
    href: "https://vastgalleryphotography.com",
    domain: "vastgalleryphotography.com",
    image: "/work/vast.jpg",
    alt: "The Vast Gallery homepage: a black-and-white studio portrait filling the frame, overlaid with the words “Vast Gallery Photography” and the line “Every frame is a promise.”",
  },
];

export function SelectedWork() {
  return (
    // The nav's Our Work item targets this. scroll-margin-top clears the
    // floating header, which would otherwise cover the heading on arrival.
    <Section id="work" size="md" className="scroll-mt-24">
      <SectionHeader
        title="Systems We've Built"
        description="Live sites you can open right now, for businesses you can look up."
        align="left"
      />

      <ScrollReveal className="flex flex-col gap-16 lg:gap-24">
        {projects.map((project, i) => (
          <RevealItem key={project.client}>
            <article className="grid items-start gap-8 lg:grid-cols-12 lg:gap-14">
              {/* Alternating sides give the run of projects a rhythm */}
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group block overflow-hidden rounded-xl border border-border bg-muted lg:col-span-7",
                  i % 2 === 1 && "lg:order-2",
                )}
              >
                {/*
                  Plain <img> on purpose. This is a static export, so
                  images.unoptimized is forced true in next.config and
                  next/image would emit the same bytes while adding client
                  runtime to a page we just spent effort taking JS off. Width,
                  height and lazy loading are set explicitly instead, which is
                  the part next/image would otherwise have handled.
                */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt={project.alt}
                  width={1200}
                  height={750}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[8/5] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </a>

              <div className="lg:col-span-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {project.sector}
                </p>
                <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  {project.client}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {project.descriptor}
                </p>

                <p className="mt-6 text-lg leading-relaxed text-foreground">
                  {project.summary}
                </p>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {project.detail}
                </p>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {project.built.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                {project.outcome && (
                  <figure className="mt-7 border-l border-border pl-5">
                    <blockquote className="font-display text-lg font-medium leading-relaxed text-foreground">
                      &ldquo;{project.outcome.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-3 text-sm text-muted-foreground">
                      {project.outcome.attribution}
                    </figcaption>
                  </figure>
                )}

                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline"
                >
                  {project.domain}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </div>
            </article>
          </RevealItem>
        ))}
      </ScrollReveal>
    </Section>
  );
}

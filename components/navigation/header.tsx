"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { BookOpen, Briefcase, Layers, Mail, Users } from "lucide-react";
import { FlowButton } from "@/components/ui/flow-button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/services", label: "Services", Icon: Layers },
  { href: "/#work", label: "Work", Icon: Briefcase },
  { href: "/about", label: "About", Icon: Users },
  { href: "/blog", label: "Blog", Icon: BookOpen },
  { href: "/contact", label: "Contact", Icon: Mail },
];

/**
 * Three floating elements rather than one bar: the logo at top left, a
 * centred pill of stacked icon-and-label items, and the CTA at top right.
 *
 * Keeping the logo and the CTA out of the pill is what lets the pill stay
 * small and even, which is the whole character of this treatment. They still
 * live in the header rather than on the landing page alone, because every
 * other page needs a way home and a way to convert too.
 *
 * The stacked layout also replaces the hamburger: four items fit across a
 * 360px phone, so the menu is visible rather than one tap away. Only the CTA
 * waits for a wider screen, and Contact covers it until then.
 *
 * Total height is 72px: pt-4 (16) + h-14 (56). HeroSection depends on that
 * number for the grid it runs up behind the nav — change both together.
 */
export function Header() {
  const pathname = usePathname();

  return (
    <header className="pointer-events-none sticky top-0 z-50 w-full px-4 pt-4 sm:px-6 lg:px-8">
      {/*
        Centred from sm up, where the logo and CTA can sit absolutely at the
        corners. On a phone five items plus a centred pill leaves no room
        beside the logo, so they share a normal flow row instead — and there
        the pill flexes to fill whatever the logo leaves. It used to be a fixed
        253px at every width, which meant 13px of breathing room at 320 and
        107px of dead space at 414, so the row read as left-heavy on a big
        phone and cramped on a small one.
      */}
      <div className="relative mx-auto flex h-14 max-w-[90rem] items-center gap-3 sm:justify-center sm:gap-0">
        {/*
          34px on a phone, not 42. The mark is a solid purple square and the
          pill beside it is a pale outline, so at 42 it out-weighed the whole
          navigation. The padding-and-negative-margin pair keeps the tap target
          at 42px while the artwork shrinks, and cancels itself in the flow so
          the pill gets the space back.
        */}
        <Link
          href="/"
          aria-label="BND Labs, home"
          className="pointer-events-auto -m-1 shrink-0 rounded-xl p-1 transition-opacity hover:opacity-80 sm:absolute sm:left-0 sm:m-0 sm:p-0"
        >
          <Image
            src="/bnd-mark.png"
            alt=""
            width={104}
            height={104}
            className="h-[34px] w-[34px] rounded-[9px] sm:h-[52px] sm:w-[52px] sm:rounded-[13px]"
            priority
          />
        </Link>

        <nav
          aria-label="Main"
          className="pointer-events-auto flex h-14 min-w-0 flex-1 items-center rounded-full border border-border bg-background/85 px-2 shadow-[0_8px_28px_-12px_rgb(16_26_64_/_0.22)] backdrop-blur-md sm:flex-none"
        >
          <ul className="flex w-full items-center">
            {navLinks.map(({ href, label, Icon }) => {
              // A hash link points at a section, not a route, so pathname can
              // never match it and marking it active would be a lie.
              const isActive =
                !href.includes("#") &&
                (pathname === href || pathname.startsWith(href + "/"));
              return (
                <li key={href} className="flex-1 sm:flex-none">
                  <Link
                    href={href}
                    aria-current={isActive ? "page" : undefined}
                    className="group flex w-full flex-col items-center gap-1 rounded-xl py-1 sm:w-[64px]"
                  >
                    {/* The plate sits behind the icon only, as in the reference */}
                    <span
                      className={cn(
                        "flex h-7 w-9 items-center justify-center rounded-lg transition-colors sm:w-11",
                        isActive ? "bg-primary/10" : "group-hover:bg-secondary",
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-[18px] w-[18px] transition-colors",
                          isActive
                            ? "text-primary"
                            : "text-muted-foreground group-hover:text-foreground",
                        )}
                        aria-hidden="true"
                      />
                    </span>
                    <span
                      className={cn(
                        "whitespace-nowrap text-[10.5px] font-medium leading-none transition-colors",
                        isActive
                          ? "text-primary"
                          : "text-muted-foreground group-hover:text-foreground",
                      )}
                    >
                      {label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/*
          Outline rather than solid: the hero already carries a filled purple
          CTA a few hundred pixels below this one, and two solid pills in the
          same viewport competed for the same eye. On a hairline it still reads
          as the brand action, and it fills purple the moment you reach for it.
        */}
        <FlowButton
          text="Get Started"
          href="/contact"
          variant="outline"
          className="pointer-events-auto absolute right-0 hidden bg-background/85 shadow-[0_8px_28px_-12px_rgb(16_26_64_/_0.22)] backdrop-blur-md sm:inline-flex"
        />
      </div>
    </header>
  );
}

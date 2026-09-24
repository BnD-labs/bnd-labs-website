"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { BookOpen, Layers, Mail, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/services", label: "Services", Icon: Layers },
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
      <div className="relative mx-auto flex h-14 max-w-[90rem] items-center justify-center">
        <Link
          href="/"
          aria-label="BND Labs, home"
          className="pointer-events-auto absolute left-0 rounded-xl transition-opacity hover:opacity-80"
        >
          <Image
            src="/bnd-logo.svg"
            alt=""
            width={46}
            height={46}
            className="h-[36px] w-[36px] sm:h-[46px] sm:w-[46px]"
            priority
          />
        </Link>

        <nav
          aria-label="Main"
          className="pointer-events-auto flex h-14 items-center rounded-full border border-border bg-background/85 px-2 shadow-[0_8px_28px_-12px_rgb(16_26_64_/_0.22)] backdrop-blur-md"
        >
          <ul className="flex items-center">
            {navLinks.map(({ href, label, Icon }) => {
              const isActive =
                pathname === href || pathname.startsWith(href + "/");
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={isActive ? "page" : undefined}
                    className="group flex w-[52px] flex-col items-center gap-1 rounded-xl py-1 sm:w-[66px]"
                  >
                    {/* The plate sits behind the icon only, as in the reference */}
                    <span
                      className={cn(
                        "flex h-7 w-10 items-center justify-center rounded-lg transition-colors sm:w-11",
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
                        "text-[10.5px] font-medium leading-none transition-colors",
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

        <Link
          href="/contact"
          className="pointer-events-auto absolute right-0 hidden items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_8px_28px_-12px_rgb(16_26_64_/_0.22)] transition-colors hover:bg-primary/90 sm:inline-flex"
        >
          Get Started
        </Link>
      </div>
    </header>
  );
}

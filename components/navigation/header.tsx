"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

/**
 * A floating pill rather than a full-width bar.
 *
 * The outer wrapper stays in normal flow and sticky, so nothing below it
 * shifts and no page needs a compensating offset — only the inner pill is
 * styled. The wrapper is transparent, which lets the hero's drafting grid run
 * up behind the nav (see HeroSection's negative top margin); on every other
 * page it simply sits on the page background.
 *
 * Total height is 72px: pt-4 (16) + h-14 (56). HeroSection depends on that
 * number — change both together.
 */
export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="pointer-events-none sticky top-0 z-50 w-full px-4 pt-4 sm:px-6 lg:px-8">
      <div className="pointer-events-auto mx-auto flex h-14 max-w-7xl items-center justify-between rounded-full border border-border bg-background/85 py-2 pl-5 pr-2 shadow-sm backdrop-blur-md">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Logo size="sm" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`text-sm font-medium transition-colors hover:text-foreground ${
                  isActive ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Button className="rounded-full" render={<Link href="/contact" />}>
            Get Started
          </Button>
        </nav>

        {/* Mobile nav */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger
            className="md:hidden"
            render={<Button variant="ghost" size="icon" className="rounded-full" />}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </SheetTrigger>
          <SheetContent side="right" className="w-[min(300px,85vw)]">
            <SheetHeader>
              <SheetTitle>
                <Logo size="sm" />
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4 px-4">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  pathname.startsWith(link.href + "/");
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={`text-lg font-medium transition-colors hover:text-foreground ${
                      isActive ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Button
                className="mt-4 w-full"
                render={
                  <Link href="/contact" onClick={() => setIsOpen(false)} />
                }
              >
                Get Started
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

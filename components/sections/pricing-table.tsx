"use client";

import { ServicesGrid } from "@/components/sections/services-grid";

/**
 * PricingTable is an alias for ServicesGrid — both render the same 3-tier
 * service structure with pricing, features, and CTAs. Kept as a separate
 * export for semantic clarity on the /services page.
 */
export function PricingTable() {
  return <ServicesGrid />;
}

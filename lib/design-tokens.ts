/**
 * BND Labs Design Tokens — TypeScript reference.
 * Canonical source: app/globals.css @theme inline block.
 *
 * Palette derived from brand kit: deep purple primary + molecular accent nodes.
 */

export const colors = {
  brand: {
    50: "#f0f2f8",
    100: "#dde1ed",
    200: "#bcc3d8",
    300: "#8892b0",
    400: "#5a6488",
    500: "#384268",
    600: "#1e2858",
    700: "#101a40",
    800: "#0a1230",
    900: "#080e24",
    950: "#050818",
  },
  molecular: {
    cyan: "#6dd5ea",
    purple: "#b06cc8",
    orange: "#e07848",
    yellow: "#ecd04a",
  },
} as const;

export const fontFamily = {
  sans: "var(--font-source-sans)",
  display: "var(--font-epilogue)",
  mono: "var(--font-geist-mono)",
} as const;

export const sectionSpacing = {
  sm: "4rem",
  md: "6rem",
  lg: "8rem",
} as const;

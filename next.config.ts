import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages
  output: "export",

  experimental: {
    // Tree-shake barrel exports for these packages
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },

  // Image optimization — unoptimized required for static export
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 768, 1024, 1280, 1536],
  },

  // Compression
  compress: true,
};

export default nextConfig;

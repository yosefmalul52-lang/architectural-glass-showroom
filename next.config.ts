import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85, 90, 95],
    minimumCacheTTL: 86400,
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
};

export default nextConfig;

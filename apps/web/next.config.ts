import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Enable React strict mode for better dev warnings
  reactStrictMode: true,

  // Optimise images for future use
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "**.cloudflare.com" },
    ],
  },

  // Typed routes (Next.js 16+)
  typedRoutes: false,

  turbopack: {
    root: path.resolve(__dirname, "../.."),
  },
};

export default nextConfig;

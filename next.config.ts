import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Hero photos carry a ?v=<hash> cache-buster (see src/lib/heroes.ts);
    // local images with a query string must be allowed explicitly.
    localPatterns: [{ pathname: "/**" }],
  },
};

export default nextConfig;

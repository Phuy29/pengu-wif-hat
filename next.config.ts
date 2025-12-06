import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    qualities: [75, 100],
    formats: ['image/avif']
  },
};

export default nextConfig;

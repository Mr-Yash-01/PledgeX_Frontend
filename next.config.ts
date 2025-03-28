import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    middlewarePrefetch: "strict", // Ensure middleware runs on every request
  },
  reactStrictMode: true,

};

export default nextConfig;

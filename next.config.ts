import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Photography is served from /public. No remote hosts: the page must render
    // completely with no third party image requests.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;

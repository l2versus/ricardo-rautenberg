import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ricardorautenberg.com.br",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/uploads/:name",
        destination: "/api/uploads/:name",
      },
    ];
  },
};

export default nextConfig;

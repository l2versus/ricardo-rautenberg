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
};

export default nextConfig;

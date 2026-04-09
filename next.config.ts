import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "drive.google.com",
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://panda-market-api.vercel.app/:path*",
      },
    ];
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const PIPELINE_ORIGIN = "https://source-pipeline-demo.vercel.app";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/financials", destination: "/financials-first", permanent: false },
      { source: "/fionancials", destination: "/financials-first", permanent: false },
    ];
  },
  async rewrites() {
    return [
      { source: "/api/export/:path*", destination: `${PIPELINE_ORIGIN}/api/export/:path*` },
      { source: "/logos/:path*", destination: `${PIPELINE_ORIGIN}/logos/:path*` },
    ];
  },
};

export default nextConfig;

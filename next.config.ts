import type { NextConfig } from "next";

const PIPELINE_ORIGIN = "https://source-pipeline-demo.vercel.app";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/financials-first", destination: "/financials", permanent: true },
      { source: "/fionancials", destination: "/financials", permanent: true },
      { source: "/salora-healthcheck", destination: "/healthcheck", permanent: true },
      { source: "/health-check", destination: "/healthcheck", permanent: true },
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

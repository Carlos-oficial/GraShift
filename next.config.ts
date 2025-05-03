import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '500mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/**',
      },
    ],
  },
};


export default nextConfig;

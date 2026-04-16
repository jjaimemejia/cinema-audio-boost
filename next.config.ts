import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "cinemaaudioboost.online",
          },
        ],
        destination: "https://www.cinemaaudioboost.online/:path*",
        permanent: true,
        basePath: false,
      },
    ];
  },
};

export default nextConfig;

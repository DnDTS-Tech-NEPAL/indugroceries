import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dndtsecom.dndts.net",
        port: "",
      },
      {
        protocol: "https",
        hostname: "indu.dndts.net",
        port: "",
      },
      {
        protocol: "https",
        hostname: "kbp.dndts.net", // ✅ Add this
        port: "",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@saas/core", "@saas/ui"],
  experimental: {
    externalDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.r2.dev",
      },
    ],
  },
};

export default nextConfig;

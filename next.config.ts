import type { NextConfig } from "next";

// No basePath / assetPrefix here: Webflow Cloud applies them from the mount path.
const nextConfig: NextConfig = {
  images: {
    // Webflow Cloud does not resize external images.
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
};

export default nextConfig;

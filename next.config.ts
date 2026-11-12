import { networkInterfaces } from "node:os";
import type { NextConfig } from "next";

// This PC's own local-network IPv4 addresses (e.g. 192.168.x.x / 10.x.x.x).
// The dev server blocks its JS for any host other than localhost, so without these
// a phone opening http://<pc-ip>:3000 gets a page that never becomes interactive.
// Looked up on each start, so it keeps working when the Wi-Fi hands out a new IP.
const lanAddresses = Object.values(networkInterfaces())
  .flat()
  .filter((net) => net && net.family === "IPv4" && !net.internal)
  .map((net) => net!.address);

const nextConfig: NextConfig = {
  // Not a static export: on Vercel the home page is pre-rendered and then refreshed in
  // the background (ISR) so the live LeetCode/GitHub stats update without redeploying.
  allowedDevOrigins: lanAddresses,
  images: {
    // Assets are already pre-optimized .webp files.
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

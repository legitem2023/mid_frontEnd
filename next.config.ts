import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['upload.wikimedia.org','https://encrypted-tbn0.gstatic.com','localhost'],  // Add this domain to the allowed list
  },
};

export default nextConfig;

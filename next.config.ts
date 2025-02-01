// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   experimental: {
//     serverActions:true,
//     serverComponentsExternalPackages: ['mongoose']
//   },
//   images: {
//     domains: ['m.media-amazon.com']
//   }
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig: import('next').NextConfig = {
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ['mongoose']
  },
  images: {
    domains: ['m.media-amazon.com']
  }
}

module.exports = nextConfig
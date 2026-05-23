/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "fakestoreapi.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "images-eu.ssl-images-amazon.com" },
      { protocol: "https", hostname: "www.amazon.in" },
      { protocol: "https", hostname: "logolook.net" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  experimental: {
    optimizePackageImports: [
      "react-icons",
      "@radix-ui/react-icons",
      "@radix-ui/react-navigation-menu",
      "@radix-ui/react-checkbox",
      "@radix-ui/react-select",
    ],
  },
};

export default nextConfig;

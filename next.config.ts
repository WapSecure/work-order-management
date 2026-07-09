import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
      bodySizeLimit: '2mb',
    },
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    remotePatterns: [],
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/work-orders',
        permanent: true,
      },
    ];
  },

  poweredByHeader: false,
  productionBrowserSourceMaps: true,
};

export default nextConfig;

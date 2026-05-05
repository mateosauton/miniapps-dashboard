import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'world-id-assets.com',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig

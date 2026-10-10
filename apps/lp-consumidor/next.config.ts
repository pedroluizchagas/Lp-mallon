import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['@mallevo/ui', '@mallevo/brand'],
  images: {
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig

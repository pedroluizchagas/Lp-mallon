import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['@mallevo/ui', '@mallevo/brand', '@mallevo/config-tailwind'],
  images: {
    unoptimized: false,
  },
}

export default nextConfig

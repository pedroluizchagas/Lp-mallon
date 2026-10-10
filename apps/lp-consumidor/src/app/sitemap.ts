import type { MetadataRoute } from 'next'

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mallevo.com.br'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE}/termos`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE}/privacidade`, changeFrequency: 'yearly', priority: 0.3 },
  ]
}

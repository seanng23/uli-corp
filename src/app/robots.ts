import type { MetadataRoute } from 'next'
import { company } from '@/data/company'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? company.url
  const isProd = process.env.NODE_ENV === 'production'
  return {
    rules: isProd
      ? { userAgent: '*', allow: '/' }
      : { userAgent: '*', disallow: '/' },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

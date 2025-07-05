import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/metadata';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/admin/',
        '/*.json$',
        '/posts/new',
        '/posts/*/edit',
        '/login',
        '/signup',
      ],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
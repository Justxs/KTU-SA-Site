import { MetadataRoute } from 'next';
import { getBaseUrl } from '@/lib/seo/siteUrl';

const baseUrl = getBaseUrl();

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    host: baseUrl,
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

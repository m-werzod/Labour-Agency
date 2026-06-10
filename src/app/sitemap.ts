import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { localizedUrl } from '@/lib/seo';
import { newsPosts } from '@/config/news';

const staticPaths = [
  '/',
  '/about',
  '/services',
  '/industries',
  '/why-uzbekistan',
  '/license',
  '/contact',
  '/faq',
  '/news',
  '/testimonials',
  '/employer-request',
  '/privacy',
  '/terms',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = [...staticPaths, ...newsPosts.map((p) => `/news/${p.slug}`)];

  return paths.map((path) => {
    const languages: Record<string, string> = {};
    routing.locales.forEach((l) => {
      languages[l] = localizedUrl(l, path);
    });

    return {
      url: localizedUrl(routing.defaultLocale, path),
      lastModified: now,
      changeFrequency: path === '/' ? 'weekly' : 'monthly',
      priority: path === '/' ? 1 : path === '/employer-request' ? 0.9 : 0.7,
      alternates: { languages },
    };
  });
}

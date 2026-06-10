import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { routing, type Locale } from '@/i18n/routing';

const baseUrl = siteConfig.url.replace(/\/$/, '');

/** Build a locale-prefixed absolute URL (default locale has no prefix). */
export function localizedUrl(locale: Locale, path = '/'): string {
  const clean = path === '/' ? '' : path.replace(/\/$/, '');
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
  return `${baseUrl}${prefix}${clean}` || baseUrl;
}

interface BuildMetadataArgs {
  locale: Locale;
  title: string | { default: string; template: string };
  description: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
  keywords?: string[];
}

export function buildMetadata({
  locale,
  title,
  description,
  path = '/',
  image,
  type = 'website',
  noIndex = false,
  keywords,
}: BuildMetadataArgs): Metadata {
  const canonical = localizedUrl(locale, path);
  const ogImage = image ?? '/og/opengraph-image';

  const languages: Record<string, string> = {};
  routing.locales.forEach((l) => {
    languages[l] = localizedUrl(l, path);
  });
  languages['x-default'] = localizedUrl(routing.defaultLocale, path);

  const titleText = typeof title === 'string' ? title : title.default;

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    keywords,
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.legalName,
    alternates: { canonical, languages },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
        },
    openGraph: {
      type,
      siteName: siteConfig.name,
      title: titleText,
      description,
      url: canonical,
      locale,
      images: [{ url: ogImage, width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: titleText,
      description,
      images: [ogImage],
    },
    icons: {
      icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
      shortcut: '/icon.svg',
      apple: '/icon.svg',
    },
  };
}

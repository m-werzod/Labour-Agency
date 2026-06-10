import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowLeft, CalendarDays, UserRound } from 'lucide-react';
import type { Locale } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import { buildMetadata, localizedUrl } from '@/lib/seo';
import { newsPosts, getNewsPost } from '@/config/news';
import { images } from '@/config/images';
import { siteConfig } from '@/config/site';
import { SmartImage } from '@/components/shared/smart-image';
import { Badge } from '@/components/ui/badge';
import { CtaBanner } from '@/components/sections/cta-banner';
import { formatDate } from '@/lib/utils';

export function generateStaticParams() {
  return newsPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getNewsPost(slug);
  if (!post) return {};
  return buildMetadata({
    locale,
    title: post.title,
    description: post.excerpt,
    path: `/news/${slug}`,
    type: 'article',
    image: images[post.cover].src,
  });
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getNewsPost(slug);
  if (!post) notFound();

  const t = await getTranslations('News');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { '@type': 'Organization', name: post.author },
    publisher: { '@type': 'Organization', name: siteConfig.legalName },
    image: images[post.cover].src,
    mainEntityOfPage: localizedUrl(locale, `/news/${slug}`),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article>
        {/* Hero */}
        <header className="relative isolate overflow-hidden bg-primary-900">
          <div className="absolute inset-0 -z-10">
            <SmartImage src={images[post.cover].src} alt="" fill priority sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 overlay-navy" />
          </div>
          <div className="container py-16 sm:py-20 lg:py-24">
            <div className="max-w-3xl">
              <Link
                href="/news"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-white/70 transition-colors hover:text-white"
              >
                <ArrowLeft className="size-4" />
                {t('backToNews')}
              </Link>
              <Badge variant="secondary" className="mt-5">
                {post.category}
              </Badge>
              <h1 className="mt-4 text-display-lg text-white text-balance">{post.title}</h1>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/70">
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="size-4" />
                  {formatDate(post.date, locale)}
                </span>
                <span className="flex items-center gap-1.5">
                  <UserRound className="size-4" />
                  {post.author}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Body */}
        <div className="section">
          <div className="container">
            <div className="mx-auto max-w-prose">
              <p className="text-lg font-medium leading-relaxed text-foreground">{post.excerpt}</p>
              <div className="mt-6 space-y-5 leading-relaxed text-muted-foreground">
                {post.body.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>

      <CtaBanner />
    </>
  );
}

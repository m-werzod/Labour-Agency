import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowRight, CalendarDays } from 'lucide-react';
import type { Locale } from '@/i18n/routing';
import { pageMetadata } from '@/lib/seo';
import { Link } from '@/i18n/navigation';
import { newsPosts } from '@/config/news';
import { images } from '@/config/images';
import { PageHeader } from '@/components/layout/page-header';
import { SmartImage } from '@/components/shared/smart-image';
import { StaggerGroup, StaggerItem } from '@/components/shared/reveal';
import { Badge } from '@/components/ui/badge';
import { CtaBanner } from '@/components/sections/cta-banner';
import { formatDate } from '@/lib/utils';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale, page: 'news', path: '/news' });
}

export default async function NewsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tc = await getTranslations('Common');
  const tn = await getTranslations('Nav');
  const t = await getTranslations('News');
  const tm = await getTranslations('Meta');

  const posts = [...newsPosts].sort((a, b) => +new Date(b.date) - +new Date(a.date));

  return (
    <>
      <PageHeader
        eyebrow={t('eyebrow')}
        title={tn('news')}
        subtitle={tm('news.description')}
        breadcrumbs={[{ label: tc('home'), href: '/' }, { label: tn('news') }]}
      />

      <section className="section">
        <div className="container">
          {posts.length === 0 ? (
            <p className="text-center text-muted-foreground">{t('empty')}</p>
          ) : (
            <StaggerGroup className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <StaggerItem key={post.slug} className="h-full">
                  <Link
                    href={`/news/${post.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 ease-premium hover:-translate-y-1 hover:shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <SmartImage
                        src={images[post.cover].src}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
                      />
                      <Badge className="absolute left-4 top-4" variant="secondary">
                        {post.category}
                      </Badge>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <CalendarDays className="size-3.5" />
                        {formatDate(post.date, locale)}
                      </p>
                      <h2 className="mt-2 font-display text-lg font-semibold leading-snug text-primary">
                        {post.title}
                      </h2>
                      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                        {post.excerpt}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-secondary">
                        {t('readMore')}
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerGroup>
          )}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}

import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { pageMetadata } from '@/lib/seo';
import { PageHeader } from '@/components/layout/page-header';
import { TrackForm } from '@/components/forms/track-form';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale, page: 'track', path: '/track', noIndex: true });
}

export default async function TrackPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ ref?: string }>;
}) {
  const { locale } = await params;
  const { ref } = await searchParams;
  setRequestLocale(locale);
  const tc = await getTranslations('Common');
  const tn = await getTranslations('Nav');
  const t = await getTranslations('Track');

  return (
    <>
      <PageHeader
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
        breadcrumbs={[{ label: tc('home'), href: '/' }, { label: tn('track') }]}
      />
      <section className="section">
        <div className="container max-w-2xl">
          <TrackForm initial={ref ?? ''} />
        </div>
      </section>
    </>
  );
}

import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { pageMetadata } from '@/lib/seo';
import { PageHeader } from '@/components/layout/page-header';
import { IndustriesSection } from '@/components/sections/industries-section';
import { CtaBanner } from '@/components/sections/cta-banner';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale, page: 'industries', path: '/industries' });
}

export default async function IndustriesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tn = await getTranslations('Nav');
  const tc = await getTranslations('Common');
  const tm = await getTranslations('Meta');

  return (
    <>
      <PageHeader
        title={tn('industries')}
        subtitle={tm('industries.description')}
        breadcrumbs={[{ label: tc('home'), href: '/' }, { label: tn('industries') }]}
        image="industrial"
      />
      <IndustriesSection withAnchors />
      <CtaBanner />
    </>
  );
}

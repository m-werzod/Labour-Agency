import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { pageMetadata } from '@/lib/seo';
import { PageHeader } from '@/components/layout/page-header';
import { ServicesSection } from '@/components/sections/services-section';
import { ProcessSection } from '@/components/sections/process-section';
import { TrainingSection } from '@/components/sections/training-section';
import { CtaBanner } from '@/components/sections/cta-banner';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale, page: 'services', path: '/services' });
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tn = await getTranslations('Nav');
  const tc = await getTranslations('Common');
  const tm = await getTranslations('Meta');

  return (
    <>
      <PageHeader
        title={tn('services')}
        subtitle={tm('services.description')}
        breadcrumbs={[{ label: tc('home'), href: '/' }, { label: tn('services') }]}
        image="process"
      />
      <ServicesSection />
      <ProcessSection />
      <TrainingSection />
      <CtaBanner />
    </>
  );
}

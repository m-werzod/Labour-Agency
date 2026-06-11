import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '@/lib/seo';
import { BreadcrumbJsonLd } from '@/components/seo/json-ld';
import { localizedUrl } from '@/lib/seo';
import { PageHeader } from '@/components/layout/page-header';
import { LicenseSection } from '@/components/sections/license-section';
import { CtaBanner } from '@/components/sections/cta-banner';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale, page: 'license', path: '/license' });
}

export default async function LicensePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tn = await getTranslations('Nav');
  const tc = await getTranslations('Common');
  const t = await getTranslations('License');

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: tc('home'), url: localizedUrl(locale, '/') },
          { name: tn('license'), url: localizedUrl(locale, '/license') },
        ]}
      />
      <PageHeader
        eyebrow={t('eyebrow')}
        title={tn('license')}
        subtitle={t('subtitle')}
        breadcrumbs={[{ label: tc('home'), href: '/' }, { label: tn('license') }]}
        image="compliance"
      />
      <LicenseSection variant="full" />
      <CtaBanner />
    </>
  );
}

import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '@/lib/seo';
import { PageHeader } from '@/components/layout/page-header';
import { WhyUzbekistanSection } from '@/components/sections/why-uzbekistan-section';
import { TrainingSection } from '@/components/sections/training-section';
import { CtaBanner } from '@/components/sections/cta-banner';
import { Reveal } from '@/components/shared/reveal';

const countryStats = [
  { key: 'population', value: '36M+' },
  { key: 'medianAge', value: '~28' },
  { key: 'literacy', value: '100%' },
  { key: 'annualEntrants', value: '500K+' },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale, page: 'whyUzbekistan', path: '/why-uzbekistan' });
}

export default async function WhyUzbekistanPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tn = await getTranslations('Nav');
  const tc = await getTranslations('Common');
  const t = await getTranslations('WhyUzbekistan');

  return (
    <>
      <PageHeader
        eyebrow={t('eyebrow')}
        title={tn('whyUzbekistan')}
        subtitle={t('intro')}
        breadcrumbs={[{ label: tc('home'), href: '/' }, { label: tn('whyUzbekistan') }]}
        image="tashkent"
      />

      {/* Country statistics */}
      <section className="border-b border-border bg-background py-12">
        <div className="container">
          <Reveal>
            <dl className="grid grid-cols-2 gap-6 lg:grid-cols-4">
              {countryStats.map((stat) => (
                <div key={stat.key} className="text-center">
                  <dt className="sr-only">{t(`stats.${stat.key}`)}</dt>
                  <dd>
                    <span className="block font-display text-4xl font-extrabold text-primary sm:text-5xl">
                      {stat.value}
                    </span>
                    <span className="mt-1 block text-sm font-medium text-muted-foreground">
                      {t(`stats.${stat.key}`)}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <WhyUzbekistanSection />
      <TrainingSection />
      <CtaBanner />
    </>
  );
}

import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { CheckCircle2, Clock, ShieldCheck, UserRound } from 'lucide-react';
import type { Locale } from '@/i18n/routing';
import { pageMetadata } from '@/lib/seo';
import { PageHeader } from '@/components/layout/page-header';
import { EmployerRequestForm } from '@/components/forms/employer-request-form';
import { Reveal } from '@/components/shared/reveal';

const asideIcons = [Clock, CheckCircle2, ShieldCheck, UserRound];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale, page: 'employerRequest', path: '/employer-request' });
}

export default async function EmployerRequestPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tc = await getTranslations('Common');
  const tn = await getTranslations('Nav');
  const t = await getTranslations('EmployerRequest');
  const asidePoints = ['one', 'two', 'three', 'four'] as const;

  return (
    <>
      <PageHeader
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
        breadcrumbs={[{ label: tc('home'), href: '/' }, { label: tn('employerRequest') }]}
      />

      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-7 xl:col-span-8">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
              <EmployerRequestForm />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5 xl:col-span-4">
            <div className="sticky top-28 space-y-6">
              <div className="rounded-2xl bg-primary-900 p-7 text-white">
                <h2 className="font-display text-xl font-semibold">{t('asideTitle')}</h2>
                <p className="mt-2 text-sm text-white/70">{t('asideBody')}</p>
                <ul className="mt-6 space-y-4">
                  {asidePoints.map((key, i) => {
                    const Icon = asideIcons[i] ?? CheckCircle2;
                    return (
                      <li key={key} className="flex items-start gap-3">
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-secondary-300">
                          <Icon className="size-5" />
                        </span>
                        <span className="text-sm font-medium text-white/90">
                          {t(`asidePoints.${key}`)}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

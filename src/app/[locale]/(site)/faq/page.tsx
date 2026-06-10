import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { MessageCircleQuestion, ArrowRight } from 'lucide-react';
import type { Locale } from '@/i18n/routing';
import { pageMetadata } from '@/lib/seo';
import { Link } from '@/i18n/navigation';
import { FaqJsonLd } from '@/components/seo/json-ld';
import { PageHeader } from '@/components/layout/page-header';
import { FaqAccordion, type FaqItem } from '@/components/sections/faq-accordion';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/shared/reveal';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale, page: 'faq', path: '/faq' });
}

export default async function FaqPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tn = await getTranslations('Nav');
  const tc = await getTranslations('Common');
  const t = await getTranslations('Faq');
  const items = t.raw('items') as FaqItem[];

  return (
    <>
      <FaqJsonLd items={items} />
      <PageHeader
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
        breadcrumbs={[{ label: tc('home'), href: '/' }, { label: tn('faq') }]}
      />

      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <FaqAccordion items={items} />
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-4">
            <div className="sticky top-28 rounded-2xl border border-border bg-muted/40 p-7 text-center">
              <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <MessageCircleQuestion className="size-7" />
              </span>
              <h2 className="mt-5 font-display text-xl font-semibold text-primary">
                {t('stillHaveQuestions')}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">{t('contactPrompt')}</p>
              <Button asChild size="lg" className="mt-6 w-full">
                <Link href="/contact">
                  {tc('contactUs')}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="mt-3 w-full">
                <Link href="/employer-request">{tc('requestWorkforce')}</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

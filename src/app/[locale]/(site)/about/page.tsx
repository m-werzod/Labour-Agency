import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ShieldCheck, Award, Scale, HeartHandshake, Handshake, CircleCheckBig, Target, Eye, type LucideIcon } from 'lucide-react';
import type { Locale } from '@/i18n/routing';
import { pageMetadata } from '@/lib/seo';
import { images } from '@/config/images';
import { PageHeader } from '@/components/layout/page-header';
import { Stats } from '@/components/sections/stats';
import { CtaBanner } from '@/components/sections/cta-banner';
import { SectionHeader } from '@/components/shared/section-header';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/shared/reveal';
import { SmartImage } from '@/components/shared/smart-image';

const values: { key: string; icon: LucideIcon }[] = [
  { key: 'integrity', icon: ShieldCheck },
  { key: 'quality', icon: Award },
  { key: 'compliance', icon: Scale },
  { key: 'care', icon: HeartHandshake },
  { key: 'partnership', icon: Handshake },
  { key: 'reliability', icon: CircleCheckBig },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale, page: 'about', path: '/about' });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tc = await getTranslations('Common');
  const tn = await getTranslations('Nav');
  const t = await getTranslations('About');
  const tv = await getTranslations('About.values.items');

  return (
    <>
      <PageHeader
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        breadcrumbs={[{ label: tc('home'), href: '/' }, { label: tn('about') }]}
        image="office"
      />

      {/* Mission & Vision */}
      <section className="section">
        <div className="container grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-elevated">
              <SmartImage
                src={images.team.src}
                alt="Specialist Group recruitment team"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                credit={images.team.credit}
              />
            </div>
          </Reveal>
          <div className="space-y-8">
            <Reveal>
              <span className="eyebrow">
                <span className="h-px w-6 bg-secondary/50" />
                {t('mission.eyebrow')}
              </span>
              <h2 className="mt-4 text-display-md text-primary">{t('mission.title')}</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">{t('mission.body')}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-border bg-muted/40 p-6">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                    <Eye className="size-5" />
                  </span>
                  <h3 className="font-display text-lg font-semibold text-primary">{t('vision.title')}</h3>
                </div>
                <p className="mt-3 leading-relaxed text-muted-foreground">{t('vision.body')}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-muted/30">
        <div className="container">
          <SectionHeader eyebrow={t('values.eyebrow')} title={t('values.title')} />
          <StaggerGroup className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <StaggerItem key={value.key} className="h-full">
                  <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-soft">
                    <span className="flex size-12 items-center justify-center rounded-xl bg-primary/[0.06] text-primary">
                      <Icon className="size-6" />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-semibold text-primary">
                      {tv(`${value.key}.title`)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {tv(`${value.key}.description`)}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      {/* Story */}
      <section className="section">
        <div className="container grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <span className="eyebrow">
              <span className="h-px w-6 bg-secondary/50" />
              {t('story.eyebrow')}
            </span>
            <h2 className="mt-4 text-display-md text-primary">{t('story.title')}</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{t('story.body')}</p>
            <div className="mt-6 flex items-center gap-3 rounded-xl border border-border bg-muted/40 p-4">
              <Target className="size-6 shrink-0 text-secondary" />
              <p className="text-sm font-medium text-foreground">{t('mission.body')}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="order-1 lg:order-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-elevated">
              <SmartImage
                src={images.interview.src}
                alt="Employer interview with a candidate"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                credit={images.interview.credit}
              />
            </div>
          </Reveal>
        </div>
      </section>

      <Stats />
      <CtaBanner />
    </>
  );
}

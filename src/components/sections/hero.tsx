import { useTranslations } from 'next-intl';
import { ArrowRight, ShieldCheck, ScrollText, FileCheck2, Globe2, BadgeCheck } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { images } from '@/config/images';
import { trustBadges } from '@/config/stats';
import { Button } from '@/components/ui/button';
import { SmartImage } from '@/components/shared/smart-image';
import { Reveal } from '@/components/shared/reveal';
import { cn } from '@/lib/utils';

const badgeIcons = [BadgeCheck, ScrollText, FileCheck2, Globe2];

export function Hero() {
  const t = useTranslations('Home.hero');
  const tb = useTranslations('TrustBadges');

  return (
    <section className="relative isolate overflow-hidden bg-primary-900">
      {/* Background photography */}
      <div className="absolute inset-0 -z-10">
        <SmartImage
          src={images.hero.src}
          alt="Skilled workers on an international project site"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          credit={images.hero.credit}
        />
        <div className="absolute inset-0 overlay-navy" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-950/80 via-primary-900/40 to-transparent" />
      </div>

      <div className="container relative pb-14 pt-28 sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-36">
        <div className="max-w-3xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-sm sm:text-sm">
              <ShieldCheck className="size-4 text-secondary-300" />
              {t('badge')}
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-6 text-display-2xl text-white text-balance">{t('title')}</h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              {t('subtitle')}
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Button asChild variant="accent" size="xl" className="w-full shadow-elevated sm:w-auto">
                <Link href="/employer-request">
                  {t('ctaPrimary')}
                  <ArrowRight className="size-5" />
                </Link>
              </Button>
              <Button asChild variant="outline-light" size="xl" className="w-full border-white/50 sm:w-auto">
                <Link href="/contact">{t('ctaSecondary')}</Link>
              </Button>
              <Link
                href="/license"
                className="link-underline inline-flex h-14 items-center gap-2 px-2 text-base font-semibold text-white/85 transition-colors hover:text-white"
              >
                <ScrollText className="size-5 shrink-0" />
                {t('ctaTertiary')}
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Trust indicators */}
        <Reveal delay={0.32}>
          <ul className="mt-14 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/15 pt-8 sm:mt-16 lg:grid-cols-4 lg:gap-8">
            {trustBadges.map((badge, i) => {
              const Icon = badgeIcons[i] ?? BadgeCheck;
              return (
                <li key={badge.key} className="flex items-start gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-secondary-300 ring-1 ring-white/15">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {tb(`items.${badge.key}.title`)}
                    </p>
                    <p className={cn('mt-0.5 hidden text-xs leading-snug text-white/60 sm:block')}>
                      {tb(`items.${badge.key}.description`)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

import { useTranslations } from 'next-intl';
import { BadgeCheck, ArrowRight, Scale, HandCoins, FileSignature, Lock, type LucideIcon } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { licenseInfo } from '@/config/site';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/shared/reveal';
import { SectionHeader } from '@/components/shared/section-header';
import { LicenseCarousel } from './license-carousel';

const credentialRows = [
  { key: 'licenseNumber', value: licenseInfo.licenseNumber },
  { key: 'registerNumber', value: licenseInfo.registerNumber },
  { key: 'tin', value: licenseInfo.tin },
  { key: 'registrationNumber', value: licenseInfo.registrationNumber },
] as const;

const compliancePoints: { key: string; icon: LucideIcon }[] = [
  { key: 'legal', icon: Scale },
  { key: 'ethical', icon: HandCoins },
  { key: 'transparent', icon: FileSignature },
  { key: 'dataProtection', icon: Lock },
];

export function LicenseSection({ variant = 'preview' }: { variant?: 'preview' | 'full' }) {
  const t = useTranslations('License');
  const tc = useTranslations('License.credentials');
  const tcomp = useTranslations('License.compliance');
  const tcommon = useTranslations('Common');

  return (
    <section className="section">
      <div className="container">
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('subtitle')}
          align={variant === 'full' ? 'center' : 'left'}
        />

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <LicenseCarousel />
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-secondary/10 px-3.5 py-1.5 text-sm font-semibold text-secondary">
              <BadgeCheck className="size-4" />
              {t('verifiedBadge')}
            </span>

            <dl className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
              {credentialRows.map((row) => (
                <div key={row.key} className="bg-card p-5">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {tc(row.key)}
                  </dt>
                  <dd className="mt-1.5 font-display text-2xl font-extrabold tracking-tight text-primary tabular-nums">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-5 rounded-xl border border-border bg-muted/40 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t('authorityLabel')}
              </p>
              <p className="mt-1 text-sm font-medium text-foreground">{licenseInfo.issuingAuthority}</p>
            </div>

            {variant === 'preview' && (
              <div className="mt-7">
                <Button asChild size="lg">
                  <Link href="/license">
                    {tcommon('viewDetails')}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            )}
          </Reveal>
        </div>

        {variant === 'full' && (
          <div className="mt-16">
            <div className="mx-auto max-w-2xl text-center">
              <h3 className="text-display-sm text-primary">{tcomp('title')}</h3>
              <p className="mt-3 text-muted-foreground">{tcomp('subtitle')}</p>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {compliancePoints.map((point) => {
                const Icon = point.icon;
                return (
                  <div key={point.key} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                    <span className="flex size-12 items-center justify-center rounded-xl bg-primary/[0.06] text-primary">
                      <Icon className="size-6" />
                    </span>
                    <h4 className="mt-4 font-display text-base font-semibold text-primary">
                      {tcomp(`points.${point.key}.title`)}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {tcomp(`points.${point.key}.description`)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

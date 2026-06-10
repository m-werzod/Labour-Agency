import { useTranslations } from 'next-intl';
import { Users, Award, Languages, GraduationCap, Wallet, Landmark, type LucideIcon } from 'lucide-react';
import { SectionHeader } from '@/components/shared/section-header';
import { StaggerGroup, StaggerItem } from '@/components/shared/reveal';

const reasons: { key: string; icon: LucideIcon }[] = [
  { key: 'youngWorkforce', icon: Users },
  { key: 'workEthic', icon: Award },
  { key: 'multilingual', icon: Languages },
  { key: 'vocational', icon: GraduationCap },
  { key: 'costEffective', icon: Wallet },
  { key: 'governmentSupport', icon: Landmark },
];

export function WhyUzbekistanSection() {
  const t = useTranslations('WhyUzbekistan');
  const tr = useTranslations('WhyUzbekistan.reasons');

  return (
    <section className="section">
      <div className="container">
        <SectionHeader eyebrow={t('eyebrow')} title={t('title')} description={t('subtitle')} />

        <StaggerGroup className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <StaggerItem key={reason.key} className="h-full">
                <div className="flex h-full gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-card">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                    <Icon className="size-6" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold text-primary">
                      {tr(`${reason.key}.title`)}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {tr(`${reason.key}.description`)}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}

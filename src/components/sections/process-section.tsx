import { useTranslations } from 'next-intl';
import { processSteps } from '@/config/services';
import { SectionHeader } from '@/components/shared/section-header';
import { StaggerGroup, StaggerItem } from '@/components/shared/reveal';

export function ProcessSection() {
  const t = useTranslations('Process');
  const ts = useTranslations('Process.steps');

  return (
    <section className="section bg-muted/30">
      <div className="container">
        <SectionHeader eyebrow={t('eyebrow')} title={t('title')} description={t('subtitle')} />

        <StaggerGroup className="relative mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step, i) => {
            const Icon = step.icon;
            return (
              <StaggerItem key={step.key}>
                <div className="relative">
                  <div className="flex items-center gap-4">
                    <span className="relative flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-card">
                      <Icon className="size-6" />
                      <span className="absolute -right-2 -top-2 flex size-7 items-center justify-center rounded-full bg-accent-500 text-xs font-bold text-white ring-4 ring-muted/30">
                        {i + 1}
                      </span>
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      {t('stepLabel')} {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-primary">
                    {ts(`${step.key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {ts(`${step.key}.description`)}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}

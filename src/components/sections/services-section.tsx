import { useTranslations } from 'next-intl';
import { services } from '@/config/services';
import { SectionHeader } from '@/components/shared/section-header';
import { StaggerGroup, StaggerItem } from '@/components/shared/reveal';
import { Card } from '@/components/ui/card';

export function ServicesSection() {
  const t = useTranslations('Services');
  const ti = useTranslations('Services.items');

  return (
    <section className="section">
      <div className="container">
        <SectionHeader eyebrow={t('eyebrow')} title={t('title')} description={t('subtitle')} />

        <StaggerGroup className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <StaggerItem key={service.key} className="h-full">
                <Card className="group h-full p-6 transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-secondary/30 hover:shadow-card">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-primary/[0.06] text-primary transition-colors duration-300 group-hover:bg-secondary group-hover:text-secondary-foreground">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-primary">
                    {ti(`${service.key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {ti(`${service.key}.description`)}
                  </p>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}

import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { industries } from '@/config/industries';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/shared/section-header';
import { StaggerGroup, StaggerItem } from '@/components/shared/reveal';
import { IndustryCard } from './industry-card';

export function IndustriesSection({ limit }: { limit?: number }) {
  const t = useTranslations('Industries');
  const list = limit ? industries.slice(0, limit) : industries;

  return (
    <section className="section bg-muted/30">
      <div className="container">
        <SectionHeader eyebrow={t('eyebrow')} title={t('title')} description={t('subtitle')} />

        <StaggerGroup className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((industry) => (
            <StaggerItem key={industry.slug} className="h-full">
              <IndustryCard industry={industry} className="h-full" />
            </StaggerItem>
          ))}
        </StaggerGroup>

        {limit && (
          <div className="mt-10 flex justify-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/industries">
                {t('viewAll')}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

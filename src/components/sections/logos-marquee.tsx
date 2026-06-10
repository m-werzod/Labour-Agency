import { useTranslations } from 'next-intl';
import { MapPin } from 'lucide-react';
import { destinationCountries } from '@/config/stats';

export function LogosMarquee() {
  const t = useTranslations('Home.logos');
  const items = [...destinationCountries, ...destinationCountries];

  return (
    <section className="border-y border-border bg-muted/40 py-8" aria-label={t('title')}>
      <div className="container">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {t('title')}
        </p>
      </div>
      <div className="relative mt-6 overflow-hidden mask-fade-b [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-10 px-5 motion-reduce:animate-none">
          {items.map((country, i) => (
            <div
              key={`${country}-${i}`}
              className="flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-primary/70"
            >
              <MapPin className="size-4 text-secondary" />
              {country}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

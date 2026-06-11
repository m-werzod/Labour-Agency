import { useTranslations } from 'next-intl';
import {
  AE, AT, BE, BG, BH, CH, CY, CZ, DE, DK, EE, ES, FI, FR, GB, GR, HR, HU, IE,
  IL, IT, JP, KR, KW, KZ, LT, LU, LV, MT, NL, NO, OM, PL, PT, QA, RO, SA, SE,
  SI, SK, TR,
} from 'country-flag-icons/react/3x2';
import { destinationCountries } from '@/config/stats';

const flagByCode: Record<string, typeof GB> = {
  AE, AT, BE, BG, BH, CH, CY, CZ, DE, DK, EE, ES, FI, FR, GB, GR, HR, HU, IE,
  IL, IT, JP, KR, KW, KZ, LT, LU, LV, MT, NL, NO, OM, PL, PT, QA, RO, SA, SE,
  SI, SK, TR,
};

export function LogosMarquee() {
  const t = useTranslations('Home.logos');
  // Duplicate the list so the marquee loops seamlessly.
  const items = [...destinationCountries, ...destinationCountries];

  return (
    <section className="border-y border-border bg-muted/40 py-8" aria-label={t('title')}>
      <div className="container">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {t('title')}
        </p>
      </div>
      <div className="relative mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-8 px-5 motion-reduce:animate-none">
          {items.map((country, i) => {
            const FlagComponent = flagByCode[country.code];
            return (
              <div
                key={`${country.code}-${i}`}
                className="flex items-center gap-2.5 whitespace-nowrap text-sm font-semibold text-primary/70"
              >
                {FlagComponent && (
                  <span className="inline-block h-4 w-6 shrink-0 overflow-hidden rounded-[3px] shadow-[0_0_0_1px_rgba(8,28,55,0.12)]">
                    <FlagComponent title={country.name} className="h-full w-full object-cover" />
                  </span>
                )}
                {country.name}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

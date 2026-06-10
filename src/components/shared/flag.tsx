import { DE, GB, JP, KR, RU, SA, UZ } from 'country-flag-icons/react/3x2';
import { cn } from '@/lib/utils';
import type { Locale } from '@/i18n/routing';

const flagByLocale: Record<Locale, typeof GB> = {
  en: GB,
  ru: RU,
  uz: UZ,
  ko: KR,
  de: DE,
  ja: JP,
  ar: SA,
};

interface FlagProps {
  locale: Locale;
  className?: string;
}

/** Accurate SVG country flag for a given locale, rendered as a rounded chip. */
export function Flag({ locale, className }: FlagProps) {
  const FlagComponent = flagByLocale[locale];
  return (
    <span
      className={cn(
        'inline-block h-4 w-6 shrink-0 overflow-hidden rounded-[3px] shadow-[0_0_0_1px_rgba(8,28,55,0.12)]',
        className,
      )}
    >
      <FlagComponent title="" className="h-full w-full object-cover" />
    </span>
  );
}

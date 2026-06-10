import { defineRouting } from 'next-intl/routing';

export const locales = ['en', 'ru', 'uz', 'ko', 'de', 'ja', 'ar'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

/** Right-to-left languages require `dir="rtl"` on the document. */
export const rtlLocales: Locale[] = ['ar'];

export const localeMeta: Record<
  Locale,
  { label: string; englishName: string; flag: string; dir: 'ltr' | 'rtl' }
> = {
  en: { label: 'English', englishName: 'English', flag: 'gb', dir: 'ltr' },
  ru: { label: 'Русский', englishName: 'Russian', flag: 'ru', dir: 'ltr' },
  uz: { label: 'O‘zbekcha', englishName: 'Uzbek', flag: 'uz', dir: 'ltr' },
  ko: { label: '한국어', englishName: 'Korean', flag: 'kr', dir: 'ltr' },
  de: { label: 'Deutsch', englishName: 'German', flag: 'de', dir: 'ltr' },
  ja: { label: '日本語', englishName: 'Japanese', flag: 'jp', dir: 'ltr' },
  ar: { label: 'العربية', englishName: 'Arabic', flag: 'sa', dir: 'rtl' },
};

export function isRtl(locale: string): boolean {
  return rtlLocales.includes(locale as Locale);
}

export function getDir(locale: string): 'ltr' | 'rtl' {
  return isRtl(locale) ? 'rtl' : 'ltr';
}

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
});

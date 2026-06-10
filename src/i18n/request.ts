import { getRequestConfig } from 'next-intl/server';
import { routing, type Locale } from './routing';
import { deepMerge } from './deep-merge';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale: Locale =
    requested && routing.locales.includes(requested as Locale)
      ? (requested as Locale)
      : routing.defaultLocale;

  // English is always loaded as the base catalog so that any key missing from a
  // translation gracefully resolves (deep-merged, including nested keys).
  const base = (await import(`../../messages/${routing.defaultLocale}.json`)).default;
  const messages =
    locale === routing.defaultLocale
      ? base
      : deepMerge(base, (await import(`../../messages/${locale}.json`)).default);

  return {
    locale,
    messages,
    now: new Date(),
    timeZone: 'Asia/Tashkent',
  };
});

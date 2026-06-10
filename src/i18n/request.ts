import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  // English is always loaded as the fallback catalog so that any key missing
  // from a translation gracefully resolves instead of throwing.
  const messages = (await import(`../../messages/${locale}.json`)).default;
  const fallback =
    locale === routing.defaultLocale
      ? messages
      : (await import(`../../messages/${routing.defaultLocale}.json`)).default;

  return {
    locale,
    messages: { ...fallback, ...messages },
    now: new Date(),
    timeZone: 'Asia/Tashkent',
  };
});

import { useTranslations } from 'next-intl';
import { ArrowRight, PhoneCall } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { images } from '@/config/images';
import { Button } from '@/components/ui/button';
import { SmartImage } from '@/components/shared/smart-image';
import { Reveal } from '@/components/shared/reveal';

export function CtaBanner() {
  const t = useTranslations('Home.ctaBanner');

  return (
    <section className="section">
      <div className="container">
        <div className="relative isolate overflow-hidden rounded-3xl bg-primary-900 px-6 py-14 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          <div className="absolute inset-0 -z-10 opacity-25">
            <SmartImage src={images.ctaBackground.src} alt="" fill sizes="100vw" className="object-cover" />
          </div>
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary-950 via-primary-900/90 to-primary-800/70" />
          <div className="absolute inset-0 -z-10 bg-grid opacity-[0.06]" />

          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-display-lg text-white text-balance">{t('title')}</h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              {t('subtitle')}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild variant="accent" size="xl" className="w-full shadow-elevated sm:w-auto">
                <Link href="/employer-request">
                  {t('primary')}
                  <ArrowRight className="size-5" />
                </Link>
              </Button>
              <Button asChild variant="outline-light" size="xl" className="w-full sm:w-auto">
                <Link href="/contact">
                  <PhoneCall className="size-5" />
                  {t('secondary')}
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

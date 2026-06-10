import { useTranslations } from 'next-intl';
import { stats } from '@/config/stats';
import { images } from '@/config/images';
import { SmartImage } from '@/components/shared/smart-image';
import { CountUp } from '@/components/shared/count-up';
import { StaggerGroup, StaggerItem } from '@/components/shared/reveal';

export function Stats() {
  const t = useTranslations('Stats');

  return (
    <section className="relative isolate overflow-hidden bg-primary-900 py-16 text-white sm:py-20">
      <div className="absolute inset-0 -z-10 opacity-[0.18]">
        <SmartImage
          src={images.worldMap.src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary-900/70 to-primary-950/90" />

      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center text-secondary-300">
            <span className="h-px w-6 bg-secondary-300/60" />
            {t('eyebrow')}
          </span>
          <h2 className="mt-4 text-display-md text-white text-balance">{t('title')}</h2>
          <p className="mt-4 text-white/70">{t('subtitle')}</p>
        </div>

        <StaggerGroup className="mt-12 grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <StaggerItem key={stat.key}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center backdrop-blur-sm sm:p-8">
                <p className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                  <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-sm font-medium text-white/70 sm:text-base">
                  {t(`items.${stat.key}`)}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

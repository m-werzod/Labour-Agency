import { useTranslations } from 'next-intl';
import { GraduationCap, Languages, ShieldCheck, Users, type LucideIcon } from 'lucide-react';
import { images } from '@/config/images';
import { SmartImage } from '@/components/shared/smart-image';
import { Reveal } from '@/components/shared/reveal';

const points: { key: string; icon: LucideIcon }[] = [
  { key: 'vocational', icon: GraduationCap },
  { key: 'language', icon: Languages },
  { key: 'safety', icon: ShieldCheck },
  { key: 'softSkills', icon: Users },
];

export function TrainingSection() {
  const t = useTranslations('Training');
  const tp = useTranslations('Training.points');

  return (
    <section className="section bg-muted/30">
      <div className="container grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative mt-8 aspect-[3/4] overflow-hidden rounded-2xl shadow-card">
              <SmartImage
                src={images.training.src}
                alt="Vocational training session for workers"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover"
                credit={images.training.credit}
              />
            </div>
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-card">
              <SmartImage
                src={images.language.src}
                alt="Language preparation class"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover"
                credit={images.language.credit}
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <span className="eyebrow">
            <span className="h-px w-6 bg-secondary/50" />
            {t('eyebrow')}
          </span>
          <h2 className="mt-4 text-display-lg text-primary text-balance">{t('title')}</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{t('subtitle')}</p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {points.map((point) => {
              const Icon = point.icon;
              return (
                <div key={point.key} className="flex gap-3.5">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent-500/10 text-accent-600">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-primary">{tp(`${point.key}.title`)}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {tp(`${point.key}.description`)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

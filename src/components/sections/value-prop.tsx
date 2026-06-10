import { useTranslations } from 'next-intl';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { images } from '@/config/images';
import { SmartImage } from '@/components/shared/smart-image';
import { Reveal } from '@/components/shared/reveal';
import { Button } from '@/components/ui/button';

export function ValueProp() {
  const t = useTranslations('Home.introCta');
  const tc = useTranslations('Common');
  const tb = useTranslations('TrustBadges');

  const points = ['governmentLicensed', 'legalRecruitment', 'preScreened', 'internationalCooperation'];

  return (
    <section className="section">
      <div className="container grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <span className="eyebrow">
            <span className="h-px w-6 bg-secondary/50" />
            {t('eyebrow')}
          </span>
          <h2 className="mt-4 text-display-lg text-primary text-balance">{t('title')}</h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">{t('body')}</p>

          <ul className="mt-8 grid gap-x-6 gap-y-3.5 sm:grid-cols-2">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-secondary" />
                <span className="text-sm font-medium text-foreground">{tb(`items.${p}.title`)}</span>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/about">
                {tc('learnMore')}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/services">{tc('exploreServices')}</Link>
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="order-1 lg:order-2">
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-elevated sm:aspect-[5/4] lg:aspect-[4/5]">
              <SmartImage
                src={images.handshake.src}
                alt="Employer and recruitment specialist agreeing a workforce partnership"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                credit={images.handshake.credit}
              />
            </div>
            {/* Floating accreditation card */}
            <div className="absolute -bottom-5 left-4 right-4 rounded-xl border border-border bg-background/95 p-4 shadow-card backdrop-blur sm:left-6 sm:right-auto sm:max-w-[16rem]">
              <p className="text-3xl font-extrabold text-primary">100%</p>
              <p className="mt-1 text-sm font-medium text-muted-foreground">
                {tb('items.legalRecruitment.description')}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import { useTranslations } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { images } from '@/config/images';
import type { Industry } from '@/config/industries';
import { SmartImage } from '@/components/shared/smart-image';
import { cn } from '@/lib/utils';

export function IndustryCard({ industry, className }: { industry: Industry; className?: string }) {
  const t = useTranslations('Industries.items');
  const tt = useTranslations('Industries');
  const Icon = industry.icon;
  const image = images[industry.image];

  return (
    <Link
      href={`/industries#${industry.slug}`}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 ease-premium hover:-translate-y-1 hover:shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <SmartImage
          src={image.src}
          alt={t(`${industry.key}.title`)}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
          credit={image.credit}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-950/70 via-primary-950/10 to-transparent" />
        <span className="absolute left-4 top-4 flex size-11 items-center justify-center rounded-xl bg-white/95 text-primary shadow-soft backdrop-blur">
          <Icon className="size-5" />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-semibold text-primary">{t(`${industry.key}.title`)}</h3>
          <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-secondary" />
        </div>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {t(`${industry.key}.description`)}
        </p>
        <p className="mt-4 border-t border-border pt-3 text-xs font-medium text-secondary">
          <span className="text-muted-foreground">{tt('rolesLabel')}: </span>
          {t(`${industry.key}.roles`)}
        </p>
      </div>
    </Link>
  );
}

import { images } from '@/config/images';
import type { ImageKey } from '@/config/images';
import { SmartImage } from '@/components/shared/smart-image';
import { Reveal } from '@/components/shared/reveal';
import { Breadcrumbs, type Crumb } from './breadcrumbs';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  breadcrumbs?: Crumb[];
  image?: ImageKey;
  align?: 'left' | 'center';
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  breadcrumbs,
  image,
  align = 'left',
}: PageHeaderProps) {
  const bg = image ? images[image] : null;

  return (
    <section className="relative isolate overflow-hidden bg-primary-900">
      <div className="absolute inset-0 -z-10">
        {bg ? (
          <>
            <SmartImage src={bg.src} alt="" fill priority sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 overlay-navy-side" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary-800 via-primary-900 to-primary-950" />
        )}
        <div className="absolute inset-0 bg-grid opacity-[0.06]" />
      </div>

      <div className="container py-14 sm:py-16 lg:py-20">
        <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
          {breadcrumbs && (
            <Reveal>
              <div className={align === 'center' ? 'flex justify-center' : ''}>
                <Breadcrumbs items={breadcrumbs} invert />
              </div>
            </Reveal>
          )}
          {eyebrow && (
            <Reveal delay={0.04}>
              <span className={`eyebrow mt-5 text-secondary-300 ${align === 'center' ? 'justify-center' : ''}`}>
                <span className="h-px w-6 bg-secondary-300/60" />
                {eyebrow}
              </span>
            </Reveal>
          )}
          <Reveal delay={0.08}>
            <h1 className="mt-4 text-display-xl text-white text-balance">{title}</h1>
          </Reveal>
          {subtitle && (
            <Reveal delay={0.14}>
              <p className="mt-5 text-base leading-relaxed text-white/75 sm:text-lg">{subtitle}</p>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

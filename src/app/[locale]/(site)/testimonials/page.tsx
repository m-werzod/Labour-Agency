import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Star, MapPin } from 'lucide-react';
import type { Locale } from '@/i18n/routing';
import { pageMetadata } from '@/lib/seo';
import { testimonials } from '@/config/testimonials';
import { PageHeader } from '@/components/layout/page-header';
import { TestimonialsCarousel } from '@/components/sections/testimonials-carousel';
import { CtaBanner } from '@/components/sections/cta-banner';
import { StaggerGroup, StaggerItem } from '@/components/shared/reveal';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { initials } from '@/lib/utils';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale, page: 'testimonials', path: '/testimonials' });
}

export default async function TestimonialsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tn = await getTranslations('Nav');
  const tc = await getTranslations('Common');
  const tm = await getTranslations('Meta');

  return (
    <>
      <PageHeader
        title={tn('testimonials')}
        subtitle={tm('testimonials.description')}
        breadcrumbs={[{ label: tc('home'), href: '/' }, { label: tn('testimonials') }]}
        image="handshake"
      />

      <section className="section">
        <div className="container">
          <StaggerGroup className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((item) => (
              <StaggerItem key={item.id} className="h-full">
                <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-soft">
                  <div className="flex gap-0.5" aria-label={`${item.rating} / 5`}>
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="size-4 fill-accent-400 text-accent-400" />
                    ))}
                  </div>
                  <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">
                    “{item.quote}”
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                    <Avatar>
                      <AvatarFallback>{initials(item.authorName)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold text-primary">{item.authorName}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.authorTitle}, {item.company}
                      </p>
                      <p className="mt-0.5 flex items-center gap-1 text-xs text-secondary">
                        <MapPin className="size-3" />
                        {item.country}
                      </p>
                    </div>
                  </figcaption>
                </figure>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <TestimonialsCarousel />
      <CtaBanner />
    </>
  );
}

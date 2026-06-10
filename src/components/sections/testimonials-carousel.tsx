'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Quote, Star, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { testimonials as data, type Testimonial } from '@/config/testimonials';
import { SectionHeader } from '@/components/shared/section-header';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { initials, cn } from '@/lib/utils';

export function TestimonialsCarousel({ items = data }: { items?: Testimonial[] }) {
  const t = useTranslations('Testimonials');
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', containScroll: 'trimSnaps' },
    [Autoplay({ delay: 6000, stopOnInteraction: true })],
  );
  const [selected, setSelected] = React.useState(0);
  const [snaps, setSnaps] = React.useState<number[]>([]);

  React.useEffect(() => {
    if (!emblaApi) return;
    setSnaps(emblaApi.scrollSnapList());
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    onSelect();
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="section bg-primary-900 text-white">
      <div className="container">
        <SectionHeader eyebrow={t('eyebrow')} title={t('title')} description={t('subtitle')} invert />

        <div className="mt-12">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="min-w-0 shrink-0 grow-0 basis-full pl-0 pr-5 sm:basis-1/2 lg:basis-1/3"
                >
                  <figure className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-7">
                    <Quote className="size-8 text-secondary-300" aria-hidden />
                    <div className="mt-3 flex gap-0.5" aria-label={`${item.rating} / 5`}>
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} className="size-4 fill-accent-400 text-accent-400" />
                      ))}
                    </div>
                    <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-white/85">
                      “{item.quote}”
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                      <Avatar className="size-11 bg-white/10">
                        <AvatarFallback className="bg-white/10 text-sm font-semibold text-white">
                          {initials(item.authorName)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold text-white">{item.authorName}</p>
                        <p className="text-xs text-white/60">
                          {item.authorTitle}, {item.company}
                        </p>
                        <p className="mt-0.5 flex items-center gap-1 text-xs text-secondary-300">
                          <MapPin className="size-3" />
                          {item.country}
                        </p>
                      </div>
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-between">
            <div className="flex gap-1.5">
              {snaps.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => emblaApi?.scrollTo(i)}
                  className={cn(
                    'h-2 rounded-full transition-all',
                    i === selected ? 'w-6 bg-secondary-300' : 'w-2 bg-white/25 hover:bg-white/40',
                  )}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                aria-label="Previous"
                onClick={() => emblaApi?.scrollPrev()}
                className="inline-flex size-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                aria-label="Next"
                onClick={() => emblaApi?.scrollNext()}
                className="inline-flex size-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

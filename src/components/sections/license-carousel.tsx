'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Download, Maximize2, FileCheck2 } from 'lucide-react';
import { SmartImage } from '@/components/shared/smart-image';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * The director/award photo should be placed at /public/license/director.jpg
 * and the official certificate scan at /public/license/certificate.(jpg|pdf).
 */
const DIRECTOR_PHOTO = '/license/director.jpg';
const CERTIFICATE_IMAGE = '/license/certificate.jpg';
const CERTIFICATE_PDF = '/license/certificate.pdf';

const DIRECTOR_CAPTION =
  'The Director & CEO of the Labour Migration Agency, Qodir Mamadjanov, and the Minister of Migration of the Republic of Uzbekistan.';

interface Slide {
  src: string;
  alt: string;
  caption: string;
  fit: 'cover' | 'contain';
  downloadPdf?: string;
}

export function LicenseCarousel() {
  const t = useTranslations('License.certificate');
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' });
  const [selected, setSelected] = React.useState(0);

  const slides: Slide[] = [
    { src: DIRECTOR_PHOTO, alt: DIRECTOR_CAPTION, caption: DIRECTOR_CAPTION, fit: 'cover' },
    {
      src: CERTIFICATE_IMAGE,
      alt: t('alt'),
      caption: t('caption'),
      fit: 'contain',
      downloadPdf: CERTIFICATE_PDF,
    },
  ];

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    onSelect();
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  const active = slides[selected] ?? slides[0]!;

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
      <div className="relative">
        {/* Viewport */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {slides.map((slide, i) => (
              <div key={i} className="relative min-w-0 flex-[0_0_100%]">
                <div className="relative aspect-[4/3] bg-primary-900">
                  <SmartImage
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={i === 0}
                    className={slide.fit === 'contain' ? 'object-contain' : 'object-cover object-center'}
                  />
                  {/* Caption overlay */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary-950/85 via-primary-950/45 to-transparent p-4 pt-12 sm:p-5 sm:pt-14">
                    <p className="text-sm font-medium leading-snug text-white text-balance">
                      {slide.caption}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Arrows */}
        {slides.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => emblaApi?.scrollPrev()}
              className="absolute left-3 top-[calc(50%-2.5rem)] inline-flex size-9 items-center justify-center rounded-full bg-white/90 text-primary shadow-soft backdrop-blur transition-colors hover:bg-white"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={() => emblaApi?.scrollNext()}
              className="absolute right-3 top-[calc(50%-2.5rem)] inline-flex size-9 items-center justify-center rounded-full bg-white/90 text-primary shadow-soft backdrop-blur transition-colors hover:bg-white"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 border-t border-border bg-background px-4 py-3">
        <div className="flex items-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to image ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={cn(
                'h-2 rounded-full transition-all',
                i === selected ? 'w-6 bg-secondary' : 'w-2 bg-border hover:bg-muted-foreground/40',
              )}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom / full size */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Maximize2 className="size-4" />
                <span className="hidden sm:inline">{t('view')}</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl gap-0 p-0">
              <DialogTitle className="flex items-center gap-2 border-b px-5 py-4">
                <FileCheck2 className="size-5 text-secondary" />
                {t('title')}
              </DialogTitle>
              <div className="bg-muted/40 p-4">
                <div className="relative mx-auto max-h-[72vh] w-full">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-primary-900">
                    <SmartImage
                      src={active.src}
                      alt={active.alt}
                      fill
                      sizes="900px"
                      className={active.fit === 'contain' ? 'object-contain' : 'object-contain'}
                    />
                  </div>
                  <p className="mt-3 text-center text-sm text-muted-foreground">{active.caption}</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {active.downloadPdf && (
            <Button asChild variant="default" size="sm">
              <a href={active.downloadPdf} download>
                <Download className="size-4" />
                <span className="hidden sm:inline">{t('download')}</span>
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { ZoomIn, ZoomOut, RotateCcw, Download, Maximize2, FileCheck2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog';
import { SmartImage } from '@/components/shared/smart-image';
import { licenseInfo } from '@/config/site';

/** The real certificate scan should be placed at /license/certificate.(jpg|pdf). */
const CERT_IMAGE = '/license/certificate.jpg';
const CERT_PDF = '/license/certificate.pdf';

export function CertificateViewer() {
  const t = useTranslations('License.certificate');
  const [zoom, setZoom] = React.useState(1);

  const clamp = (z: number) => Math.min(3, Math.max(1, Math.round(z * 10) / 10));

  return (
    <Dialog onOpenChange={(open) => !open && setZoom(1)}>
      <DialogTrigger asChild>
        <button className="group relative block w-full overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-shadow hover:shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          <div className="relative aspect-[1/1.32] w-full">
            <SmartImage
              src={CERT_IMAGE}
              alt={t('alt')}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-primary-950/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100">
              <span className="m-4 inline-flex items-center gap-2 rounded-md bg-white/95 px-3 py-2 text-sm font-semibold text-primary shadow-soft">
                <Maximize2 className="size-4" />
                {t('view')}
              </span>
            </div>
          </div>
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl gap-0 p-0">
        <DialogTitle className="flex items-center gap-2 border-b px-5 py-4">
          <FileCheck2 className="size-5 text-secondary" />
          {t('title')}
        </DialogTitle>

        <div className="relative max-h-[70vh] overflow-auto bg-muted/40 p-4">
          <div className="mx-auto w-full max-w-xl origin-top transition-transform duration-200" style={{ transform: `scale(${zoom})` }}>
            <div className="relative aspect-[1/1.32] overflow-hidden rounded-lg border bg-background shadow-card">
              <SmartImage src={CERT_IMAGE} alt={t('alt')} fill sizes="600px" className="object-contain" />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t bg-background px-5 py-3.5">
          <div className="flex items-center gap-1.5">
            <Button variant="outline" size="icon" aria-label={t('zoom')} onClick={() => setZoom((z) => clamp(z - 0.25))} disabled={zoom <= 1}>
              <ZoomOut className="size-4" />
            </Button>
            <span className="w-12 text-center text-sm font-medium tabular-nums">{Math.round(zoom * 100)}%</span>
            <Button variant="outline" size="icon" aria-label={t('zoom')} onClick={() => setZoom((z) => clamp(z + 0.25))} disabled={zoom >= 3}>
              <ZoomIn className="size-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Reset zoom" onClick={() => setZoom(1)} disabled={zoom === 1}>
              <RotateCcw className="size-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden text-xs text-muted-foreground sm:inline">
              {t('caption')} · No. {licenseInfo.licenseNumber}
            </span>
            <Button asChild variant="default" size="sm">
              <a href={CERT_PDF} download>
                <Download className="size-4" />
                {t('download')}
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

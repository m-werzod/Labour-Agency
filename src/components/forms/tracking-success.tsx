'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { CheckCircle2, Copy, Check, Home, Search } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';

export function TrackingSuccess({ trackingNumber }: { trackingNumber: string }) {
  const t = useTranslations('EmployerRequest.success');
  const [copied, setCopied] = React.useState(false);

  function copy() {
    navigator.clipboard?.writeText(trackingNumber).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const steps = [t('whatNext.one'), t('whatNext.two'), t('whatNext.three')];

  return (
    <div className="mx-auto max-w-xl text-center">
      <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
        <CheckCircle2 className="size-8" />
      </span>
      <h1 className="mt-6 text-display-md text-primary">{t('title')}</h1>
      <p className="mt-3 text-muted-foreground">{t('body')}</p>

      <div className="mt-8 rounded-2xl border border-secondary/30 bg-secondary/[0.05] p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          {t('trackingLabel')}
        </p>
        <div className="mt-2 flex items-center justify-center gap-3">
          <span className="font-display text-3xl font-extrabold tracking-wider text-primary">
            {trackingNumber}
          </span>
          <button
            onClick={copy}
            aria-label={copied ? t('copied') : t('copy')}
            className="inline-flex size-9 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:text-primary"
          >
            {copied ? <Check className="size-4 text-secondary" /> : <Copy className="size-4" />}
          </button>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-card p-6 text-left">
        <h2 className="font-display text-base font-semibold text-primary">{t('whatNextTitle')}</h2>
        <ol className="mt-4 space-y-3">
          {steps.map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {i + 1}
              </span>
              <span className="text-sm text-muted-foreground">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Button asChild size="lg">
          <Link href={`/track?ref=${encodeURIComponent(trackingNumber)}`}>
            <Search className="size-4" />
            {t('trackCta')}
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/">
            <Home className="size-4" />
            {t('homeCta')}
          </Link>
        </Button>
      </div>
    </div>
  );
}

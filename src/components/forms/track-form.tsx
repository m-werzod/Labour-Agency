'use client';

import * as React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Search, Loader2, PackageSearch, Building2, Users, CalendarDays } from 'lucide-react';
import { trackRequest, type TrackResult } from '@/server/actions/track';
import { industryByEnum } from '@/config/industries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';

const statusVariant: Record<string, 'default' | 'secondary' | 'warning' | 'muted' | 'success'> = {
  NEW: 'default',
  IN_REVIEW: 'warning',
  CONTACTED: 'secondary',
  IN_PROGRESS: 'secondary',
  SHORTLISTED: 'secondary',
  FULFILLED: 'success',
  ON_HOLD: 'warning',
  CLOSED: 'muted',
  REJECTED: 'muted',
};

export function TrackForm({ initial = '' }: { initial?: string }) {
  const t = useTranslations('Track');
  const ti = useTranslations('Industries.items');
  const locale = useLocale();
  const [value, setValue] = React.useState(initial);
  const [pending, setPending] = React.useState(false);
  const [result, setResult] = React.useState<TrackResult | null>(null);
  const [notFound, setNotFound] = React.useState(false);

  const runLookup = React.useCallback(async (query: string) => {
    if (!query.trim()) return;
    setPending(true);
    setNotFound(false);
    setResult(null);
    const res = await trackRequest(query);
    if (res.found) setResult(res.data);
    else setNotFound(true);
    setPending(false);
  }, []);

  // Auto-run when arriving with a ?ref= tracking number.
  React.useEffect(() => {
    if (initial) void runLookup(initial);
  }, [initial, runLookup]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await runLookup(value);
  }

  return (
    <div>
      <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={t('placeholder')}
            className="pl-10 uppercase"
            aria-label={t('placeholder')}
          />
        </div>
        <Button type="submit" size="lg" disabled={pending} className="sm:w-auto">
          {pending ? <Loader2 className="size-4 animate-spin" /> : <Search className="size-4" />}
          {pending ? t('searching') : t('submit')}
        </Button>
      </form>

      {notFound && (
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-border bg-muted/40 p-5">
          <PackageSearch className="size-6 shrink-0 text-muted-foreground" />
          <div>
            <p className="font-semibold text-primary">{t('notFoundTitle')}</p>
            <p className="mt-1 text-sm text-muted-foreground">{t('notFoundBody')}</p>
          </div>
        </div>
      )}

      {result && (
        <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted/30 px-5 py-4">
            <span className="font-display text-lg font-bold tracking-wide text-primary">
              {result.trackingNumber}
            </span>
            <Badge variant={statusVariant[result.status] ?? 'default'}>
              {t(`status.${result.status}`)}
            </Badge>
          </div>
          <dl className="grid gap-px bg-border sm:grid-cols-3">
            <div className="bg-card p-5">
              <dt className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                <Building2 className="size-4" />
                {t('industryLabel')}
              </dt>
              <dd className="mt-1.5 font-semibold text-primary">
                {ti(`${industryByEnum[result.industry].key}.title`)}
              </dd>
            </div>
            <div className="bg-card p-5">
              <dt className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                <Users className="size-4" />
                {t('workersLabel')}
              </dt>
              <dd className="mt-1.5 font-semibold text-primary">{result.workersCount}</dd>
            </div>
            <div className="bg-card p-5">
              <dt className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                <CalendarDays className="size-4" />
                {t('submittedLabel')}
              </dt>
              <dd className="mt-1.5 font-semibold text-primary">{formatDate(result.createdAt, locale)}</dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  );
}

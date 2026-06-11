import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Inbox, Sparkles, Building2, UsersRound, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { prisma } from '@/lib/prisma';
import { industryByEnum } from '@/config/industries';
import { PageTitle } from '@/components/dashboard/page-title';
import { StatCard } from '@/components/dashboard/stat-card';
import { StatusBadge } from '@/components/dashboard/status-badge';
import { formatDate } from '@/lib/utils';
import type { IndustryType, RequestStatus } from '@prisma/client';

async function getOverview() {
  try {
    const [total, newCount, employers, candidates, recent, byIndustry, byStatus] = await Promise.all([
      prisma.employerRequest.count(),
      prisma.employerRequest.count({ where: { status: 'NEW' } }),
      prisma.employer.count(),
      prisma.candidate.count(),
      prisma.employerRequest.findMany({ orderBy: { createdAt: 'desc' }, take: 6 }),
      prisma.employerRequest.groupBy({ by: ['industry'], _count: true }),
      prisma.employerRequest.groupBy({ by: ['status'], _count: true }),
    ]);
    return { total, newCount, employers, candidates, recent, byIndustry, byStatus, ok: true as const };
  } catch {
    return {
      total: 0,
      newCount: 0,
      employers: 0,
      candidates: 0,
      recent: [],
      byIndustry: [] as { industry: IndustryType; _count: number }[],
      byStatus: [] as { status: RequestStatus; _count: number }[],
      ok: false as const,
    };
  }
}

export const dynamic = 'force-dynamic';

export default async function AdminOverviewPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Admin.overview');
  const ti = await getTranslations('Industries.items');
  const tc = await getTranslations('Common');

  const data = await getOverview();
  const maxIndustry = Math.max(1, ...data.byIndustry.map((b) => b._count));

  return (
    <>
      <PageTitle title={t('recentRequests')} description={new Date().toLocaleDateString(locale, { dateStyle: 'full' })} />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label={t('totalRequests')} value={data.total} icon={Inbox} />
        <StatCard label={t('newRequests')} value={data.newCount} icon={Sparkles} tone="accent" />
        <StatCard label={t('employers')} value={data.employers} icon={Building2} tone="secondary" />
        <StatCard label={t('candidates')} value={data.candidates} icon={UsersRound} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Recent requests */}
        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <h2 className="font-display font-semibold text-primary">{t('recentRequests')}</h2>
              <Link href="/admin/requests" className="inline-flex items-center gap-1 text-sm font-medium text-secondary hover:underline">
                {tc('viewAll')}
                <ArrowRight className="size-4" />
              </Link>
            </div>
            {data.recent.length === 0 ? (
              <p className="px-5 py-12 text-center text-sm text-muted-foreground">{tc('noResults')}</p>
            ) : (
              <div className="divide-y divide-border">
                {data.recent.map((r) => (
                  <Link
                    key={r.id}
                    href={`/admin/requests/${r.id}`}
                    className="flex items-center justify-between gap-4 px-5 py-3.5 transition-colors hover:bg-muted/40"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium text-foreground">{r.companyName}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {r.trackingNumber} · {ti(`${industryByEnum[r.industry].key}.title`)} · {r.workersCount}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <span className="hidden text-xs text-muted-foreground sm:inline">
                        {formatDate(r.createdAt, locale, { month: 'short', day: 'numeric' })}
                      </span>
                      <StatusBadge status={r.status} />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* By industry */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <h2 className="font-display font-semibold text-primary">{t('byIndustry')}</h2>
          {data.byIndustry.length === 0 ? (
            <p className="mt-8 text-center text-sm text-muted-foreground">{tc('noResults')}</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {data.byIndustry
                .sort((a, b) => b._count - a._count)
                .map((b) => (
                  <li key={b.industry}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-foreground">{ti(`${industryByEnum[b.industry].key}.title`)}</span>
                      <span className="font-semibold text-primary">{b._count}</span>
                    </div>
                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-secondary"
                        style={{ width: `${(b._count / maxIndustry) * 100}%` }}
                      />
                    </div>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

import { getTranslations, setRequestLocale } from 'next-intl/server';
import { RequestStatus } from '@prisma/client';
import type { Locale } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import { prisma } from '@/lib/prisma';
import { industryByEnum } from '@/config/industries';
import { PageTitle } from '@/components/dashboard/page-title';
import { StatusBadge } from '@/components/dashboard/status-badge';
import { cn, formatDate } from '@/lib/utils';

async function getRequests(status?: string) {
  try {
    const where =
      status && Object.values(RequestStatus).includes(status as RequestStatus)
        ? { status: status as RequestStatus }
        : {};
    return await prisma.employerRequest.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
  } catch {
    return [];
  }
}

export const dynamic = 'force-dynamic';

export default async function AdminRequestsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ status?: string }>;
}) {
  const { locale } = await params;
  const { status } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations('Admin');
  const ts = await getTranslations('Track.status');
  const ti = await getTranslations('Industries.items');
  const tc = await getTranslations('Common');

  const requests = await getRequests(status);

  return (
    <>
      <PageTitle title={t('nav.requests')} />

      {/* Filter chips */}
      <div className="mb-5 flex flex-wrap gap-2">
        <Link
          href="/admin/requests"
          className={cn(
            'rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors',
            !status ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card text-muted-foreground hover:bg-accent',
          )}
        >
          {tc('all')}
        </Link>
        {Object.values(RequestStatus).map((s) => (
          <Link
            key={s}
            href={`/admin/requests?status=${s}`}
            className={cn(
              'rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors',
              status === s ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card text-muted-foreground hover:bg-accent',
            )}
          >
            {ts(s)}
          </Link>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
        {requests.length === 0 ? (
          <p className="px-5 py-16 text-center text-sm text-muted-foreground">{tc('noResults')}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-5 py-3 font-semibold">Company</th>
                  <th className="px-5 py-3 font-semibold">Tracking</th>
                  <th className="px-5 py-3 font-semibold">Industry</th>
                  <th className="px-5 py-3 font-semibold">Workers</th>
                  <th className="px-5 py-3 font-semibold">Country</th>
                  <th className="px-5 py-3 font-semibold">{tc('date')}</th>
                  <th className="px-5 py-3 font-semibold">{tc('status')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {requests.map((r) => (
                  <tr key={r.id} className="group transition-colors hover:bg-muted/40">
                    <td className="px-5 py-3.5">
                      <Link href={`/admin/requests/${r.id}`} className="font-medium text-foreground hover:text-secondary">
                        {r.companyName}
                      </Link>
                      <p className="text-xs text-muted-foreground">{r.contactPerson}</p>
                    </td>
                    <td className="px-5 py-3.5 font-mono text-xs text-muted-foreground">{r.trackingNumber}</td>
                    <td className="px-5 py-3.5 text-muted-foreground">
                      {ti(`${industryByEnum[r.industry].key}.title`)}
                    </td>
                    <td className="px-5 py-3.5 font-semibold text-primary">{r.workersCount}</td>
                    <td className="px-5 py-3.5 text-muted-foreground">{r.country}</td>
                    <td className="px-5 py-3.5 text-muted-foreground">{formatDate(r.createdAt, locale, { dateStyle: 'medium' })}</td>
                    <td className="px-5 py-3.5">
                      <StatusBadge status={r.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

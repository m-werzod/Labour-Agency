import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Inbox, Activity, CheckCircle2, ArrowRight, Plus } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { industryByEnum } from '@/config/industries';
import { PageTitle } from '@/components/dashboard/page-title';
import { StatCard } from '@/components/dashboard/stat-card';
import { StatusBadge } from '@/components/dashboard/status-badge';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';

const CLOSED = ['FULFILLED', 'CLOSED', 'REJECTED'];

async function getEmployerRequests(email?: string | null, employerId?: string | null) {
  if (!email && !employerId) return [];
  try {
    return await prisma.employerRequest.findMany({
      where: {
        OR: [
          ...(email ? [{ email }] : []),
          ...(employerId ? [{ employerId }] : []),
        ],
      },
      orderBy: { createdAt: 'desc' },
    });
  } catch {
    return [];
  }
}

export const dynamic = 'force-dynamic';

export default async function PortalDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const session = await auth();
  const t = await getTranslations('Portal');
  const to = await getTranslations('Admin.overview');
  const tsStatus = await getTranslations('Track.status');
  const ti = await getTranslations('Industries.items');
  const tc = await getTranslations('Common');

  const requests = await getEmployerRequests(session?.user?.email, session?.user?.employerId);
  const active = requests.filter((r) => !CLOSED.includes(r.status)).length;
  const fulfilled = requests.filter((r) => r.status === 'FULFILLED').length;

  return (
    <>
      <PageTitle
        title={`${t('welcome')}${session?.user?.name ? `, ${session.user.name}` : ''}`}
        action={
          <Button asChild>
            <Link href="/employer-request">
              <Plus className="size-4" />
              {tc('requestWorkforce')}
            </Link>
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label={t('dashboard.activeRequests')} value={active} icon={Activity} tone="accent" />
        <StatCard label={to('totalRequests')} value={requests.length} icon={Inbox} />
        <StatCard label={tsStatus('FULFILLED')} value={fulfilled} icon={CheckCircle2} tone="secondary" />
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-display font-semibold text-primary">{t('nav.requests')}</h2>
          <Link href="/portal/requests" className="inline-flex items-center gap-1 text-sm font-medium text-secondary hover:underline">
            {tc('viewAll')}
            <ArrowRight className="size-4" />
          </Link>
        </div>
        {requests.length === 0 ? (
          <div className="px-5 py-14 text-center">
            <p className="text-sm text-muted-foreground">{tc('noResults')}</p>
            <Button asChild variant="outline" size="sm" className="mt-4">
              <Link href="/employer-request">{tc('requestWorkforce')}</Link>
            </Button>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {requests.slice(0, 6).map((r) => (
              <Link
                key={r.id}
                href={`/track?ref=${r.trackingNumber}`}
                className="flex items-center justify-between gap-4 px-5 py-3.5 transition-colors hover:bg-muted/40"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-foreground">
                    {ti(`${industryByEnum[r.industry].key}.title`)} · {r.workersCount}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {r.trackingNumber} · {formatDate(r.createdAt, locale, { dateStyle: 'medium' })}
                  </p>
                </div>
                <StatusBadge status={r.status} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

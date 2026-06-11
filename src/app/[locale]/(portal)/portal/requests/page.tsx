import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { industryByEnum } from '@/config/industries';
import { PageTitle } from '@/components/dashboard/page-title';
import { StatusBadge } from '@/components/dashboard/status-badge';
import { formatDate } from '@/lib/utils';

async function getEmployerRequests(email?: string | null, employerId?: string | null) {
  if (!email && !employerId) return [];
  try {
    return await prisma.employerRequest.findMany({
      where: {
        OR: [...(email ? [{ email }] : []), ...(employerId ? [{ employerId }] : [])],
      },
      orderBy: { createdAt: 'desc' },
    });
  } catch {
    return [];
  }
}

export const dynamic = 'force-dynamic';

export default async function PortalRequestsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const session = await auth();
  const t = await getTranslations('Portal');
  const ti = await getTranslations('Industries.items');
  const tc = await getTranslations('Common');

  const requests = await getEmployerRequests(session?.user?.email, session?.user?.employerId);

  return (
    <>
      <PageTitle title={t('nav.requests')} />
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
        {requests.length === 0 ? (
          <p className="px-5 py-16 text-center text-sm text-muted-foreground">{tc('noResults')}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-5 py-3 font-semibold">Tracking</th>
                  <th className="px-5 py-3 font-semibold">Industry</th>
                  <th className="px-5 py-3 font-semibold">Workers</th>
                  <th className="px-5 py-3 font-semibold">{tc('date')}</th>
                  <th className="px-5 py-3 font-semibold">{tc('status')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {requests.map((r) => (
                  <tr key={r.id} className="hover:bg-muted/40">
                    <td className="px-5 py-3.5">
                      <Link href={`/track?ref=${r.trackingNumber}`} className="font-mono text-xs font-medium text-secondary hover:underline">
                        {r.trackingNumber}
                      </Link>
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground">
                      {ti(`${industryByEnum[r.industry].key}.title`)}
                    </td>
                    <td className="px-5 py-3.5 font-semibold text-primary">{r.workersCount}</td>
                    <td className="px-5 py-3.5 text-muted-foreground">
                      {formatDate(r.createdAt, locale, { dateStyle: 'medium' })}
                    </td>
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

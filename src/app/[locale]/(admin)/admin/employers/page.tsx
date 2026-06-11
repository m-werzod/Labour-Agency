import { getTranslations, setRequestLocale } from 'next-intl/server';
import { BadgeCheck } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { PageTitle } from '@/components/dashboard/page-title';
import { Badge } from '@/components/ui/badge';

async function getEmployers() {
  try {
    return await prisma.employer.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
      include: { _count: { select: { requests: true } } },
    });
  } catch {
    return [];
  }
}

export const dynamic = 'force-dynamic';

export default async function AdminEmployersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Admin');
  const tc = await getTranslations('Common');
  const employers = await getEmployers();

  return (
    <>
      <PageTitle title={t('nav.employers')} />
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
        {employers.length === 0 ? (
          <p className="px-5 py-16 text-center text-sm text-muted-foreground">{tc('noResults')}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-5 py-3 font-semibold">Company</th>
                  <th className="px-5 py-3 font-semibold">Country</th>
                  <th className="px-5 py-3 font-semibold">Contact</th>
                  <th className="px-5 py-3 font-semibold">Requests</th>
                  <th className="px-5 py-3 font-semibold">Verified</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {employers.map((e) => (
                  <tr key={e.id} className="hover:bg-muted/40">
                    <td className="px-5 py-3.5 font-medium text-foreground">{e.companyName}</td>
                    <td className="px-5 py-3.5 text-muted-foreground">{e.country}</td>
                    <td className="px-5 py-3.5 text-muted-foreground">
                      <a href={`mailto:${e.email}`} className="hover:text-secondary">
                        {e.email}
                      </a>
                    </td>
                    <td className="px-5 py-3.5 font-semibold text-primary">{e._count.requests}</td>
                    <td className="px-5 py-3.5">
                      {e.isVerified ? (
                        <Badge variant="success">
                          <BadgeCheck className="size-3.5" /> Verified
                        </Badge>
                      ) : (
                        <Badge variant="muted">—</Badge>
                      )}
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

import { getTranslations, setRequestLocale } from 'next-intl/server';
import { prisma } from '@/lib/prisma';
import { industryByEnum } from '@/config/industries';
import { PageTitle } from '@/components/dashboard/page-title';
import { Badge } from '@/components/ui/badge';

async function getCandidates() {
  try {
    return await prisma.candidate.findMany({ orderBy: { createdAt: 'desc' }, take: 100 });
  } catch {
    return [];
  }
}

export const dynamic = 'force-dynamic';

export default async function AdminCandidatesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Admin');
  const ti = await getTranslations('Industries.items');
  const tc = await getTranslations('Common');
  const candidates = await getCandidates();

  return (
    <>
      <PageTitle title={t('nav.candidates')} />
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
        {candidates.length === 0 ? (
          <p className="px-5 py-16 text-center text-sm text-muted-foreground">{tc('noResults')}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-5 py-3 font-semibold">Reference</th>
                  <th className="px-5 py-3 font-semibold">Name</th>
                  <th className="px-5 py-3 font-semibold">Profession</th>
                  <th className="px-5 py-3 font-semibold">Industry</th>
                  <th className="px-5 py-3 font-semibold">Experience</th>
                  <th className="px-5 py-3 font-semibold">{tc('status')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {candidates.map((c) => (
                  <tr key={c.id} className="hover:bg-muted/40">
                    <td className="px-5 py-3.5 font-mono text-xs text-muted-foreground">{c.reference}</td>
                    <td className="px-5 py-3.5 font-medium text-foreground">
                      {c.firstName} {c.lastName}
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground">{c.profession}</td>
                    <td className="px-5 py-3.5 text-muted-foreground">
                      {ti(`${industryByEnum[c.industry].key}.title`)}
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground">{c.yearsOfExp} yrs</td>
                    <td className="px-5 py-3.5">
                      <Badge variant={c.status === 'AVAILABLE' ? 'success' : 'muted'}>{c.status}</Badge>
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

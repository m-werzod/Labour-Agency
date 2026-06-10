import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ExternalLink, ShieldCheck } from 'lucide-react';
import type { Locale } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import { licenseInfo } from '@/config/site';
import { PageTitle } from '@/components/dashboard/page-title';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

export default async function AdminLicensePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('License');
  const tc = await getTranslations('License.credentials');
  const ta = await getTranslations('Admin');

  const rows = [
    { label: tc('licenseNumber'), value: licenseInfo.licenseNumber },
    { label: tc('registerNumber'), value: licenseInfo.registerNumber },
    { label: tc('tin'), value: licenseInfo.tin },
    { label: tc('registrationNumber'), value: licenseInfo.registrationNumber },
  ];

  return (
    <>
      <PageTitle
        title={ta('nav.license')}
        action={
          <Button asChild variant="outline" size="sm">
            <Link href="/license">
              <ExternalLink className="size-4" />
              {t('certificate.view')}
            </Link>
          </Button>
        }
      />

      <div className="max-w-2xl rounded-2xl border border-border bg-card p-6 shadow-soft">
        <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-3.5 py-1.5 text-sm font-semibold text-secondary">
          <ShieldCheck className="size-4" />
          {t('verifiedBadge')}
        </span>
        <dl className="mt-6 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
          {rows.map((r) => (
            <div key={r.label} className="bg-card p-5">
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{r.label}</dt>
              <dd className="mt-1.5 font-display text-2xl font-extrabold text-primary tabular-nums">{r.value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-5 rounded-xl border border-border bg-muted/40 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {t('authorityLabel')}
          </p>
          <p className="mt-1 text-sm font-medium text-foreground">{licenseInfo.issuingAuthority}</p>
        </div>
      </div>
    </>
  );
}

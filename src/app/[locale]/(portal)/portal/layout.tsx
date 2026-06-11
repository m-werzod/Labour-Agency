import { getTranslations, setRequestLocale } from 'next-intl/server';
import { LayoutDashboard, Inbox } from 'lucide-react';
import { redirect } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { auth } from '@/lib/auth';
import { DashboardShell, type DashboardNavItem } from '@/components/dashboard/dashboard-shell';

export const dynamic = 'force-dynamic';

export default async function PortalLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const session = await auth();
  if (!session?.user) {
    redirect({ href: { pathname: '/login', query: { callbackUrl: '/portal' } }, locale: locale as Locale });
  }

  const t = await getTranslations('Portal');
  const tc = await getTranslations('Common');

  const nav: DashboardNavItem[] = [
    { href: '/portal', label: t('nav.dashboard'), icon: LayoutDashboard },
    { href: '/portal/requests', label: t('nav.requests'), icon: Inbox },
  ];

  return (
    <DashboardShell
      nav={nav}
      title={t('title')}
      user={session!.user}
      signOutLabel={t('signOut')}
      viewSiteLabel={tc('viewSite')}
    >
      {children}
    </DashboardShell>
  );
}

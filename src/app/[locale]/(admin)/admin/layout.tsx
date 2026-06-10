import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  LayoutDashboard,
  Inbox,
  MessageSquare,
  UsersRound,
  Building2,
  ScrollText,
} from 'lucide-react';
import { redirect } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { auth } from '@/lib/auth';
import { DashboardShell, type DashboardNavItem } from '@/components/dashboard/dashboard-shell';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const session = await auth();
  if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'STAFF')) {
    redirect({ href: { pathname: '/login', query: { callbackUrl: '/admin' } }, locale });
  }

  const t = await getTranslations('Admin');
  const tc = await getTranslations('Common');

  const nav: DashboardNavItem[] = [
    { href: '/admin', label: t('nav.overview'), icon: LayoutDashboard },
    { href: '/admin/requests', label: t('nav.requests'), icon: Inbox },
    { href: '/admin/messages', label: t('nav.messages'), icon: MessageSquare },
    { href: '/admin/candidates', label: t('nav.candidates'), icon: UsersRound },
    { href: '/admin/employers', label: t('nav.employers'), icon: Building2 },
    { href: '/admin/license', label: t('nav.license'), icon: ScrollText },
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

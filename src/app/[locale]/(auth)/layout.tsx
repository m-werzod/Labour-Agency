import { setRequestLocale } from 'next-intl/server';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { Logo } from '@/components/brand/logo';

function BackHome() {
  const t = useTranslations('Common');
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
    >
      <ArrowLeft className="size-4" />
      {t('backToHome')}
    </Link>
  );
}

export default async function AuthLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <div className="bg-grid absolute inset-0 -z-10 opacity-[0.4]" />
      <header className="container flex items-center justify-between py-6">
        <Link href="/" aria-label="Specialist Group">
          <Logo />
        </Link>
        <BackHome />
      </header>
      <main className="flex flex-1 items-center justify-center px-5 py-10">{children}</main>
    </div>
  );
}

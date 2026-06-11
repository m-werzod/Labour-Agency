import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { buildMetadata } from '@/lib/seo';
import { LoginForm } from '@/components/forms/login-form';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Auth.login' });
  return buildMetadata({ locale, title: t('title'), description: t('subtitle'), path: '/login', noIndex: true });
}

export default async function LoginPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Auth.login');

  return (
    <Card className="w-full max-w-md p-7 shadow-elevated sm:p-9">
      <div className="text-center">
        <h1 className="font-display text-2xl font-bold text-primary">{t('title')}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t('subtitle')}</p>
      </div>

      <div className="mt-8">
        <Suspense fallback={<Skeleton className="h-72 w-full" />}>
          <LoginForm />
        </Suspense>
      </div>

      <p className="mt-7 text-center text-sm text-muted-foreground">
        {t('noAccount')}{' '}
        <Link href="/contact" className="font-semibold text-secondary hover:underline">
          {t('contactUs')}
        </Link>
      </p>
    </Card>
  );
}

import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { redirect } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { pageMetadata } from '@/lib/seo';
import { TrackingSuccess } from '@/components/forms/tracking-success';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale, page: 'employerRequest', path: '/employer-request/success', noIndex: true });
}

export default async function EmployerRequestSuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ ref?: string }>;
}) {
  const { locale } = await params;
  const { ref } = await searchParams;
  setRequestLocale(locale);

  if (!ref) {
    redirect({ href: '/employer-request', locale: locale as Locale });
  }

  return (
    <section className="section">
      <div className="container">
        <TrackingSuccess trackingNumber={ref!} />
      </div>
    </section>
  );
}

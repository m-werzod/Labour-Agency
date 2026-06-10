import { useTranslations } from 'next-intl';
import { Home, Mail } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/brand/logo';

export default function LocaleNotFound() {
  const t = useTranslations('NotFound');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 px-5 text-center">
      <Logo />
      <p className="mt-10 font-display text-7xl font-extrabold text-primary sm:text-8xl">404</p>
      <h1 className="mt-4 text-display-sm text-primary">{t('title')}</h1>
      <p className="mt-3 max-w-md text-muted-foreground">{t('subtitle')}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg">
          <Link href="/">
            <Home className="size-4" />
            {t('home')}
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/contact">
            <Mail className="size-4" />
            {t('contact')}
          </Link>
        </Button>
      </div>
    </div>
  );
}

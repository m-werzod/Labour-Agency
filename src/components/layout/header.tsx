'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Menu, Phone, ArrowRight, ShieldCheck, Mail, UserRound } from 'lucide-react';
import { Link, usePathname } from '@/i18n/navigation';
import { mainNav, contactInfo, licenseInfo } from '@/config/site';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/brand/logo';
import { LanguageSwitcher } from './language-switcher';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from '@/components/ui/sheet';

export function Header() {
  const t = useTranslations('Nav');
  const tc = useTranslations('Common');
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  // Close mobile menu on route change.
  React.useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="relative z-50">
      <a
        href="#main"
        suppressHydrationWarning
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        {tc('skipToContent')}
      </a>

      {/* Utility bar */}
      <div className="hidden bg-primary-900 text-primary-foreground lg:block">
        <div className="container flex h-10 items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-white/85">
            <ShieldCheck className="size-3.5 text-secondary-300" />
            <span className="font-medium">
              {tc('licensedBadge')} · {tc('licenseNo')} {licenseInfo.licenseNumber}
            </span>
          </div>
          <div className="flex items-center gap-5 text-white/80">
            <a href={`tel:${contactInfo.phoneHref}`} className="link-underline inline-flex items-center gap-1.5 hover:text-white">
              <Phone className="size-3.5" />
              {contactInfo.phone}
            </a>
            <a href={`mailto:${contactInfo.email}`} className="link-underline inline-flex items-center gap-1.5 hover:text-white">
              <Mail className="size-3.5" />
              {contactInfo.email}
            </a>
            <Link href="/portal" className="link-underline inline-flex items-center gap-1.5 hover:text-white">
              <UserRound className="size-3.5" />
              {t('portal')}
            </Link>
            <span className="h-3.5 w-px bg-white/20" />
            <LanguageSwitcher variant="light" />
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="sticky top-0 z-50 border-b border-border/70 bg-background/90 shadow-soft backdrop-blur-md supports-[backdrop-filter]:bg-background/75">
        <nav className="container flex h-16 items-center justify-between gap-4 lg:h-20" aria-label="Primary">
          <Link href="/" aria-label={`${tc('home')} — Specialist Group`} className="shrink-0">
            <Logo theme="default" />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden min-w-0 items-center justify-center gap-0.5 xl:flex 2xl:gap-1">
            {mainNav.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href} className="shrink-0">
                  <Link
                    href={item.href}
                    className={cn(
                      'block whitespace-nowrap rounded-md px-2.5 py-2 text-sm font-medium leading-none transition-colors 2xl:px-3',
                      'text-foreground/80 hover:bg-accent hover:text-primary',
                      active && 'text-primary',
                    )}
                  >
                    {t(item.key)}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              asChild
              variant="accent"
              size="default"
              className="hidden shadow-card md:inline-flex"
            >
              <Link href="/employer-request">
                {tc('requestWorkforce')}
                <ArrowRight className="size-4" />
              </Link>
            </Button>

            {/* Compact language for tablet/mobile (utility bar hidden) */}
            <div className="lg:hidden">
              <LanguageSwitcher variant="compact" />
            </div>

            {/* Mobile menu */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button
                  aria-label={tc('openMenu')}
                  className="inline-flex size-11 items-center justify-center rounded-md transition-colors text-foreground hover:bg-accent xl:hidden"
                >
                  <Menu className="size-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="flex w-[88%] max-w-sm flex-col p-0">
                <SheetTitle className="sr-only">{tc('menu')}</SheetTitle>
                <div className="flex items-center justify-between border-b px-5 py-4">
                  <Logo />
                </div>
                <div className="flex-1 overflow-y-auto px-3 py-4">
                  <ul className="flex flex-col gap-0.5">
                    {mainNav.map((item) => (
                      <li key={item.href}>
                        <SheetClose asChild>
                          <Link
                            href={item.href}
                            className={cn(
                              'flex items-center justify-between rounded-lg px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent',
                              pathname === item.href && 'bg-accent text-primary',
                            )}
                          >
                            {t(item.key)}
                            <ArrowRight className="size-4 text-muted-foreground" />
                          </Link>
                        </SheetClose>
                      </li>
                    ))}
                    <li>
                      <SheetClose asChild>
                        <Link
                          href="/track"
                          className="flex items-center justify-between rounded-lg px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent"
                        >
                          {t('track')}
                          <ArrowRight className="size-4 text-muted-foreground" />
                        </Link>
                      </SheetClose>
                    </li>
                  </ul>
                </div>
                <div className="space-y-3 border-t bg-muted/40 p-5">
                  <SheetClose asChild>
                    <Button asChild variant="accent" size="lg" className="w-full">
                      <Link href="/employer-request">
                        {tc('requestWorkforce')}
                        <ArrowRight className="size-4" />
                      </Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button asChild variant="outline" size="lg" className="w-full">
                      <Link href="/portal">{t('portal')}</Link>
                    </Button>
                  </SheetClose>
                  <div className="flex items-center justify-between pt-1">
                    <a
                      href={`tel:${contactInfo.phoneHref}`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-foreground"
                    >
                      <Phone className="size-4 text-secondary" />
                      {contactInfo.phone}
                    </a>
                    <LanguageSwitcher variant="default" align="end" />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
}

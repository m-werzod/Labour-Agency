'use client';

import * as React from 'react';
import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import { Check, Globe } from 'lucide-react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { locales, localeMeta, type Locale } from '@/i18n/routing';
import { Flag } from '@/components/shared/flag';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  /** Compact = icon only (mobile header). */
  variant?: 'default' | 'compact' | 'light';
  align?: 'start' | 'end';
}

export function LanguageSwitcher({ variant = 'default', align = 'end' }: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const [isPending, startTransition] = React.useTransition();

  function onSelect(next: Locale) {
    if (next === locale) return;
    startTransition(() => {
      // Preserve the current route and dynamic params; persists via cookie.
      router.replace(
        // @ts-expect-error -- params from current route are valid for the same pathname
        { pathname, params },
        { locale: next },
      );
    });
  }

  const light = variant === 'light';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Change language"
        disabled={isPending}
        className={cn(
          'inline-flex items-center gap-2 rounded-md border px-2.5 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-60',
          light
            ? 'border-white/20 text-white hover:bg-white/10'
            : 'border-border text-foreground hover:bg-accent',
        )}
      >
        <Flag locale={locale} />
        {variant === 'default' && (
          <span className="hidden sm:inline">{localeMeta[locale].label}</span>
        )}
        {variant === 'compact' && <Globe className="size-4 opacity-70 sm:hidden" />}
        <span className="sr-only">{localeMeta[locale].englishName}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="w-56">
        <DropdownMenuLabel>Select language</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {locales.map((l) => (
          <DropdownMenuItem
            key={l}
            onSelect={(e) => {
              e.preventDefault();
              onSelect(l);
            }}
            className="justify-between"
          >
            <span className="flex items-center gap-2.5">
              <Flag locale={l} />
              <span className="flex flex-col leading-tight">
                <span className="font-medium">{localeMeta[l].label}</span>
                <span className="text-xs text-muted-foreground">{localeMeta[l].englishName}</span>
              </span>
            </span>
            {l === locale && <Check className="size-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

'use client';

import * as React from 'react';
import { signOut } from 'next-auth/react';
import { Menu, LogOut, ExternalLink, type LucideIcon } from 'lucide-react';
import { Link, usePathname } from '@/i18n/navigation';
import { Logo } from '@/components/brand/logo';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn, initials } from '@/lib/utils';

export interface DashboardNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface DashboardShellProps {
  nav: DashboardNavItem[];
  title: string;
  user: { name?: string | null; email?: string | null; role?: string };
  signOutLabel: string;
  viewSiteLabel: string;
  children: React.ReactNode;
}

function NavLinks({ nav, onNavigate }: { nav: DashboardNavItem[]; onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-1">
      {nav.map((item) => {
        const active = pathname === item.href || (item.href !== '/admin' && item.href !== '/portal' && pathname.startsWith(item.href));
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
              active
                ? 'bg-primary text-primary-foreground shadow-soft'
                : 'text-muted-foreground hover:bg-accent hover:text-foreground',
            )}
          >
            <Icon className="size-[18px] shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function DashboardShell({
  nav,
  title,
  user,
  signOutLabel,
  viewSiteLabel,
  children,
}: DashboardShellProps) {
  const [open, setOpen] = React.useState(false);

  const userCard = (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
      <Avatar className="size-9">
        <AvatarFallback className="text-xs">{initials(user.name || user.email || 'SG')}</AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-foreground">{user.name || user.email}</p>
        {user.role && <p className="truncate text-xs capitalize text-muted-foreground">{user.role.toLowerCase()}</p>}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-muted/30 lg:grid lg:grid-cols-[280px_1fr]">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen flex-col border-r border-border bg-background lg:flex">
        <div className="flex h-16 items-center border-b border-border px-5">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {title}
          </p>
          <NavLinks nav={nav} />
        </div>
        <div className="space-y-2 border-t border-border p-4">
          {userCard}
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium text-muted-foreground hover:text-primary"
            >
              <ExternalLink className="size-3.5" />
              {viewSiteLabel}
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="inline-flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium text-muted-foreground hover:text-destructive"
            >
              <LogOut className="size-3.5" />
              {signOutLabel}
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-col">
        {/* Mobile topbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/90 px-4 backdrop-blur lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button aria-label="Open menu" className="inline-flex size-10 items-center justify-center rounded-md hover:bg-accent">
                <Menu className="size-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="flex w-[82%] max-w-xs flex-col p-0">
              <SheetTitle className="sr-only">{title}</SheetTitle>
              <div className="flex h-16 items-center border-b border-border px-5">
                <Logo />
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <NavLinks nav={nav} onNavigate={() => setOpen(false)} />
              </div>
              <div className="space-y-2 border-t border-border p-4">
                {userCard}
                <SheetClose asChild>
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-destructive"
                  >
                    <LogOut className="size-4" />
                    {signOutLabel}
                  </button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
          <Logo markClassName="h-8 w-8" />
          <div className="size-10" />
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

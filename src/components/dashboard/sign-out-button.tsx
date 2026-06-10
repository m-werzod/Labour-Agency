'use client';

import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SignOutButton({ label, className }: { label: string; className?: string }) {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/' })}
      className={cn(
        'inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground',
        className,
      )}
    >
      <LogOut className="size-4" />
      {label}
    </button>
  );
}

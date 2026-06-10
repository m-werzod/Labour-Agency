import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export function StatCard({
  label,
  value,
  icon: Icon,
  tone = 'default',
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  tone?: 'default' | 'accent' | 'secondary';
}) {
  const toneClasses = {
    default: 'bg-primary/[0.06] text-primary',
    accent: 'bg-accent-500/12 text-accent-600',
    secondary: 'bg-secondary/10 text-secondary',
  }[tone];

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <span className={cn('flex size-10 items-center justify-center rounded-xl', toneClasses)}>
          <Icon className="size-5" />
        </span>
      </div>
      <p className="mt-3 font-display text-3xl font-extrabold tracking-tight text-primary">{value}</p>
    </div>
  );
}

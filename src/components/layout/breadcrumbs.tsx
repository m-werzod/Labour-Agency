import { ChevronRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items, invert = false }: { items: Crumb[]; invert?: boolean }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={cn(
                    'transition-colors',
                    invert ? 'text-white/65 hover:text-white' : 'text-muted-foreground hover:text-primary',
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span className={cn('font-medium', invert ? 'text-white' : 'text-foreground')} aria-current="page">
                  {item.label}
                </span>
              )}
              {!isLast && (
                <ChevronRight className={cn('size-4', invert ? 'text-white/40' : 'text-muted-foreground/50')} />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

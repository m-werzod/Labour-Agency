import { cn } from '@/lib/utils';
import { Reveal } from './reveal';

interface SectionHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
  invert?: boolean;
  as?: 'h2' | 'h1' | 'h3';
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
  invert = false,
  as: Heading = 'h2',
}: SectionHeaderProps) {
  return (
    <Reveal
      className={cn(
        'flex flex-col gap-4',
        align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl text-left',
        className,
      )}
    >
      {eyebrow && (
        <span className={cn('eyebrow', align === 'center' && 'justify-center', invert && 'text-secondary-300')}>
          <span className={cn('h-px w-6', invert ? 'bg-secondary-300/60' : 'bg-secondary/50')} />
          {eyebrow}
        </span>
      )}
      <Heading
        className={cn(
          'text-display-lg text-balance',
          invert ? 'text-white' : 'text-primary',
        )}
      >
        {title}
      </Heading>
      {description && (
        <p
          className={cn(
            'text-base leading-relaxed sm:text-lg',
            invert ? 'text-white/70' : 'text-muted-foreground',
            align === 'center' && 'mx-auto',
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}

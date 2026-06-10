import { cn } from '@/lib/utils';

type LogoTheme = 'default' | 'white' | 'mono';

interface LogoMarkProps extends React.SVGProps<SVGSVGElement> {
  theme?: LogoTheme;
}

/**
 * Specialist Group icon mark — a globe crossed by an ascending arrow,
 * representing licensed workforce mobility from Uzbekistan to the world.
 * Enclosed in a rounded badge for a government-compliant, trustworthy feel.
 */
export function LogoMark({ theme = 'default', className, ...props }: LogoMarkProps) {
  const uid = 'sg';
  const badgeFill =
    theme === 'white' ? 'url(#sg-badge-white)' : theme === 'mono' ? 'currentColor' : `url(#sg-badge)`;
  const globe = theme === 'white' ? '#ffffff' : theme === 'mono' ? 'currentColor' : '#ffffff';
  const arrow = theme === 'white' ? '#ffffff' : theme === 'mono' ? 'currentColor' : '#34b886';
  const tip = theme === 'white' ? '#ffffff' : theme === 'mono' ? 'currentColor' : '#e08c42';

  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      role="img"
      aria-hidden="true"
      className={cn('h-9 w-9', className)}
      {...props}
    >
      <defs>
        <linearGradient id="sg-badge" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#142b54" />
          <stop offset="1" stopColor="#0b2545" />
        </linearGradient>
        <linearGradient id="sg-badge-white" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" stopOpacity="0.16" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.08" />
        </linearGradient>
      </defs>

      <rect
        width="40"
        height="40"
        rx="11"
        fill={badgeFill}
        stroke={theme === 'white' ? 'rgba(255,255,255,0.35)' : 'none'}
        strokeWidth={theme === 'white' ? 1 : 0}
      />

      {/* Globe */}
      <circle cx="20" cy="20" r="10.5" stroke={globe} strokeOpacity="0.9" strokeWidth="1.4" />
      <ellipse cx="20" cy="20" rx="4.4" ry="10.5" stroke={globe} strokeOpacity="0.5" strokeWidth="1.2" />
      <path d="M9.8 16.7h20.4M9.8 23.3h20.4" stroke={globe} strokeOpacity="0.45" strokeWidth="1.2" strokeLinecap="round" />

      {/* Ascending mobility arrow */}
      <path
        d={`M13.2 26.8L25 15`}
        stroke={arrow}
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d={`M19.6 13.9h6.2v6.2`}
        stroke={tip}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <title>Specialist Group</title>
      {uid && null}
    </svg>
  );
}

interface LogoProps {
  theme?: LogoTheme;
  variant?: 'full' | 'icon';
  showTagline?: boolean;
  className?: string;
  markClassName?: string;
}

export function Logo({
  theme = 'default',
  variant = 'full',
  showTagline = false,
  className,
  markClassName,
}: LogoProps) {
  const isWhite = theme === 'white';

  if (variant === 'icon') {
    return <LogoMark theme={theme} className={cn('h-10 w-10', markClassName)} />;
  }

  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark theme={theme} className={cn('h-9 w-9 shrink-0', markClassName)} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-display text-[1.0625rem] font-extrabold uppercase tracking-[0.06em]',
            isWhite ? 'text-white' : 'text-primary',
          )}
        >
          Specialist
          <span className={cn('ml-1 font-bold', isWhite ? 'text-white/85' : 'text-secondary')}>
            Group
          </span>
        </span>
        {showTagline && (
          <span
            className={cn(
              'mt-1 text-[0.5625rem] font-semibold uppercase tracking-[0.22em]',
              isWhite ? 'text-white/60' : 'text-muted-foreground',
            )}
          >
            Licensed Workforce · Uzbekistan
          </span>
        )}
      </span>
    </span>
  );
}

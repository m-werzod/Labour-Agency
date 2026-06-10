'use client';

import * as React from 'react';
import Image, { type ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

type SmartImageProps = Omit<ImageProps, 'src' | 'alt'> & {
  src: string;
  alt: string;
  /** Wrapper className when using `fill`. */
  wrapperClassName?: string;
  /** Photographer / source credit (rendered as a subtle caption on hover). */
  credit?: string;
};

/**
 * Production image component built on next/image.
 * - Lazy loads by default, AVIF/WebP via next.config, responsive `sizes`.
 * - Blur-up shimmer placeholder while loading.
 * - If the remote source is unreachable, renders a branded fallback so the
 *   layout is never broken (important for resilient deployments).
 *
 * All sources are REAL photography (see src/config/images.ts) — no AI imagery.
 */
export function SmartImage({
  src,
  alt,
  fill,
  className,
  wrapperClassName,
  sizes = '100vw',
  priority,
  credit,
  ...props
}: SmartImageProps) {
  const [status, setStatus] = React.useState<'loading' | 'loaded' | 'error'>('loading');

  const fallback = (
    <div
      aria-hidden={status === 'error' ? undefined : true}
      role={status === 'error' ? 'img' : undefined}
      aria-label={status === 'error' ? alt : undefined}
      className={cn(
        'absolute inset-0 flex items-center justify-center overflow-hidden bg-primary-800',
        'bg-gradient-to-br from-primary-700 via-primary-800 to-primary-950',
        status === 'error' ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
    >
      <div className="absolute inset-0 bg-grid opacity-[0.12]" />
      <svg viewBox="0 0 40 40" className="h-16 w-16 opacity-25" fill="none" aria-hidden="true">
        <circle cx="20" cy="20" r="10.5" stroke="#fff" strokeWidth="1.4" />
        <ellipse cx="20" cy="20" rx="4.4" ry="10.5" stroke="#fff" strokeOpacity="0.6" strokeWidth="1.2" />
        <path d="M13.2 26.8L25 15" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M19.6 13.9h6.2v6.2" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );

  const image = (
    <>
      {/* shimmer while loading */}
      {status === 'loading' && (
        <div className="absolute inset-0 animate-pulse bg-muted" aria-hidden="true" />
      )}
      {status !== 'error' && (
        <Image
          src={src}
          alt={alt}
          fill={fill}
          sizes={sizes}
          priority={priority}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          className={cn(
            'transition-opacity duration-700 ease-premium',
            status === 'loaded' ? 'opacity-100' : 'opacity-0',
            className,
          )}
          {...props}
        />
      )}
      {fallback}
      {credit && status === 'loaded' && (
        <span className="pointer-events-none absolute bottom-1.5 right-2 z-10 select-none text-[0.625rem] font-medium text-white/45 opacity-0 transition-opacity duration-300 group-hover/img:opacity-100">
          © {credit}
        </span>
      )}
    </>
  );

  if (fill) {
    return (
      <span className={cn('group/img absolute inset-0 block overflow-hidden', wrapperClassName)}>
        {image}
      </span>
    );
  }

  return (
    <span
      className={cn('group/img relative block overflow-hidden', wrapperClassName)}
      style={{ aspectRatio: props.width && props.height ? `${props.width}/${props.height}` : undefined }}
    >
      {image}
    </span>
  );
}

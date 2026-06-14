'use client';

import * as React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';

/** Dedicated WhatsApp chat line for inbound employer enquiries. */
const WHATSAPP_NUMBER = '998937493666';
const PREFILL_MESSAGE =
  'Hi, I am writing to you after seeing your website. I need skilled employees from your country.';

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.49z" />
    </svg>
  );
}

export function FloatingWhatsApp() {
  const t = useTranslations('Whatsapp');
  const reduce = useReducedMotion();
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(PREFILL_MESSAGE)}`;

  // Close the popup on outside click or Escape.
  React.useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="fixed bottom-5 right-5 z-40 flex flex-col items-end print:hidden sm:bottom-6 sm:right-6"
    >
      {/* Confirmation popup */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label={t('title')}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 w-[min(20rem,calc(100vw-2.5rem))] origin-bottom-right overflow-hidden rounded-2xl border border-border bg-card shadow-elevated-lg"
          >
            {/* Header */}
            <div className="flex items-center gap-3 bg-[#075E54] p-4 text-white">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/15">
                <WhatsAppGlyph className="size-6" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold leading-tight">{t('title')}</p>
                <p className="mt-0.5 flex items-center gap-1.5 text-xs text-white/80">
                  <span className="size-1.5 rounded-full bg-[#25D366]" />
                  {t('reply')}
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label={t('close')}
                className="shrink-0 rounded-md p-1 text-white/70 transition-colors hover:text-white"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Greeting bubble */}
            <div className="bg-[#ECE5DD] p-4">
              <div className="max-w-[88%] rounded-lg rounded-tl-sm bg-white p-3 text-sm leading-relaxed text-foreground shadow-soft">
                {t('greeting')}
              </div>
            </div>

            {/* Confirm → WhatsApp */}
            <div className="bg-card p-3">
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-[#1ebe5b]"
              >
                <WhatsAppGlyph className="size-5" />
                {t('cta')}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={t('title')}
        aria-expanded={open}
        className="group relative flex items-center justify-center"
      >
        {!open && (
          <span
            aria-hidden
            className="absolute inset-0 rounded-full bg-[#25D366] opacity-70 motion-safe:animate-ping"
          />
        )}
        {!open && (
          <span className="pointer-events-none absolute right-[calc(100%+0.75rem)] hidden whitespace-nowrap rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white opacity-0 shadow-card transition-opacity duration-200 group-hover:opacity-100 md:block">
            {t('title')}
          </span>
        )}
        <motion.span
          className="relative flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-elevated ring-4 ring-white/40 transition-transform duration-200 group-hover:scale-105 group-active:scale-95"
          animate={!open && !reduce ? { rotate: [0, 0, -12, 12, -9, 9, 0, 0] } : { rotate: 0 }}
          transition={
            !open && !reduce
              ? {
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  times: [0, 0.84, 0.87, 0.9, 0.93, 0.96, 0.99, 1],
                }
              : { duration: 0.2 }
          }
        >
          {open ? <X className="size-7" /> : <WhatsAppGlyph className="size-7" />}
        </motion.span>
      </button>
    </div>
  );
}

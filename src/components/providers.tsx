'use client';

import * as React from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { PageTransitionOverlay } from '@/components/layout/page-transition';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider delayDuration={200}>
      {children}
      <PageTransitionOverlay />
    </TooltipProvider>
  );
}

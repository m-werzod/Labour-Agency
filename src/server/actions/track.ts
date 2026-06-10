'use server';

import { prisma } from '@/lib/prisma';
import type { RequestStatus, IndustryType } from '@prisma/client';

export interface TrackResult {
  trackingNumber: string;
  status: RequestStatus;
  industry: IndustryType;
  workersCount: number;
  companyName: string;
  createdAt: string;
}

/**
 * Public status lookup by tracking number. Returns only non-sensitive fields.
 */
export async function trackRequest(
  trackingNumberRaw: string,
): Promise<{ found: true; data: TrackResult } | { found: false }> {
  const trackingNumber = trackingNumberRaw.trim().toUpperCase();
  if (!trackingNumber || trackingNumber.length < 6 || trackingNumber.length > 24) {
    return { found: false };
  }

  try {
    const record = await prisma.employerRequest.findUnique({
      where: { trackingNumber },
      select: {
        trackingNumber: true,
        status: true,
        industry: true,
        workersCount: true,
        companyName: true,
        createdAt: true,
      },
    });

    if (!record) return { found: false };

    return {
      found: true,
      data: {
        trackingNumber: record.trackingNumber,
        status: record.status,
        industry: record.industry,
        workersCount: record.workersCount,
        companyName: record.companyName,
        createdAt: record.createdAt.toISOString(),
      },
    };
  } catch (error) {
    console.error('[trackRequest] failed:', error);
    return { found: false };
  }
}

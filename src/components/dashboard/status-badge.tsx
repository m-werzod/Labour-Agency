import { useTranslations } from 'next-intl';
import type { RequestStatus } from '@prisma/client';
import { Badge } from '@/components/ui/badge';

const variantMap: Record<RequestStatus, 'default' | 'secondary' | 'warning' | 'muted' | 'success'> = {
  NEW: 'default',
  IN_REVIEW: 'warning',
  CONTACTED: 'secondary',
  IN_PROGRESS: 'secondary',
  SHORTLISTED: 'secondary',
  FULFILLED: 'success',
  ON_HOLD: 'warning',
  CLOSED: 'muted',
  REJECTED: 'muted',
};

export function StatusBadge({ status }: { status: RequestStatus }) {
  const t = useTranslations('Track.status');
  return <Badge variant={variantMap[status]}>{t(status)}</Badge>;
}

'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { RequestStatus } from '@prisma/client';
import { Loader2 } from 'lucide-react';
import { updateRequestStatus } from '@/server/actions/admin';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function RequestStatusControl({
  id,
  current,
}: {
  id: string;
  current: RequestStatus;
}) {
  const t = useTranslations('Track.status');
  const { toast } = useToast();
  const [value, setValue] = React.useState<RequestStatus>(current);
  const [pending, startTransition] = React.useTransition();

  function onChange(next: string) {
    const previous = value;
    setValue(next as RequestStatus);
    startTransition(async () => {
      const res = await updateRequestStatus(id, next);
      if (!res.success) {
        setValue(previous);
        toast({ variant: 'destructive', title: res.error });
      } else {
        toast({ variant: 'success', title: t(next as RequestStatus) });
      }
    });
  }

  return (
    <div className="flex items-center gap-2">
      <Select value={value} onValueChange={onChange} disabled={pending}>
        <SelectTrigger className="w-[200px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.values(RequestStatus).map((status) => (
            <SelectItem key={status} value={status}>
              {t(status)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {pending && <Loader2 className="size-4 animate-spin text-muted-foreground" />}
    </div>
  );
}

'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Loader2, Plus } from 'lucide-react';
import { addCommunicationLog } from '@/server/actions/admin';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const channels = ['note', 'email', 'phone', 'meeting'];

export function CommunicationLogForm({ requestId }: { requestId: string }) {
  const tc = useTranslations('Common');
  const { toast } = useToast();
  const formRef = React.useRef<HTMLFormElement>(null);
  const [channel, setChannel] = React.useState('note');
  const [pending, startTransition] = React.useTransition();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    fd.set('requestId', requestId);
    fd.set('channel', channel);
    startTransition(async () => {
      const res = await addCommunicationLog(fd);
      if (res.success) {
        formRef.current?.reset();
        setChannel('note');
        toast({ variant: 'success', title: tc('save') });
      } else {
        toast({ variant: 'destructive', title: res.error });
      }
    });
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="space-y-3">
      <Select value={channel} onValueChange={setChannel}>
        <SelectTrigger className="w-full sm:w-44">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {channels.map((c) => (
            <SelectItem key={c} value={c} className="capitalize">
              {c}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Textarea name="summary" rows={3} placeholder="Add a note about this request…" required />
      <Button type="submit" size="sm" disabled={pending}>
        {pending ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
        {tc('save')}
      </Button>
    </form>
  );
}

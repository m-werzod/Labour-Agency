import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Mail } from 'lucide-react';
import type { Locale } from '@/i18n/routing';
import { prisma } from '@/lib/prisma';
import { PageTitle } from '@/components/dashboard/page-title';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';

async function getMessages() {
  try {
    return await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' }, take: 100 });
  } catch {
    return [];
  }
}

export const dynamic = 'force-dynamic';

export default async function AdminMessagesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Admin');
  const tc = await getTranslations('Common');
  const messages = await getMessages();

  return (
    <>
      <PageTitle title={t('nav.messages')} />
      {messages.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card px-5 py-16 text-center text-sm text-muted-foreground shadow-soft">
          {tc('noResults')}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {messages.map((m) => (
            <div key={m.id} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-semibold text-foreground">{m.name}</p>
                  <a href={`mailto:${m.email}`} className="flex items-center gap-1.5 text-sm text-secondary hover:underline">
                    <Mail className="size-3.5" />
                    {m.email}
                  </a>
                </div>
                <Badge variant={m.status === 'NEW' ? 'default' : 'muted'}>{m.status}</Badge>
              </div>
              {(m.company || m.country) && (
                <p className="mt-2 text-xs text-muted-foreground">
                  {[m.company, m.country].filter(Boolean).join(' · ')}
                </p>
              )}
              {m.subject && <p className="mt-3 text-sm font-medium text-foreground">{m.subject}</p>}
              <p className="mt-1.5 line-clamp-4 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                {m.message}
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                {formatDate(m.createdAt, locale, { dateStyle: 'medium', timeStyle: 'short' })}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

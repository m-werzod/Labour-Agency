import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowLeft, Mail, Phone, Paperclip, Building2, Globe, Users, CalendarDays } from 'lucide-react';
import type { Locale } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import { prisma } from '@/lib/prisma';
import { industryByEnum } from '@/config/industries';
import { PageTitle } from '@/components/dashboard/page-title';
import { RequestStatusControl } from '@/components/dashboard/request-status-control';
import { CommunicationLogForm } from '@/components/dashboard/communication-log-form';
import { formatDate } from '@/lib/utils';

async function getRequest(id: string) {
  try {
    return await prisma.employerRequest.findUnique({
      where: { id },
      include: { logs: { orderBy: { createdAt: 'desc' }, include: { author: true } } },
    });
  } catch {
    return null;
  }
}

export default async function AdminRequestDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const request = await getRequest(id);
  if (!request) notFound();

  const ti = await getTranslations('Industries.items');
  const tc = await getTranslations('Common');
  const tf = await getTranslations('EmployerRequest.form');

  const fields = [
    { icon: Building2, label: tf('companyName'), value: request.companyName },
    { icon: Users, label: tf('contactPerson'), value: request.contactPerson },
    { icon: Globe, label: tf('country'), value: request.country },
    { icon: Users, label: tf('workersCount'), value: String(request.workersCount) },
    {
      icon: CalendarDays,
      label: tf('deploymentDate'),
      value: request.deploymentDate ? formatDate(request.deploymentDate, locale, { dateStyle: 'medium' }) : '—',
    },
  ];

  return (
    <>
      <Link
        href="/admin/requests"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="size-4" />
        {tc('back')}
      </Link>

      <PageTitle title={request.companyName} description={request.trackingNumber} />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main */}
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <dl className="grid gap-5 sm:grid-cols-2">
              {fields.map((f, i) => (
                <div key={i} className="flex items-start gap-3">
                  <f.icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-muted-foreground">{f.label}</dt>
                    <dd className="mt-0.5 font-medium text-foreground">{f.value}</dd>
                  </div>
                </div>
              ))}
              <div className="flex items-start gap-3">
                <Building2 className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">{tf('industry')}</dt>
                  <dd className="mt-0.5 font-medium text-foreground">
                    {ti(`${industryByEnum[request.industry].key}.title`)}
                  </dd>
                </div>
              </div>
            </dl>

            <div className="mt-6 border-t border-border pt-5">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">{tf('requiredSkills')}</p>
              <p className="mt-2 whitespace-pre-wrap leading-relaxed text-foreground">{request.requiredSkills}</p>
            </div>

            {request.additionalNotes && (
              <div className="mt-5 border-t border-border pt-5">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{tf('additionalNotes')}</p>
                <p className="mt-2 whitespace-pre-wrap leading-relaxed text-foreground">{request.additionalNotes}</p>
              </div>
            )}

            {request.attachmentName && (
              <div className="mt-5 flex items-center gap-2 border-t border-border pt-5 text-sm text-muted-foreground">
                <Paperclip className="size-4" />
                {request.attachmentName}
              </div>
            )}
          </div>

          {/* Communication log */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h2 className="font-display font-semibold text-primary">Communication log</h2>
            <div className="mt-4">
              <CommunicationLogForm requestId={request.id} />
            </div>
            <ul className="mt-6 space-y-4">
              {request.logs.length === 0 ? (
                <li className="text-sm text-muted-foreground">{tc('noResults')}</li>
              ) : (
                request.logs.map((log) => (
                  <li key={log.id} className="border-l-2 border-secondary/40 pl-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="font-semibold capitalize text-foreground">{log.channel}</span>
                      <span>·</span>
                      <span>{formatDate(log.createdAt, locale, { dateStyle: 'medium', timeStyle: 'short' })}</span>
                      {log.author?.name && (
                        <>
                          <span>·</span>
                          <span>{log.author.name}</span>
                        </>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-foreground">{log.summary}</p>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{tc('status')}</p>
            <div className="mt-3">
              <RequestStatusControl id={request.id} current={request.status} />
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              {tc('date')}: {formatDate(request.createdAt, locale, { dateStyle: 'long', timeStyle: 'short' })}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{tc('actions')}</p>
            <div className="mt-3 space-y-2">
              <a
                href={`mailto:${request.email}`}
                className="flex items-center gap-2.5 rounded-lg border border-border px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                <Mail className="size-4 text-secondary" />
                {request.email}
              </a>
              <a
                href={`tel:${request.phone}`}
                className="flex items-center gap-2.5 rounded-lg border border-border px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                <Phone className="size-4 text-secondary" />
                {request.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

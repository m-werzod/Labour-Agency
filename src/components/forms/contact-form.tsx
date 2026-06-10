'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations, useLocale } from 'next-intl';
import { Loader2, Send, CheckCircle2 } from 'lucide-react';
import { contactFormSchema, type ContactFormValues } from '@/lib/validations/contact';
import { submitContactMessage } from '@/server/actions/contact';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

function FieldError({ message }: { message?: string }) {
  const t = useTranslations();
  if (!message) return null;
  return (
    <p className="mt-1.5 text-sm text-destructive" role="alert">
      {t(message)}
    </p>
  );
}

export function ContactForm() {
  const t = useTranslations('Contact.form');
  const locale = useLocale();
  const { toast } = useToast();
  const [done, setDone] = React.useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: '', email: '', company: '', country: '', subject: '', message: '', website: '' },
  });

  async function onSubmit(values: ContactFormValues) {
    const fd = new FormData();
    Object.entries(values).forEach(([k, v]) => fd.set(k, v ?? ''));
    fd.set('locale', locale);
    const result = await submitContactMessage(fd);
    if (result.success) {
      setDone(true);
      toast({ variant: 'success', title: t('successTitle') });
    } else {
      if (result.fieldErrors) {
        for (const [key, message] of Object.entries(result.fieldErrors)) {
          setError(key as keyof ContactFormValues, { message });
        }
      }
      toast({ variant: 'destructive', title: t('errorTitle'), description: t('errorBody') });
    }
  }

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-secondary/30 bg-secondary/[0.05] p-10 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
          <CheckCircle2 className="size-7" />
        </span>
        <h3 className="mt-5 font-display text-xl font-semibold text-primary">{t('successTitle')}</h3>
        <p className="mt-2 max-w-md text-muted-foreground">{t('successBody')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        {...register('website')}
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="c-name">
            {t('name')} <span className="text-destructive">*</span>
          </Label>
          <Input id="c-name" className="mt-1.5" placeholder={t('namePlaceholder')} aria-invalid={!!errors.name} {...register('name')} />
          <FieldError message={errors.name?.message} />
        </div>
        <div>
          <Label htmlFor="c-email">
            {t('email')} <span className="text-destructive">*</span>
          </Label>
          <Input id="c-email" type="email" className="mt-1.5" placeholder={t('emailPlaceholder')} aria-invalid={!!errors.email} {...register('email')} />
          <FieldError message={errors.email?.message} />
        </div>
        <div>
          <Label htmlFor="c-company">{t('company')}</Label>
          <Input id="c-company" className="mt-1.5" placeholder={t('companyPlaceholder')} {...register('company')} />
        </div>
        <div>
          <Label htmlFor="c-country">{t('country')}</Label>
          <Input id="c-country" className="mt-1.5" placeholder={t('countryPlaceholder')} {...register('country')} />
        </div>
      </div>
      <div>
        <Label htmlFor="c-subject">{t('subject')}</Label>
        <Input id="c-subject" className="mt-1.5" placeholder={t('subjectPlaceholder')} {...register('subject')} />
      </div>
      <div>
        <Label htmlFor="c-message">
          {t('message')} <span className="text-destructive">*</span>
        </Label>
        <Textarea id="c-message" rows={5} className="mt-1.5" placeholder={t('messagePlaceholder')} aria-invalid={!!errors.message} {...register('message')} />
        <FieldError message={errors.message?.message} />
      </div>
      <Button type="submit" size="lg" variant="accent" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            {t('sending')}
          </>
        ) : (
          <>
            {t('send')}
            <Send className="size-4" />
          </>
        )}
      </Button>
    </form>
  );
}

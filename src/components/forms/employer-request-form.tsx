'use client';

import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations, useLocale } from 'next-intl';
import { Upload, X, Loader2, ArrowRight } from 'lucide-react';
import { useRouter } from '@/i18n/navigation';
import {
  employerRequestFormSchema,
  type EmployerRequestFormValues,
} from '@/lib/validations/employer-request';
import { submitEmployerRequest } from '@/server/actions/employer-request';
import { industryOptions } from '@/config/industries';
import { countries } from '@/config/countries';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

function FieldError({ message }: { message?: string }) {
  const t = useTranslations();
  if (!message) return null;
  return (
    <p className="mt-1.5 text-sm text-destructive" role="alert">
      {t(message)}
    </p>
  );
}

export function EmployerRequestForm() {
  const t = useTranslations('EmployerRequest.form');
  const ti = useTranslations('Industries.items');
  const router = useRouter();
  const locale = useLocale();
  const { toast } = useToast();
  const fileRef = React.useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = React.useState<string | null>(null);
  const [attachmentError, setAttachmentError] = React.useState<string | undefined>();

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<EmployerRequestFormValues>({
    resolver: zodResolver(employerRequestFormSchema),
    defaultValues: {
      companyName: '',
      contactPerson: '',
      country: '',
      email: '',
      phone: '',
      requiredSkills: '',
      additionalNotes: '',
      consent: false,
      website: '',
    },
  });

  async function onSubmit(values: EmployerRequestFormValues) {
    const fd = new FormData();
    fd.set('companyName', values.companyName);
    fd.set('contactPerson', values.contactPerson);
    fd.set('country', values.country);
    fd.set('email', values.email);
    fd.set('phone', values.phone);
    fd.set('industry', values.industry);
    fd.set('workersCount', String(values.workersCount));
    fd.set('requiredSkills', values.requiredSkills);
    if (values.deploymentDate) fd.set('deploymentDate', values.deploymentDate);
    if (values.additionalNotes) fd.set('additionalNotes', values.additionalNotes);
    fd.set('consent', values.consent ? 'true' : '');
    fd.set('website', values.website ?? '');
    fd.set('locale', locale);
    const file = fileRef.current?.files?.[0];
    if (file) fd.set('attachment', file);

    const result = await submitEmployerRequest(fd);

    if (result.success) {
      router.push(`/employer-request/success?ref=${encodeURIComponent(result.trackingNumber)}`);
    } else {
      if (result.fieldErrors) {
        for (const [key, message] of Object.entries(result.fieldErrors)) {
          if (key === 'attachment') {
            setAttachmentError(message);
            continue;
          }
          setError(key as keyof EmployerRequestFormValues, { message });
        }
      }
      toast({ variant: 'destructive', title: result.error });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-10">
      {/* Honeypot */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        {...register('website')}
      />

      {/* Company details */}
      <fieldset className="space-y-5">
        <legend className="mb-1 font-display text-lg font-semibold text-primary">
          {t('sectionCompany')}
        </legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="companyName">
              {t('companyName')} <span className="text-destructive">*</span>
            </Label>
            <Input
              id="companyName"
              className="mt-1.5"
              placeholder={t('companyNamePlaceholder')}
              aria-invalid={!!errors.companyName}
              {...register('companyName')}
            />
            <FieldError message={errors.companyName?.message} />
          </div>
          <div>
            <Label htmlFor="contactPerson">
              {t('contactPerson')} <span className="text-destructive">*</span>
            </Label>
            <Input
              id="contactPerson"
              className="mt-1.5"
              placeholder={t('contactPersonPlaceholder')}
              aria-invalid={!!errors.contactPerson}
              {...register('contactPerson')}
            />
            <FieldError message={errors.contactPerson?.message} />
          </div>
          <div>
            <Label htmlFor="email">
              {t('email')} <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              className="mt-1.5"
              placeholder={t('emailPlaceholder')}
              aria-invalid={!!errors.email}
              {...register('email')}
            />
            <FieldError message={errors.email?.message} />
          </div>
          <div>
            <Label htmlFor="phone">
              {t('phone')} <span className="text-destructive">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              className="mt-1.5"
              placeholder={t('phonePlaceholder')}
              aria-invalid={!!errors.phone}
              {...register('phone')}
            />
            <FieldError message={errors.phone?.message} />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="country">
              {t('country')} <span className="text-destructive">*</span>
            </Label>
            <Controller
              control={control}
              name="country"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="country" className="mt-1.5" aria-invalid={!!errors.country}>
                    <SelectValue placeholder={t('countryPlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError message={errors.country?.message} />
          </div>
        </div>
      </fieldset>

      {/* Workforce requirements */}
      <fieldset className="space-y-5">
        <legend className="mb-1 font-display text-lg font-semibold text-primary">
          {t('sectionRequirements')}
        </legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="industry">
              {t('industry')} <span className="text-destructive">*</span>
            </Label>
            <Controller
              control={control}
              name="industry"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="industry" className="mt-1.5" aria-invalid={!!errors.industry}>
                    <SelectValue placeholder={t('industryPlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    {industryOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {ti(`${opt.key}.title`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError message={errors.industry?.message} />
          </div>
          <div>
            <Label htmlFor="workersCount">
              {t('workersCount')} <span className="text-destructive">*</span>
            </Label>
            <Input
              id="workersCount"
              type="number"
              min={1}
              className="mt-1.5"
              placeholder={t('workersCountPlaceholder')}
              aria-invalid={!!errors.workersCount}
              {...register('workersCount')}
            />
            <FieldError message={errors.workersCount?.message} />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="requiredSkills">
              {t('requiredSkills')} <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="requiredSkills"
              className="mt-1.5"
              rows={4}
              placeholder={t('requiredSkillsPlaceholder')}
              aria-invalid={!!errors.requiredSkills}
              {...register('requiredSkills')}
            />
            <FieldError message={errors.requiredSkills?.message} />
          </div>
          <div>
            <Label htmlFor="deploymentDate">{t('deploymentDate')}</Label>
            <Input id="deploymentDate" type="date" className="mt-1.5" {...register('deploymentDate')} />
          </div>
        </div>
      </fieldset>

      {/* Additional */}
      <fieldset className="space-y-5">
        <legend className="mb-1 font-display text-lg font-semibold text-primary">
          {t('sectionAdditional')}
        </legend>

        {/* File upload */}
        <div>
          <Label htmlFor="attachment">{t('attachment')}</Label>
          <div className="mt-1.5">
            <input
              ref={fileRef}
              id="attachment"
              type="file"
              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
              className="sr-only"
              onChange={(e) => {
                setFileName(e.target.files?.[0]?.name ?? null);
                setAttachmentError(undefined);
              }}
            />
            {fileName ? (
              <div className="flex items-center justify-between gap-3 rounded-md border border-input bg-muted/40 px-3.5 py-2.5">
                <span className="truncate text-sm font-medium text-foreground">{fileName}</span>
                <button
                  type="button"
                  aria-label="Remove file"
                  onClick={() => {
                    if (fileRef.current) fileRef.current.value = '';
                    setFileName(null);
                  }}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <X className="size-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="flex w-full items-center gap-3 rounded-md border border-dashed border-input bg-background px-3.5 py-2.5 text-left text-sm text-muted-foreground transition-colors hover:border-ring hover:bg-accent/50"
              >
                <Upload className="size-4 shrink-0" />
                {t('attachmentChoose')}
              </button>
            )}
          </div>
          <p className="mt-1.5 text-xs text-muted-foreground">{t('attachmentHint')}</p>
          <FieldError message={attachmentError} />
        </div>

        <div>
          <Label htmlFor="additionalNotes">{t('additionalNotes')}</Label>
          <Textarea
            id="additionalNotes"
            className="mt-1.5"
            rows={3}
            placeholder={t('additionalNotesPlaceholder')}
            {...register('additionalNotes')}
          />
        </div>

        {/* Consent */}
        <div>
          <div className="flex items-start gap-3">
            <Controller
              control={control}
              name="consent"
              render={({ field }) => (
                <Checkbox
                  id="consent"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-invalid={!!errors.consent}
                  className="mt-0.5"
                />
              )}
            />
            <Label htmlFor="consent" className="text-sm font-normal leading-relaxed text-muted-foreground">
              {t('consent')}
            </Label>
          </div>
          <FieldError message={errors.consent?.message} />
        </div>
      </fieldset>

      <Button
        type="submit"
        variant="accent"
        size="lg"
        disabled={isSubmitting}
        className={cn('w-full sm:w-auto')}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            {t('submitting')}
          </>
        ) : (
          <>
            {t('submit')}
            <ArrowRight className="size-4" />
          </>
        )}
      </Button>
    </form>
  );
}

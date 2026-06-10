'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { Loader2, LogIn } from 'lucide-react';
import { useRouter } from '@/i18n/navigation';
import { loginSchema, type LoginInput } from '@/lib/validations/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function LoginForm() {
  const t = useTranslations('Auth.login');
  const tr = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/portal';
  const [authError, setAuthError] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  async function onSubmit(values: LoginInput) {
    setAuthError(false);
    const result = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    if (result?.error) {
      setAuthError(true);
      return;
    }
    router.push(callbackUrl.startsWith('/') ? callbackUrl : '/portal');
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {authError && (
        <div className="rounded-md border border-destructive/30 bg-destructive/[0.06] px-4 py-3 text-sm text-destructive" role="alert">
          {t('error')}
        </div>
      )}
      <div>
        <Label htmlFor="login-email">{t('email')}</Label>
        <Input
          id="login-email"
          type="email"
          autoComplete="email"
          className="mt-1.5"
          aria-invalid={!!errors.email}
          {...register('email')}
        />
        {errors.email?.message && (
          <p className="mt-1.5 text-sm text-destructive">{tr(errors.email.message)}</p>
        )}
      </div>
      <div>
        <Label htmlFor="login-password">{t('password')}</Label>
        <Input
          id="login-password"
          type="password"
          autoComplete="current-password"
          className="mt-1.5"
          aria-invalid={!!errors.password}
          {...register('password')}
        />
        {errors.password?.message && (
          <p className="mt-1.5 text-sm text-destructive">{tr(errors.password.message)}</p>
        )}
      </div>
      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            {t('submitting')}
          </>
        ) : (
          <>
            <LogIn className="size-4" />
            {t('submit')}
          </>
        )}
      </Button>
    </form>
  );
}

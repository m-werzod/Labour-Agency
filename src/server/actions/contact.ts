'use server';

import { headers } from 'next/headers';
import { createHash } from 'crypto';
import { prisma } from '@/lib/prisma';
import { contactSchema } from '@/lib/validations/contact';
import { notifyNewContact } from '@/lib/mail';

export type ContactResult =
  | { success: true }
  | { success: false; error: string; fieldErrors?: Record<string, string> };

export async function submitContactMessage(formData: FormData): Promise<ContactResult> {
  const raw = {
    name: formData.get('name'),
    email: formData.get('email'),
    company: formData.get('company') ?? undefined,
    country: formData.get('country') ?? undefined,
    subject: formData.get('subject') ?? undefined,
    message: formData.get('message'),
    website: formData.get('website') ?? undefined, // honeypot
    locale: formData.get('locale') ?? undefined,
  };

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === 'string' && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { success: false, error: 'Validation failed', fieldErrors };
  }

  const data = parsed.data;

  // Honeypot — accept silently without persisting.
  if (data.website && data.website.length > 0) {
    return { success: true };
  }

  let ipHash: string | null = null;
  try {
    const h = await headers();
    const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '';
    if (ip) {
      ipHash = createHash('sha256')
        .update(ip + (process.env.AUTH_SECRET ?? 'salt'))
        .digest('hex');
    }
  } catch {
    /* ignore */
  }

  try {
    await prisma.contactMessage.create({
      data: {
        name: data.name,
        email: data.email,
        company: data.company ?? null,
        country: data.country ?? null,
        subject: data.subject ?? null,
        message: data.message,
        locale: data.locale ?? 'en',
        ipHash,
      },
    });

    await notifyNewContact({
      name: data.name,
      email: data.email,
      company: data.company,
      country: data.country,
      subject: data.subject,
      message: data.message,
    });

    return { success: true };
  } catch (error) {
    console.error('[submitContactMessage] failed:', error);
    return { success: false, error: 'Server error. Please try again or contact us directly.' };
  }
}

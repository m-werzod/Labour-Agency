'use server';

import { headers } from 'next/headers';
import { createHash } from 'crypto';
import type { Attachment } from 'nodemailer/lib/mailer';
import type { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { generateTrackingNumber } from '@/lib/utils';
import {
  employerRequestSchema,
  MAX_FILE_SIZE,
  ACCEPTED_FILE_TYPES,
} from '@/lib/validations/employer-request';
import {
  notifyNewEmployerRequest,
  confirmEmployerRequest,
  type EmployerRequestEmailData,
} from '@/lib/mail';

export type EmployerRequestResult =
  | { success: true; trackingNumber: string }
  | { success: false; error: string; fieldErrors?: Record<string, string> };

async function hashIp(): Promise<string | null> {
  try {
    const h = await headers();
    const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '';
    if (!ip) return null;
    return createHash('sha256')
      .update(ip + (process.env.AUTH_SECRET ?? 'salt'))
      .digest('hex');
  } catch {
    return null;
  }
}

async function createWithUniqueTracking(
  data: Omit<Prisma.EmployerRequestUncheckedCreateInput, 'trackingNumber'>,
) {
  for (let attempt = 0; attempt < 6; attempt += 1) {
    const trackingNumber = generateTrackingNumber();
    try {
      return await prisma.employerRequest.create({ data: { ...data, trackingNumber } });
    } catch (error: unknown) {
      // Retry only on unique-constraint collision (Prisma P2002).
      if (
        attempt < 5 &&
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        (error as { code?: string }).code === 'P2002'
      ) {
        continue;
      }
      throw error;
    }
  }
  throw new Error('Could not generate a unique tracking number');
}

export async function submitEmployerRequest(formData: FormData): Promise<EmployerRequestResult> {
  // 1. Validate the payload (server-authoritative).
  const raw = {
    companyName: formData.get('companyName'),
    contactPerson: formData.get('contactPerson'),
    country: formData.get('country'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    industry: formData.get('industry'),
    workersCount: formData.get('workersCount'),
    requiredSkills: formData.get('requiredSkills'),
    deploymentDate: formData.get('deploymentDate') ?? undefined,
    additionalNotes: formData.get('additionalNotes') ?? undefined,
    consent: formData.get('consent') ?? undefined,
    website: formData.get('website') ?? undefined, // honeypot
    locale: formData.get('locale') ?? undefined,
  };

  const parsed = employerRequestSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === 'string' && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { success: false, error: 'Validation failed', fieldErrors };
  }

  const data = parsed.data;

  // Silently accept honeypot submissions without persisting (bot trap).
  if (data.website && data.website.length > 0) {
    return { success: true, trackingNumber: generateTrackingNumber() };
  }

  // 2. Handle optional file attachment (validated; emailed to admin).
  let attachment: Attachment | undefined;
  let attachmentName: string | null = null;
  const file = formData.get('attachment');
  if (file && file instanceof File && file.size > 0) {
    if (file.size > MAX_FILE_SIZE) {
      return { success: false, error: 'Validation failed', fieldErrors: { attachment: 'Validation.fileSize' } };
    }
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      return { success: false, error: 'Validation failed', fieldErrors: { attachment: 'Validation.fileType' } };
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    attachment = { filename: file.name, content: buffer, contentType: file.type };
    attachmentName = file.name;
  }

  const deploymentDate = data.deploymentDate ? new Date(data.deploymentDate) : null;
  const ipHash = await hashIp();

  try {
    // 3. Persist the request.
    const record = await createWithUniqueTracking({
      status: 'NEW',
      companyName: data.companyName,
      contactPerson: data.contactPerson,
      country: data.country,
      email: data.email,
      phone: data.phone,
      industry: data.industry,
      workersCount: data.workersCount,
      requiredSkills: data.requiredSkills,
      deploymentDate: deploymentDate && !Number.isNaN(deploymentDate.getTime()) ? deploymentDate : null,
      additionalNotes: data.additionalNotes ?? null,
      attachmentName,
      locale: data.locale ?? 'en',
      ipHash,
    });

    // 4. Fire notification + confirmation emails (best-effort).
    const emailData: EmployerRequestEmailData = {
      trackingNumber: record.trackingNumber,
      companyName: record.companyName,
      contactPerson: record.contactPerson,
      country: record.country,
      email: record.email,
      phone: record.phone,
      industry: record.industry,
      workersCount: record.workersCount,
      requiredSkills: record.requiredSkills,
      deploymentDate: record.deploymentDate?.toISOString().slice(0, 10) ?? null,
      additionalNotes: record.additionalNotes,
    };
    await Promise.allSettled([
      notifyNewEmployerRequest(emailData, attachment),
      confirmEmployerRequest(emailData),
    ]);

    return { success: true, trackingNumber: record.trackingNumber };
  } catch (error) {
    console.error('[submitEmployerRequest] failed:', error);
    return { success: false, error: 'Server error. Please try again or contact us directly.' };
  }
}

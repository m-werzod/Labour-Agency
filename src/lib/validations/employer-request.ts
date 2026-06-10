import { z } from 'zod';
import { IndustryType } from '@prisma/client';

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
export const ACCEPTED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/png',
  'image/jpeg',
];

export const employerRequestSchema = z.object({
  companyName: z.string().trim().min(2, 'Validation.required').max(120),
  contactPerson: z.string().trim().min(2, 'Validation.required').max(120),
  country: z.string().trim().min(2, 'Validation.required').max(80),
  email: z.string().trim().email('Validation.email').max(160),
  phone: z.string().trim().min(5, 'Validation.phone').max(40),
  industry: z.nativeEnum(IndustryType, { errorMap: () => ({ message: 'Validation.required' }) }),
  workersCount: z.coerce
    .number({ invalid_type_error: 'Validation.number' })
    .int('Validation.number')
    .min(1, 'Validation.min')
    .max(100000, 'Validation.maxLength'),
  requiredSkills: z.string().trim().min(10, 'Validation.minLength').max(3000),
  deploymentDate: z
    .string()
    .optional()
    .transform((v) => (v && v.length > 0 ? v : undefined)),
  additionalNotes: z.string().trim().max(3000).optional(),
  consent: z
    .union([z.boolean(), z.literal('true'), z.literal('on')])
    .refine((v) => v === true || v === 'true' || v === 'on', {
      message: 'Validation.consent',
    }),
  // Honeypot — must remain empty (bots fill it).
  website: z.string().max(0).optional(),
  locale: z.string().optional(),
});

export type EmployerRequestInput = z.infer<typeof employerRequestSchema>;

/** Client-side form schema (consent strictly boolean for the checkbox). */
export const employerRequestFormSchema = employerRequestSchema.extend({
  consent: z.boolean().refine((v) => v === true, { message: 'Validation.consent' }),
});

export type EmployerRequestFormValues = z.infer<typeof employerRequestFormSchema>;

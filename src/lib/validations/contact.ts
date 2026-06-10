import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Validation.required').max(120),
  email: z.string().trim().email('Validation.email').max(160),
  company: z.string().trim().max(120).optional(),
  country: z.string().trim().max(80).optional(),
  subject: z.string().trim().max(160).optional(),
  message: z.string().trim().min(10, 'Validation.minLength').max(3000),
  // Honeypot
  website: z.string().max(0).optional(),
  locale: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const contactFormSchema = contactSchema;
export type ContactFormValues = z.infer<typeof contactFormSchema>;

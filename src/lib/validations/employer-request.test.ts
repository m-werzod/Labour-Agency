import { describe, it, expect } from 'vitest';
import { employerRequestSchema } from './employer-request';

const valid = {
  companyName: 'Hanwoo Construction',
  contactPerson: 'Min-jun Park',
  country: 'South Korea',
  email: 'hr@hanwoo.com',
  phone: '+82 2 1234 5678',
  industry: 'CONSTRUCTION',
  workersCount: '40',
  requiredSkills: 'Experienced steel fixers and scaffolders.',
  consent: 'true',
};

describe('employerRequestSchema', () => {
  it('accepts a valid payload and coerces workersCount', () => {
    const result = employerRequestSchema.safeParse(valid);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.workersCount).toBe(40);
    }
  });

  it('rejects an invalid email', () => {
    const result = employerRequestSchema.safeParse({ ...valid, email: 'not-an-email' });
    expect(result.success).toBe(false);
  });

  it('rejects an invalid industry', () => {
    const result = employerRequestSchema.safeParse({ ...valid, industry: 'SPACE_TRAVEL' });
    expect(result.success).toBe(false);
  });

  it('requires consent', () => {
    const result = employerRequestSchema.safeParse({ ...valid, consent: false });
    expect(result.success).toBe(false);
  });

  it('rejects a filled honeypot field', () => {
    const result = employerRequestSchema.safeParse({ ...valid, website: 'http://spam.example' });
    expect(result.success).toBe(false);
  });

  it('requires a minimum skills description', () => {
    const result = employerRequestSchema.safeParse({ ...valid, requiredSkills: 'short' });
    expect(result.success).toBe(false);
  });
});

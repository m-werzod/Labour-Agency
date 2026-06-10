import { describe, it, expect } from 'vitest';
import { generateTrackingNumber, slugify, initials, formatNumber } from './utils';

describe('generateTrackingNumber', () => {
  it('produces the SG-YEAR-XXXXXX format', () => {
    const tn = generateTrackingNumber(new Date('2026-06-10'));
    expect(tn).toMatch(/^SG-2026-[A-Z0-9]{6}$/);
  });

  it('omits ambiguous characters (no 0, O, 1, I, L)', () => {
    for (let i = 0; i < 50; i += 1) {
      const suffix = generateTrackingNumber().split('-')[2]!;
      expect(suffix).not.toMatch(/[0O1IL]/);
    }
  });

  it('is reasonably unique', () => {
    const set = new Set(Array.from({ length: 500 }, () => generateTrackingNumber()));
    expect(set.size).toBeGreaterThan(495);
  });
});

describe('slugify', () => {
  it('lowercases and hyphenates', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });
  it('strips punctuation and trims hyphens', () => {
    expect(slugify('  Specialist Group: Uzbekistan! ')).toBe('specialist-group-uzbekistan');
  });
});

describe('initials', () => {
  it('returns up to two uppercase initials', () => {
    expect(initials('Min-jun Park')).toBe('MP');
    expect(initials('Stefan')).toBe('S');
  });
});

describe('formatNumber', () => {
  it('formats with locale grouping', () => {
    expect(formatNumber(12000, 'en')).toBe('12,000');
  });
});

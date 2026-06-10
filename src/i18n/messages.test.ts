import { describe, it, expect } from 'vitest';
import { locales } from './routing';
import en from '../../messages/en.json';

// Critical navigation keys every locale must translate (these are always visible).
const REQUIRED_NAV_KEYS = Object.keys(en.Nav);

describe('translation catalogs', () => {
  it.each(locales)('locale "%s" loads and translates core navigation', async (locale) => {
    const messages = (await import(`../../messages/${locale}.json`)).default;
    expect(messages).toBeTruthy();
    expect(messages.Nav).toBeTruthy();
    for (const key of REQUIRED_NAV_KEYS) {
      expect(typeof messages.Nav[key]).toBe('string');
      expect(messages.Nav[key].length).toBeGreaterThan(0);
    }
  });

  it('English catalog exposes all expected top-level namespaces', () => {
    for (const ns of ['Meta', 'Common', 'Nav', 'Footer', 'Home', 'Industries', 'EmployerRequest']) {
      expect(en).toHaveProperty(ns);
    }
  });
});

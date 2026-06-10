import { describe, it, expect } from 'vitest';
import { deepMerge } from './deep-merge';

describe('deepMerge', () => {
  it('falls back to base values for missing keys', () => {
    const base = { Nav: { home: 'Home', about: 'About' } };
    const override = { Nav: { home: 'Главная' } };
    const result = deepMerge(base, override);
    expect(result.Nav.home).toBe('Главная');
    expect(result.Nav.about).toBe('About');
  });

  it('merges nested namespaces deeply', () => {
    const base = { A: { b: { c: 1, d: 2 } } };
    const override = { A: { b: { c: 9 } } };
    const result = deepMerge(base, override) as typeof base;
    expect(result.A.b.c).toBe(9);
    expect(result.A.b.d).toBe(2);
  });

  it('does not mutate the base catalog', () => {
    const base = { x: { y: 1 } };
    deepMerge(base, { x: { y: 2 } });
    expect(base.x.y).toBe(1);
  });
});

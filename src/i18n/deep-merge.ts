type Dict = Record<string, unknown>;

function isObject(value: unknown): value is Dict {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Deep-merge translation catalogs so a locale file only needs to override the
 * keys it actually translates; everything else falls back to the base (English)
 * catalog — including nested keys within a namespace.
 */
export function deepMerge<T extends Dict>(base: T, override: Dict): T {
  const result: Dict = { ...base };
  for (const key of Object.keys(override)) {
    const baseVal = base[key];
    const overrideVal = override[key];
    if (isObject(baseVal) && isObject(overrideVal)) {
      result[key] = deepMerge(baseVal, overrideVal);
    } else if (overrideVal !== undefined) {
      result[key] = overrideVal;
    }
  }
  return result as T;
}

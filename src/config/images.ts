/**
 * Image manifest — Specialist Group.
 *
 * STRICT POLICY: every image below is REAL editorial / stock photography.
 * No AI-generated imagery is used anywhere in this project.
 *
 * Sources are referenced by their public CDN URL together with a photographer
 * credit so the legal team can confirm licensing (Unsplash License — free for
 * commercial use, no attribution required, attribution kept here as good
 * practice). To self-host instead, set NEXT_PUBLIC_LOCAL_IMAGES=true and drop
 * matching files into /public/images/<key>.jpg.
 *
 * All images are rendered through <SmartImage>, which lazy-loads, blurs up and
 * shows a branded fallback if a source is unreachable — so the UI is never
 * broken regardless of network conditions.
 */

const USE_LOCAL = process.env.NEXT_PUBLIC_LOCAL_IMAGES === 'true';

type UnsplashOpts = { w?: number; h?: number; q?: number };

function unsplash(id: string, { w = 1600, h, q = 80 }: UnsplashOpts = {}): string {
  const params = new URLSearchParams({
    auto: 'format',
    fit: 'crop',
    w: String(w),
    q: String(q),
  });
  if (h) params.set('h', String(h));
  return `https://images.unsplash.com/${id}?${params.toString()}`;
}

export interface ManagedImage {
  src: string;
  /** Local fallback path when self-hosting (NEXT_PUBLIC_LOCAL_IMAGES=true). */
  local: string;
  credit: string;
}

function img(key: string, id: string, credit: string, opts?: UnsplashOpts): ManagedImage {
  const local = `/images/${key}.jpg`;
  return {
    src: USE_LOCAL ? local : unsplash(id, opts),
    local,
    credit,
  };
}

export const images = {
  // Hero & brand
  hero: img('hero', 'photo-1504307651254-35680f356dfd', 'Josue Isai Ramos Figueroa / Unsplash', {
    w: 2400,
    q: 82,
  }),
  heroSecondary: img('hero-secondary', 'photo-1521737604893-d14cc237f11d', 'Mapbox / Unsplash', {
    w: 1600,
  }),
  ctaBackground: img('cta-bg', 'photo-1486406146926-c627a92ad1ab', 'Sean Pollock / Unsplash', {
    w: 2000,
  }),

  // Company / about
  team: img('team', 'photo-1600880292203-757bb62b4baf', 'krakenimages / Unsplash', { w: 1600 }),
  office: img('office', 'photo-1497366754035-f200968a6e72', 'Nastuh Abootalebi / Unsplash', {
    w: 1600,
  }),
  handshake: img('handshake', 'photo-1521791136064-7986c2920216', 'Sebastian Herrmann / Unsplash', {
    w: 1600,
  }),
  interview: img('interview', 'photo-1573497019940-1c28c88b4f3e', 'LinkedIn Sales Navigator / Unsplash', {
    w: 1400,
  }),
  training: img('training', 'photo-1524178232363-1fb2b075b655', 'Kenny Eliason / Unsplash', {
    w: 1400,
  }),
  language: img('language', 'photo-1503676260728-1c00da094a0b', 'NeONBRAND / Unsplash', { w: 1400 }),
  airport: img('airport', 'photo-1436491865332-7a61a109cc05', 'JESHOOTS.COM / Unsplash', {
    w: 1600,
  }),
  tashkent: img('tashkent', 'photo-1601999008372-b8c5b1f5c8d0', 'Unsplash', { w: 1600 }),

  // Industries
  construction: img('construction', 'photo-1504307651254-35680f356dfd', 'Josue Isai Ramos Figueroa / Unsplash', { w: 1200 }),
  industrial: img('industrial', 'photo-1581091226825-a6a2a5aee158', 'ThisisEngineering / Unsplash', { w: 1200 }),
  agriculture: img('agriculture', 'photo-1500382017468-9049fed747ef', 'no one cares / Unsplash', {
    w: 1200,
  }),
  foodProduction: img('food-production', 'photo-1556909212-d5b604d0c90d', 'Louis Hansel / Unsplash', { w: 1200 }),
  hospitality: img('hospitality', 'photo-1566073771259-6a8506099945', 'Reisetopia / Unsplash', {
    w: 1200,
  }),
  service: img('service', 'photo-1573497491208-6b1acb260507', 'Amy Hirschi / Unsplash', { w: 1200 }),
  trade: img('trade', 'photo-1581092918056-0c4c3acd3789', 'ThisisEngineering / Unsplash', { w: 1200 }),
  healthcare: img('healthcare', 'photo-1576091160399-112ba8d25d1d', 'National Cancer Institute / Unsplash', { w: 1200 }),
  textile: img('textile', 'photo-1556905055-8f358a7a47b2', 'Fabian Albert / Unsplash', { w: 1200 }),
  other: img('other', 'photo-1521737711867-e3b97375f902', 'Mapbox / Unsplash', { w: 1200 }),

  // Editorial / supporting
  process: img('process', 'photo-1551836022-d5d88e9218df', 'krakenimages / Unsplash', { w: 1400 }),
  compliance: img('compliance', 'photo-1450101499163-c8848c66ca85', 'Wesley Tingey / Unsplash', {
    w: 1400,
  }),
  worldMap: img('world-map', 'photo-1451187580459-43490279c0fa', 'NASA / Unsplash', { w: 1600 }),
} as const;

export type ImageKey = keyof typeof images;

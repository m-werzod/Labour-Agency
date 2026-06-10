import {
  HardHat,
  Factory,
  Wheat,
  UtensilsCrossed,
  ConciergeBell,
  Headset,
  Wrench,
  HeartPulse,
  Scissors,
  Users,
  type LucideIcon,
} from 'lucide-react';
import type { ImageKey } from './images';
import type { IndustryType } from '@prisma/client';

export interface Industry {
  slug: string;
  /** Maps to messages `Industries.items.<slug>.*` */
  key: string;
  icon: LucideIcon;
  image: ImageKey;
  enum: IndustryType;
}

export const industries: Industry[] = [
  { slug: 'construction', key: 'construction', icon: HardHat, image: 'construction', enum: 'CONSTRUCTION' },
  { slug: 'industrial', key: 'industrial', icon: Factory, image: 'industrial', enum: 'INDUSTRIAL' },
  { slug: 'agriculture', key: 'agriculture', icon: Wheat, image: 'agriculture', enum: 'AGRICULTURE' },
  { slug: 'food-production', key: 'foodProduction', icon: UtensilsCrossed, image: 'foodProduction', enum: 'FOOD_PRODUCTION' },
  { slug: 'hospitality', key: 'hospitality', icon: ConciergeBell, image: 'hospitality', enum: 'HOSPITALITY' },
  { slug: 'service', key: 'service', icon: Headset, image: 'service', enum: 'SERVICE' },
  { slug: 'trade', key: 'trade', icon: Wrench, image: 'trade', enum: 'TRADE' },
  { slug: 'healthcare', key: 'healthcare', icon: HeartPulse, image: 'healthcare', enum: 'HEALTHCARE' },
  { slug: 'textile', key: 'textile', icon: Scissors, image: 'textile', enum: 'TEXTILE' },
  { slug: 'other', key: 'other', icon: Users, image: 'other', enum: 'OTHER' },
];

export const industryByEnum = Object.fromEntries(
  industries.map((i) => [i.enum, i]),
) as Record<IndustryType, Industry>;

/** Options for the employer request <Select>. */
export const industryOptions = industries.map((i) => ({ value: i.enum, key: i.key }));

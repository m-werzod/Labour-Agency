/** Headline statistics. Values are factual constants; labels are translated. */
export interface Stat {
  /** Maps to messages `Stats.items.<key>` */
  key: string;
  value: number;
  suffix?: string;
  prefix?: string;
}

export const stats: Stat[] = [
  { key: 'workersDeployed', value: 12000, suffix: '+' },
  { key: 'partnerEmployers', value: 240, suffix: '+' },
  { key: 'countries', value: 18, suffix: '' },
  { key: 'yearsExperience', value: 9, suffix: '' },
];

export const trustBadges: { key: string }[] = [
  { key: 'governmentLicensed' },
  { key: 'legalRecruitment' },
  { key: 'preScreened' },
  { key: 'internationalCooperation' },
];

/** Destination countries for the "where we deploy" marquee. */
export const destinationCountries = [
  'South Korea',
  'Germany',
  'Japan',
  'Poland',
  'United Arab Emirates',
  'Saudi Arabia',
  'Qatar',
  'Turkey',
  'United Kingdom',
  'Czech Republic',
  'Lithuania',
  'Kazakhstan',
] as const;

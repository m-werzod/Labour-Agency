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

/**
 * Destination countries for the "trusted by employers in…" marquee.
 * `code` is the ISO 3166-1 alpha-2 code used to render the country flag.
 */
export interface DestinationCountry {
  name: string;
  code: string;
}

export const destinationCountries: DestinationCountry[] = [
  // Key destination markets
  { name: 'United Kingdom', code: 'GB' },
  { name: 'Germany', code: 'DE' },
  { name: 'South Korea', code: 'KR' },
  { name: 'Japan', code: 'JP' },
  { name: 'Israel', code: 'IL' },
  { name: 'Poland', code: 'PL' },
  { name: 'United Arab Emirates', code: 'AE' },
  { name: 'Saudi Arabia', code: 'SA' },
  { name: 'Qatar', code: 'QA' },
  { name: 'Kuwait', code: 'KW' },
  { name: 'Bahrain', code: 'BH' },
  { name: 'Oman', code: 'OM' },
  { name: 'Turkey', code: 'TR' },
  { name: 'Kazakhstan', code: 'KZ' },
  // Europe
  { name: 'Ireland', code: 'IE' },
  { name: 'France', code: 'FR' },
  { name: 'Netherlands', code: 'NL' },
  { name: 'Belgium', code: 'BE' },
  { name: 'Luxembourg', code: 'LU' },
  { name: 'Austria', code: 'AT' },
  { name: 'Switzerland', code: 'CH' },
  { name: 'Italy', code: 'IT' },
  { name: 'Spain', code: 'ES' },
  { name: 'Portugal', code: 'PT' },
  { name: 'Greece', code: 'GR' },
  { name: 'Czech Republic', code: 'CZ' },
  { name: 'Slovakia', code: 'SK' },
  { name: 'Hungary', code: 'HU' },
  { name: 'Romania', code: 'RO' },
  { name: 'Bulgaria', code: 'BG' },
  { name: 'Croatia', code: 'HR' },
  { name: 'Slovenia', code: 'SI' },
  { name: 'Lithuania', code: 'LT' },
  { name: 'Latvia', code: 'LV' },
  { name: 'Estonia', code: 'EE' },
  { name: 'Sweden', code: 'SE' },
  { name: 'Norway', code: 'NO' },
  { name: 'Denmark', code: 'DK' },
  { name: 'Finland', code: 'FI' },
  { name: 'Cyprus', code: 'CY' },
  { name: 'Malta', code: 'MT' },
];

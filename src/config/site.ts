/**
 * Central, single-source-of-truth configuration for Specialist Group.
 * Factual constants (license numbers, contact details) live here.
 * Human-readable, translatable copy lives in `messages/*.json`.
 */

export const siteConfig = {
  name: 'Specialist Group',
  legalName: 'Specialist Group LLC',
  shortName: 'Specialist Group',
  domain: 'specialistgroup.uz',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://specialistgroup.uz',
  tagline: 'Licensed Workforce Solutions from Uzbekistan to the World',
  description:
    'Specialist Group is a government-licensed private employment agency in Tashkent, Uzbekistan. We recruit, train, and legally deploy pre-screened workers to international employers across construction, industry, agriculture, healthcare, hospitality and more.',
  founded: 2016,
} as const;

/** Official licensing & registration data — displayed for compliance. */
export const licenseInfo = {
  licenseNumber: '0078',
  registerNumber: '0106',
  tin: '308231656',
  registrationNumber: '956266',
  issuingAuthority: 'Agency for External Labour Migration, Ministry of Employment and Poverty Reduction of the Republic of Uzbekistan',
  issuingAuthorityShort: 'Agency for External Labour Migration of Uzbekistan',
} as const;

export const contactInfo = {
  email: 'labourmigrationuz@gmail.com',
  salesEmail: 'labourmigrationuz@gmail.com',
  phone: '+998 88 866 5558',
  phoneHref: '+998888665558',
  whatsapp: '+998 90 944 5558',
  whatsappHref: '998909445558',
  telegram: 'specialistgroup',
  address: {
    line1: 'Amir Temur Avenue 108',
    line2: 'Business Center, 7th Floor',
    city: 'Tashkent',
    postalCode: '100084',
    country: 'Uzbekistan',
    countryCode: 'UZ',
  },
  // Approx. coordinates for Tashkent city centre (map embed).
  geo: { lat: 41.311081, lng: 69.279737 },
  hours: 'Mon–Fri, 09:00–18:00 (GMT+5)',
} as const;

export const socialLinks = {
  linkedin: 'https://www.linkedin.com/company/specialist-group-uz',
  facebook: 'https://www.facebook.com/specialistgroup.uz',
  instagram: 'https://www.instagram.com/specialistgroup.uz',
  telegram: 'https://t.me/specialistgroup',
  youtube: 'https://www.youtube.com/@specialistgroup',
} as const;

/** Primary navigation. `key` maps to `Nav.*` translation keys. */
export const mainNav: { key: string; href: string }[] = [
  { key: 'about', href: '/about' },
  { key: 'services', href: '/services' },
  { key: 'industries', href: '/industries' },
  { key: 'whyUzbekistan', href: '/why-uzbekistan' },
  { key: 'license', href: '/license' },
  { key: 'news', href: '/news' },
  { key: 'contact', href: '/contact' },
];

export const footerNav: { key: string; links: { key: string; href: string }[] }[] = [
  {
    key: 'company',
    links: [
      { key: 'about', href: '/about' },
      { key: 'whyUzbekistan', href: '/why-uzbekistan' },
      { key: 'license', href: '/license' },
      { key: 'news', href: '/news' },
      { key: 'testimonials', href: '/testimonials' },
    ],
  },
  {
    key: 'solutions',
    links: [
      { key: 'services', href: '/services' },
      { key: 'industries', href: '/industries' },
      { key: 'employerRequest', href: '/employer-request' },
      { key: 'track', href: '/track' },
      { key: 'faq', href: '/faq' },
    ],
  },
  {
    key: 'forEmployers',
    links: [
      { key: 'requestWorkforce', href: '/employer-request' },
      { key: 'portal', href: '/portal' },
      { key: 'contact', href: '/contact' },
    ],
  },
];

export type SiteConfig = typeof siteConfig;

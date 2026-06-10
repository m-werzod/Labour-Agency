import { siteConfig, contactInfo, licenseInfo, socialLinks } from '@/config/site';

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is static and trusted; this is the standard pattern.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'EmploymentAgency'],
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo-full.svg`,
    description: siteConfig.description,
    foundingDate: String(siteConfig.founded),
    email: contactInfo.email,
    telephone: contactInfo.phone,
    taxID: licenseInfo.tin,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${contactInfo.address.line1}, ${contactInfo.address.line2}`,
      addressLocality: contactInfo.address.city,
      postalCode: contactInfo.address.postalCode,
      addressCountry: contactInfo.address.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: contactInfo.geo.lat,
      longitude: contactInfo.geo.lng,
    },
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Government License',
      identifier: licenseInfo.licenseNumber,
      recognizedBy: { '@type': 'GovernmentOrganization', name: licenseInfo.issuingAuthority },
    },
    sameAs: Object.values(socialLinks),
    areaServed: 'Worldwide',
    knowsLanguage: ['en', 'ru', 'uz', 'ko', 'de', 'ja', 'ar'],
  };
  return <JsonLd data={data} />;
}

export function WebsiteJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: ['en', 'ru', 'uz', 'ko', 'de', 'ja', 'ar'],
    publisher: { '@type': 'Organization', name: siteConfig.legalName },
  };
  return <JsonLd data={data} />;
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return <JsonLd data={data} />;
}

export function FaqJsonLd({ items }: { items: { question: string; answer: string }[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
  return <JsonLd data={data} />;
}

import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo';
import { contactInfo, siteConfig } from '@/config/site';
import { PageHeader } from '@/components/layout/page-header';
import { LegalBody } from '@/components/layout/legal-body';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    title: 'Terms of Use',
    description: `The terms governing use of the ${siteConfig.name} website and services.`,
    path: '/terms',
  });
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tc = await getTranslations('Common');
  const tf = await getTranslations('Footer');

  return (
    <>
      <PageHeader
        title={tf('terms')}
        breadcrumbs={[{ label: tc('home'), href: '/' }, { label: tf('terms') }]}
      />
      <LegalBody
        updated="Last updated: 1 January 2026"
        intro={`These Terms of Use govern your access to and use of the ${siteConfig.legalName} website and services. By using our website, you agree to these terms.`}
        sections={[
          {
            heading: 'Use of the website',
            paragraphs: [
              'You may use this website for lawful purposes only. You agree not to misuse the site, attempt unauthorised access, or interfere with its operation.',
              'The content on this website is provided for general information about our recruitment services and does not constitute a binding offer unless expressly agreed in writing.',
            ],
          },
          {
            heading: 'Recruitment services',
            paragraphs: [
              'Specialist Group operates as a licensed private employment agency. All placements are subject to a separate written service agreement and to the laws of the Republic of Uzbekistan and the destination country.',
              'In line with fair-recruitment principles, we do not charge recruitment fees to workers.',
            ],
          },
          {
            heading: 'Intellectual property',
            paragraphs: [
              'All trademarks, logos, text and design elements on this website are the property of Specialist Group or its licensors and may not be reproduced without permission.',
            ],
          },
          {
            heading: 'Limitation of liability',
            paragraphs: [
              'To the maximum extent permitted by law, Specialist Group is not liable for any indirect or consequential loss arising from use of this website.',
              'Information on the website is provided "as is" without warranties of any kind.',
            ],
          },
          {
            heading: 'Governing law',
            paragraphs: [
              'These terms are governed by the laws of the Republic of Uzbekistan. Any disputes shall be subject to the jurisdiction of the competent courts of Tashkent.',
            ],
          },
          {
            heading: 'Contact',
            paragraphs: [
              `Questions about these terms may be directed to ${contactInfo.email}.`,
              'This document is provided as a template and should be reviewed by qualified legal counsel before publication.',
            ],
          },
        ]}
      />
    </>
  );
}

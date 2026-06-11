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
    title: 'Privacy Policy',
    description: `How ${siteConfig.name} collects, uses and protects personal data.`,
    path: '/privacy',
  });
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tc = await getTranslations('Common');
  const tf = await getTranslations('Footer');

  return (
    <>
      <PageHeader
        title={tf('privacy')}
        breadcrumbs={[{ label: tc('home'), href: '/' }, { label: tf('privacy') }]}
      />
      <LegalBody
        updated="Last updated: 1 January 2026"
        intro={`This Privacy Policy explains how ${siteConfig.legalName} ("Specialist Group", "we") collects, uses, discloses and safeguards personal data when you use our website or engage our recruitment services. We are committed to protecting your privacy and handling your data lawfully and transparently.`}
        sections={[
          {
            heading: 'Data we collect',
            paragraphs: [
              'We collect information you provide directly — such as your name, company, email, phone number, country and the details of your workforce request or message.',
              'We also collect limited technical data (such as a hashed IP address) for security and abuse-prevention purposes. We never store raw IP addresses.',
            ],
          },
          {
            heading: 'How we use your data',
            paragraphs: [
              'We use your data to respond to enquiries, prepare proposals, deliver recruitment services, comply with legal obligations, and communicate with you about your request.',
              'We process candidate data only for lawful recruitment and deployment purposes, with appropriate consent and safeguards.',
            ],
          },
          {
            heading: 'Legal basis & retention',
            paragraphs: [
              'We process personal data on the basis of your consent, the performance of a contract, and our legitimate interests in operating a lawful recruitment business.',
              'We retain personal data only for as long as necessary to fulfil the purposes described here or as required by applicable law.',
            ],
          },
          {
            heading: 'Sharing & disclosure',
            paragraphs: [
              'We share data only with parties necessary to deliver our services — such as prospective employers, relevant government authorities, and trusted service providers — and only to the extent required.',
              'We do not sell personal data.',
            ],
          },
          {
            heading: 'Your rights',
            paragraphs: [
              'Subject to applicable law, you may request access to, correction of, or deletion of your personal data, and you may object to or restrict certain processing.',
              `To exercise your rights, contact us at ${contactInfo.email}.`,
            ],
          },
          {
            heading: 'Contact',
            paragraphs: [
              `For any privacy questions, contact ${siteConfig.legalName} at ${contactInfo.email} or ${contactInfo.phone}.`,
              'This document is provided as a template and should be reviewed by qualified legal counsel before publication.',
            ],
          },
        ]}
      />
    </>
  );
}

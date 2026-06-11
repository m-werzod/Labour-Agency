import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { pageMetadata } from '@/lib/seo';
import { contactInfo } from '@/config/site';
import { PageHeader } from '@/components/layout/page-header';
import { ContactForm } from '@/components/forms/contact-form';
import { Reveal } from '@/components/shared/reveal';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale, page: 'contact', path: '/contact' });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tc = await getTranslations('Common');
  const tn = await getTranslations('Nav');
  const t = await getTranslations('Contact');

  const { geo } = contactInfo;
  const bbox = `${geo.lng - 0.025},${geo.lat - 0.012},${geo.lng + 0.025},${geo.lat + 0.012}`;
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${geo.lat},${geo.lng}`;

  const infoCards = [
    {
      icon: MapPin,
      title: t('info.addressTitle'),
      lines: [
        `${contactInfo.address.line1}, ${contactInfo.address.line2}`,
        `${contactInfo.address.city} ${contactInfo.address.postalCode}, ${contactInfo.address.country}`,
      ],
    },
    {
      icon: Phone,
      title: t('info.phoneTitle'),
      lines: [contactInfo.phone, `WhatsApp: ${contactInfo.whatsapp}`],
    },
    { icon: Mail, title: t('info.emailTitle'), lines: [contactInfo.email, contactInfo.salesEmail] },
    { icon: Clock, title: t('info.hoursTitle'), lines: [contactInfo.hours] },
  ];

  return (
    <>
      <PageHeader
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
        breadcrumbs={[{ label: tc('home'), href: '/' }, { label: tn('contact') }]}
      />

      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Info + map */}
          <Reveal className="space-y-5 lg:col-span-5">
            <div className="grid gap-4 sm:grid-cols-2">
              {infoCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div key={card.title} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-primary/[0.06] text-primary">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="mt-4 text-sm font-semibold text-primary">{card.title}</h3>
                    {card.lines.map((line, i) => (
                      <p key={i} className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {line}
                      </p>
                    ))}
                  </div>
                );
              })}
            </div>
            <div className="overflow-hidden rounded-2xl border border-border shadow-soft">
              <iframe
                title="Specialist Group office location map"
                src={mapSrc}
                loading="lazy"
                className="h-64 w-full border-0 sm:h-72"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
              <h2 className="font-display text-xl font-semibold text-primary">{t('form.title')}</h2>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

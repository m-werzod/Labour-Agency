import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { Hero } from '@/components/sections/hero';
import { LogosMarquee } from '@/components/sections/logos-marquee';
import { ValueProp } from '@/components/sections/value-prop';
import { Stats } from '@/components/sections/stats';
import { IndustriesSection } from '@/components/sections/industries-section';
import { ServicesSection } from '@/components/sections/services-section';
import { ProcessSection } from '@/components/sections/process-section';
import { WhyUzbekistanSection } from '@/components/sections/why-uzbekistan-section';
import { TrainingSection } from '@/components/sections/training-section';
import { LicenseSection } from '@/components/sections/license-section';
import { TestimonialsCarousel } from '@/components/sections/testimonials-carousel';
import { CtaBanner } from '@/components/sections/cta-banner';

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <LogosMarquee />
      <ValueProp />
      <Stats />
      <IndustriesSection limit={6} />
      <ServicesSection />
      <ProcessSection />
      <WhyUzbekistanSection />
      <TrainingSection />
      <LicenseSection variant="preview" />
      <TestimonialsCarousel />
      <CtaBanner />
    </>
  );
}

import { useTranslations } from 'next-intl';
import { Linkedin, Facebook, Instagram, Youtube, Send, MapPin, Phone, Mail, ShieldCheck } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { footerNav, contactInfo, socialLinks, licenseInfo, siteConfig } from '@/config/site';
import { Logo } from '@/components/brand/logo';

const socials = [
  { href: socialLinks.linkedin, icon: Linkedin, label: 'LinkedIn' },
  { href: socialLinks.facebook, icon: Facebook, label: 'Facebook' },
  { href: socialLinks.instagram, icon: Instagram, label: 'Instagram' },
  { href: socialLinks.telegram, icon: Send, label: 'Telegram' },
  { href: socialLinks.youtube, icon: Youtube, label: 'YouTube' },
];

export function Footer() {
  const t = useTranslations('Footer');
  const tn = useTranslations('Nav');
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 text-primary-foreground">
      <div className="container py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Logo theme="white" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">{t('about')}</p>

            <div className="mt-6 space-y-2.5 text-sm text-white/75">
              <a href={`tel:${contactInfo.phoneHref}`} className="flex items-center gap-3 hover:text-white">
                <Phone className="size-4 shrink-0 text-secondary-300" />
                {contactInfo.phone}
              </a>
              <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-3 hover:text-white">
                <Mail className="size-4 shrink-0 text-secondary-300" />
                {contactInfo.email}
              </a>
              <p className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-secondary-300" />
                <span>
                  {contactInfo.address.line1}, {contactInfo.address.line2}
                  <br />
                  {contactInfo.address.city} {contactInfo.address.postalCode}, {contactInfo.address.country}
                </span>
              </p>
            </div>

            <div className="mt-6 flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="inline-flex size-9 items-center justify-center rounded-md border border-white/15 text-white/70 transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white"
                >
                  <s.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5 lg:col-start-6">
            {footerNav.map((col) => (
              <div key={col.key}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
                  {t(`columns.${col.key}`)}
                </h3>
                <ul className="mt-4 space-y-3 text-sm">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-white/75 transition-colors hover:text-white">
                        {tn(link.key)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* License strip */}
        <div className="mt-12 rounded-xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <ShieldCheck className="size-6 shrink-0 text-secondary-300" />
              <p className="text-sm text-white/75">{t('licenseNote')}</p>
            </div>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs sm:grid-cols-4">
              <div>
                <dt className="text-white/45">{t('licenseNumber')}</dt>
                <dd className="font-semibold text-white">{licenseInfo.licenseNumber}</dd>
              </div>
              <div>
                <dt className="text-white/45">{t('registerNumber')}</dt>
                <dd className="font-semibold text-white">{licenseInfo.registerNumber}</dd>
              </div>
              <div>
                <dt className="text-white/45">{t('tin')}</dt>
                <dd className="font-semibold text-white">{licenseInfo.tin}</dd>
              </div>
              <div>
                <dt className="text-white/45">{t('registrationNumber')}</dt>
                <dd className="font-semibold text-white">{licenseInfo.registrationNumber}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-3 py-5 text-xs text-white/55 sm:flex-row">
          <p>
            © {year} {siteConfig.legalName}. {t('rights')}
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-white">
              {t('privacy')}
            </Link>
            <Link href="/terms" className="hover:text-white">
              {t('terms')}
            </Link>
            <Link href="/license" className="hover:text-white">
              {tn('license')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { unstable_setRequestLocale } from 'next-intl/server';
import HeroSection from '@/app/components/homepage/hero-section';
import CurrentlyShipping from '@/app/components/homepage/currently-shipping';
import SelectedWork from '@/app/components/homepage/selected-work';
import ExperienceSection from '@/app/components/homepage/experience-section';
import AboutSection from '@/app/components/homepage/about-section';
import ContactSection from '@/app/components/homepage/contact-section';

export default function Home({ params: { locale } }) {
  unstable_setRequestLocale(locale);

  return (
    <>
      <HeroSection locale={locale} />
      <CurrentlyShipping locale={locale} />
      <SelectedWork locale={locale} />
      <ExperienceSection locale={locale} />
      <AboutSection locale={locale} />
      <ContactSection locale={locale} />
    </>
  );
}

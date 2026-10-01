import { GoogleTagManager } from '@next/third-parties/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Instrument_Sans } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { unstable_setRequestLocale, getMessages } from 'next-intl/server';
import SiteHeader from '../components/chapters/site-header';
import SiteFooter from '../components/chapters/site-footer';
import ChapterObserver from '../components/chapters/chapter-observer';
import MobileChapterNav from '../components/chapters/mobile-chapter-nav';
import Sculpture from '../components/chapters/sculpture';
import ToastProvider from '../components/toast-provider';
import TitlePulse from '../components/title-pulse';
import { locales } from '../../i18n';
import '../css/globals.scss';

const body = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
  // next/font 14.1 ships no fallback metrics for this family.
  adjustFontFallback: false,
});

// Only prebuilt locales are valid; anything else (e.g. /wp-login.php) is a 404, not a crash.
export const viewport = {
  themeColor: '#e8e3db',
};

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }) {
  const messages = (await import(`../../messages/${locale}.json`)).default;

  return {
    metadataBase: new URL('https://oele.dev'),
    title: {
      default: messages.meta.title,
      template: `%s | Osmell Caicedo`,
    },
    description: messages.meta.description,
    keywords: [
      'Laravel Developer',
      'Senior Laravel Engineer',
      'Laravel Ecosystem',
      'Filament PHP',
      'Multi-tenant Laravel',
      'Full Stack Developer',
      'Remote Engineer Colombia',
      'Next.js Developer',
      'Indie Maker',
      'Software Mentor',
      'AI-assisted Development',
      'Claude Code',
      'API Integration',
      'Google Workspace Laravel',
      'QuickBooks Integration',
    ],
    authors: [{ name: 'Osmell Caicedo', url: 'https://oele.dev' }],
    creator: 'Osmell Caicedo',
    publisher: 'Osmell Caicedo',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'es' ? 'es_CO' : 'en_US',
      url: 'https://oele.dev',
      siteName: 'Osmell Caicedo',
      title: messages.meta.title,
      description: messages.meta.description,
    },
    twitter: {
      card: 'summary_large_image',
      title: messages.meta.title,
      description: messages.meta.description,
      creator: '@oele_dev',
    },
    alternates: {
      canonical: 'https://oele.dev',
      languages: {
        en: 'https://oele.dev',
        es: 'https://oele.dev/es',
      },
    },
  };
}

export default async function LocaleLayout({ children, params: { locale } }) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Osmell Caicedo',
    url: 'https://oele.dev',
    image: 'https://oele.dev/profile.png',
    sameAs: [
      'https://github.com/oele-dev',
      'https://www.linkedin.com/in/oele-dev/',
      'https://twitter.com/oele_dev',
    ],
    jobTitle: 'Software and AI Engineer, Senior Laravel Engineer, Indie Maker',
    description:
      'Senior Laravel engineer with 10+ years in the Laravel ecosystem, building multi-tenant products, Filament admin panels, and serious API integrations. AI-augmented workflow since 2023.',
    knowsAbout: [
      'Laravel Ecosystem',
      'Filament PHP',
      'Livewire',
      'Vue.js',
      'React',
      'Next.js',
      'Multi-tenant Architecture',
      'API Integration',
      'Google Workspace',
      'QuickBooks',
      'PostgreSQL',
      'MySQL',
      'Docker',
      'AI-assisted Development',
      'Software Mentorship',
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'Colombia',
    },
  };

  return (
    <html
      lang={locale}
      className={body.variable}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      {/* data-chapter starts on the hero so the header name doesn't flash before JS runs */}
      <body className="bg-paper text-ink font-body antialiased" data-chapter="intro" data-side="right">
        <NextIntlClientProvider messages={messages}>
          <canvas id="stage" className="stage" aria-hidden="true" />
          <div className="veil veil--l" aria-hidden="true" />
          <div className="veil veil--r" aria-hidden="true" />
          <TitlePulse locale={locale} />
          <ToastProvider />
          <SiteHeader locale={locale} />
          <main className="relative z-[2]">{children}</main>
          <SiteFooter />
          <ChapterObserver scrollLabel={messages.nav.scroll} />
          <MobileChapterNav />
          <Sculpture />
        </NextIntlClientProvider>
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
        <SpeedInsights />
      </body>
    </html>
  );
}

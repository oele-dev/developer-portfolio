import { GoogleTagManager } from '@next/third-parties/google';
import { Inter } from 'next/font/google';
import Footer from './components/footer';
import Navbar from './components/navbar';
import ToastProvider from './components/toast-provider';
import './css/card.scss';
import './css/globals.scss';
const inter = Inter({ subsets: ['latin'] });
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata = {
  metadataBase: new URL('https://oele.dev'),
  title: {
    default: 'Osmell Caicedo - Software Engineer | Full Stack Developer Portfolio',
    template: '%s | Osmell Caicedo'
  },
  description: 'Software Engineer specializing in full-stack web development with Laravel, Vue, React, and Django. Expert in AI-assisted development using Claude Code, Cursor, and ChatGPT. Building modern web applications with Docker, AWS, and cutting-edge technologies.',
  keywords: [
    'Software Engineer',
    'Full Stack Developer',
    'Laravel Developer',
    'Vue.js Developer',
    'React Developer',
    'Python Developer',
    'Django Developer',
    'AI-assisted development',
    'Claude Code',
    'Cursor AI',
    'ChatGPT development',
    'LLM-powered coding',
    'Web Development',
    'Colombia Developer',
    'Remote Software Engineer',
    'Docker',
    'AWS',
    'MySQL',
    'PostgreSQL',
    'Tailwind CSS',
    'Next.js',
    'API Integration',
    'Google Workspace Integration'
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
    locale: 'en_US',
    url: 'https://oele.dev',
    siteName: 'Osmell Caicedo Portfolio',
    title: 'Osmell Caicedo - Software Engineer | Full Stack Developer',
    description: 'Software Engineer specializing in full-stack development with Laravel, Vue, React, and Django. Leveraging AI-assisted development tools like Claude Code and Cursor for enhanced productivity.',
    images: [
      {
        url: '/oele.dev_.png',
        width: 1200,
        height: 630,
        alt: 'Osmell Caicedo - Software Engineer Portfolio',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Osmell Caicedo - Software Engineer | Full Stack Developer',
    description: 'Software Engineer specializing in full-stack development with Laravel, Vue, React, and Django. Leveraging AI-assisted development tools.',
    creator: '@oele_dev',
    images: ['/oele.dev_.png'],
  },
  alternates: {
    canonical: 'https://oele.dev',
  },
  verification: {
    google: 'google-site-verification-code', // Add your Google Search Console verification code
  },
}

export default function RootLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Osmell Caicedo",
    "url": "https://oele.dev",
    "image": "https://oele.dev/profile.png",
    "sameAs": [
      "https://github.com/oele-dev",
      "https://www.linkedin.com/in/oele-dev/",
      "https://twitter.com/oele_dev"
    ],
    "jobTitle": "Software Engineer",
    "worksFor": {
      "@type": "Organization",
      "name": "Level 60 consulting"
    },
    "description": "Software Engineer specializing in full-stack web development with Laravel, Vue, React, and Django. Expert in AI-assisted development using Claude Code, Cursor, and ChatGPT.",
    "knowsAbout": [
      "Laravel",
      "Vue.js",
      "React",
      "Python",
      "Django",
      "AI-assisted development",
      "Claude Code",
      "Cursor AI",
      "ChatGPT",
      "Full Stack Development",
      "Docker",
      "AWS",
      "MySQL",
      "PostgreSQL",
      "Web Development"
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Software Development"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Colombia"
    },
    "email": "hola@oele.dev"
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={inter.className}>
        <ToastProvider />
        <main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white">
          <Navbar />
          {children}
        </main>
        <Footer />
      </body>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
      <SpeedInsights />
    </html>
  )
};

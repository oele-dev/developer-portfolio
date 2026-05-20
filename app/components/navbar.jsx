'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const NAV_LINKS = [
  { href: '#work',       labelEn: 'WORK',        labelEs: 'PROYECTOS'  },
  { href: '#experience', labelEn: 'EXPERIENCE',   labelEs: 'EXPERIENCIA' },
  { href: '#about',      labelEn: 'ABOUT',        labelEs: 'SOBRE MÍ'  },
  { href: '#contact',    labelEn: 'CONTACT',      labelEs: 'CONTACTO'  },
];

export default function Navbar() {
  const pathname = usePathname();
  const locale = pathname.startsWith('/es') ? 'es' : 'en';
  const [open, setOpen] = useState(false);

  const label = (link) => (locale === 'es' ? link.labelEs : link.labelEn);

  const switchLocale = (target) => (e) => {
    e.preventDefault();
    document.cookie = `NEXT_LOCALE=${target}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    window.location.href = target === 'es' ? '/es' : '/';
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{
        borderColor: 'var(--rule)',
        backgroundColor: 'color-mix(in srgb, var(--paper) 90%, transparent)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
    >
      <div className="max-w-[68rem] mx-auto px-6 lg:px-12 h-14 flex items-center justify-between">
        {/* Monogram */}
        <Link
          href={locale === 'es' ? '/es' : '/'}
          className="font-display italic text-xl tracking-tight text-ink hover:text-accent transition-colors duration-150"
        >
          oele
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-xs tracking-widest text-ink-soft hover:text-accent transition-colors duration-150"
            >
              {label(link)}
            </a>
          ))}
        </nav>

        {/* Right: locale toggle + hamburger */}
        <div className="flex items-center gap-4">
          <div className="font-mono text-xs tracking-widest flex items-center gap-1">
            {locale === 'en' ? (
              <>
                <span className="text-accent font-medium">EN</span>
                <span className="text-ink-soft mx-1">·</span>
                <a
                  href="/es"
                  onClick={switchLocale('es')}
                  className="text-ink-soft hover:text-ink transition-colors duration-150"
                >
                  ES
                </a>
              </>
            ) : (
              <>
                <a
                  href="/"
                  onClick={switchLocale('en')}
                  className="text-ink-soft hover:text-ink transition-colors duration-150"
                >
                  EN
                </a>
                <span className="text-ink-soft mx-1">·</span>
                <span className="text-accent font-medium">ES</span>
              </>
            )}
          </div>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span
              className="block w-5 h-px bg-ink transition-all duration-200"
              style={{ transform: open ? 'rotate(45deg) translate(3px, 3px)' : 'none' }}
            />
            <span
              className="block w-5 h-px bg-ink transition-all duration-200"
              style={{ opacity: open ? 0 : 1 }}
            />
            <span
              className="block w-5 h-px bg-ink transition-all duration-200"
              style={{ transform: open ? 'rotate(-45deg) translate(3px, -3px)' : 'none' }}
            />
          </button>
        </div>
      </div>

      {/* Mobile fullscreen panel */}
      {open && (
        <div
          className="md:hidden fixed inset-0 top-14 flex flex-col items-start justify-center gap-8 px-8"
          style={{ backgroundColor: 'var(--paper)', zIndex: 40 }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-mono text-sm tracking-widest text-ink hover:text-accent transition-colors duration-150"
            >
              {label(link)}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

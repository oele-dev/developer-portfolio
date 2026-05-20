import Image from 'next/image';
import { personalData } from '@/utils/data/personal-data';

const PlusTick = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    className="text-accent"
    style={{ color: 'var(--accent)' }}
    aria-hidden="true"
  >
    <line x1="6" y1="0" x2="6" y2="12" stroke="currentColor" strokeWidth="1" />
    <line x1="0" y1="6" x2="12" y2="6" stroke="currentColor" strokeWidth="1" />
  </svg>
);

export default function HeroSection({ locale }) {
  const isEs = locale === 'es';

  const headline    = isEs ? 'Ingeniero Laravel senior.' : 'Senior Laravel engineer.';
  const headlineItalic = 'Indie maker. Mentor.';
  const tagline     = isEs
    ? 'Construyo productos web desde Bogotá desde 2014. AI-augmented desde 2023.'
    : 'Shipping web products from Bogotá since 2014. AI-augmented since 2023.';
  const ctaPrimary  = isEs ? 'Agenda una llamada de 30 min' : 'Book a 30-min call';
  const ctaSecondary = isEs ? 'Ver el CV' : 'Read the résumé';
  const caption     = 'OSMELL CAICEDO · BOGOTÁ, CO · MMXXVI';

  return (
    <section
      className="pt-32 pb-20 lg:pt-40 lg:pb-32 border-b"
      style={{ borderColor: 'var(--rule)' }}
    >
      <div className="max-w-[68rem] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Text column — 7 cols */}
          <div className="lg:col-span-7 flex flex-col gap-6">

            {/* Eyebrow */}
            <div
              className="fade-up delay-0 flex items-center gap-2"
            >
              <PlusTick />
              <span className="font-mono text-xs tracking-widest uppercase text-ink-soft">
                Osmell Caicedo
              </span>
            </div>

            {/* Headline */}
            <div className="fade-up delay-150">
              <h1
                className="font-display text-ink leading-tight"
                style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}
              >
                {headline}
                <br />
                <em>{headlineItalic}</em>
              </h1>
            </div>

            {/* Tagline */}
            <p
              className="fade-up delay-300 font-body text-ink-soft text-lg leading-relaxed max-w-prose"
            >
              {tagline}
            </p>

            {/* CTAs */}
            <div className="fade-up delay-450 flex flex-wrap items-center gap-4 pt-2">
              <a
                href="mailto:hola@oele.dev"
                className="font-mono text-xs tracking-widest uppercase px-6 py-3 text-ink transition-colors duration-150"
                style={{ backgroundColor: 'var(--accent)', color: 'var(--ink)' }}
              >
                {ctaPrimary}
              </a>
              <a
                href={personalData.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline font-mono text-xs tracking-widest uppercase text-ink"
              >
                {ctaSecondary}
              </a>
            </div>
          </div>

          {/* Portrait column — 5 cols */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <div
              className="relative aspect-square overflow-hidden border"
              style={{ borderColor: 'var(--rule)' }}
            >
              <Image
                src={personalData.profile}
                alt="Osmell Caicedo"
                fill
                priority
                className="object-cover"
                style={{ filter: 'grayscale(100%) sepia(5%)' }}
              />

              {/* Corner ticks */}
              <span className="absolute top-2 left-2"><PlusTick /></span>
              <span className="absolute top-2 right-2"><PlusTick /></span>
              <span className="absolute bottom-2 left-2"><PlusTick /></span>
              <span className="absolute bottom-2 right-2"><PlusTick /></span>
            </div>

            <p className="font-mono text-xs tracking-widest text-ink-soft text-center uppercase">
              {caption}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

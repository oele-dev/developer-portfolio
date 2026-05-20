import { personalData } from '@/utils/data/personal-data';
import ContactForm from './contact-form';

export default function ContactSection({ locale }) {
  const isEs = locale === 'es';

  const label  = isEs ? '05 — CONTACTO' : '05 — CONTACT';
  const blurb  = isEs
    ? 'Disponible para contratos remotos y colaboraciones de producto. Suelo responder en menos de 24 horas.'
    : 'Open to remote contracts and product collaborations. I usually reply within 24 hours.';

  return (
    <section
      id="contact"
      className="py-20 lg:py-32"
    >
      <div className="max-w-[68rem] mx-auto px-6 lg:px-12">
        <p
          className="font-mono text-xs tracking-widest uppercase mb-12"
          style={{ color: 'var(--accent)' }}
        >
          {label}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: email + socials */}
          <div className="flex flex-col gap-6">
            <a
              href={`mailto:${personalData.email}`}
              className="font-display italic text-ink hover:text-accent transition-colors duration-150"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
            >
              {personalData.email}
            </a>

            <p className="font-body text-ink-soft leading-relaxed max-w-prose">
              {blurb}
            </p>

            {/* Social links */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              {[
                { label: 'X',        href: personalData.twitter  },
                { label: 'GITHUB',   href: personalData.github   },
                { label: 'LINKEDIN', href: personalData.linkedIn },
                ...(personalData.youtube ? [{ label: 'YOUTUBE', href: personalData.youtube }] : []),
              ].map((s, i, arr) => (
                <span key={s.label} className="flex items-center gap-3">
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline font-mono text-xs tracking-widest uppercase text-ink-soft hover:text-ink transition-colors duration-150"
                  >
                    {s.label}
                  </a>
                  {i < arr.length - 1 && (
                    <span className="font-mono text-xs text-ink-soft select-none">·</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div>
            <ContactForm locale={locale} />
          </div>
        </div>
      </div>
    </section>
  );
}

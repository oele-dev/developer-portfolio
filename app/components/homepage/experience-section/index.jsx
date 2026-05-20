import { experiences } from '@/utils/data/experience';
import { tField } from '@/utils/i18n-helper';

export default function ExperienceSection({ locale }) {
  const isEs = locale === 'es';

  const label = isEs ? '03 — EXPERIENCIA' : '03 — EXPERIENCE';
  const intro = isEs
    ? 'Diez años en equipos Laravel entre Colombia, Malta y los Estados Unidos.'
    : 'Ten years across Laravel teams in Colombia, Malta and the US.';

  return (
    <section
      id="experience"
      className="py-20 lg:py-32 border-b"
      style={{ borderColor: 'var(--rule)' }}
    >
      <div className="max-w-[68rem] mx-auto px-6 lg:px-12">
        <p
          className="font-mono text-xs tracking-widest uppercase mb-4"
          style={{ color: 'var(--accent)' }}
        >
          {label}
        </p>
        <p className="font-body text-ink-soft max-w-prose mb-12">{intro}</p>

        <div className="flex flex-col">
          {experiences.map((exp, idx) => (
            <div
              key={exp.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-12 py-10 border-t"
              style={{ borderColor: 'var(--rule)' }}
            >
              {/* Year col */}
              <div className="lg:col-span-3">
                <span
                  className="font-mono font-medium text-ink-soft"
                  style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)' }}
                >
                  {tField(exp.years, locale)}
                </span>
              </div>

              {/* Content col */}
              <div className="lg:col-span-9">
                <h3
                  className="font-display text-ink mb-1"
                  style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}
                >
                  {tField(exp.role, locale)}
                </h3>
                <p className="font-mono text-xs tracking-widest uppercase text-ink-soft mb-4">
                  {exp.company}
                </p>
                <p className="font-body text-ink-soft leading-relaxed text-sm">
                  {tField(exp.description, locale)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

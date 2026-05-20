import { projectsData } from '@/utils/data/projects-data';
import WorkCard from './work-card';

export default function SelectedWork({ locale }) {
  const isEs = locale === 'es';

  const label = isEs ? '02 — PROYECTOS SELECCIONADOS' : '02 — SELECTED WORK';
  const intro = isEs
    ? 'Siete proyectos entre productos, paquetes e integraciones. Escoge uno.'
    : 'Seven projects across products, packages and integrations. Pick one.';

  return (
    <section
      id="work"
      className="py-20 lg:py-32 border-b"
      style={{ borderColor: 'var(--rule)' }}
    >
      <div className="max-w-[68rem] mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-8">
          <p
            className="font-mono text-xs tracking-widest uppercase mb-4"
            style={{ color: 'var(--accent)' }}
          >
            {label}
          </p>
          <p className="font-body text-ink-soft max-w-prose">{intro}</p>
        </div>

        {/* Project cards */}
        {projectsData.map((project, idx) => (
          <WorkCard
            key={project.id}
            project={project}
            index={idx}
            locale={locale}
          />
        ))}
      </div>
    </section>
  );
}

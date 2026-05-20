import Image from 'next/image';
import { tField } from '@/utils/i18n-helper';

export default function WorkCard({ project, index, locale }) {
  const isEven   = index % 2 === 0;
  const name     = tField(project.name, locale);
  const desc     = tField(project.description, locale);
  const cardNum  = String(index + 1).padStart(2, '0');

  const ImageBlock = () => {
    if (project.imagePlaceholder) {
      return (
        <div
          className="flex items-center justify-center w-full aspect-video border"
          style={{ backgroundColor: 'var(--paper-2)', borderColor: 'var(--rule)' }}
        >
          <span className="font-mono text-xs tracking-widest uppercase text-ink-soft text-center px-4">
            {project.placeholderLabel || 'PRIVATE PROJECT'}
          </span>
        </div>
      );
    }

    return (
      <div
        className="relative w-full aspect-video border overflow-hidden"
        style={{ borderColor: 'var(--rule)' }}
      >
        <Image
          src={project.image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 560px"
        />
      </div>
    );
  };

  return (
    <article
      className="py-16 border-b grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
      style={{ borderColor: 'var(--rule)' }}
    >
      {/* Text side */}
      <div className={`lg:col-span-5 flex flex-col gap-4 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
        <span className="font-mono text-3xl font-medium text-ink-soft">({cardNum})</span>

        <h3
          className="font-display text-ink"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
        >
          {name}
        </h3>

        <p className="font-mono text-xs tracking-widest uppercase text-ink-soft">
          {project.role}
        </p>

        <p className="font-body text-ink-soft leading-relaxed text-sm">
          {desc}
        </p>

        {/* Tools */}
        <p className="font-mono text-xs text-ink-soft">
          {project.tools.join(' · ')}
        </p>

        {/* Metric if present */}
        {project.metric && (
          <p className="font-mono text-xs tracking-widest uppercase text-ink">
            <strong className="font-display italic text-xl mr-1">
              {project.metric.value}
            </strong>
            {tField(project.metric.unit, locale)}
          </p>
        )}

        {/* Links */}
        <div className="flex items-center gap-4 pt-2">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline font-mono text-xs tracking-widest uppercase text-ink"
            >
              {locale === 'es' ? 'Ver demo →' : 'View demo →'}
            </a>
          )}
          {project.code && project.code !== project.demo && (
            <a
              href={project.code}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline font-mono text-xs tracking-widest uppercase text-ink-soft"
            >
              {locale === 'es' ? 'Ver código →' : 'View code →'}
            </a>
          )}
          {!project.demo && !project.code && (
            <span className="font-mono text-xs tracking-widest uppercase text-ink-soft">
              {locale === 'es' ? 'PRIVADO' : 'PRIVATE'}
            </span>
          )}
        </div>
      </div>

      {/* Image side */}
      <div className={`lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
        <ImageBlock />
      </div>
    </article>
  );
}

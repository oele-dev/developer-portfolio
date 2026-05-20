export default function AboutSection({ locale }) {
  const isEs = locale === 'es';

  const label = isEs ? '04 — SOBRE MÍ' : '04 — ABOUT';
  const pullQuote = isEs
    ? 'Hago bien la parte aburrida para que la parte interesante tenga oportunidad.'
    : 'I build the boring parts well so the interesting parts get a chance.';
  const body = isEs
    ? [
        'Soy ingeniero de software con diez años en el ecosistema Laravel. Me especializo en aplicaciones multi-tenant, paneles administrativos con Filament, integraciones de API serias (Google Workspace, QuickBooks, Hotmart, MikroTik, n8n) y SEO programático a escala — todo con un flujo asistido por IA (Claude Code, Cursor) que me deja entregar más rápido sin saltarme la revisión.',
        'He trabajado con empresas de EE.UU. (Level60 Consulting · Nashville, EyeUniversal · San José) y lideré el equipo técnico de Ovy.so durante cinco años, migrando un monolito en PHP a Laravel + Vue/Inertia, construyendo una PWA e integrando Google Workspace.',
        'También pasé tres años como instructor del ADSO en SENA enseñando Git, PHP/Laravel y CI/CD. Mentorear devs junior y compartir lo aprendido sigue siendo parte de cómo trabajo.',
        'Ahora divido el tiempo entre contratos de cliente y mis propios productos (Ultti, Malta Pharmacy Empire, mkdn). Disponible para contratos remotos, auditorías de performance en Laravel y colaboraciones de producto.',
      ]
    : [
        "I'm a software engineer with ten years in the Laravel ecosystem. I specialize in multi-tenant applications, Filament admin panels, serious API integrations (Google Workspace, QuickBooks, Hotmart, MikroTik, n8n) and programmatic SEO at scale — paired with an AI-augmented workflow (Claude Code, Cursor) that lets me ship faster without skipping review.",
        "I've worked with US companies (Level60 Consulting · Nashville, EyeUniversal · San José) and led the technical team at Ovy.so for five years, migrating a PHP monolith to Laravel + Vue/Inertia, building a PWA, and shipping a Google Workspace integration.",
        'I also spent three years as a software-development instructor for ADSO at SENA, teaching Git, PHP/Laravel and CI/CD. Mentoring junior devs and sharing what I learn is still part of how I work.',
        'Now I split my time between client contracts and my own products (Ultti, Malta Pharmacy Empire, mkdn). Available for remote contracts, Laravel performance audits, and product collaborations.',
      ];

  return (
    <section
      id="about"
      className="py-20 lg:py-32 border-b"
      style={{ borderColor: 'var(--rule)' }}
    >
      <div className="max-w-[68rem] mx-auto px-6 lg:px-12">
        <p
          className="font-mono text-xs tracking-widest uppercase mb-12"
          style={{ color: 'var(--accent)' }}
        >
          {label}
        </p>

        <div className="max-w-prose mx-auto">
          {/* Pull quote */}
          <blockquote
            className="font-display italic text-ink mb-12 border-l-2 pl-6"
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              borderColor: 'var(--accent)',
              lineHeight: 1.3,
            }}
          >
            {pullQuote}
          </blockquote>

          {/* Body paragraphs */}
          <div className="flex flex-col gap-6">
            {body.map((para, i) => (
              <p key={i} className="font-body text-ink-soft leading-[1.75]">
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

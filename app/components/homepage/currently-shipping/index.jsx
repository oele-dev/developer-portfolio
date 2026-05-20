import Image from 'next/image';
import ultti from '/public/image/ultti.jpg';

export default function CurrentlyShipping({ locale }) {
  const isEs = locale === 'es';

  const label       = isEs ? '01 — EN PRODUCCIÓN' : '01 — CURRENTLY SHIPPING';
  const title       = 'Ultti';
  const subtitle    = isEs
    ? 'Comercio WhatsApp multi-tenant para LATAM'
    : 'Multi-tenant WhatsApp commerce for LATAM';
  const description = isEs
    ? 'Plataforma para negocios de domicilio en LATAM (licorerías, cocinas ocultas, farmacias). Cada tenant tiene catálogo bajo {slug}.ultti.co, checkout por WhatsApp, panel de operador y métodos de pago por tenant (Nequi, Daviplata, Bre-B). Un solo backend en Supabase con RLS por negocio.'
    : 'A platform for delivery businesses (liquor stores, dark kitchens, pharmacies). Each tenant gets a branded catalog under {slug}.ultti.co, a WhatsApp checkout, an operator panel and per-tenant payment methods (Nequi, Daviplata, Bre-B). Single Supabase backend with RLS scoped per business.';
  const metricUnit  = isEs ? 'tenants en producción' : 'tenants live';
  const cta         = isEs ? 'Ver ultti.co →' : 'See ultti.co →';

  return (
    <section
      id="shipping"
      className="py-20 lg:py-32 border-b"
      style={{ borderColor: 'var(--rule)' }}
    >
      <div className="max-w-[68rem] mx-auto px-6 lg:px-12">
        {/* Section label */}
        <p
          className="font-mono text-xs tracking-widest uppercase mb-8"
          style={{ color: 'var(--accent)' }}
        >
          {label}
        </p>

        {/* Full-width image */}
        <div
          className="relative w-full aspect-video border mb-10 overflow-hidden"
          style={{ borderColor: 'var(--rule)' }}
        >
          <Image
            src={ultti}
            alt="Ultti platform screenshot"
            fill
            className="object-cover"
            sizes="(max-width: 1088px) 100vw, 1088px"
          />
        </div>

        {/* Two-col info grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Left: title + description */}
          <div className="lg:col-span-7">
            <h2 className="font-display text-ink mb-2" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              {title}
            </h2>
            <p className="font-mono text-xs tracking-widest uppercase text-ink-soft mb-4">
              {subtitle}
            </p>
            <p className="font-body text-ink-soft leading-relaxed">
              {description}
            </p>
          </div>

          {/* Right: metric + CTA */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div>
              <span
                className="font-display italic block"
                style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', color: 'var(--ink)', lineHeight: 1 }}
              >
                2
              </span>
              <span className="font-mono text-xs tracking-widest uppercase text-ink-soft">
                {metricUnit}
              </span>
            </div>

            <a
              href="https://ultti.co"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline font-mono text-xs tracking-widest uppercase text-ink self-start"
            >
              {cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

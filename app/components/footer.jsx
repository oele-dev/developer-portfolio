'use client';

import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const locale = pathname.startsWith('/es') ? 'es' : 'en';

  const shipping  = locale === 'es' ? 'ENVIANDO DESDE BOGOTÁ' : 'SHIPPING FROM BOGOTÁ';
  const available = locale === 'es' ? 'DISPONIBLE PARA TRABAJO REMOTO' : 'AVAILABLE FOR REMOTE WORK';

  return (
    <footer
      className="border-t py-10"
      style={{ borderColor: 'var(--rule)' }}
    >
      <div className="max-w-[68rem] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6">
          {/* Left */}
          <p className="font-mono text-xs tracking-widest text-ink-soft uppercase">
            {shipping}
          </p>

          {/* Center — Roman numeral year */}
          <p className="font-display italic text-2xl text-ink text-center">
            MMXXVI
          </p>

          {/* Right */}
          <p className="font-mono text-xs tracking-widest text-ink-soft uppercase md:text-right flex md:justify-end items-center gap-2">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full blink-dot"
              style={{ backgroundColor: 'var(--accent)' }}
            />
            {available}
          </p>
        </div>
      </div>
    </footer>
  );
}

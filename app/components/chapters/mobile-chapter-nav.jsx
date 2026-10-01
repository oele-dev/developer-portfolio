'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { NAV_CHAPTERS } from '@/utils/data/chapters';
import { CHAPTER_CHANGE } from './events';

// Bottom pill on mobile: shows the current chapter and opens a jump menu, thumb-reachable.
export default function MobileChapterNav() {
  const t = useTranslations('nav');
  const [active, setActive] = useState('intro');
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    const onChapter = (e) => setActive(e.detail.id);
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const onClick = (e) => !rootRef.current?.contains(e.target) && setOpen(false);
    addEventListener(CHAPTER_CHANGE, onChapter);
    addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => {
      removeEventListener(CHAPTER_CHANGE, onChapter);
      removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
    };
  }, []);

  const current = NAV_CHAPTERS.find((c) => c.id === active);

  return (
    <div ref={rootRef} className="md:hidden fixed left-1/2 bottom-4 -translate-x-1/2 z-50">
      <nav
        id="chapter-menu"
        aria-label={t('label')}
        className={`chap-menu absolute bottom-[calc(100%+8px)] left-1/2 min-w-[220px] p-1.5 rounded-[22px] bg-[color-mix(in_srgb,var(--surface)_96%,transparent)] border border-rule shadow-soft backdrop-blur-md ${open ? 'is-open' : ''}`}
      >
        {NAV_CHAPTERS.map((c) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            onClick={() => setOpen(false)}
            aria-current={active === c.id}
            className="group flex items-center gap-2.5 min-h-[44px] px-3.5 rounded-2xl no-underline text-ink-body aria-[current=true]:text-ink aria-[current=true]:bg-[color-mix(in_srgb,var(--ink)_7%,transparent)]"
          >
            <b className="font-semibold tabular-nums text-ink-soft group-aria-[current=true]:text-accent">{c.number}</b>
            {t(c.id)}
          </a>
        ))}
      </nav>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="chapter-menu"
        onClick={() => setOpen((v) => !v)}
        className="chap-btn inline-flex items-center gap-2.5 min-h-[44px] px-[18px] rounded-full whitespace-nowrap text-[15px] bg-[color-mix(in_srgb,var(--surface)_92%,transparent)] border border-rule shadow-soft backdrop-blur-md"
      >
        {current ? (
          <span>
            <b className="text-accent font-semibold tabular-nums">{current.number}</b> {t(current.id)}
          </span>
        ) : (
          <span>{t('label')}</span>
        )}
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M3 7.5 6 4.5l3 3" />
        </svg>
      </button>
    </div>
  );
}

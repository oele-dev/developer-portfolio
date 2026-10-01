'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { NAV_CHAPTERS } from '@/utils/data/chapters';
import { CAMERA_STATE, CHAPTER_CHANGE, SCULPTURE_READY, TOGGLE_CAMERA, emit } from './events';

export default function SiteHeader({ locale }) {
  const t = useTranslations('nav');
  const [active, setActive] = useState('intro');
  const [camReady, setCamReady] = useState(false);
  const [camOn, setCamOn] = useState(false);
  const [tried, setTried] = useState(false);

  useEffect(() => {
    const onChapter = (e) => setActive(e.detail.id);
    const onReady = () => setCamReady(true);
    const onCamera = (e) => setCamOn(e.detail.on);
    addEventListener(CHAPTER_CHANGE, onChapter);
    addEventListener(SCULPTURE_READY, onReady);
    addEventListener(CAMERA_STATE, onCamera);
    return () => {
      removeEventListener(CHAPTER_CHANGE, onChapter);
      removeEventListener(SCULPTURE_READY, onReady);
      removeEventListener(CAMERA_STATE, onCamera);
    };
  }, []);

  const switchLocale = (target) => (e) => {
    e.preventDefault();
    document.cookie = `NEXT_LOCALE=${target}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    window.location.href = target === 'es' ? '/es' : '/';
  };
  const other = locale === 'es' ? 'en' : 'es';

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center gap-6 max-md:gap-2.5 px-[clamp(16px,5vw,64px)] py-3.5 max-md:px-4 max-md:py-2.5 bg-gradient-to-b from-[color-mix(in_srgb,var(--paper)_90%,transparent)] to-transparent">
      <a href="#intro" aria-label={t('backToTop')} className="inline-flex items-center min-h-[40px] font-bold text-base whitespace-nowrap no-underline">
        <span className="logo-name">
          <span>
            Osmell Caicedo<i className="not-italic font-normal text-ink-soft mx-2.5">|</i>
          </span>
        </span>
        oele<span className="text-accent">.dev</span>
      </a>

      <nav aria-label={t('label')} className="hidden md:flex gap-1 ml-auto">
        {NAV_CHAPTERS.map((c) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            aria-current={active === c.id}
            className="toc-link inline-flex items-center min-h-[40px] px-3.5 rounded-full text-[15px] text-ink-soft no-underline transition-colors hover:text-ink aria-[current=true]:text-ink aria-[current=true]:bg-[color-mix(in_srgb,var(--ink)_7%,transparent)]"
          >
            {t(c.id)}
          </a>
        ))}
      </nav>

      <a
        href={other === 'es' ? '/es' : '/'}
        onClick={switchLocale(other)}
        hrefLang={other}
        className="max-md:ml-auto inline-flex items-center min-h-[40px] max-md:min-h-[44px] px-2 text-sm text-ink-soft hover:text-ink uppercase tracking-wide"
      >
        {other}
      </a>

      {camReady && (
        <button
          type="button"
          aria-pressed={camOn}
          onClick={() => {
            setTried(true);
            emit(TOGGLE_CAMERA);
          }}
          className={`cam js-3d-only inline-flex items-center min-h-[40px] max-md:min-h-[44px] px-4 rounded-full whitespace-nowrap text-[15px] max-md:text-sm border transition-[color,border-color,transform] duration-200 active:scale-[0.96] hover:border-accent aria-pressed:text-accent aria-pressed:border-accent ${
            tried ? 'is-tried border-rule' : 'border-[color-mix(in_srgb,var(--accent)_45%,transparent)]'
          }`}
        >
          {camOn ? t('cameraOn') : tried ? t('cameraOff') : t('camera')}
        </button>
      )}
    </header>
  );
}

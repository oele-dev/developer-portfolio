'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { SCULPTURE_FPS, SCULPTURE_READY } from './events';

// Only renders once the sculpture is running, so it never claims particles that aren't there.
export default function ProofCard() {
  const t = useTranslations('craft');
  const [count, setCount] = useState(null);
  const [fps, setFps] = useState(60);

  useEffect(() => {
    const onReady = (e) => setCount(e.detail.count);
    const onFps = (e) => setFps(e.detail.fps);
    addEventListener(SCULPTURE_READY, onReady);
    addEventListener(SCULPTURE_FPS, onFps);
    return () => {
      removeEventListener(SCULPTURE_READY, onReady);
      removeEventListener(SCULPTURE_FPS, onFps);
    };
  }, []);

  if (count == null) return null;

  const num = (chunks) => <span className="text-accent tabular-nums">{chunks}</span>;
  return (
    <p className="mt-7 px-[18px] py-4 border border-rule rounded-surface bg-[color-mix(in_srgb,var(--ink)_3%,transparent)] text-[15px] leading-relaxed text-ink-body [&_strong]:text-ink [&_strong]:font-semibold">
      {t.rich('proof', {
        strong: (c) => <strong>{c}</strong>,
        count: num(count.toLocaleString('en')),
        fps: num(fps),
      })}
    </p>
  );
}

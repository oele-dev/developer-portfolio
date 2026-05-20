'use client';

import { useEffect, useRef } from 'react';

const ROTATIONS = {
  en: ['👋 come back', '⏳ still shipping', 'hola@oele.dev'],
  es: ['👋 vuelve', '⏳ aún shippeando', 'hola@oele.dev'],
};

export default function TitlePulse({ locale }) {
  const originalRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const messages = ROTATIONS[locale] || ROTATIONS.en;
    let idx = 0;

    const stop = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    const onVis = () => {
      if (document.visibilityState === 'hidden') {
        if (!originalRef.current) originalRef.current = document.title;
        idx = 0;
        intervalRef.current = setInterval(() => {
          document.title = messages[idx % messages.length];
          idx += 1;
        }, 2500);
      } else {
        stop();
        if (originalRef.current) document.title = originalRef.current;
      }
    };

    document.addEventListener('visibilitychange', onVis);
    return () => {
      document.removeEventListener('visibilitychange', onVis);
      stop();
    };
  }, [locale]);

  return null;
}

'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'react-toastify';
import { CAMERA_STATE, CHAPTER_CHANGE, SCULPTURE_FPS, SCULPTURE_READY, TOGGLE_CAMERA, emit } from './events';

// Loads the Three.js engine only once the browser is idle, so text paints first.
// Any failure (no WebGL, chunk error) just removes the art; the page keeps working.
export default function Sculpture() {
  const t = useTranslations('sculpture');

  useEffect(() => {
    let engine = null;
    let cancelled = false;
    const canvas = document.getElementById('stage');

    const onChapter = (e) => engine?.setChapter(e.detail.id);
    const onToggle = () => engine?.toggleCamera();

    const start = async () => {
      try {
        const { createSculpture } = await import('./sculpture-engine');
        if (cancelled) return;
        engine = createSculpture(canvas, {
          onReady: (count) => emit(SCULPTURE_READY, { count }),
          onFps: (fps) => emit(SCULPTURE_FPS, { fps }),
          onCamera: (on) => emit(CAMERA_STATE, { on }),
          onToast: (key) => toast(t(key)),
        });
        engine.setChapter(document.body.dataset.chapter || 'intro');
      } catch (err) {
        console.warn('3D sculpture disabled:', err);
        document.body.classList.add('no-3d');
      }
    };

    addEventListener(CHAPTER_CHANGE, onChapter);
    addEventListener(TOGGLE_CAMERA, onToggle);
    const idle = window.requestIdleCallback ?? ((cb) => setTimeout(cb, 200));
    const cancelIdle = window.cancelIdleCallback ?? clearTimeout;
    const handle = idle(start);

    return () => {
      cancelled = true;
      cancelIdle(handle);
      removeEventListener(CHAPTER_CHANGE, onChapter);
      removeEventListener(TOGGLE_CAMERA, onToggle);
      engine?.dispose();
    };
  }, [t]);

  return null;
}

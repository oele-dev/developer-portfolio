'use client';

import { useEffect, useRef } from 'react';
import { CHAPTERS } from '@/utils/data/chapters';
import { CHAPTER_CHANGE, emit, track } from './events';

// Marks the chapter crossing the middle of the viewport as current, and drives the reading bar.
export default function ChapterObserver({ scrollLabel }) {
  const barRef = useRef(null);
  const hintRef = useRef(null);

  useEffect(() => {
    let current = null;
    const narrow = matchMedia('(max-width: 767px)');

    const setChapter = (id) => {
      if (id === current) return;
      current = id;
      const chapter = CHAPTERS.find((c) => c.id === id);
      document.body.dataset.chapter = id;
      document.body.dataset.side = narrow.matches ? 'right' : chapter.side;
      emit(CHAPTER_CHANGE, { id });
      track('chapter_view', { chapter: id });
    };

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setChapter(e.target.id)),
      { rootMargin: '-45% 0px -45% 0px' },
    );
    CHAPTERS.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) observer.observe(el);
    });

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      if (barRef.current) barRef.current.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
      if (hintRef.current) hintRef.current.style.opacity = scrollY > 40 ? 0 : 1;
    };
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <>
      <div ref={barRef} className="read-progress" aria-hidden="true" />
      <p
        ref={hintRef}
        className="scroll-hint fixed left-[clamp(16px,5vw,64px)] bottom-7 z-[5] hidden md:flex items-center gap-2.5 text-sm text-ink-soft pointer-events-none transition-opacity duration-[400ms]"
        aria-hidden="true"
      >
        <i />
        {scrollLabel}
      </p>
    </>
  );
}

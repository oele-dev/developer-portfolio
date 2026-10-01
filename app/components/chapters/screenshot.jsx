import Image from 'next/image';

// Native <details>: keyboard accessible, works without JS, and next/image only loads once opened.
export default function Screenshot({ shot, alt, label }) {
  return (
    <details className="shot mt-1.5">
      <summary className="inline-flex items-center gap-1.5 min-h-[32px] max-md:min-h-[44px] text-sm text-ink-soft hover:text-ink transition-colors">
        {label}
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M3 4.5 6 7.5l3-3" />
        </svg>
      </summary>
      <Image
        src={shot.src}
        width={shot.width}
        height={shot.height}
        alt={alt}
        sizes="(max-width: 767px) 92vw, 560px"
        className="mt-1.5 w-full h-auto rounded-surface outline outline-1 -outline-offset-1 outline-black/10"
      />
    </details>
  );
}

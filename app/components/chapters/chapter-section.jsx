// One chapter of the page. The hero carries the only <h1>; chapters use <h2> styled the same.
export default function ChapterSection({ id, number, label, headline, lede, flip = false, hero = false, children }) {
  const Heading = hero ? 'h1' : 'h2';

  return (
    <section
      id={id}
      aria-labelledby={`h-${id}`}
      className={`chapter${flip ? ' chapter--flip' : ''}`}
    >
      <div className="chapter-copy w-full max-w-copy">
        <p className="text-sm text-ink-soft mb-[18px]">
          {number && <b className="text-accent font-semibold mr-2.5 tabular-nums">{number}</b>}
          {label}
        </p>
        <Heading
          id={`h-${id}`}
          className={`font-semibold [text-wrap:balance] [&_em]:not-italic [&_em]:text-accent ${
            hero
              ? 'text-[clamp(44px,6.4vw,76px)] leading-none tracking-[-0.03em]'
              : 'text-[clamp(36px,4.4vw,54px)] leading-[1.04] tracking-[-0.025em]'
          }`}
        >
          {headline}
        </Heading>
        {lede && (
          <p className="mt-[22px] text-[clamp(17px,1.35vw,19px)] leading-relaxed text-ink-body max-w-[54ch] [text-wrap:pretty]">
            {lede}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}

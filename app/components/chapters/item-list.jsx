import Screenshot from './screenshot';

const STATUS_STYLES = {
  live: 'bg-accent text-on-accent',
  beta: 'border border-rule text-ink-body',
  client: 'border border-dashed border-rule text-ink-body',
};

// Shared list for experience, projects and principles: title row, short body, optional status and screenshot.
export default function ItemList({ items, screenshotLabel, className = '' }) {
  return (
    <ul className={`list-none ${className}`}>
      {items.map((item) => (
        <li key={item.key} className="py-3.5 border-t border-rule last:border-b leading-[1.55]">
          <div className="flex justify-between items-baseline gap-3 font-semibold">
            {item.url ? (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-[color-mix(in_srgb,var(--accent)_60%,transparent)] underline-offset-4 hover:text-accent transition-colors max-md:inline-block max-md:py-[9px] max-md:-my-[9px]"
              >
                {item.title}
              </a>
            ) : (
              <span>{item.title}</span>
            )}
            {item.meta && <span className="text-sm text-ink-soft font-normal whitespace-nowrap tabular-nums">{item.meta}</span>}
            {item.status && (
              <span className={`self-center text-sm font-medium whitespace-nowrap rounded-full px-[9px] py-0.5 ${STATUS_STYLES[item.status]}`}>
                {item.statusLabel}
              </span>
            )}
          </div>
          {item.body && <p className="mt-[3px] text-[15px] text-ink-body [text-wrap:pretty] [&_strong]:text-ink [&_strong]:font-semibold [&_a]:underline [&_a]:decoration-[color-mix(in_srgb,var(--accent)_60%,transparent)] [&_a]:underline-offset-[3px]">{item.body}</p>}
          {item.screenshot && <Screenshot shot={item.screenshot} alt={item.alt} label={screenshotLabel} />}
        </li>
      ))}
    </ul>
  );
}

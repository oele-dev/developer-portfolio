'use client';

import { personalData } from '@/utils/data/personal-data';

const [user, domain] = personalData.emailParts;
export const OBFUSCATED_EMAIL = `${user} [at] ${domain.replaceAll('.', ' [dot] ')}`;

// The real address never reaches the DOM, not even after hydration: scrapers that run JS
// would read an href or text node. The mailto is built only when someone clicks.
export default function ProtectedEmail({ children, fallbackHref = '#next', subject, className, style }) {
  const open = (e) => {
    e.preventDefault();
    const query = subject ? `?subject=${encodeURIComponent(subject)}` : '';
    window.location.href = `mailto:${user}@${domain}${query}`;
  };

  return (
    <a href={fallbackHref} onClick={open} className={className} style={style}>
      {children ?? OBFUSCATED_EMAIL}
    </a>
  );
}

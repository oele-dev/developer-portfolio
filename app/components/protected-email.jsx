'use client';

import { useEffect, useState } from 'react';
import { personalData } from '@/utils/data/personal-data';

const [user, domain] = personalData.emailParts;
const OBFUSCATED = `${user} [at] ${domain.replaceAll('.', ' [dot] ')}`;

// Joined after mount so the address never lands in the SSR HTML or the RSC payload,
// where regex harvesters read it. Without JS, the link falls back to `fallbackHref`.
export default function ProtectedEmail({ children, fallbackHref, className, style }) {
  const [email, setEmail] = useState(null);

  useEffect(() => {
    setEmail(`${user}@${domain}`);
  }, []);

  return (
    <a
      href={email ? `mailto:${email}` : fallbackHref}
      className={className}
      style={style}
    >
      {children ?? email ?? OBFUSCATED}
    </a>
  );
}

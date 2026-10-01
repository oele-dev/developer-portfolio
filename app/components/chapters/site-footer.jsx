import { useTranslations } from 'next-intl';

export default function SiteFooter() {
  const t = useTranslations('footer');

  return (
    <footer className="relative z-[2] border-t border-rule px-[clamp(16px,5vw,64px)] py-8 max-md:pb-24 flex flex-wrap items-center justify-between gap-4 text-sm text-ink-soft">
      <p>{t('line')}</p>
      <a href="/llms.txt" className="hover:text-ink underline decoration-rule underline-offset-4">
        {t('forAgents')}
      </a>
    </footer>
  );
}

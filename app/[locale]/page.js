import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import ChapterSection from '@/app/components/chapters/chapter-section';
import ItemList from '@/app/components/chapters/item-list';
import ProofCard from '@/app/components/chapters/proof-card';
import ContactForm from '@/app/components/chapters/contact-form';
import ProtectedEmail from '@/app/components/protected-email';
import { CHAPTERS } from '@/utils/data/chapters';
import { experiences } from '@/utils/data/experience';
import { projectsByChapter } from '@/utils/data/projects-data';
import { personalData } from '@/utils/data/personal-data';
import { tField } from '@/utils/i18n-helper';

const BTN = 'inline-flex items-center min-h-[44px] px-5 rounded-full font-semibold text-[15px] no-underline border transition-[transform,background-color,border-color] active:scale-[0.96]';
const BTN_PRIMARY = `${BTN} bg-ink text-paper border-transparent hover:bg-[color-mix(in_srgb,var(--ink)_85%,var(--paper))]`;
const BTN_GHOST = `${BTN} border-rule hover:border-[color-mix(in_srgb,var(--ink)_35%,transparent)]`;
const H3 = 'text-base font-semibold text-ink mt-10 mb-2';

const chapter = (id) => CHAPTERS.find((c) => c.id === id);

const projectItems = (id, locale) =>
  projectsByChapter(id).map((p) => ({
    key: p.id,
    title: tField(p.name, locale),
    url: p.url,
    status: p.status,
    statusLabel: tField(p.statusLabel, locale),
    body: tField(p.summary, locale),
    screenshot: p.screenshot,
    alt: tField(p.alt, locale),
  }));

export default async function Home({ params: { locale } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations();
  const em = (c) => <em>{c}</em>;
  const strong = (c) => <strong>{c}</strong>;
  const shotLabel = t('nav.screenshot');

  const experienceItems = experiences.map((x) => ({
    key: x.id,
    title: `${x.company.split(' · ')[0]}, ${tField(x.role, locale)}`,
    meta: tField(x.years, locale).replace(' — ', '–'),
    body: tField(x.summary, locale),
    screenshot: x.screenshot,
    alt: tField(x.alt, locale),
  }));

  const principle = (key) => ({ key, title: t(`next.${key}Title`), body: t(`next.${key}`) });

  return (
    <>
      <ChapterSection
        id="intro"
        hero
        label={t('hero.eyebrow')}
        headline={t.rich('hero.headline', { em })}
        lede={t('hero.lede')}
      >
        <div className="flex flex-wrap gap-2.5 mt-[30px]">
          <ProtectedEmail fallbackHref="#next" subject="30-min call" className={BTN_PRIMARY}>
            {t('hero.ctaPrimary')}
          </ProtectedEmail>
          <a href={personalData.resume} target="_blank" rel="noopener noreferrer" className={BTN_GHOST}>
            {t('hero.ctaSecondary')}
          </a>
        </div>
      </ChapterSection>

      <ChapterSection
        id="foundation"
        flip={chapter('foundation').side === 'left'}
        number={chapter('foundation').number}
        label={t('foundation.label')}
        headline={t.rich('foundation.headline', { em })}
        lede={t('foundation.lede')}
      >
        <ul className="flex flex-wrap gap-1.5 mt-[22px]">
          {['Laravel', 'Livewire', 'Filament', 'Inertia', 'Vue 3', 'TALL', 'VILT', 'Redis + Horizon', 'MySQL'].map((s) => (
            <li key={s} className="text-sm px-[11px] py-1 border border-rule rounded-full text-ink-body">{s}</li>
          ))}
        </ul>
        <h3 className={H3}>{t('foundation.experience')}</h3>
        <ItemList items={experienceItems} screenshotLabel={shotLabel} />
        <h3 className={H3}>{t('foundation.work')}</h3>
        <ItemList items={projectItems('foundation', locale)} screenshotLabel={shotLabel} />
      </ChapterSection>

      <ChapterSection
        id="craft"
        flip={chapter('craft').side === 'left'}
        number={chapter('craft').number}
        label={t('craft.label')}
        headline={t.rich('craft.headline', { em })}
        lede={t('craft.lede')}
      >
        <h3 className={H3}>{t('craft.howIWork')}</h3>
        <ItemList
          items={[
            { key: 'performance', title: t('craft.performanceTitle'), body: t.rich('craft.performance', { strong }) },
            { key: 'agentic', title: t('craft.agenticTitle'), body: t('craft.agentic') },
            {
              key: 'ai',
              title: t('craft.aiTitle'),
              body: t.rich('craft.ai', { strong, link: (c) => <a href="/llms.txt">{c}</a> }),
            },
          ]}
        />
        <h3 className={H3}>{t('craft.tools')}</h3>
        <ItemList items={projectItems('craft', locale)} screenshotLabel={shotLabel} />
        <ProofCard />
      </ChapterSection>

      <ChapterSection
        id="building"
        flip={chapter('building').side === 'left'}
        number={chapter('building').number}
        label={t('building.label')}
        headline={t.rich('building.headline', { em })}
        lede={t('building.lede')}
      >
        <ItemList items={projectItems('building', locale)} screenshotLabel={shotLabel} className="mt-7" />
      </ChapterSection>

      <ChapterSection
        id="next"
        flip={chapter('next').side === 'left'}
        number={chapter('next').number}
        label={t('next.label')}
        headline={t.rich('next.headline', { em })}
        lede={t('next.lede')}
      >
        <p className="mt-7 pl-[18px] border-l-2 border-accent text-md tracking-[-0.01em] text-ink [text-wrap:balance]">
          {t('next.quote')}
        </p>
        <ItemList items={['return', 'teams', 'teach'].map(principle)} className="mt-7" />

        <div className="mt-10">
          <ProtectedEmail className="text-md font-semibold text-ink underline decoration-[color-mix(in_srgb,var(--accent)_60%,transparent)] underline-offset-4 hover:text-accent transition-colors" />
          <p className="mt-2 text-[15px] text-ink-body">{t('next.contactBlurb')}</p>
          <div className="flex flex-wrap gap-2.5 mt-5">
            {[
              { label: 'LinkedIn', href: personalData.linkedIn },
              { label: 'GitHub', href: personalData.github },
              { label: 'X', href: personalData.twitter },
              ...(personalData.youtube ? [{ label: 'YouTube', href: personalData.youtube }] : []),
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className={BTN_GHOST}>
                {s.label}
              </a>
            ))}
          </div>
          <ContactForm />
        </div>
      </ChapterSection>
    </>
  );
}

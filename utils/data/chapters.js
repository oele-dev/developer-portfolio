// Shared by the page, the navigation and the 3D sculpture.
// side: where the sculpture sits on desktop; the copy takes the other side.
// depth/wave/push/alpha/scale: sculpture motion per chapter (hero is the star, chapters step back).
export const CHAPTERS = [
  { id: 'intro',      number: null, side: 'right', depth: 0.6,  wave: 0.8, push: 0.18, alpha: 1,    scale: 1 },
  { id: 'foundation', number: '01', side: 'left',  depth: 0.5,  wave: 0.5, push: 0.12, alpha: 0.6,  scale: 0.8 },
  { id: 'craft',      number: '02', side: 'right', depth: 0.4,  wave: 1.8, push: 0.08, alpha: 0.6,  scale: 0.8 },
  { id: 'building',   number: '03', side: 'left',  depth: 0.6,  wave: 1.1, push: 0.2,  alpha: 0.6,  scale: 0.8 },
  { id: 'next',       number: '04', side: 'right', depth: 0.55, wave: 0.4, push: 0.12, alpha: 0.65, scale: 0.85 },
];

export const NAV_CHAPTERS = CHAPTERS.filter((c) => c.number);

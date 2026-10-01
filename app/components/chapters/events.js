// DOM events let server-rendered chapters and independent client islands (header, mobile nav,
// sculpture) coordinate without a shared React provider. None of them imports another.
export const CHAPTER_CHANGE = 'chapter:change';          // detail: { id }
export const TOGGLE_CAMERA = 'sculpture:toggle-camera';  // no detail
export const CAMERA_STATE = 'sculpture:camera';          // detail: { on }
export const SCULPTURE_READY = 'sculpture:ready';        // detail: { count }
export const SCULPTURE_FPS = 'sculpture:fps';            // detail: { fps }

export const emit = (name, detail) => window.dispatchEvent(new CustomEvent(name, { detail }));

// Analytics: GTM already listens to window.dataLayer. Each chapter is reported once per visit.
const reported = new Set();
export const track = (event, params = {}) => {
  const key = `${event}:${JSON.stringify(params)}`;
  if (reported.has(key)) return;
  reported.add(key);
  (window.dataLayer = window.dataLayer || []).push({ event, ...params });
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        paper:       'var(--paper)',
        surface:     'var(--surface)',
        ink:         'var(--ink)',
        'ink-body':  'var(--ink-body)',
        'ink-soft':  'var(--ink-soft)',
        rule:        'var(--rule)',
        accent:      'var(--accent)',
        'on-accent': 'var(--on-accent)',
      },
      fontFamily: {
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      // Type scale: 17px base, perfect fourth (1.333)
      fontSize: {
        sm:   ['13px', { lineHeight: '1.5' }],
        base: ['17px', { lineHeight: '1.6' }],
        md:   ['22.7px', { lineHeight: '1.3' }],
      },
      borderRadius: {
        surface: '12px',
      },
      boxShadow: {
        soft: 'var(--shadow)',
      },
      transitionTimingFunction: {
        out: 'var(--ease-out)',
      },
      maxWidth: {
        copy: '560px',
      },
    },
  },
  plugins: [],
};

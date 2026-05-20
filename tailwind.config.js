/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        paper:    'var(--paper)',
        ink:      'var(--ink)',
        'ink-soft': 'var(--ink-soft)',
        rule:     'var(--rule)',
        accent:   'var(--accent)',
        'paper-2': 'var(--paper-2)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body:    ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        prose: '40rem',
      },
    },
  },
  plugins: [],
};

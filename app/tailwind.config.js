/** Design tokens live in src/index.css (:root). Tailwind only maps names to them. */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: 'var(--paper)',
        ink: 'var(--ink)',
        accent: 'var(--accent)',
        'on-accent': 'var(--on-accent)',
        blue: 'var(--blue)',
        lime: 'var(--lime)',
        blush: 'var(--blush)',
        mute: 'var(--mute)',
        line: 'var(--line)',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"DM Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      spacing: { gutter: 'var(--gutter)' },
      transitionTimingFunction: { snap: 'cubic-bezier(.76,0,.24,1)' },
    },
  },
  plugins: [],
}

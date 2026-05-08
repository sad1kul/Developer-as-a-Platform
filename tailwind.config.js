/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        'bg-main': '#040a14',
        'bg-surface': '#0a1728',
        'bg-soft': '#0f2036',
        'border-soft': '#1c3149',
        'border-active': '#1d9369',
        'text-main': '#e5edf6',
        'text-muted': '#91a5bf',
        emerald: '#21d28a',
        cyan: '#47bfd9',
        purple: '#8f82ff',
        warning: '#e7b85a',
        danger: '#f46f6f'
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'SFMono-Regular', 'Menlo', 'Monaco', 'monospace']
      },
      boxShadow: {
        soft: '0 8px 40px rgba(2, 12, 28, 0.42)',
        active: '0 0 0 1px rgba(33, 210, 138, 0.5), 0 12px 28px rgba(5, 24, 43, 0.45)'
      },
      backgroundImage: {
        'grid-fade':
          'radial-gradient(circle at top right, rgba(71, 191, 217, 0.12), transparent 45%), radial-gradient(circle at bottom left, rgba(33, 210, 138, 0.1), transparent 44%)'
      }
    }
  },
  plugins: []
};

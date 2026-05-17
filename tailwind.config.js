/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        // Antigravity palette
        'portfolio-bg': '#0B111A',
        'portfolio-panel': '#151C25',
        'portfolio-border': '#202D3A',
        'portfolio-border-active': '#273C4B',
        'portfolio-accent': '#10B981',
        'portfolio-secondary': '#0EA5E9',
        'portfolio-warning': '#F59E0B',
        'portfolio-danger': '#EF4444',
        'portfolio-text': '#F3F4F6',
        'portfolio-muted': '#9CA3AF',

        // Backward-compatible aliases used across current templates
        'bg-main': '#0B111A',
        'bg-surface': '#151C25',
        'bg-soft': '#151C25',
        'border-soft': '#202D3A',
        'border-active': '#273C4B',
        'text-main': '#F3F4F6',
        'text-muted': '#9CA3AF',
        emerald: '#10B981',
        cyan: '#0EA5E9',
        purple: '#8B5CF6',
        warning: '#F59E0B',
        danger: '#EF4444'
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'sans-serif'],
        mono: ['Fira Code', 'Menlo', 'monospace']
      },
      boxShadow: {
        soft: '0 8px 40px rgba(2, 12, 28, 0.42)',
        active: '0 0 0 1px rgba(16, 185, 129, 0.45), 0 12px 28px rgba(5, 24, 43, 0.45)'
      },
      backgroundImage: {
        'grid-fade':
          'radial-gradient(circle at top right, rgba(14, 165, 233, 0.12), transparent 45%), radial-gradient(circle at bottom left, rgba(16, 185, 129, 0.08), transparent 44%)'
      }
    }
  },
  plugins: []
};

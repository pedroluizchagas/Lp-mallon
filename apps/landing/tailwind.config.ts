import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Brand primaries — espelham o design system do app
        'dark':        '#18181b',   // superfície escura (navbar, footer, hero dark)
        'dark-2':      '#1d1d1b',   // variante levemente mais clara
        'lime':        '#c1f148',   // CTA / accent principal (brick do app)
        'lime-dark':   '#a3d22a',   // hover do lime
        'lime-ink':    '#18181b',   // texto sobre fundo lime
        'accent':      '#4CAF82',   // verde secundário (trust signals, checks)
        // Superfícies claras
        'surface':     '#f6f6f3',   // fundo de página (substitui creme)
        'surface-alt': '#ededea',   // fundo de seções alternadas
        // Texto
        'ink':         '#0f0f0d',   // texto primário
        'ink-2':       '#4a4a46',   // texto secundário
        'ink-3':       '#8a8a84',   // texto muto
      },
      fontFamily: {
        jakarta: ['var(--font-jakarta)', 'sans-serif'],
        inter:   ['var(--font-inter)', 'sans-serif'],
      },
      animation: {
        'fade-in-up':      'fadeInUp 0.6s ease-out forwards',
        'fade-in':         'fadeIn 0.5s ease-out forwards',
        'float':           'float 3s ease-in-out infinite',
        'pulse-slow':      'pulse 3s ease-in-out infinite',
        'marquee':         'marquee 30s linear infinite',
        'marquee-reverse': 'marqueeReverse 25s linear infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeReverse: {
          '0%':   { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      screens: {
        xs: '375px',
      },
    },
  },
  plugins: [],
}

export default config

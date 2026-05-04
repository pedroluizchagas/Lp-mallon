import type { Config } from 'tailwindcss'

const preset: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        'dark':        '#18181b',
        'dark-2':      '#1d1d1b',
        'lime':        '#c1f148',
        'lime-dark':   '#a3d22a',
        'lime-ink':    '#18181b',
        'accent':      '#4CAF82',
        'surface':     '#f6f6f3',
        'surface-alt': '#ededea',
        'ink':         '#0f0f0d',
        'ink-2':       '#4a4a46',
        'ink-3':       '#8a8a84',
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
}

module.exports = preset

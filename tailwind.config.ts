import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        soft: '0 8px 30px rgba(0,0,0,0.06)',
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': '#18181b',
            '--tw-prose-headings': '#09090b',
            '--tw-prose-links': '#18181b',
            '--tw-prose-bold': '#09090b',
            '--tw-prose-hr': '#e4e4e7',
            '--tw-prose-quote-borders': '#e4e4e7',
            '--tw-prose-captions': '#52525b',
            '--tw-prose-code': '#18181b',
            '--tw-prose-pre-bg': '#09090b',
            a: { textDecoration: 'underline', textUnderlineOffset: '3px' },
            code: { backgroundColor: '#f4f4f5', padding: '0.2em 0.35em', borderRadius: '0.5rem' },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
          },
        },
        invert: {
          css: {
            '--tw-prose-body': '#e4e4e7',
            '--tw-prose-headings': '#ffffff',
            '--tw-prose-links': '#ffffff',
            '--tw-prose-bold': '#ffffff',
            '--tw-prose-hr': '#27272a',
            '--tw-prose-quote-borders': '#27272a',
            '--tw-prose-captions': '#a1a1aa',
            '--tw-prose-code': '#e4e4e7',
            '--tw-prose-pre-bg': '#0a0a0b',
            code: { backgroundColor: '#18181b' },
          },
        },
      },
    },
  },
  plugins: [typography],
}

export default config
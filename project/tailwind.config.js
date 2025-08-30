/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        cyan: {
          400: '#00D9FF',
          500: '#00B8CC',
        },
        green: {
          400: '#39FF14',
          500: '#32CD32',
        },
        purple: {
          400: '#8B5CF6',
          500: '#7C3AED',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      perspective: {
        '1000': '1000px',
      }
    },
  },
  plugins: [],
};
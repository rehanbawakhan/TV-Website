/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          orange: '#FF6B35',
          orangeDark: '#FF4500',
          black: '#181818',
          gray: '#1A1A1A',
          white: '#FFFFFF',
        },
        accent: {
          gold: '#FFD580',
          blue: '#00B7EB',
          purple: '#8b5cf6',
          pink: '#FF5EAE',
          darkGray: '#2D2D2D',
        }
      },
      backgroundImage: {
        'gradient-orange': 'linear-gradient(135deg, #FF6B35 0%, #FF4500 100%)',
        'gradient-black': 'linear-gradient(135deg, #181818 0%, #1A1A1A 100%)',
        'gradient-orange-black': 'linear-gradient(135deg, #FF6B35 0%, #181818 100%)',
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
      },
      fontFamily: {
        sans: ['Josefin Sans', 'Inter', 'sans-serif'],
        heading: ['League Gothic', 'Josefin Sans', 'Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      animation: {
        'bounce-slow': 'bounce 3s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #FF6B35, 0 0 10px #FF6B35, 0 0 15px #FF6B35' },
          '100%': { boxShadow: '0 0 20px #FF6B35, 0 0 30px #FF6B35, 0 0 40px #FF6B35' },
        }
      }
    },
  },
  plugins: [],
}
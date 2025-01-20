const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: { DEFAULT: '1280px' }
    },

    extend: {
      // Custom font families
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],
        serif: ['Merriweather', ...defaultTheme.fontFamily.serif],
      },

      // Full original color palette with enhancements
      colors: {
        primary: {
          DEFAULT: "#943E3C",
          foreground: "#F5F5F5",
          50: '#fdf2f2',
          100: '#fde8e8',
          200: '#fbd5d5',
          300: '#f8b4b4',
          400: '#f98080',
          500: "#943E3C",
          600: '#e02424',
          700: '#c81e1e',
          800: '#9b1c1c',
          900: '#771d1d'
        },
        secondary: {
          DEFAULT: "#4A5D4F",
          foreground: "#F5F5F5",
          50: '#f3faf4',
          100: '#def7e0',
          200: '#bcf0c5',
          300: '#8be29b',
          400: '#4A5D4F',
          500: "#4A5D4F",
          600: '#2f8c3c',
          700: '#276f31',
          800: '#1f5627',
          900: '#1a481f'
        },
        accent: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        dark: {
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
          contrast: '#E5E7EB' 
        },
        success: colors.green,
        warning: colors.amber,
        error: colors.red,
        info: colors.blue,
      },

      // Extended breakpoints
      screens: {
        '3xl': '1920px',
        'short': { 'raw': '(max-height: 620px)' },
        ...defaultTheme.screens
      },

      // Original animations with enhancements
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.2s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },

      // Enhanced shadows and gradients
      boxShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'depth': '0 8px 30px rgba(0,0,0,0.12)',
      },
      backgroundImage: {
        'gradient-subtle': 'linear-gradient(to right, var(--tw-gradient-stops))',
        'gradient-radial': 'radial-gradient(circle, var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
      },

      // Original spacing with extensions
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
        '128': '32rem',
        '144': '36rem',
      },

      // Border radius
      borderRadius: {
        'xl': '1rem',
        '2xl': '2rem',
      },

      // 3D transforms
      transformStyle: {
        'preserve-3d': 'preserve-3d'
      },
      backfaceVisibility: {
        hidden: 'hidden'
      },

      // Scroll behavior
      scrollMargin: theme => theme('spacing'),
      scrollBehavior: ['smooth'],
    },
  },

  variants: {
    extend: {
      scale: ['active', 'group-hover'],
      animation: ['motion-safe', 'motion-reduce'],
      opacity: ['disabled']
    },
  },

  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    require('tailwindcss-animate'),

    

    // Custom utilities
    function({ addUtilities }) {
      addUtilities({
        '.shadow-card': {
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        },
        '.shadow-card-hover': {
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
        '.preserve-3d': {
          transformStyle: 'preserve-3d'
        },
        '.backface-hidden': {
          backfaceVisibility: 'hidden'
        }
      })
    }
  ],
};

module.exports = config;


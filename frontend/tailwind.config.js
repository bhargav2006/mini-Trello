/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#ef2b2d',
          grey: '#64748b',
          success: '#22c55e',
          warning: '#f59e0b',
          error: '#ef4444',
        },
        dark: {
          bg: '#0a0a0a',
          surface: '#111827',
          card: '#1f2937',
        },
        light: {
          bg: '#ffffff',
          surface: '#f8fafc',
          card: '#ffffff',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.25s ease-out',
        'slide-up': 'slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-subtle': 'pulseSubtle 2s infinite ease-in-out',
        'float': 'float 6s infinite ease-in-out',
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { transform: 'translateY(20px)', opacity: 0 }, to: { transform: 'translateY(0)', opacity: 1 } },
        pulseSubtle: {
          '0%, 100%': { transform: 'scale(1)', opacity: 0.8 },
          '50%': { transform: 'scale(1.05)', opacity: 1 },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      boxShadow: {
        'premium': '0 4px 20px -2px rgba(239, 43, 45, 0.08), 0 2px 10px -4px rgba(0, 0, 0, 0.04)',
        'premium-hover': '0 12px 30px -4px rgba(239, 43, 45, 0.15), 0 4px 15px -4px rgba(0, 0, 0, 0.08)',
        'premium-dark': '0 4px 20px -2px rgba(0, 0, 0, 0.5), 0 2px 10px -4px rgba(239, 43, 45, 0.05)',
        'premium-dark-hover': '0 16px 36px -4px rgba(0, 0, 0, 0.75), 0 4px 20px -4px rgba(239, 43, 45, 0.15)',
        'neon': '0 0 15px rgba(239, 43, 45, 0.5)',
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0A0F1E',
        'navy-mid': '#0D1426',
        'navy-light': '#111827',
        gold: '#C9A84C',
        'gold-light': '#E8C87A',
        'gold-dark': '#A07830',
        surface: '#F7F5F0',
        'surface-dark': '#ECEAE4',
        glass: 'rgba(255,255,255,0.08)',
        error: '#DC2626',
        success: '#059669',
        warning: '#D97706',
        info: '#3B82F6',
        'text-dark': '#1A1A2E',
        'text-muted': '#6B7280',
        'text-light': '#9CA3AF',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A84C 0%, #E8C87A 55%, #C9A84C 100%)',
        'navy-gradient': 'linear-gradient(160deg, #0A0F1E 0%, #0D1426 60%, #111827 100%)',
        'hero-gradient': 'linear-gradient(160deg, #0A0F1E 0%, #0F1930 45%, #150F08 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 100%)',
        'shimmer': 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)',
        'card-light': 'linear-gradient(145deg, #ffffff 0%, #F7F5F0 100%)',
      },
      boxShadow: {
        'gold-ring': '0 0 0 2px rgba(201,168,76,0.45)',
        'gold-glow': '0 8px 40px rgba(201,168,76,0.22), 0 2px 10px rgba(201,168,76,0.12)',
        'gold-sm': '0 4px 16px rgba(201,168,76,0.25)',
        'glass': '0 8px 32px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.10)',
        'glass-sm': '0 4px 16px rgba(0,0,0,0.30)',
        'card': '0 4px 24px rgba(0,0,0,0.07), 0 1px 6px rgba(0,0,0,0.04)',
        'card-hover': '0 12px 40px rgba(0,0,0,0.13), 0 4px 14px rgba(0,0,0,0.06)',
        'nav': '0 -1px 0 rgba(255,255,255,0.04), 0 -4px 24px rgba(0,0,0,0.4)',
        'sidebar': '4px 0 28px rgba(0,0,0,0.55)',
      },
      animation: {
        'shimmer': 'shimmer 2.0s linear infinite',
        'float': 'float 4s ease-in-out infinite',
        'gold-pulse': 'gold-pulse 2.5s ease-in-out infinite',
        'slide-up': 'slide-up 0.45s cubic-bezier(0.22,1,0.36,1)',
        'slide-down': 'slide-down 0.45s cubic-bezier(0.22,1,0.36,1)',
        'slide-in-left': 'slide-in-left 0.45s cubic-bezier(0.22,1,0.36,1)',
        'slide-in-right': 'slide-in-right 0.45s cubic-bezier(0.22,1,0.36,1)',
        'fade-in': 'fade-in 0.4s ease-out',
        'scale-in': 'scale-in 0.3s cubic-bezier(0.22,1,0.36,1)',
        'spin-slow': 'spin 3s linear infinite',
        'border-spin': 'border-spin 4s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'gold-pulse': {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(201,168,76,0.30)' },
          '50%': { boxShadow: '0 0 0 8px rgba(201,168,76,0)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.94)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'border-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
};
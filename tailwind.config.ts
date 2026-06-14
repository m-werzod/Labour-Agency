import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
        '2xl': '3rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1360px',
      },
    },
    screens: {
      xs: '375px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
      '3xl': '1920px',
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          50: '#eef2f9',
          100: '#d6e0f0',
          200: '#aec0e0',
          300: '#7f9bcd',
          400: '#4f73b7',
          500: '#2f5394',
          600: '#1d3a6e',
          700: '#142b54',
          800: '#0b2545',
          900: '#081c37',
          950: '#040f20',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
          50: '#eafaf3',
          100: '#cdf2e1',
          200: '#9ee5c6',
          300: '#66d2a6',
          400: '#34b886',
          500: '#149a6c',
          600: '#0e7a5710',
          700: '#0e7a57',
          800: '#0c6147',
          900: '#0a4f3b',
          950: '#042c21',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
          50: '#fdf4ec',
          100: '#f9e3cd',
          200: '#f2c79b',
          300: '#eaa765',
          400: '#e08c42',
          500: '#cf7430',
          600: '#b65e28',
          700: '#974925',
          800: '#7c3c24',
          900: '#663320',
          950: '#37190e',
        },
        emerald: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
      },
      fontFamily: {
        // Times New Roman across the site (with serif fallbacks for non-Windows).
        sans: ['"Times New Roman"', 'Times', 'Georgia', 'serif'],
        display: ['"Times New Roman"', 'Times', 'Georgia', 'serif'],
      },
      fontSize: {
        'display-2xl': ['clamp(2.75rem, 6vw, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '800' }],
        'display-xl': ['clamp(2.25rem, 5vw, 3.5rem)', { lineHeight: '1.08', letterSpacing: '-0.02em', fontWeight: '800' }],
        'display-lg': ['clamp(1.875rem, 4vw, 2.75rem)', { lineHeight: '1.12', letterSpacing: '-0.015em', fontWeight: '700' }],
        'display-md': ['clamp(1.5rem, 3vw, 2rem)', { lineHeight: '1.18', letterSpacing: '-0.01em', fontWeight: '700' }],
        'display-sm': ['clamp(1.25rem, 2.5vw, 1.5rem)', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '600' }],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(8, 28, 55, 0.04), 0 1px 3px rgba(8, 28, 55, 0.06)',
        card: '0 4px 12px rgba(8, 28, 55, 0.06), 0 2px 4px rgba(8, 28, 55, 0.04)',
        elevated: '0 12px 32px rgba(8, 28, 55, 0.10), 0 4px 8px rgba(8, 28, 55, 0.05)',
        'elevated-lg': '0 24px 60px rgba(8, 28, 55, 0.16), 0 8px 16px rgba(8, 28, 55, 0.06)',
        ring: '0 0 0 1px rgba(11, 37, 69, 0.06)',
      },
      maxWidth: {
        prose: '68ch',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        marquee: 'marquee 40s linear infinite',
        shimmer: 'shimmer 2s infinite',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;

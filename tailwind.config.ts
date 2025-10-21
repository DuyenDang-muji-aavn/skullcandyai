import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}', './docs/**/*.{md,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        fg: 'var(--fg)',
        muted: 'var(--muted)',
        ring: 'var(--ring)',
        border: 'var(--border)',
        brand: { 
          DEFAULT: 'var(--brand-9)', 
          fg: 'var(--brand-contrast)' 
        }
      },
      backgroundColor: {
        'glass-light': 'rgba(255, 255, 255, 0.1)',
        'glass-dark': 'rgba(0, 0, 0, 0.1)',
      },
      fontFamily: {
        // Legacy font names (deprecated - use semantic names below)
        orbitron: ['var(--font-orbitron)', 'sans-serif'],
        outfit: ['var(--font-outfit)', 'sans-serif'],
        // Semantic font names (preferred - matches Figma tokens)
        // NOTE: Tailwind generates classes as font-{key}
        // So 'family-title' becomes 'font-family-title'
        'family-title': ['var(--font-orbitron)', 'sans-serif'],
        'family-body': ['var(--font-outfit)', 'sans-serif'],
        'family-button': ['var(--font-orbitron)', 'sans-serif'],
      },
      fontSize: {
        'hero-title': 'var(--text-hero-title)',
        'hero-desc': 'var(--text-hero-desc)',
        'section-title': 'var(--text-section-title)',
        'section-desc': 'var(--text-section-desc)',
        'card-title': 'var(--text-card-title)',
        'card-subtitle': 'var(--text-card-subtitle)',
        'card-price': 'var(--text-card-price)',
        'card-title-nft': 'var(--text-card-title-nft)',
        'card-author': 'var(--text-card-author)',
        'card-badge': 'var(--text-card-badge)',
        'card-price-nft': 'var(--text-card-price-nft)',
      },
      fontWeight: {
        'regular': 'var(--font-weight-regular)',
        'medium': 'var(--font-weight-medium)',
        'bold': 'var(--font-weight-bold)',
        'black': 'var(--font-weight-black)',
      },
      borderRadius: {
        'pill': 'var(--radius-pill)',
        'card': 'var(--radius-card)',
      },
      spacing: {
        'container': 'var(--container-padding)',
        'header-h': 'var(--header-h)',
      },
      backdropBlur: {
        'glass': 'var(--glass-blur)',
        'glass-96': 'var(--glass-blur-96)',
        '3-723': 'var(--backdrop-blur-3-723)',
      },
      boxShadow: {
        'card': 'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
      },
      maxWidth: {
        'container': 'var(--container-max)',
      },
    },
  },
  plugins: [],
} satisfies Config;

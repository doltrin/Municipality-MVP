/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Aegean Future Palette
        primary: {
          DEFAULT: '#0f172a', // Slate 900 (Deep Navy)
          foreground: '#f8fafc',
        },
        secondary: {
          DEFAULT: '#64748b', // Slate 500 (Cool Grey)
          foreground: '#f1f5f9',
        },
        accent: {
          DEFAULT: '#0ea5e9', // Sky 500 (Electric Blue)
          hover: '#0284c7',
          foreground: '#ffffff',
        },
        // Semantic Backgrounds
        background: {
          DEFAULT: '#f8fafc', // Slate 50
          dark: '#020617',    // Slate 950
        },
        surface: {
          DEFAULT: '#ffffff',
          dark: '#1e293b',    // Slate 800
        },
        // Status
        success: '#10b981', // Emerald 500
        warning: '#f59e0b', // Amber 500
        error: '#ef4444', // Red 500
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2.5rem',
      },
      boxShadow: {
        'sleek': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'floating': '0 10px 40px -10px rgba(0,0,0,0.1)',
        'glow': '0 0 20px rgba(14, 165, 233, 0.3)', // Updated to Sky Blue glow
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        'gradient-accent': 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
      }
    },
  },
  plugins: [],
}
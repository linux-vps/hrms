/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/**/**/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // or false
  theme: {
    extend: {
      colors: {
        gray: {
          50: '#f8f7ff',
          100: '#f6f5ff',
          200: '#eff0fe',
          300: '#e0e0fc',
          400: '#98A5C0',
          500: '#84848f',
          600: '#595983',
          700: '#1e1f48',
          800: '#0f103b',
          900: '#000000'
        },
      }
    },
    fontFamily: {
      sans: ['Nunito', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
  },
  variants: {
    extend: {
      backgroundOpacity: ['dark']
    }
  },
  plugins: [],
}

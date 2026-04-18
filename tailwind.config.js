/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#fbf6f0',
        sand: '#f1e9df',
        nude: '#e9dfd2',
        blush: '#f6efea',
        stone: '#ece4d9',
        bronze: '#a06a33',
        caramel: '#b0773c',
        mocha: '#6d4a2f',
        ink: '#221a17'
      },
      fontFamily: {
        brand: ['"Cinzel"', 'serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Manrope"', 'sans-serif'],
        script: ['"WindSong"', 'cursive']
      },
      boxShadow: {
        luxe: '0 25px 80px rgba(91, 59, 45, 0.12)',
        soft: '0 15px 40px rgba(34, 26, 23, 0.08)'
      },
      backgroundImage: {
        'hero-glow':
          'radial-gradient(circle at top left, rgba(244, 231, 227, 0.9), transparent 38%), radial-gradient(circle at bottom right, rgba(234, 215, 198, 0.75), transparent 42%)'
      }
    }
  },
  plugins: []
};

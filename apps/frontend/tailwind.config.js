const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    createGlobPatternsForDependencies(__dirname),
  ],
  darkMode: 'class',

  // NOTE: Completely generated by ChatGPT :)
  theme: {
    extend: {
      colors: {
        primary: '#FF6B6B',
        secondary: '#48BB78',
        accent: '#805AD5',

        // Dark mode colors
        darkPrimary: '#1F2937',
        darkSecondary: '#718096',
        darkAccent: '#9F7AEA',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        '2xs': '0.625rem',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      backdropBlur: {
        glass: '8px',
      },
    },
  },
};

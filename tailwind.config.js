const colors = require('./src/components/ui/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter'],
        roboto: ['Roboto', 'sans-serif'],
        'netflix-bold': ['NetflixSans-Bold'],
        'netflix-light': ['NetflixSans-Light'],
        'netflix-medium': ['NetflixSans-Medium'],
        'netflix-regular': ['NetflixSans-Regular'],
      },
      colors,
      screens: {
        '2xs': '320px',
        xs: '425px',
        otherSm: '575px',
      },
    },
  },
  plugins: [],
};

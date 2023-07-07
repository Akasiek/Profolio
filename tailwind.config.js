/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#201E1F',
        'secondary-dark': '#333333',
        'primary-light': '#F5F5F5',
        'secondary-light': '#DDDDDD',
        'primary-gray': '#525053'
      },
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif']
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};

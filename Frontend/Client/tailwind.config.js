/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        bgPrimary: '#6f665d',
        bgSecondary: '#6a6962',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

// osrs pallete

// 6a6962
// 6f665d
// a4865b brown
// 2c2c25
// 0d0f0a
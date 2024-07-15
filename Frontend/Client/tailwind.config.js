/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        customRed: '#FF0000',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

// osrs pallete

// a4a39d
// 6f665d
// 4a3c29
// 2c2c25
// 0d0f0a
/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        'chat-bg': '#f0f4f8',
        'chat-primary': '#4a5568',
        'chat-secondary': '#718096',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
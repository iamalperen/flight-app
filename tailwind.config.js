/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        flightbg: '#063048',
        flightbox: 'rgba(96,105,119,0.6)',
        flightred: '#E81932',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
};

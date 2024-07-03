/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    backgroundColor: (theme) => ({
      ...theme('colors'),
      indigoBlue: '#141623',
    }),
    extend: {
      zIndex: {
        '-1': '-1',
      },
      gridTemplateColumns: {
        custom: 'repeat(3, minmax(0, 1fr)) 10%',
      },
      borderColor: {
        'dropdown-arrow': '#FFF transparent transparent',
      },
    },
  },
  plugins: [],
}


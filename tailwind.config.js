/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      "colors": {
        border: {
          DEFAULT: '#888883',
        },
        primary: {
          '50': '#eefbf4',
          '100': '#d6f5e2',
          '200': '#b1e9ca',
          '300': '#7ed7ac',
          '400': '#42b883',
          '500': '#27a26f',
          '600': '#188359',
          '700': '#136949',
          '800': '#12533c',
          '900': '#104432',
          '950': '#08261c',
        },
        secondary: {
          100: "#E2E2D5",
          200: "#888883",
        },
      },
    },
  },
  plugins: [],
}


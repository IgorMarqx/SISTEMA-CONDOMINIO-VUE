/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        'purpleAuda': '#9B3A7D',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}


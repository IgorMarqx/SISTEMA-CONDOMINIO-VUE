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
        'purpleAuda': '#B74585',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./Components/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {},
    },
    theme: {
      extend: {
        boxShadow: {
          'custom': '0 3px 8px rgba(0, 0, 0, 0.24)',
        },
      },
    },
    plugins: [],
  }

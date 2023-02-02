/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'site-yellow': 'rgb(255 199 44)',
        'site-red':'rgb(218 41 28)'
      },
    },
  },
  variants: {
    display: ["responsive", "focus", "dropdown"]
  },
  plugins: [require("tailwindcss-dropdown")],
}

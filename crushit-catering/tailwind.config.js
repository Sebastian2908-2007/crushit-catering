/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  variants: {
    display: ["responsive", "focus", "dropdown"]
  },
  plugins: [require("tailwindcss-dropdown")],
}

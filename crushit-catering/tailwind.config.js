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
      dropShadow: {
        'site-yellow': '0 3px 3px rgba(255 ,199 ,44)',
        'site-red': '0 3px 3px rgba(218 ,41 ,28)',
        'black': '0 6px 6px rgba(0 ,0 ,0)',
      }
    },
  },
  variants: {
    display: ["responsive", "focus", "dropdown"]
  },
  plugins: [require("tailwindcss-dropdown")],
}

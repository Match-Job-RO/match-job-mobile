/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        purple: {
          DEFAULT: "#7E2EE4",
          600: "#44187E"
        }
        
      }
    },
  },
  plugins: [],
}


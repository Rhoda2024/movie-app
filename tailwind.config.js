/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        le: "500px",
        we: "1100px",
      },
    },
  },
  plugins: [],
};

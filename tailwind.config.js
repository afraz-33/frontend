/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/*.{js,ts,jsx,tsx}",
    "./components/*.{js,ts,jsx,tsx}", // This covers all JavaScript/TypeScript files in the pages directory
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        25: "10.5rem", // Adds p-25, m-25, etc., with a value of 6.25rem (100px)
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        footerBlue: "#f9feff",
        darkBlueText: "#02084b",
      },
    },
  },
  plugins: [],
};

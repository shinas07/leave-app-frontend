/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",  // This covers all possible file extensions
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a73e8',
        secondary: '#4285f4',
        // You can add more custom colors here
        dark: {
          100: '#1a1a1a',
          200: '#2d2d2d',
          300: '#404040',
          400: '#525252',
        }
      },
    },
  },
  plugins: [
  ],
}
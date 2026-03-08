/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-20px)' },
          '100%': { transform: 'translateY(140px)' },
        }
      },
      animation: {
        scan: 'scan 2s ease-in-out infinite alternate',
      }
    },
  },
  plugins: [],
}

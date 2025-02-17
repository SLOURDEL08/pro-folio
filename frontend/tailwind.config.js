/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
         fontFamily: {
        'qlickers': ['TheQlickers', 'sans-serif'],
      },
         animation: {
        blob: "blob 7s infinite",
        'color-1': "color1 10s infinite",
        'color-2': "color2 12s infinite",
        'color-3': "color3 14s infinite",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
        color1: {
          "0%, 100%": {
            backgroundColor: "rgb(168, 85, 247)", // purple-500
          },
          "33%": {
            backgroundColor: "rgb(59, 130, 246)", // blue-500
          },
          "66%": {
            backgroundColor: "rgb(16, 185, 129)", // emerald-500
          },
        },
        color2: {
          "0%, 100%": {
            backgroundColor: "rgb(59, 130, 246)", // blue-500
          },
          "33%": {
            backgroundColor: "rgb(16, 185, 129)", // emerald-500
          },
          "66%": {
            backgroundColor: "rgb(168, 85, 247)", // purple-500
          },
        },
        color3: {
          "0%, 100%": {
            backgroundColor: "rgb(16, 185, 129)", // emerald-500
          },
          "33%": {
            backgroundColor: "rgb(168, 85, 247)", // purple-500
          },
          "66%": {
            backgroundColor: "rgb(59, 130, 246)", // blue-500
          },
        },
      },
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        }
      }
    },
  },
  plugins: [],
}
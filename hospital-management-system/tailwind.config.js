/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        secondary: "#0ea5e9",
        accent: "#10b981",
        danger: "#ef4444",
        warning: "#f59e0b",
        "hospital-blue": "#1e40af",
        "hospital-light": "#dbeafe",
        "hospital-dark": "#1e3a8a"
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif']
      },
      spacing: {
        '128': '32rem',
        '144': '36rem'
      }
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  safelist: [
    "delay-[3s]",
    "delay-[4s]",
    "delay-[5s]",
    "delay-[6s]",
    "delay-[7s]",
    "delay-[8s]",
    "delay-[10s]",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

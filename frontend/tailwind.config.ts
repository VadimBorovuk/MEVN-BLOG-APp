/** @type {import('tailwindcss').Config} */

import daisyui from "daisyui";
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}", // ✅ важливо для Vue
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif', 'system-ui'], // заміна дефолтного sans
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      "light",
      "dark"
    ],
  },
}

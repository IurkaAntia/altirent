import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          "100": "#72c6e7",
          DEFAULT: "#0dcaf0",
        },
        secondary: {
          "100": "#787780",
          "200": "#3C394BFF",
          "300": "#2D2B3AFF",
          DEFAULT: "#313041",
        },
        filter: {
          "100": "#313041",
          DEFAULT: "#3130412e",
        },
        green: {
          "1000": "#bfd085",
          DEFAULT: "#3130412e",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;

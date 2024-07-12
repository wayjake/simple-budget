import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#18181B', // Dark background
          light: '#FFFFFF' // Light background
        },
        text: {
          DEFAULT: '#E4E4E7', // Light text
          dark: '#18181B' // Dark text
        },
        card: {
          DEFAULT: '#27272A', // Dark card background
          light: '#FFFFFF' // Light card background
        },
        border: {
          DEFAULT: '#3F3F46', // Dark border
          light: '#D1D5DB' // Light border
        }
      }
    },
  },
  plugins: [],
} satisfies Config;

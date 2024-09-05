import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'selector',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        fadeOut: {
          '0%': {
            opacity: '1',
          },
          '100%': {
            opacity: '0',
            display: 'none',
          }
        },
        fadeIn: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1'
          }
        },
        fastFadeIn: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        }
      },
      animation: {
        ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1)',
        fadeOut: 'fadeOut 1.5s linear forwards',
        fadeIn: 'fadeIn 3s linear forwards',
        fastFadeIn: 'fastFadeIn 0.5s linear forwards',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;
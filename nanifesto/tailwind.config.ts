import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'selector',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./public/*.{html,js}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'verdant': {
          '50': '#EDFFDE',
          '100': '#DCFFBC',
          '200': '#C7F796',
          '300': '#ABE46E',
          '400': '#8CC947',
          '500': '#6DAA2A',
          '600': '#528717',
          '700': '#3B670C',
          '800': '#284505',
          '900': '#0E1B01'
        },
        'honey': {
          '50': '#F2F0EE',
          '100': '#EADDCA',
          '200': '#E0C6A7',
          '300': '#D4B486',
          '400': '#C59E63',
          '500': '#B18442',
          '600': '#9E6D2A',
          '700': '#875718',
          '800': '#673F0B',
          '900': '#452C06'
        },
        'jungle': {
          '50': '#C5DEC7',
          '100': '#8CCB91',
          '200': '#64B46A',
          '300': '#43A049',
          '400': '#2B8D30',
          '500': '#187A1E',
          '600': '#0D6711',
          '700': '#07560A',
          '800': '#023E06',
          '900': '#001F02'
        }
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
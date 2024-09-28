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
        },
        'sapphire': {
          '50': '#E7F3FD',
          '100': '#BDDDFB',
          '200': '#95C4F6',
          '300': '#6BACEF',
          '400': '#4F97E3',
          '500': '#3C85D3',
          '600': '#2970BC',
          '700': '#1A579D',
          '800': '#10427A',
          '900': '#08284E',
          '950': '#020E1C',
        },
        'matcha': {
          '50': '#FAFFF1',
          '100': '#E1F2BE',
          '200': '#C6DF8E',
          '300': '#A5C15E',
          '400': '#89A43C',
          '500': '#678021',
          '600': '#475B0F',
          '700': '#2C3906',
          '800': '#182002',
          '900': '#0B0E01',
        },
        'galaxy': {
          '50': '#F6F1FF',
          '100': '#CFBEF2',
          '200': '#A78EDF',
          '300': '#7A5EC1',
          '400': '#573CA4',
          '500': '#3A2180',
          '600': '#230F5B',
          '700': '#130639',
          '800': '#0A0220',
          '900': '#04010E',
        },
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
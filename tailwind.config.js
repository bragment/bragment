const themes = require('daisyui/src/theming/themes');
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        'mmd-lg': { min: '868px', max: '1023px' },
        'sm-md': { min: '640px', max: '767px' },
      },
    },
  },
  plugins: [
    require('daisyui'),
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.content-auto': {
          contentVisibility: 'auto',
        },
        '.content-hidden': {
          contentVisibility: 'hidden',
        },
      });
    }),
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...themes['[data-theme=light]'],
          primary: '#0396ff',
          'primary-content': '#ffffff',
          secondary: '#60a5fa', // blue-400
          'secondary-content': '#ffffff',
          accent: '#32ccbc',
          'accent-content': '#ffffff',
        },
        dark: {
          ...themes['[data-theme=dark]'],
          primary: '#2563eb', // blue-600
          'primary-content': '#ffffff',
          secondary: '#0369a1', // sky-600
          'secondary-content': '#ffffff',
          accent: '#14b8a6', // teal-500
          'accent-content': '#ffffff',
        },
      },
    ],
    darkTheme: 'dark',
  },
};

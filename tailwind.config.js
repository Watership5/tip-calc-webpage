/** @type {import('tailwindcss').Config} */
export const content = ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}",];
export const theme = {
  extend: {
    colors: {
      'strong-cyan': 'hsl(172, 67%, 45%)',
      'very-dark-cyan': 'hsl(183, 100%, 15%)',
      'dark-grayish-cyan': 'hsl(186, 14%, 43%)',
      'grayish-cyan': 'hsl(184, 14%, 56%)',
      'light-grayish-cyan': 'hsl(185, 41%, 84%)',
      'very-light-grayish-cyan': 'hsl(189, 41%, 97%)',
      'red': '#ef233c',
      'redT': 'hsl(353, 86%, 54%,0.3)'
    }
  },
};
export const plugins = [];


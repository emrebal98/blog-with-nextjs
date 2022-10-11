/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      listStyleType: {
        square: 'square',
        circle: 'circle',
        'decimal-leading-zero': 'decimal-leading-zero',
        'lower-roman': 'lower-roman',
        'upper-roman': 'upper-roman',
        'lower-latin': 'lower-latin',
        'upper-latin': 'upper-latin',
      },
    },
  },
  plugins: [],
};

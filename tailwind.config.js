/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        serif:   ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['"Libre Baskerville"', 'serif'],
      },
      colors: {
        sage: {
          50:  '#f4f7f0',
          100: '#e8ede0',
          200: '#d4e2c8',
          300: '#bfd4b0',
          400: '#a8c498',
          500: '#8aaa78',
          600: '#6a8a58',
          700: '#4a6a3a',
          800: '#2d4a22',
          900: '#1e2a1a',
        },
        raspberry: {
          50:  '#f7edef',
          100: '#efd4d8',
          200: '#ddb0b8',
          300: '#c88090',
          400: '#b85a6a',
          500: '#9a3e50',
          600: '#7a3040',
          700: '#5a2030',
          800: '#3a1220',
          900: '#200810',
        },
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        '10': '10px',
      },
      screens: {
        lg: '1010px',
      },
      colors: {
        'blue-500': '#3563E9',
        'blue-300': '#5CAFFC',
        'blue-100': '#94A7CB',
        'blue-50': '#C3D4E9',

        'gray-900': '#1A202C',
        'gray-850': '#293346',
        'gray-800': '#424B5C',
        'gray-700': '#3D5278',
        'gray-400': '#90A3BF',

        'white-0': '#FFFFFF',
        'white-100': '#F7F9FC',
        'white-200': '#F6F7F9',
        'red-400': '#ED3F3F',

        dark: {
          900: '#1A202C',
          850: '#293346',
          800: '#424B5C',
          700: '#3D5278',
        },
      },
    },
  },
  plugins: [],
}


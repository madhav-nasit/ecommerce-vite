/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#141718',
        background: '#FFFFFF',
        secondary: '#F3F5F7',
        card: '#FFFFFF',
        color: '#141718',
        button: '#141718',
        'button-hover': '#353935',
        light: '#6C7275',
        error: '#FF5630',
        success: '38CB89',
        border: ' #E8ECEF',
        'primary-dark': '#0D0E10',
        'background-dark': '#1C1F24',
        'secondary-dark': '#2B2E33',
        'card-dark': '#25282D',
        'color-dark': '#FFFFFF',
        'button-dark': '#141718',
        'button-hover-dark': '#EAEAEA',
        'light-dark': '#A8ACB1',
        'error-dark': '#FF2800',
        'success-dark': '#00B38F',
        'border-dark': '#E8ECEF',
      },
    },
  },
  plugins: ['prettier-plugin-tailwindcss'],
};

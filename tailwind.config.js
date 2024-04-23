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
        card: '#F9FAFB',
        color: '#141718',
        button: '#141718',
        hover: '#E5E7EB',
        'button-hover': '#353935',
        light: '#6C7275',
        error: '#FF5630',
        success: '38CB89',
        border: ' #E8ECEF',
        'primary-dark': '#0D0E10',
        'background-dark': '#1C1F24',
        'secondary-dark': '#2B2E33',
        'card-dark': '#1F2937',
        'color-dark': '#FFFFFF',
        'hover-dark': '#4B5563',
        'button-dark': '#141718',
        'button-hover-dark': '#EAEAEA',
        'light-dark': '#A8ACB1',
        'error-dark': '#FF2800',
        'success-dark': '#00B38F',
        'border-dark': '#374151',
      },
    },
    // that is animation class
    animation: {
      fadeIn: 'fadeIn 0.2s ease-in-out',
      fadeInDown: 'fadeInDown 0.2s ease-in',
    },

    // that is actual animation
    keyframes: (theme) => ({
      fadeIn: {
        '0%': { opacity: 0 },
        '100%': { opacity: 1 },
      },
      fadeInDown: {
        '0%': {
          opacity: '0',
          transform: 'translateY(-20px)',
        },
        '100%': {
          opacity: '1',
          transform: 'translateY(0)',
        },
      },
    }),
  },
  plugins: ['prettier-plugin-tailwindcss'],
};

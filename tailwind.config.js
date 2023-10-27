/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}'
  ],
  corePlugins: {
    preflight: false
  },
  theme: {
    extend: {
      screens: {
        xr: '415px', // iPhone XR
        web: '769px' // iPad Mini
      },
      fontFamily: {
        poppins: 'Poppins',
        montserrat: 'Montserrat',
        nunito: 'Nunito Sans'
      },
      colors: {
        primary: '#332C5C',
        secondary: '#494369',
        'bright-grey': '#332C5C',
        'purple-haze': '#494369',
        skeleton: '#C4C4C4',
        'skeleton-light': '#D9D9D9',
        'skeleton-text': 'rgba(0, 0, 0, 0.5)',
        backdrop: 'rgba(255, 255, 255, 0.01)',
        'semi-gray': '#404040',
        'mid-grey': '#5E587A',
        'purple-cute': '#8976FD',
        'dark-blue': '#14213D',
        'app-orange': 'rgb(251, 129, 16)'
      },
      margin: {
        section: '120px',
        subsection: '70px'
      },
      maxWidth: {
        container: '1290px',
        content: '1177px'
      },
      minHeight: {
        screen: '100vh',
        section: '960px'
      },
      width: {
        'screen-1/2': '50vw'
      },
      height: {
        section: '960px'
      },
      lineHeight: {
        '125%': '125%',
        '140%': '140%',
        '180%': '180%',
        '20px': '20px'
      },
      boxShadow: {
        card: '0px 20px 80px rgba(0, 0, 0, 0.03)',
        image: '0px 4px 8px rgba(63, 63, 63, 0.1)',
        frame: '-20px 34px 80px rgba(25, 15, 44, 0.05)',
        border: '0px 0px 5px rgba(0, 0, 0, 0.15)'
      },
      padding: {
        mobile: '24px',
        section: '120px',
        header: '4.5rem'
      }
    }
  },
  plugins: []
};

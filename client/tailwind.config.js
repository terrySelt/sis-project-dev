/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage : {
        'logo' : "url('../client/public/assets/images/logo.png')"
      },
      backgroundColor: theme => ({
        ...theme('colors'),
        'primary':'#DC2626',
        'notification':'#FF0000',
        'secondary':'#cbd5e0',
        'terceary':'#999999',
      }),
      textColor:{
        'primary':'#DC2626',
        'notification':'#FF0000',
        'secondary':'#cbd5e0',
        'terceary':'#999999',
      },
      fontFamily:{
        Quicksand:['Quicksand', 'sans-serif']
      }
    },
  },
  plugins: [],
}


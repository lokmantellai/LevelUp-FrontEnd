/** @type {import('tailwindcss').Config} */

import withMT from "@material-tailwind/html/utils/withMT";



export default withMT({

  /** @type {import('tailwindcss').Config} */
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",

  ]
  , important: "#root"
  , theme: {
    extend: {

      fontFamily: {
        customFont: ["Ubuntu"],
        // Add more custom font families as needed
      },
      screens: {
        'xs': { 'min': '320px', 'max': '640px' },
        'sm': '640px',
        // => @media (min-width: 640px) { ... }
        'md': '991px',
        // => @media (min-width: 1024px) { ... }

        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }

        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      },
    },
  },
  plugins: [],
})


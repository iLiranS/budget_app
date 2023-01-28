/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
     "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes:{
        circleEntrance:{
          '0%,100%' :{transform:'scale(1)'},
          '50%':{transform:'scale(0.9)'}
        },
        entrance:{
          '0%':{transform:'scale(0)',opacity:'0'},
          '100%':{transform:'scale(1)' , opacity:'1'}
        },
        navEntrance:{
          '0%':{transform:'translateX(-100%)'},
          '100%':{transform:'translateX(0)'}
        },
        entranceTest:{
          '0%':{scale:'0'},
          '100%':{scale:'1'}
        }
      },
      animation:{
        circleEntrance : 'circleEntrance 1s ease-in-out',
        entrance : 'entrance 0.5s ease-in-out',
        entranceTest : 'entranceTest 0.5s ease',
        navEntrance: 'navEntrance 0.5s ease',
      }
    },
  },
  plugins: [],
  darkMode:'class'
}

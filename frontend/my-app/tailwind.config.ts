/** @type {import('tailwindcss').Config} */
export default {
   darkMode: "true",
   content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
   ],
  theme: {
    extend: {
       scrollBehavior: ['responsive'],
         colors: {
                primary: {
                    "100": "#FFE8F0",
                    DEFAULT: "#EE2B69",
                },
                secondary: "#FBE843",
                black: {
                    "100": "#333333",
                    "200": "#141413",
                    "300": "#7D8087",
                    DEFAULT: "#000000",
                },
                white: {
                    "100": "#F7F7F7",
                    "200": "#F2F4F4",
                    DEFAULT: "#FFFFFF",
                },
           },
             fontFamily: {
                'work-sans': ['var(--font-work-sans)', 'sans-serif'],
            },
    },
  },
  plugins: [],
}



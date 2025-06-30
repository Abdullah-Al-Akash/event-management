/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandGreen: {
          DEFAULT: '#2F855A',   // a nice natural green (can tweak)
          light: '#68D391',
          dark: '#276749',
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#2F855A",       // brandGreen DEFAULT
          "primary-focus": "#276749",
          "primary-content": "#ffffff",
          secondary: "#68D391",
          accent: "#D69E2E",
          neutral: "#3D4451",
          "base-100": "#FFFFFF",
          info: "#2094F3",
          success: "#009485",
          warning: "#FF9900",
          error: "#FF5724",
        },
      },
    ],
    darkTheme: false, // disable dark theme auto switch
  },
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      dark: "#393D3F",
      light: "#FDFDFF",
      black: "#000",
      white: "#fff",
      gray: "rgba(237, 236, 233, .6)",
      "lighter-gray": "rgba(237, 236, 233, .1)",
      red: "#f07167",
      green: "#aec3b0",
      "pastel-creme": "#faedcd",
      "pastel-orange": "#ffba78",
      "pastel-green": "#89d2a3",
      "pastel-purple": "#e5d0e3",
    },
    screens: {
      sm: { min: "480.1px" },
      md: { min: "767.1px" },
      lg: { min: "991.1px" },
      xl: { min: "1199.1px" },
      "2xl": { min: "1919.1px" },
    },
    extend: {
      keyframes: {
        typing: {
          "0%": {
            width: "0%",
          },
          "100%": {
            width: "100%",
          },
        },
      },
      animation: {
        typing: "typing 1.8s ease-in-out infinite",
      },
      transitionProperty: {
        width: "width",
        spacing: "margin, padding",
        flex: "flex",
        fontSize: "font-size",
      },
      height: {
        "12/13": "92.30%",
      },
    },
  },
  plugins: [],
};

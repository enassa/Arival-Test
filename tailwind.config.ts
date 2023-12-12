/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#817CA5",
        secondary: "#5845DD",
        tertiary: "#C9C5E8",
        arivalGray: "#C0BCDF",
        arivalDark: "#413C5F",
        active: "#5845DD",
        inactive: "#A39FC1",
        error: "#DA2121",
        selected: "#F6F4FF",
        disabled: "#87839F",
      },
      keyframes: {
        rise: {
          from: { transform: "translate(0px,0); opacity: 0.4" },
          to: { transform: "translate(0px,-4px); opacity: 1" },
        },
      },
      animation: {
        rise: "rise 0.2s ease 0s 1 normal forwards running",
      },
    },
  },
  plugins: [],
};

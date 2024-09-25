module.exports = {
  purge: [],
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          md: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
      screens: {
        "small-mobile": "430px",
        // => @media (min-width: 320px) { ... }

        mobile: "576px",
        // => @media (min-width: 480px) { ... }

        tablet: "786px",
        // => @media (min-width: 640px) { ... }

        laptop: "992px",
        // => @media (min-width: 1024px) { ... }

        desktop: "1200px",
        // => @media (min-width: 1280px) { ... }

        "large-desktop": "1400px",
        // => @media (min-width: 1600px) { ... }
      },
      colors: {
        primary: "#f97316",
        secondary: "#ffedd5",
        success: "#16a34a",
        danger: "#dc2626",
        warning: "#ffc107",
        info: "#17a2b8",
        light: "#f1f5f9",
        dark: "#1f2937",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

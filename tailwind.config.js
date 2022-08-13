require(`dotenv`).config();

module.exports = {
  future: {},
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      typography: theme => ({
        unprose: {
          css: {
            img: {
              marginTop: "0px",
              marginBottom: "0px",
              maxWidth: "100%",
            },
          },
        },
      }),
      rotate: {
        360: "360deg",
      },
      dropShadow: {
        solid: "1px 2px 0px #4A4B5A",
      },
      colors: {
        main: `#${process.env.PRIMARY_COLOR}`,
        "accent-1": "#FAFAFA",
        "accent-2": "#EAEAEA",
        "accent-7": "#333",
        success: "#0070f3",
        cyan: "#79FFE1",
        code: "#2A2A2A",
      },
      spacing: {
        28: "7rem",
        "1px": "1px",
        "2full": "200%",
      },
      letterSpacing: {
        tighter: "-.04em",
      },
      lineHeight: {
        tight: 1.2,
      },
      fontSize: {
        "5xl": "2.5rem",
        "6xl": "2.75rem",
        "7xl": "4.5rem",
        "8xl": "6.25rem",
      },
      boxShadow: {
        small: "0 5px 10px rgba(0, 0, 0, 0.12)",
        medium: "0 8px 30px rgba(0, 0, 0, 0.12)",
        solid: "1px 2px 0px 0px #4A4B5A",
        "solid-md": "4px 4px 0px 0px #4A4B5A",
        "solid-lg": "8px 8px 0px 0px #4A4B5A",
      },
      borderWidth: {
        min: "0.5px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};

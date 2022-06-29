const themes = require("./src/Themes/index");
module.exports = {
  content: ["{pages,src}/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  important: true, // important in prod is must be
  theme: ["dark"],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [{ ...themes }],
  },
};

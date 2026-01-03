module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      listStyleType: {
        circle: "circle",
        square: "square",
        armenian: "armenian",
        lowerRoman: "lower-roman",
        upperRoman: "upper-roman",
        lowerAlpha: "lower-alpha",
        upperAlpha: "upper-alpha",
      },
    },
  },
  plugins: [
    // require("daisyui")
  ],
};

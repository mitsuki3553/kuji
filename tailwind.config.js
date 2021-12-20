module.exports = {
  content: ["./index.html", "./*.js"],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        christmas1: "url('./images/christmas1.jpg')",
        present1: "url('./images/present1.png')",
        present: "url('./images/present.png')",
      }),
    },
  },
  plugins: [],
};

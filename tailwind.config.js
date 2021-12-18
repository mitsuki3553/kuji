module.exports = {
  mode: "jit",
  purge: ["./index.html", "./*.js"],
  content: [],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        christmas1: "url('./images/christmas1.jpg')",
      }),
    },
  },
  plugins: [],
};

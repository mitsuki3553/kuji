module.exports = (ctx) => {
  return {
    plugins:
      ctx.env === "production"
        ? [require("tailwindcss"), require("autoprefixer"), require("cssnano")]
        : [require("tailwindcss"), require("autoprefixer")],
  };
};

// in .svgrrc.js
module.exports = {
  svgoConfig: {
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: {
            // prevent removing viewBox attribute from the svg
            removeViewBox: false,
          },
        },
      },
    ],
  },
};

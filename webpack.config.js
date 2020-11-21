const path = require("path");

module.exports = {
  entry: "./src/calcularMedidas.js",
  output: {
    path: path.resolve(__dirname, "public/js"),
    filename: "calcularMedidas-dist.js",
  },
  resolve: {
    extensions: [".js"],
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
    ],
  },
};

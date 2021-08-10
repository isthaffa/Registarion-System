const path = require("path");

const slsw = require("serverless-webpack");

module.exports = {
  entry: slsw.lib.entries,
  mode: "development",
  output: {
    libraryTarget: "commonjs",
    path: path.resolve(__dirname, ".webpack"),
    filename: "[name].js",
  },

  target: "node",
  module: {
    rules: [
      {
        test: /\.js$/, // include .js files
        enforce: "pre", // preload the jshint loader
        exclude: /node_modules/, // exclude any and all files in the node_modules folder
        include: __dirname,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.ya?ml$/,
        use: "js-yaml-loader",
      },
    ],
  },
};

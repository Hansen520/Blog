/*
 * @Date: 2024-12-16 11:21:58
 * @Description: description
 */
const path = require("node:path");
const ConsoleLogStatsPlugin = require("./plugins/ConsoleLogStatsPlugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // use: path.resolve('./loader/my-loader.js'),
        use: [
          {
            loader: "my-loader",
            options: {
              flag: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolveLoader: {
    modules: ["./loader"],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 8080,
    open: true,
  },
  plugins: [new ConsoleLogStatsPlugin()],
};

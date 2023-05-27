const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.js"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./dist"),
    clean: true,
    publicPath: "/"
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Instagram clone"
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        resolve: {
          extensions: [".js", ".jsx"]
        },
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"]
          }
        }
      },
      {
        test: /\.(svg)$/i,
        type: "asset/resource"
      }
    ]
  },
  devServer: {
    static: "./dist",
    historyApiFallback: true
  },
  optimization: {
    runtimeChunk: "single"
  }
}
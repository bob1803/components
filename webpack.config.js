const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    publicPath: "/",
    path: path.resolve(__dirname, "/dist")
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
           "babel-loader"
        ]
      },
      {
        test: /\.less$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          {
            loader: "css-loader", // translates CSS into CommonJS
           
        },
           "less-loader", // compiles Less to CSS
          
        ]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx", "json", ".less"]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: "./dist",
    hot: true
  }
};

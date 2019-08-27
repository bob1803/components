const path = require("path");
//const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const devEnv = 'development'
const NODE_ENV = process.env.NODE_ENV || devEnv

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.js"
  },
  devtool: NODE_ENV === devEnv ? 'inline-source-map' : 'hidden-source-map',
  module: {
    rules: [
      {
        test:  /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
           "babel-loader"
        ]
      },
      {
        test: /\.(js|jsx)$/,
        use: ["source-map-loader"],
        enforce: "pre"
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
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      favicon: "./src/images/favicon.ico",
    })
  ],
  devServer: {
    contentBase: "./dist",
    hot: true,
    historyApiFallback: true
  }
};

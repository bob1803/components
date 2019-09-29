const merge = require("webpack-merge");
const common = require("./webpack.config.common.js");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = module.exports = merge(common, {
  mode: "production",
  devtool: "hidden-source-map",
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
});

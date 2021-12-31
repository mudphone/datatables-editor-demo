const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const CssMinimizer = require('optimize-css-assets-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',

  /**
   * Here, we specify the output destination for our bundles and the file name
   * format. You probably won't ever need or want to mess with this.
   */
  output: {
    path: path.resolve(__dirname, '../dist/static'),
    filename: '[name].bundle.js',
    publicPath: '/'
  },


  optimization : {
    minimize: true,
    minimizer: [
      new CssMinimizer(),
    ],
  },
})

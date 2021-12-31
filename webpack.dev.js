const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMinimizer = require('optimize-css-assets-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',

  /**
   * Here, we specify the output destination for our bundles and the file name
   * format. You probably won't ever need or want to mess with this.
   */
  output: {
    path: path.resolve(__dirname, '../dist/static'),
    filename: '[name].bundle.js',
    publicPath: '/'
  },

  optimization: {
      minimize: true,
      minimizer: [
           new CssMinimizer(),
       ],
  },

  /**
   * Start a server on port 8000. If you want to see additional logging,
   * you can delete the stats: 'minimal' line
   */
  devServer: {
      contentBase: path.join(__dirname, 'dist/static'),
      port: 8000,
      host: '0.0.0.0',
      stats: 'minimal',
      historyApiFallback: true,
  },
})

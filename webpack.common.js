const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  /**
   * This is where we specify the entry points for our app. We can add as many
   * entry points as we want by adding additional key/path pairs. Each of these
   * will be bundled separately, and common imports will be extracted and
   * saved in their own shared bundle to avoid duplication.
   */
  entry: {
    main: path.resolve(__dirname, 'src/js/index.js'),
  },

  /**
   * Here, we configure the SplitChunksPlugin, which allows us to extract
   * shared code into its own bundle. For more information, read the docs:
   * https://webpack.js.org/plugins/split-chunks-plugin/
   */
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },

  /**
   * This is the meat of the Webpack configuration. Here, we specify how
   * to process different types of files. Keep in mind that arrays of loaders
   * are processed in reverse order, so in our CSS rule, less-loader is
   * run first and MiniCssExtractPlugin is run last.
   *
   * The "test" property is simply a regex to find the correct files.
   */
  module: {
    rules: [
      /**
       * We need to lint our code _before_ it gets transpiled.
       * Setting 'enforce': 'pre' ensures this runs before the babel-loader.
       */
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          eslintConfig: path.join(__dirname, '.eslintrc.json'),
          /**
           * Set fix to false if you don't want ESLint to repair certain
           * style errors for you.
           */
          fix: true
        }
      },
      /**
       * Once the code is linted, we transpile it, ignoring the node_modules
       */
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      /**
       * CSS and Less files are run through the less-loader, followed by the
       * css-loader. MiniCssExtractPlugin extracts the CSS into its own bundle.
       */
       /* https://stackoverflow.com/questions/64118925/how-to-avoid-duplicate-sass-importsusing-use-on-webpack*/
      {
        test: /\.(css|less)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
      },
      {
          test:/\.(png|jpg|gif|svg)$/,
          use:[{
              loader:'url-loader',
              options:{
                  limit:50,  //it's important
                  outputPath:'images'
              }
          }]
      },
      /**
       * Handle loading fonts
       */
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader?name=/assets/fonts/[name].[ext]' //,
          // {
          //     loader:'url-loader',
          //     options:{
          //         limit:50,  //it's important
          //         outputPath:'assets/fonts'
          //     }
          // }
        ]
      },
      /**
       * plain text
       */
      {
        test: /\.(txt|tsv)$/,
        use: 'raw-loader'
      }
    ]
  },

  /**
   * Plugins handle misellaneous tasks that aren't directly tied to the creation
   * of the JavaScript bundle. This property is just an array, and you can simply
   * add additional plugins as you need them.
   */
  plugins: [

    /* Use the ProvidePlugin constructor to inject jquery implicit globals */
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery'",
      "window.$": "jquery"
    }),

    // Extracts CSS into its own bundle
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),

    // Generates HTML files from templates and inserts links to JS and CSS
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/templates/index.html'),
      filename: 'index.html',
      chunks: ['main'],
      hash: true,
      minify : { removeEmptyAttributes: false },
    }),
  ]
}

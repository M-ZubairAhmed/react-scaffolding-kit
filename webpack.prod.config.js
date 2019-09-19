import webpack from 'webpack'
import path from 'path'
import htmlWebpackPlugin from 'html-webpack-plugin'
import miniCssExtractPlugin from 'mini-css-extract-plugin'
import cleanWebpackPlugin from 'clean-webpack-plugin'
import terserJsWebpackPlugin from 'terser-webpack-plugin'
import optimizeCssAssestsPlugin from 'optimize-css-assets-webpack-plugin'
import copyWebpackPlugin from 'copy-webpack-plugin'

const reactVendorsRegex = /[\\/]node_modules[\\/](react|react-dom|redux|react-redux)[\\/]/
const utilityVendorsRegex = /[\\/]node_modules[\\/](moment|lodash)[\\/]/
const restVendorsRegex = /[\\/]node_modules[\\/](!react)(!react-dom)(!redux)(!react-redux)(!moment)[\\/]/

module.exports = {
  mode: 'production',
  entry: [path.resolve(__dirname, 'src', 'index.js')],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
  },
  devtool: 'source-map',
  optimization: {
    minimizer: [
      new terserJsWebpackPlugin({}),
      new optimizeCssAssestsPlugin({}),
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      cacheGroups: {
        reactVendor: {
          test: reactVendorsRegex,
          name: 'reactvendor',
        },
        utilityVendor: {
          test: utilityVendorsRegex,
          name: 'utilityVendor',
        },
        vendor: {
          test: restVendorsRegex,
          name: 'vendor',
        },
      },
    },
  },
  module: {
    strictExportPresence: true,
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' },
      {
        test: /\.scss$/,
        use: [
          miniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.resolve(__dirname),
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  // ENable later when we figure out good way to split the app
  // performance: {
  //   hints: 'error',
  // },
  stats: 'verbose',
  plugins: [
    new cleanWebpackPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new htmlWebpackPlugin({
      // A unique utc string for cache busting of index.html
      // Remember to change the name when content of html change
      filename: 'index.1554065223284.html',
      template: './src/index.html',
      minify: true,
    }),
    new miniCssExtractPlugin({
      filename: 'styles.[contenthash].css',
      chunkFilename: 'style.[id].[contenthash].css',
    }),
    new optimizeCssAssestsPlugin(),
    new copyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src', '_assets'),
        to: path.resolve(__dirname, 'build', 'assets'),
      },
    ]),
    new webpack.DefinePlugin({
      // Add app global constants here
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
}

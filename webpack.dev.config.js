import webpack from 'webpack'
import path from 'path'
import htmlWebpackPlugin from 'html-webpack-plugin'
import cleanWebpackPlugin from 'clean-webpack-plugin'
import writeFilePlugin from 'write-file-webpack-plugin'
import copyWebpackPlugin from 'copy-webpack-plugin'

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'dist.bundle.js',
    pathinfo: true,
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
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
  plugins: [
    new cleanWebpackPlugin(),
    new writeFilePlugin(),
    new htmlWebpackPlugin({
      template: './src/index.html',
      minify: 'false',
    }),
    new copyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src', '_assets'),
        to: path.resolve(__dirname, 'build', 'assets'),
      },
    ]),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
  devServer: {
    compress: true,
    historyApiFallback: true,
    host: 'localhost',
    hot: true,
    open: true,
    stats: 'errors-only',
    port: 3000,
  },
}

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: [
    path.resolve(__dirname, 'client/src/entry.js'),
    path.resolve(__dirname, 'client/sass/screen.scss'),
  ],
  output: {
    path: path.resolve(__dirname, './client/build/'),
    publicPath: '/static/',
    filename: 'js/bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin(),
  ],
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
    ],
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot-loader', 'babel-loader'],
        include: path.join(__dirname, 'client/src'),
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
        include: path.join(__dirname, 'client/sass'),
      },
    ],
  },
};

var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: ['./src/index'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.DefinePlugin({'process.env.NODE_ENV': "'dev'"})
  ],
  resolveLoader: {
    'fallback': path.join(__dirname, 'node_modules')
  },
  module: {
    preLoaders: [{
      test: /\.js$/,
      loader: 'eslint-loader',
      exclude: /node_modules/,
    }],
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        exclude: /node_modules/,
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css?sourceMap', 'sass?sourceMap']
      }
    ]
  },
  sassLoader: {
    includePaths: [path.resolve(__dirname, "./src/sass")]
  }
};

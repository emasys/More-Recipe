const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const webpack = require('webpack');

module.exports = merge(common, {
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devtool: 'inline-source-map',
  devServer: {
    host: process.env.HOST,
    port: process.env.PORT,
    proxy: {
      '/api/v1/**': {
        target: 'http://[::1]:8080',
        secure: false
      }
    },
    contentBase: path.join(__dirname, 'client/public'),
    historyApiFallback: true
  }
});

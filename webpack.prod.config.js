const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './client/src/app.jsx',
  output: {
    path: path.join(__dirname, 'client/public'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default']
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),
    new ExtractTextPlugin({ filename: 'style.css', disable: false, allChunks: true }),

  ],
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css', '.scss'],
    descriptionFiles: ['package.json']
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(tff|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=250000'
      }
    ]
  },


};

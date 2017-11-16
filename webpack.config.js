const path = require('path');

module.exports = {
  entry: './client/src/app.js',
  output: {
    path: path.join(__dirname, 'client/public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  // exclude: {
  //   exclude: [
  //     'client/public/js/jquery-3.2.1.min.js',
  //     'client/public/js/jquery-editable-select.js',
  //     'client/public/js/script.js'
  //   ]
  // },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'client/public'),
    historyApiFallback: true
  }
};

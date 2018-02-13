const path = require('path');

module.exports = {
  entry: './src/public/js/index.js',
  output: {
    path: path.resolve(__dirname, 'src/public/js'),
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['env', 'react']
        }
      }
    ]
  }
};

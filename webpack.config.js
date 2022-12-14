const path = require('path');

module.exports = {
  entry: ['babel-polyfill', './server.js'],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'server.js'
  },
  module: {
    rules: [
      // {
      //     test: /\.js?$/,
      //     exclude: /node_modules/,
      //     loader: 'babel-loader',
      //     query: {
      //         presets: ['@babel/preset-env']
      //     }
      // }
    ]
  },
  node: {
    __dirname: false
  },
  target: 'node'
};

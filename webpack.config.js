var path = require('path');

const config = {
  entry: './client/app.jsx',
  output: {
    path: path.resolve(__dirname, './public/dist/'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};

module.exports = config;
